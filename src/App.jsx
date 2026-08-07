import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";

import Sun from "./components/Sun";
import Planet from "./components/Planet";
import planets from "./data/planets";
import Orbit from "./components/Orbit";

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <>
      <Canvas
        camera={{
          position: [0, 2, 8],
          fov: 75,
        }}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <ambientLight intensity={2} />

        <pointLight
          position={[0, 0, 0]}
          intensity={80}
        />

        <Stars
          radius={200}
          depth={80}
          count={5000}
          factor={4}
          fade
        />

       <Sun position={[0, 0, 0]} />

{planets.map((planet) => (
  <>
    <Orbit
      key={`${planet.name}-orbit`}
      radius={planet.position[0]}
    />

    <Planet
      key={planet.name}
      {...planet}
      onPlanetClick={setSelectedPlanet}
    />
  </>
))}

        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          minDistance={4}
          maxDistance={20}
        />
      </Canvas>

      {selectedPlanet && (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 260,
            background: "rgba(20,20,20,.9)",
            color: "white",
            padding: 20,
            borderRadius: 12,
          }}
        >
          <h2>{selectedPlanet.name}</h2>

          <p>Radius : {selectedPlanet.radius}</p>
          <p>Distance : {selectedPlanet.distance}</p>
          <p>Moons : {selectedPlanet.moons}</p>
          <p>Year : {selectedPlanet.orbitalPeriod}</p>
        </div>
      )}
    </>
  );
}

export default App;