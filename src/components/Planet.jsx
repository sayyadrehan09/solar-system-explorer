import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Text } from "@react-three/drei";

import Moon from "./Moon";
import Ring from "./Ring";

function Planet({
  name,
  texture,
  position,
  scale,
  rotationSpeed,
  orbitSpeed,
  hasMoon,
  hasRing,
  radius,
  distance,
  orbitalPeriod,
  moons,
  onPlanetClick,
}) {
  const planetRef = useRef();
  const orbitRef = useRef();

  const textureMap = useLoader(TextureLoader, texture);

  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (planetRef.current)
      planetRef.current.rotation.y += rotationSpeed;

    if (orbitRef.current)
      orbitRef.current.rotation.y += orbitSpeed;
  });

  return (
    <group ref={orbitRef}>
      <group position={position}>
        <mesh
          ref={planetRef}
          scale={scale}
          onClick={() =>
            onPlanetClick({
              name,
              radius,
              distance,
              orbitalPeriod,
              moons,
            })
          }
          onPointerOver={() => {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
        >
          <sphereGeometry args={[1, 64, 64]} />

          <meshStandardMaterial
            map={textureMap}
            color={hovered ? "#dddddd" : "white"}
          />
        </mesh>

        {hasRing && <Ring />}

        {hasMoon && <Moon />}

        <Text
          position={[0, scale + 1, 0]}
          fontSize={0.25}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </group>
    </group>
  );
}

export default Planet;