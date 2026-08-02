import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Sun from "./components/Sun";
import Planet from "./components/Planet";
import planets from "./data/planets";
  
function App() {
  return (
    <Canvas>
  <ambientLight intensity={1} />

  <Sun position={[0, 0, 0]} />

  {planets.map((planet) => (
  <Planet
  key={planet.name}
  position={planet.position}
  color={planet.color}
  scale={planet.scale}
  rotationSpeed={planet.rotationSpeed}
  orbitSpeed={planet.orbitSpeed}
  hasMoon={planet.hasMoon}
  hasRing={planet.hasRing}   
/>
))}


  <OrbitControls />
</Canvas>
  );
}

export default App;