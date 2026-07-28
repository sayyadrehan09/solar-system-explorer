function Sun({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default Sun;