function Planet({ position, color, scale }) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Planet;