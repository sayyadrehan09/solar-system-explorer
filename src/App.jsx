import { Canvas, useThree } from "@react-three/fiber";
import { useState } from "react";
import {
  OrbitControls,
  Stars,
  Html,
} from "@react-three/drei";

import Sun from "./components/Sun";
import Planet from "./components/Planet";
import planets from "./data/planets";
import Orbit from "./components/Orbit";


function CameraReset() {
  const { camera } = useThree();

  const resetCamera = () => {
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);
  };

  return (
    <Html fullscreen>
      <button
        onClick={resetCamera}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "white",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Reset Camera
      </button>
    </Html>
  );
}


function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <>
      <Canvas
        camera={{
          position: [0, 2, 6],
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
          <group key={planet.name}>

            <Orbit
              radius={planet.position[0]}
            />

            <Planet
              {...planet}
              onPlanetClick={setSelectedPlanet}
            />

          </group>
        ))}

        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          minDistance={4}
          maxDistance={20}
        />

        <CameraReset />

      </Canvas>


      {selectedPlanet && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "260px",
            background: "rgba(20, 20, 20, 0.9)",
            color: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >

          <h2>{selectedPlanet.name}</h2>

          <p>Radius: {selectedPlanet.radius}</p>

          <p>Distance: {selectedPlanet.distance}</p>

          <p>Moons: {selectedPlanet.moons}</p>

          <p>Year: {selectedPlanet.orbitalPeriod}</p>

        </div>
      )}

    </>
  );
}

export default App;