import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/Sun";

function App() {
  return (
    <Canvas>
      <ambientLight intensity={1} />

      <Sun />

      <OrbitControls />
    </Canvas>
  );
}

export default App;