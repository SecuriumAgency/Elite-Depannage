"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial, Sparkles } from "@react-three/drei";
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

    float t = uTime * 0.05;
    float n1 = fbm(flow + vec2(t, -t * 0.7));
    float n2 = fbm(flow * 1.8 - vec2(-t * 0.5, t * 0.9) + n1 * 0.6);
    float fluid = mix(n1, n2, 0.5);

    vec3 deep = vec3(0.008, 0.016, 0.04);
    vec3 water = vec3(0.02, 0.08, 0.13);
    vec3 base = mix(deep, water, fluid);

    float e = 0.01;
    float nx = fbm(flow + vec2(e, 0.0)) - fbm(flow - vec2(e, 0.0));
    float ny = fbm(flow + vec2(0.0, e)) - fbm(flow - vec2(0.0, e));
    vec2 grad = vec2(nx, ny) / (2.0 * e);

    vec3 lightDir = normalize(vec3(uMouse * 0.6, 1.0));
    float highlight = pow(clamp(dot(normalize(vec3(grad, 1.0)), lightDir), 0.0, 1.0), 6.0);

    vec3 metal = vec3(0.4, 0.75, 0.85);
    vec3 color = base + metal * highlight * 0.7;

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

// The "métal/serrurerie" half: a distorted, high-metalness core that drifts
// toward the pointer for a soft parallax feel — abstract rather than a
// literal key/lock model, which would need real geometry authoring.
function MetallicCore() {
  const groupRef = useRef<THREE.Group>(null);
  const spin = useRef(0);

  useFrame((state, delta) => {
    spin.current += delta * 0.12;
    const group = groupRef.current;
    if (!group) return;
    const { pointer } = state;
    group.rotation.y = spin.current + pointer.x * 0.25;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, pointer.y * 0.15, 0.05);
    group.position.x = THREE.MathUtils.lerp(group.position.x, pointer.x * 0.35, 0.03);
    group.position.y = THREE.MathUtils.lerp(group.position.y, pointer.y * 0.2, 0.03);
  });

  return (
    // Offset to the side and pushed back so it reads as a depth accent
    // beside the headline rather than a giant shape blocking it.
    <group ref={groupRef} position={[2.4, -0.3, -1]}>
      <mesh>
        <icosahedronGeometry args={[0.85, 16]} />
        <MeshDistortMaterial
          color="#134e5e"
          metalness={0.85}
          roughness={0.25}
          distort={0.3}
          speed={1.3}
        />
      </mesh>
    </group>
  );
}

// Procedural studio lighting for the metallic core's reflections — built
// entirely from in-scene light panels (no external HDRI fetch), keeping
// this a zero-network-request enhancement.
function StudioEnvironment() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" color="#06b6d4" intensity={4} position={[-3, 2, 2]} scale={[3, 3, 1]} />
      <Lightformer form="rect" color="#38bdf8" intensity={2.5} position={[3, -1, 1]} scale={[2, 4, 1]} />
      <Lightformer form="ring" color="#e0f2fe" intensity={1.5} position={[0, 3, -2]} scale={4} />
    </Environment>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={0.5} color="#e0f2fe" />
      <pointLight position={[-3, 1, 3]} intensity={14} color="#06b6d4" />
      <pointLight position={[3, -1, 2]} intensity={10} color="#1d4ed8" />

      <StudioEnvironment />
      <FluidBackdrop />
      <MetallicCore />
      <Sparkles count={60} scale={[8, 5, 4]} size={2.5} speed={0.3} color="#67e8f9" opacity={0.5} />

      <EffectComposer>
        <Bloom intensity={0.3} luminanceThreshold={0.3} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
