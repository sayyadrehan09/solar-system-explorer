import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Sun({ position }) {
  const sunRef = useRef();

  const sunTexture = useLoader(
    TextureLoader,
    "/textures/sun.jpg"
  );

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh
      ref={sunRef}
      position={position}
    >
      <sphereGeometry args={[1.5, 64, 64]} />

      <meshStandardMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}

export default Sun;