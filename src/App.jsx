import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

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


function CameraController({ selectedPlanet, controlsRef }) {
  const { camera } = useThree();
  const targetPosition = useRef(null);

  useFrame(() => {
    if (!targetPosition.current) return;

    camera.position.lerp(
      targetPosition.current,
      0.05
    );

    if (controlsRef.current) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(
          targetPosition.current.x,
          targetPosition.current.y - 2,
          targetPosition.current.z - 5
        ),
        0.05
      );

      controlsRef.current.update();
    }
  });

  const focusPlanet = () => {
    if (!selectedPlanet?.position) return;

    const [x, y, z] = selectedPlanet.position;

    targetPosition.current = new THREE.Vector3(
      x,
      y + 2,
      z + 5
    );
  };

  return (
    <Html fullscreen>
      {selectedPlanet && (
        <button
          onClick={focusPlanet}
          style={{
            position: "absolute",
            top: "300px",
            right: "40px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "white",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Focus Planet
        </button>
      )}
    </Html>
  );
}


function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [paused, setPaused] = useState(false);

  const controlsRef = useRef();

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
              showLabel={showLabels}
              paused={paused}
            />

          </group>
        ))}

        <OrbitControls
          ref={controlsRef}
          target={[0, 0, 0]}
          enablePan={false}
          minDistance={4}
          maxDistance={20}
        />

        <CameraReset />

        <CameraController
          selectedPlanet={selectedPlanet}
          controlsRef={controlsRef}
        />

      </Canvas>


      {/* LABEL TOGGLE */}

      <button
        onClick={() => setShowLabels(!showLabels)}
        style={{
          position: "absolute",
          top: 30,
          left: 20,
          zIndex: 10,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {showLabels ? "Hide Labels" : "Show Labels"}
      </button>


      {/* PAUSE / RESUME */}

      <button
        onClick={() => setPaused(!paused)}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {paused ? "▶ Resume" : "⏸ Pause"}
      </button>


      {/* PLANET INFORMATION */}

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