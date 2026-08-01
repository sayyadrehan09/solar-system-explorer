import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Planet({
  position,
  color,
  scale,
  rotationSpeed,
  orbitSpeed,
}) {
  const planetRef = useRef();
  const orbitRef = useRef();

 
  useFrame(() => {
  if (planetRef.current) {
  planetRef.current.rotation.y+=rotationSpeed;
  }

  if (orbitRef.current) {
    orbitRef.current.rotation.y += orbitSpeed;
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
}
export default Planet;