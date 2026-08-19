import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import {
  AdditiveBlending,
  BackSide,
} from "three";

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
    <>
      {/* Main Sun */}
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


      {/* Sun Corona */}
      <mesh position={position}>
        <sphereGeometry args={[1.75, 64, 64]} />

        <meshBasicMaterial
          color="#ff8a00"
          transparent
          opacity={0.25}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default Sun;