import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

import {
  OrbitControls,
  Stars,
} from "@react-three/drei";

import Sun from "./components/Sun";
import Planet from "./components/Planet";
import planets from "./data/planets";
import Orbit from "./components/Orbit";


function CameraController({
  selectedPlanetRef,
  controlsRef,
  focusRequest,
  resetRequest,
  selectionRequest,
}) {
  const { camera } = useThree();

  const targetPosition = useRef(null);

  const targetLookAt = useRef(
    new THREE.Vector3(0, 0, 0)
  );

  const followingPlanet = useRef(false);

  const lastFocusRequest =
    useRef(focusRequest);

  const lastResetRequest =
    useRef(resetRequest);

  const lastSelectionRequest =
    useRef(selectionRequest);


  useFrame(() => {

    // DESELECT PLANET

    if (
      selectionRequest !==
      lastSelectionRequest.current
    ) {
      lastSelectionRequest.current =
        selectionRequest;

      followingPlanet.current = false;
      targetPosition.current = null;
    }


    // FOCUS PLANET

    if (
      focusRequest !==
      lastFocusRequest.current
    ) {
      lastFocusRequest.current =
        focusRequest;

      if (selectedPlanetRef.current) {

        const planetPosition =
          new THREE.Vector3();

        selectedPlanetRef.current.getWorldPosition(
          planetPosition
        );

        targetPosition.current =
          new THREE.Vector3(
            planetPosition.x,
            planetPosition.y + 2,
            planetPosition.z + 5
          );

        targetLookAt.current.copy(
          planetPosition
        );

        followingPlanet.current = true;
      }
    }


    // RESET CAMERA

    if (
      resetRequest !==
      lastResetRequest.current
    ) {
      lastResetRequest.current =
        resetRequest;

      targetPosition.current =
        new THREE.Vector3(
          0,
          2,
          6
        );

      targetLookAt.current.set(
        0,
        0,
        0
      );

      followingPlanet.current = false;
    }


    // FOLLOW PLANET

    if (
      followingPlanet.current &&
      selectedPlanetRef.current
    ) {

      const planetPosition =
        new THREE.Vector3();

      selectedPlanetRef.current.getWorldPosition(
        planetPosition
      );

      targetPosition.current.set(
        planetPosition.x,
        planetPosition.y + 2,
        planetPosition.z + 5
      );

      targetLookAt.current.copy(
        planetPosition
      );
    }


    // MOVE CAMERA

    if (targetPosition.current) {

      camera.position.lerp(
        targetPosition.current,
        0.05
      );

      if (controlsRef.current) {

        controlsRef.current.target.lerp(
          targetLookAt.current,
          0.05
        );

        controlsRef.current.update();
      }
    }
  });

  return null;
}


