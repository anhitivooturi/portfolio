'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type SceneProps = { pointer: React.MutableRefObject<{ x: number; y: number }> };

function Network({ pointer }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const { points, links } = useMemo(() => {
    const count = 132;
    let seed = 19;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const vertices = Array.from({ length: count }, () => {
      const theta = random() * Math.PI * 2;
      const z = random() * 2 - 1;
      const radius = Math.sqrt(1 - z * z) * (0.5 + random() * 0.5);
      return new THREE.Vector3(Math.cos(theta) * radius * 2.65, z * radius * 2.25, Math.sin(theta) * radius * 1.2);
    });
    const linePositions: number[] = [];
    for (let i = 0; i < vertices.length; i++) {
      const neighbors = vertices.map((position, index) => ({ index, distance: vertices[i].distanceTo(position) }))
        .filter((entry) => entry.index !== i)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4);
      for (const neighbor of neighbors) {
        if (neighbor.index < i || neighbor.distance > 1.16) continue;
        linePositions.push(...vertices[i].toArray(), ...vertices[neighbor.index].toArray());
      }
    }
    return { points: new Float32Array(vertices.flatMap((point) => point.toArray())), links: new Float32Array(linePositions) };
  }, []);

  useFrame(({ clock, camera }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y += 0.0011;
    group.current.rotation.y += (pointer.current.x * 0.23 - group.current.rotation.y) * 0.008;
    group.current.rotation.x += ((-pointer.current.y * 0.12 + Math.sin(t * 0.18) * 0.06) - group.current.rotation.x) * 0.018;
    camera.position.x += (pointer.current.x * 0.2 - camera.position.x) * 0.015;
    camera.position.y += (-pointer.current.y * 0.16 - camera.position.y) * 0.015;
  });

  return <group ref={group}>
    <lineSegments>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[links, 3]}/></bufferGeometry>
      <lineBasicMaterial color="#22D3EE" transparent opacity={0.31} depthWrite={false} blending={THREE.AdditiveBlending}/>
    </lineSegments>
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]}/></bufferGeometry>
      <pointsMaterial color="#A9F5FF" size={0.046} sizeAttenuation transparent opacity={0.96} depthWrite={false} blending={THREE.AdditiveBlending}/>
    </points>
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.055, 14, 14]}/>
      <meshBasicMaterial color="#FFFFFF"/>
    </mesh>
    <pointLight color="#22D3EE" intensity={1.2} distance={5}/>
  </group>;
}

export default function NeuralHero({ pointer }: SceneProps) {
  return <Canvas camera={{ position: [0, 0, 7.2], fov: 46 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={0.55}/><Network pointer={pointer}/>
  </Canvas>;
}
