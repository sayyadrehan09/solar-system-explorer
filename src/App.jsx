import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <Canvas>
    <OrbitControls />
    <ambientLight intensity={1} />
      <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}

export default App;