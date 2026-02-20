'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { seededRandom } from '@/hooks/useVisitorFingerprint';

// ============================================
// FLOATING GEOMETRIC NODE
// ============================================
interface NodeProps {
  position: [number, number, number];
  geometry: 'icosahedron' | 'octahedron' | 'torus' | 'dodecahedron' | 'sphere';
  color: string;
  scale: number;
  speed: number;
  distort: number;
  floatIntensity: number;
}

function GeometricNode({
  position,
  geometry,
  color,
  scale,
  speed,
  distort,
  floatIntensity,
}: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;

    if (glowRef.current) {
      glowRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      glowRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  const Geometry = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.5}
      floatIntensity={floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <group position={position} scale={scale}>
        {/* Main mesh */}
        <mesh ref={meshRef}>
          {Geometry}
          <MeshDistortMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            distort={distort}
            speed={speed}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={glowRef} scale={1.02}>
          {Geometry}
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ============================================
// CONNECTING LINES BETWEEN NODES
// ============================================
interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

function ConnectionLine({ start, end, color }: ConnectionProps) {
  const ref = useRef<THREE.Mesh>(null);

  const { midpoint, length, rotation } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = new THREE.Vector3().addVectors(s, e).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(e, s);
    const len = dir.length();

    // Calculate rotation to align cylinder between points
    const orientation = new THREE.Matrix4();
    orientation.lookAt(s, e, new THREE.Vector3(0, 1, 0));
    const euler = new THREE.Euler().setFromRotationMatrix(orientation);

    return { midpoint: mid, length: len, rotation: euler };
  }, [start, end]);

  useFrame((state) => {
    if (!ref.current) return;
    const material = ref.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });

  return (
    <mesh
      ref={ref}
      position={[midpoint.x, midpoint.y, midpoint.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <cylinderGeometry args={[0.003, 0.003, length, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

// ============================================
// FLOATING PARTICLES
// ============================================
function Particles({ count = 200, seed = 42, color = '#00d4ff' }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rng = seededRandom(seed + 999);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rng() - 0.5) * 20;
      pos[i * 3 + 1] = (rng() - 0.5) * 20;
      pos[i * 3 + 2] = (rng() - 0.5) * 20;
    }
    return pos;
  }, [count, seed]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ============================================
// MOUSE-REACTIVE CAMERA RIG
// ============================================
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const targetX = mouse.current.x * 0.8;
    const targetY = -mouse.current.y * 0.5;
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ============================================
// CENTRAL PULSING CORE
// ============================================
function CentralCore({ color = '#00d4ff' }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.setScalar(pulse);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      {/* Glow */}
      <mesh scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} />
      </mesh>
      {/* Orbiting ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.6, 0.01, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.8, 0.008, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// ============================================
// MAIN SCENE COMPOSITION
// ============================================
interface SceneProps {
  seed: number;
  accentColor: string;
  secondaryColor: string;
}

function Scene({ seed, accentColor, secondaryColor }: SceneProps) {
  const rng = useMemo(() => seededRandom(seed), [seed]);

  // Generate unique node configurations based on visitor seed
  const nodes = useMemo(() => {
    const geometries: NodeProps['geometry'][] = [
      'icosahedron',
      'octahedron',
      'torus',
      'dodecahedron',
      'sphere',
    ];

    const nodeCount = 6 + Math.floor(rng() * 3); // 6-8 nodes
    const generated: NodeProps[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + rng() * 0.5;
      const radius = 2.5 + rng() * 2;
      const yOffset = (rng() - 0.5) * 3;

      generated.push({
        position: [
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius - 2,
        ] as [number, number, number],
        geometry: geometries[Math.floor(rng() * geometries.length)],
        color: rng() > 0.5 ? accentColor : secondaryColor,
        scale: 0.2 + rng() * 0.35,
        speed: 0.3 + rng() * 0.7,
        distort: 0.1 + rng() * 0.3,
        floatIntensity: 0.5 + rng() * 1.5,
      });
    }

    return generated;
  }, [rng, accentColor, secondaryColor]);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const conns: ConnectionProps[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          Math.pow(nodes[i].position[0] - nodes[j].position[0], 2) +
            Math.pow(nodes[i].position[1] - nodes[j].position[1], 2) +
            Math.pow(nodes[i].position[2] - nodes[j].position[2], 2)
        );
        if (dist < 4.5 && rng() > 0.3) {
          conns.push({
            start: nodes[i].position,
            end: nodes[j].position,
            color: accentColor,
          });
        }
      }
    }
    return conns;
  }, [nodes, rng, accentColor]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={accentColor} />
      <pointLight position={[-5, -3, -5]} intensity={0.4} color={secondaryColor} />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#ffffff" />

      {/* Stars background */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Central core */}
      <CentralCore color={accentColor} />

      {/* Geometric nodes */}
      {nodes.map((node, i) => (
        <GeometricNode key={`node-${i}`} {...node} />
      ))}

      {/* Connection lines */}
      {connections.map((conn, i) => (
        <ConnectionLine key={`conn-${i}`} {...conn} />
      ))}

      {/* Floating particles */}
      <Particles seed={seed} color={accentColor} count={300} />

      {/* Camera rig for mouse reactivity */}
      <CameraRig />
    </>
  );
}

// ============================================
// EXPORTED CANVAS WRAPPER
// ============================================
interface HeroSceneProps {
  seed: number;
  accentColor?: string;
  secondaryColor?: string;
}

export default function HeroScene({
  seed,
  accentColor = '#00d4ff',
  secondaryColor = '#7b61ff',
}: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
    >
      <Scene
        seed={seed}
        accentColor={accentColor}
        secondaryColor={secondaryColor}
      />
    </Canvas>
  );
}
