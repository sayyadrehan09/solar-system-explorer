import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AsteroidBelt({ paused = false, speedMultiplier = 1, count = 1600 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random positions, rotations, scales and rock colors once
  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      // Angular position around the Sun
      const angle = Math.random() * Math.PI * 2;

      // Distance between Mars (6.5) and Jupiter (11.5)
      // Realistic Asteroid Belt band centered at ~9.0
      const radius = 8.2 + Math.random() * 1.6;

      // Subtle vertical dispersion for 3D thickness
      const y = (Math.random() - 0.5) * 0.35;

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Random 3D tumble rotation for irregular asteroid look
      dummy.position.set(x, y, z);
      dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Varying sizes: mostly small pebbles with occasional larger chunks
      const scale = 0.015 + Math.random() * 0.035;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Realistic rock color variations (dark gray, brownish, silicate)
      const shade = 0.35 + Math.random() * 0.3;
      const rockColor = new THREE.Color(shade, shade * 0.95, shade * 0.9);
      meshRef.current.setColorAt(i, rockColor);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [count, dummy]);

  // Orbit rotation around the Sun
  useFrame(() => {
    if (!paused && meshRef.current) {
      meshRef.current.rotation.y += 0.0015 * speedMultiplier;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {/* 12-sided irregular polyhedron for realistic rock chunk appearance */}
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.85} metalness={0.15} />
    </instancedMesh>
  );
}

export default AsteroidBelt;
