import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/Sun";
import Planet from "./components/Planet";
  
function App() {
  return (
    <Canvas>
  <ambientLight intensity={1} />

  <Sun position={[0, 0, 0]} />

  
  //Mercury 
  <Planet
  position={[2,0,0]}
  color="gray"
  scale={0.2}
  rotationSpeed={0.01}
  orbitSpeed={0.03}
/>
//venus
<Planet
  position={[3,0,0]}
  color="yellow"
  scale={0.35}
  rotationSpeed={0.005}
  orbitSpeed={0.02}
/>
//Earth
<Planet
  position={[4,0,0]}
  color="blue"
  scale={0.5}
  rotationSpeed={0.02}
  orbitSpeed={0.01}
/>
//Mars
<Planet
  position={[6,0,0]}
  color="red"
  scale={0.4}
  rotationSpeed={0.015}
  orbitSpeed={0.008}
/>

  <OrbitControls />
</Canvas>
  );
}

export default App;