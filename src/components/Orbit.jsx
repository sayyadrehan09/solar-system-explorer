function Orbit({ radius }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial
        color="white"
        wireframe
      />
    </mesh>
  );
}

export default Orbit;