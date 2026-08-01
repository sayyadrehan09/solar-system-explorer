import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Planet({ position, color, scale }) {
  const planetRef = useRef();
  const orbitRef = useRef();

 
  useFrame(() => {
  if (planetRef.current) {
    planetRef.current.rotation.y += 0.02;
  }

  if (orbitRef.current) {
    orbitRef.current.rotation.y += 0.005;
  }
});
return (
  <group ref={orbitRef}>
    <mesh
      ref={planetRef}
      position={position}
      scale={scale}
    >
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  </group>
);

export default Planet;