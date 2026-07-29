import { useRef } from "react";
const planetRef = useRef();
function Planet({ position, color, scale }) {
  return (
    <mesh
     ref={planetRef}
     position={position} scale={scale}>
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Planet;