function App() {

  const [selectedPlanet, setSelectedPlanet] =
    useState(null);

  const [showLabels, setShowLabels] =
    useState(true);

  const [paused, setPaused] =
    useState(false);

  const [speedMultiplier, setSpeedMultiplier] =
    useState(1);

  const [focusRequest, setFocusRequest] =
    useState(0);

  const [resetRequest, setResetRequest] =
    useState(0);

  const [selectionRequest, setSelectionRequest] =
    useState(0);

  // SOUND

  const [soundEnabled, setSoundEnabled] =
    useState(false);

  // ⭐ COMPARE PLANETS

  const [comparePlanets, setComparePlanets] =
    useState([]);


  const planetRefs =
    useRef({});

  const selectedPlanetRef =
    useRef(null);

  const controlsRef =
    useRef();

  const audioRef =
    useRef(null);

  const [search, setSearch] =
    useState("");


  // CREATE AUDIO

  useEffect(() => {

    audioRef.current =
      new Audio("/sounds/space.mp3");

    audioRef.current.loop = true;

    audioRef.current.volume = 0.3;

    return () => {
      audioRef.current?.pause();
    };

  }, []);


  // SOUND TOGGLE

  const toggleSound = () => {

    if (!audioRef.current) {
      return;
    }

    if (soundEnabled) {

      audioRef.current.pause();

      setSoundEnabled(false);

    } else {

      audioRef.current
        .play()
        .then(() => {
          setSoundEnabled(true);
        })
        .catch((error) => {
          console.log(
            "Audio could not play:",
            error
          );
        });

    }
  };


  // PLANET SELECTION

  const handlePlanetClick = (planetData) => {

    if (
      selectedPlanet?.name ===
      planetData.name
    ) {

      setSelectedPlanet(null);

      selectedPlanetRef.current =
        null;

      setSelectionRequest(
        (previous) =>
          previous + 1
      );

      return;
    }

    setSelectedPlanet(
      planetData
    );

    selectedPlanetRef.current =
      planetData.ref;
  };


  // FOCUS PLANET

  const handleFocusPlanet = () => {

    setFocusRequest(
      (previous) =>
        previous + 1
    );
  };


  // RESET CAMERA

  const handleResetCamera = () => {

    setResetRequest(
      (previous) =>
        previous + 1
    );

    setSelectedPlanet(null);

    selectedPlanetRef.current =
      null;

    setSelectionRequest(
      (previous) =>
        previous + 1
    );
  };


  // SEARCH

  const filteredPlanets =
    planets.filter((planet) =>
      planet.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  // ⭐ ADD PLANET TO COMPARE

  const handleCompare = () => {

    if (!selectedPlanet) {
      return;
    }

    setComparePlanets(
      (previous) => {

        // Already added
        if (
          previous.some(
            (planet) =>
              planet.name ===
              selectedPlanet.name
          )
        ) {
          return previous;
        }

        // If there are already
        // two planets, replace
        // the first one

        if (previous.length >= 2) {
          return [
            previous[1],
            selectedPlanet
          ];
        }

        return [
          ...previous,
          selectedPlanet
        ];
      }
    );
  };


  // ⭐ REMOVE PLANET FROM COMPARISON

  const removeFromCompare = (planetName) => {

    setComparePlanets(
      (previous) =>
        previous.filter(
          (planet) =>
            planet.name !==
            planetName
        )
    );
  };


  return (
    <>

      {/* =========================
          3D SOLAR SYSTEM
      ========================= */}

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

        <ambientLight
          intensity={2}
        />

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


        <Sun
          position={[0, 0, 0]}
        />


        {/* PLANETS */}

        {planets.map((planet) => (

          <group
            key={planet.name}
          >

            <Orbit
              radius={
                planet.position[0]
              }
            />


            <Planet
              {...planet}

              onPlanetClick={
                handlePlanetClick
              }

              showLabel={
                showLabels
              }

              paused={
                paused
              }

              speedMultiplier={
                speedMultiplier
              }

              registerRef={(ref) => {
                planetRefs.current[
                  planet.name
                ] = ref;
              }}

              selected={
                selectedPlanet?.name ===
                planet.name
              }
            />

          </group>

        ))}


        {/* CAMERA */}

        <OrbitControls
          ref={controlsRef}
          target={[0, 0, 0]}
          enablePan={false}
          minDistance={4}
          maxDistance={20}
        />


        <CameraController
          selectedPlanetRef={
            selectedPlanetRef
          }

          controlsRef={
            controlsRef
          }

          focusRequest={
            focusRequest
          }

          resetRequest={
            resetRequest
          }

          selectionRequest={
            selectionRequest
          }
        />

      </Canvas>


      {/* =========================
          RESET CAMERA
      ========================= */}

      <button
        onClick={
          handleResetCamera
        }
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,

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


      {/* =========================
          LABELS
      ========================= */}

      <button
        onClick={() =>
          setShowLabels(
            !showLabels
          )
        }
        style={{
          position: "absolute",
          top: 70,
          left: 20,
          zIndex: 10,

          padding: "10px 16px",

          borderRadius: "8px",
          border: "none",

          cursor: "pointer",
        }}
      >
        {showLabels
          ? "Hide Labels"
          : "Show Labels"}
      </button>


      {/* =========================
          PAUSE
      ========================= */}

      <button
        onClick={() =>
          setPaused(!paused)
        }
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
        {paused
          ? "▶ Resume"
          : "⏸ Pause"}
      </button>


      {/* =========================
          SPEED
      ========================= */}

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 130,
          zIndex: 10,

          display: "flex",
          alignItems: "center",
          gap: "8px",

          background:
            "rgba(20, 20, 20, 0.85)",

          color: "white",

          padding: "8px 12px",

          borderRadius: "8px",
        }}
      >

        <label>
          Speed
        </label>


        <select
          value={speedMultiplier}
          onChange={(event) =>
            setSpeedMultiplier(
              Number(
                event.target.value
              )
            )
          }
          style={{
            padding: "6px 8px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >

          <option value={0.25}>
            0.25x
          </option>

          <option value={0.5}>
            0.5x
          </option>

          <option value={1}>
            1x
          </option>

          <option value={2}>
            2x
          </option>

          <option value={3}>
            3x
          </option>

          <option value={4}>
            4x
          </option>

          <option value={5}>
            5x
          </option>

        </select>

      </div>


      {/* =========================
          SOUND
      ========================= */}

      <button
        onClick={toggleSound}
        style={{
          position: "absolute",
          bottom: 20,
          left: 300,
          zIndex: 10,

          padding: "10px 16px",

          borderRadius: "8px",
          border: "none",

          cursor: "pointer",

          fontWeight: "bold",
        }}
      >
        {soundEnabled
          ? "🔊 Sound ON"
          : "🔇 Sound OFF"}
      </button>


      {/* =========================
          SEARCH
      ========================= */}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "160px",
          zIndex: 10,
        }}
      >

        <input
          type="text"
          placeholder="Search planet..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            width: "200px",
          }}
        />


        {search && (

          <button
            onClick={() =>
              setSearch("")
            }
            style={{
              marginLeft: "5px",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>

        )}


        {search && (

          <div
            style={{
              marginTop: "5px",
              width: "228px",

              background:
                "rgba(20, 20, 20, 0.95)",

              borderRadius: "8px",
              overflow: "hidden",
            }}
          >

            {filteredPlanets.length >
            0 ? (

              filteredPlanets.map(
                (planet) => (

                  <button
                    key={planet.name}

                    onClick={() => {

                      const planetRef =
                        planetRefs.current[
                          planet.name
                        ];


                      if (planetRef) {

                        const worldPosition =
                          planetRef.getWorldPosition(
                            new THREE.Vector3()
                          );


                        const planetData = {
                          ...planet,

                          position: [
                            worldPosition.x,
                            worldPosition.y,
                            worldPosition.z,
                          ],

                          ref: planetRef,
                        };


                        setSelectedPlanet(
                          planetData
                        );

                        selectedPlanetRef.current =
                          planetRef;
                      }


                      setSearch("");

                    }}

                    style={{
                      display: "block",
                      width: "100%",

                      padding:
                        "10px 12px",

                      border: "none",

                      background:
                        "transparent",

                      color: "white",

                      textAlign: "left",

                      cursor: "pointer",
                    }}
                  >
                    {planet.name}
                  </button>

                )
              )

            ) : (

              <div
                style={{
                  padding:
                    "10px 12px",
                  color: "gray",
                }}
              >
                No planet found
              </div>

            )}

          </div>

        )}

      </div>


      {/* =========================
          SELECTED PLANET
      ========================= */}

      {selectedPlanet && (

        <div
          style={{
            position: "absolute",

            top: "70px",
            left: "160px",

            zIndex: 10,

            background:
              "rgba(20, 20, 20, 0.85)",

            color: "white",

            padding: "8px 12px",

            borderRadius: "8px",
          }}
        >
          Selected:{" "}
          {selectedPlanet.name}
        </div>

      )}


      {/* =========================
          PLANET INFORMATION
      ========================= */}

      {selectedPlanet && (

        <div
          style={{
            position: "absolute",

            top: "20px",
            right: "20px",

            width: "260px",

            background:
              "rgba(20, 20, 20, 0.9)",

            color: "white",

            padding: "20px",

            borderRadius: "12px",

            zIndex: 10,
          }}
        >

          {/* CLOSE */}

          <button
            onClick={() => {

              setSelectedPlanet(null);

              selectedPlanetRef.current =
                null;

              setSelectionRequest(
                (previous) =>
                  previous + 1
              );

            }}

            style={{
              position: "absolute",
              top: "10px",
              right: "10px",

              border: "none",

              background:
                "transparent",

              color: "white",

              fontSize: "20px",

              cursor: "pointer",
            }}
          >
            ✕
          </button>


          <h2>
            {selectedPlanet.name}
          </h2>


          <p>
            Radius:{" "}
            {selectedPlanet.radius}
          </p>


          <p>
            Distance:{" "}
            {selectedPlanet.distance}
          </p>


          <p>
            Moons:{" "}
            {selectedPlanet.moons}
          </p>


          <p>
            Year:{" "}
            {selectedPlanet.orbitalPeriod}
          </p>


          {/* FOCUS */}

          <button
            onClick={
              handleFocusPlanet
            }
            style={{
              marginTop: "10px",

              padding: "10px 16px",

              borderRadius: "8px",

              border: "none",

              cursor: "pointer",

              fontWeight: "bold",
            }}
          >
            Focus Planet
          </button>


          {/* ⭐ COMPARE */}

          <button
            onClick={
              handleCompare
            }
            style={{
              marginTop: "10px",

              marginLeft: "5px",

              padding: "10px 12px",

              borderRadius: "8px",

              border: "none",

              cursor: "pointer",

              fontWeight: "bold",
            }}
          >
            ⭐ Compare
          </button>

        </div>

      )}


      {/* =========================
          ⭐ COMPARISON PANEL
      ========================= */}

      {comparePlanets.length > 0 && (

        <div
          style={{
            position: "absolute",

            bottom: "20px",
            right: "20px",

            width: "420px",

            background:
              "rgba(20, 20, 20, 0.95)",

            color: "white",

            padding: "18px",

            borderRadius: "12px",

            zIndex: 10,
          }}
        >

          <h2
            style={{
              marginTop: 0,
            }}
          >
            ⭐ Planet Comparison
          </h2>


          {comparePlanets.length === 1 && (

            <p
              style={{
                color: "#aaa",
              }}
            >
              Add one more planet to
              compare.
            </p>

          )}


          {comparePlanets.length === 2 && (

            <div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "100px 1fr 1fr",
                  gap: "8px",
                  alignItems: "center",
                }}
              >

                <strong>
                  Stat
                </strong>

                <strong>
                  {
                    comparePlanets[0]
                      .name
                  }
                </strong>

                <strong>
                  {
                    comparePlanets[1]
                      .name
                  }
                </strong>


                <span>
                  Radius
                </span>

                <span>
                  {
                    comparePlanets[0]
                      .radius
                  }
                </span>

                <span>
                  {
                    comparePlanets[1]
                      .radius
                  }
                </span>


                <span>
                  Distance
                </span>

                <span>
                  {
                    comparePlanets[0]
                      .distance
                  }
                </span>

                <span>
                  {
                    comparePlanets[1]
                      .distance
                  }
                </span>


                <span>
                  Moons
                </span>

                <span>
                  {
                    comparePlanets[0]
                      .moons
                  }
                </span>

                <span>
                  {
                    comparePlanets[1]
                      .moons
                  }
                </span>


                <span>
                  Year
                </span>

                <span>
                  {
                    comparePlanets[0]
                      .orbitalPeriod
                  }
                </span>

                <span>
                  {
                    comparePlanets[1]
                      .orbitalPeriod
                  }
                </span>

              </div>


              <div
                style={{
                  marginTop: "15px",

                  display: "flex",

                  gap: "8px",
                }}
              >

                <button
                  onClick={() =>
                    removeFromCompare(
                      comparePlanets[0]
                        .name
                    )
                  }
                  style={{
                    padding:
                      "7px 10px",

                    border: "none",

                    borderRadius: "6px",

                    cursor: "pointer",
                  }}
                >
                  Remove{" "}
                  {
                    comparePlanets[0]
                      .name
                  }
                </button>


                <button
                  onClick={() =>
                    removeFromCompare(
                      comparePlanets[1]
                        .name
                    )
                  }
                  style={{
                    padding:
                      "7px 10px",

                    border: "none",

                    borderRadius: "6px",

                    cursor: "pointer",
                  }}
                >
                  Remove{" "}
                  {
                    comparePlanets[1]
                      .name
                  }
                </button>

              </div>

            </div>

          )}

        </div>

      )}

    </>
  );
}


export default App;