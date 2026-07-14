"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Fractal-noise fluid plane — the "eau" half of the plomberie/serrurerie
// theme. Drifts on its own and drifts further toward the pointer.
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
    for (int i = 0; i < 3; i++) {
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
    // Lower frequency flow: bigger, calmer swells instead of busy ripples.
    vec2 flow = aspectUv * 1.3 + mouseOffset;

    float t = uTime * 0.05;
    float n1 = fbm(flow + vec2(t, -t * 0.7));
    float n2 = fbm(flow * 1.8 - vec2(-t * 0.5, t * 0.9) + n1 * 0.6);
    // smoothstep compresses the blend range so light/dark patches fade into
    // each other gradually instead of mottling sharply ("broken ice" look).
    float fluid = smoothstep(0.15, 0.85, mix(n1, n2, 0.5));

    vec3 deep = vec3(0.008, 0.016, 0.04);
    vec3 water = vec3(0.02, 0.07, 0.11);
    vec3 base = mix(deep, water, fluid);

    float e = 0.02;
    float nx = fbm(flow + vec2(e, 0.0)) - fbm(flow - vec2(e, 0.0));
    float ny = fbm(flow + vec2(0.0, e)) - fbm(flow - vec2(0.0, e));
    vec2 grad = vec2(nx, ny) / (2.0 * e);

    vec3 lightDir = normalize(vec3(uMouse * 0.6, 1.0));
    // Wider, much fainter highlight: a soft sheen rather than scattered
    // sharp glints.
    float highlight = pow(clamp(dot(normalize(vec3(grad, 1.0)), lightDir), 0.0, 1.0), 10.0);

    vec3 metal = vec3(0.35, 0.65, 0.75);
    vec3 color = base + metal * highlight * 0.3;

    float vignette = smoothstep(1.15, 0.25, length(aspectUv));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidBackdrop() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
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

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uResolution.value.set(size.width, size.height);
    const u = material.uniforms.uMouse.value as THREE.Vector2;
    u.x += (state.pointer.x - u.x) * 0.02;
    u.y += (state.pointer.y - u.y) * 0.02;
  });

  return (
    <mesh position={[0, 0, -3]} scale={[viewport.width * 1.5, viewport.height * 1.5, 1]}>
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

export default function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <FluidBackdrop />
      {/* Scale/position keep every particle well clear of the very top of
          the frame (behind the fixed header) and the left/right edges, so
          none of them ever reads as a stray bright dot poking out of the
          section. */}
      <Sparkles count={40} scale={[6.5, 2.8, 4]} position={[0, -0.4, 0]} size={2} speed={0.25} color="#67e8f9" opacity={0.4} />

      <EffectComposer>
        <Bloom intensity={0.25} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
