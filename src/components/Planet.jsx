
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";
import Ring from "./Ring";

import { useRef, useState } from "react";

function Planet({
  name,
  position,
  color,
  scale,
  rotationSpeed,
  orbitSpeed,
  hasMoon,
  hasRing,
}) {
  const planetRef = useRef();
  const orbitRef = useRef();


const [hovered, setHovered] = useState(false);
 
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

    <group position={position}>

      <mesh
        ref={planetRef}
        scale={scale}
        onClick={() =>{
          console.log(name);
        }}
      onPointerOver={() => {
  setHovered(true);
  document.body.style.cursor = "pointer";
}}

onPointerOut={() => {
  setHovered(false);
  document.body.style.cursor = "default";
}}
      >
        <sphereGeometry />
        
<meshStandardMaterial color={hovered ? "white" : color} />
      </mesh>

      {hasRing && <Ring />}

      {hasMoon && <Moon />}

    </group>

  </group>
);
}
export default Planet;