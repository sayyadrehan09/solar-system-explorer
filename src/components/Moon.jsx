import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Moon() {
  const moonRef = useRef();
  const orbitRef = useRef();

  const moonTexture = useLoader(TextureLoader, "/textures/moon.jpg");

  useFrame(() => {
    if (moonRef.current)
      moonRef.current.rotation.y += 0.02;

    if (orbitRef.current)
      orbitRef.current.rotation.y += 0.03;
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={moonRef}
        position={[1, 0, 0]}
        scale={0.2}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={moonTexture} roughness={0.8} />
      </mesh>
    </group>
  );
}

export default Moon;