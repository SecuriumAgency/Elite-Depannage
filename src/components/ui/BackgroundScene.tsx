"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    vec2 mouseOffset = uMouse * 0.15;
    vec2 flow = aspectUv * 2.2 + mouseOffset;

    float t = uTime * 0.06;
    float n1 = fbm(flow + vec2(t, -t * 0.7));
    float n2 = fbm(flow * 1.8 - vec2(-t * 0.5, t * 0.9) + n1 * 0.6);
    float fluid = mix(n1, n2, 0.5);

    vec3 deep = vec3(0.01, 0.02, 0.05);
    vec3 water = vec3(0.02, 0.09, 0.14);
    vec3 base = mix(deep, water, fluid);

    float e = 0.01;
    float nx = fbm(flow + vec2(e, 0.0)) - fbm(flow - vec2(e, 0.0));
    float ny = fbm(flow + vec2(0.0, e)) - fbm(flow - vec2(0.0, e));
    vec2 grad = vec2(nx, ny) / (2.0 * e);

    vec3 lightDir = normalize(vec3(uMouse * 0.6, 1.0));
    float highlight = pow(clamp(dot(normalize(vec3(grad, 1.0)), lightDir), 0.0, 1.0), 6.0);

    vec3 metal = vec3(0.55, 0.58, 0.62);
    vec3 color = base + metal * highlight * 0.8;

    float vignette = smoothstep(1.1, 0.2, length(aspectUv));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    materialRef.current?.uniforms.uResolution.value.set(size.width, size.height);
  }, [size]);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    const u = material.uniforms.uMouse.value as THREE.Vector2;
    u.x += (mouse.current.x - u.x) * 0.02;
    u.y += (mouse.current.y - u.y) * 0.02;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function BackgroundScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 1] }}
    >
      <FluidPlane />
    </Canvas>
  );
}
