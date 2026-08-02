import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";
import Ring from "./Ring";
function Planet({
  position,
  color,
  scale,
  rotationSpeed,
  orbitSpeed,
  hasMoon,
  hasRing,
}){
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
    {hasRing && <Ring />}
    {hasMoon && <Moon />}
  </group>
);
}
export default Planet;