import { DoubleSide } from "three";

function Ring() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.8}>
      <ringGeometry args={[1.2, 1.8, 64]} />
      <meshStandardMaterial
        color="#d2b48c"
        side={DoubleSide}
      />
    </mesh>
  );
}

export default Ring;