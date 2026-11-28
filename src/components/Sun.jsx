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

        <meshBasicMaterial
          map={sunTexture}
        />
      </mesh>


      {/* Sun Corona */}
      <mesh position={position}>
        <sphereGeometry args={[1.85, 64, 64]} />

        <meshBasicMaterial
          color="#ffaa33"
          transparent
          opacity={0.35}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export default Sun;