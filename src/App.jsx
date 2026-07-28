import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/Sun";
import Planet from "./components/Planet";

function App() {
  return (
    <Canvas>
  <ambientLight intensity={1} />

  <Sun position={[0, 0, 0]} />

  <Planet
    position={[4, 0, 0]}
    color="blue"
    scale={0.5}
  />

  <OrbitControls />
</Canvas>
  );
}

export default App;