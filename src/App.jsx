import { Canvas } from "@react-three/fiber";

import Sun from "./components/Sun";
import Planet from "./components/Planet";
import planets from "./data/planets";
import { OrbitControls, Stars } from "@react-three/drei";
  
function App() {
  return (
   <Canvas>

  <ambientLight intensity={1} />

  <Stars
    radius={300}
    depth={80}
    count={1800}
    factor={5}
    fade
/>

  <Sun position={[0, 0, 0]} />

  {planets.map((planet) => (
    <Planet
  key={planet.name}
  name={planet.name}
  position={planet.position}
  color={planet.color}
  scale={planet.scale}
  rotationSpeed={planet.rotationSpeed}
  orbitSpeed={planet.orbitSpeed}
  hasMoon={planet.hasMoon}
  hasRing={planet.hasRing}
  texture={planet.texture}
/>
  ))}

  <OrbitControls />

</Canvas>
  );
}

export default App;