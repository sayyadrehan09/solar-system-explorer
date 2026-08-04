import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Moon() {
  const moonRef = useRef();
  const orbitRef = useRef();

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
        <sphereGeometry />
       <meshStandardMaterial color="lightgray" />
      </mesh>
    </group>
  );
}

export default Moon;