
import { useFrame } from "@react-three/fiber";
import Moon from "./Moon";
import Ring from "./Ring";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Text } from "@react-three/drei";
import { useRef, useState } from "react";

function Planet({
  name,
  position,
  color,
  texture,
  scale,
  rotationSpeed,
  orbitSpeed,
  hasMoon,
  hasRing,
}) {
  const planetRef = useRef();
  const orbitRef = useRef();

const textureMap = useLoader(TextureLoader, texture);
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
        
<meshStandardMaterial
    map={textureMap}
    color={hovered ? "#dddddd" : "white"}
/>
      </mesh>
  <Text
  position={[0, scale + 0.5, 0]}
  fontSize={0.2}
  color="white"
  anchorX="center"
  anchorY="middle"
>
  {name}
</Text>
      {hasRing && <Ring />}

      {hasMoon && <Moon />}

    </group>
  

  </group>
);
}
export default Planet;