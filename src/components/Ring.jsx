import { DoubleSide } from "three";

function Ring({ position }) {
  return (
    <mesh
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[1.1, 1.6, 64]} />
      <meshStandardMaterial
        color="khaki"
        side={DoubleSide}
      />
    </mesh>
  );
}

export default Ring;