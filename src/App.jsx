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


// ============================================
// CAMERA CONTROLLER
// ============================================

function CameraController({
  selectedPlanetRef,
  controlsRef,
  focusRequest,
  resetRequest,
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


  useFrame(() => {

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


    // CAMERA MOVEMENT

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


// ============================================
// APP
// ============================================

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

  const [search, setSearch] =
    useState("");

  const [soundEnabled, setSoundEnabled] =
    useState(false);

  const [comparePlanets, setComparePlanets] =
    useState([]);

  const [showControls, setShowControls] =
    useState(true);


  const planetRefs =
    useRef({});

  const selectedPlanetRef =
    useRef(null);

  const controlsRef =
    useRef();

  const audioRef =
    useRef(null);


  // ============================================
  // AUDIO
  // ============================================

  useEffect(() => {

    audioRef.current =
      new Audio("/sounds/space.mp3");

    audioRef.current.loop = true;

    audioRef.current.volume = 0.25;

    return () => {

      if (audioRef.current) {
        audioRef.current.pause();
      }

    };

  }, []);


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


  // ============================================
  // PLANET CLICK
  // ============================================

  const handlePlanetClick = (planetData) => {

    if (
      selectedPlanet?.name ===
      planetData.name
    ) {

      setSelectedPlanet(null);

      selectedPlanetRef.current =
        null;

      return;
    }

    setSelectedPlanet(
      planetData
    );

    selectedPlanetRef.current =
      planetData.ref;
  };


  // ============================================
  // FOCUS
  // ============================================

  const handleFocusPlanet = () => {

    setFocusRequest(
      (previous) =>
        previous + 1
    );
  };


  // ============================================
  // RESET CAMERA
  // ============================================

  const handleResetCamera = () => {

    setResetRequest(
      (previous) =>
        previous + 1
    );

    setSelectedPlanet(null);

    selectedPlanetRef.current =
      null;
  };


  // ============================================
  // SEARCH
  // ============================================

  const filteredPlanets =
    planets.filter((planet) =>
      planet.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  const handleSearchPlanet = (planet) => {

    const planetRef =
      planetRefs.current[
        planet.name
      ];

    if (!planetRef) {
      return;
    }

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

    setSearch("");
  };


  // ============================================
  // COMPARE
  // ============================================

  const handleCompare = () => {

    if (!selectedPlanet) {
      return;
    }

    setComparePlanets(
      (previous) => {

        if (
          previous.some(
            (planet) =>
              planet.name ===
              selectedPlanet.name
          )
        ) {
          return previous;
        }

        if (previous.length >= 2) {

          return [
            previous[1],
            selectedPlanet,
          ];

        }

        return [
          ...previous,
          selectedPlanet,
        ];
      }
    );
  };


  const removeFromCompare = (
    planetName
  ) => {

    setComparePlanets(
      (previous) =>
        previous.filter(
          (planet) =>
            planet.name !==
            planetName
        )
    );
  };


  // ============================================
  // COMMON BUTTON STYLE
  // ============================================

  const buttonStyle = {
    border: "1px solid rgba(255,255,255,0.12)",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    borderRadius: "10px",
    padding: "9px 13px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    backdropFilter: "blur(10px)",
    transition: "0.2s",
  };


  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "hidden",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >

      {/* ========================================
          3D WORLD
      ======================================== */}

      <Canvas
        camera={{
          position: [0, 2, 6],
          fov: 75,
        }}
        style={{
          width: "100%",
          height: "100%",
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
        />

      </Canvas>


      {/* ========================================
          TOP HEADER
      ======================================== */}

      <div
        style={{
          position: "absolute",
          top: "18px",
          left: "18px",
          right: "18px",

          height: "54px",

          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",

          padding:
            "0 16px",

          borderRadius: "14px",

          background:
            "rgba(10,10,15,0.72)",

          border:
            "1px solid rgba(255,255,255,0.1)",

          backdropFilter:
            "blur(14px)",

          color: "white",

          zIndex: 20,

          boxSizing:
            "border-box",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >

          <span
            style={{
              fontSize: "22px",
            }}
          >
            ✦
          </span>

          <strong
            style={{
              letterSpacing:
                "1.5px",
              fontSize: "15px",
            }}
          >
            SOLAR EXPLORER
          </strong>

        </div>


        <div
          style={{
            fontSize: "12px",
            color: "#aaa",
          }}
        >
          {selectedPlanet
            ? `Exploring ${selectedPlanet.name}`
            : "Explore the Solar System"}
        </div>

      </div>


      {/* ========================================
          SEARCH
      ======================================== */}

      <div
        style={{
          position: "absolute",

          top: "88px",
          left: "20px",

          width: "250px",

          zIndex: 20,
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",

            background:
              "rgba(10,10,15,0.82)",

            border:
              "1px solid rgba(255,255,255,0.12)",

            borderRadius: "12px",

            backdropFilter:
              "blur(12px)",

            padding:
              "0 12px",
          }}
        >

          <span
            style={{
              color: "#aaa",
              fontSize: "15px",
            }}
          >
            🔍
          </span>

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
              width: "100%",

              padding:
                "12px 8px",

              background:
                "transparent",

              border: "none",

              outline: "none",

              color: "white",

              fontSize: "14px",
            }}
          />

          {search && (

            <button
              onClick={() =>
                setSearch("")
              }
              style={{
                border: "none",
                background:
                  "transparent",
                color: "#aaa",
                cursor:
                  "pointer",
                fontSize: "16px",
              }}
            >
              ×
            </button>

          )}

        </div>


        {search && (

          <div
            style={{
              marginTop: "6px",

              background:
                "rgba(10,10,15,0.94)",

              border:
                "1px solid rgba(255,255,255,0.1)",

              borderRadius: "12px",

              overflow: "hidden",

              backdropFilter:
                "blur(14px)",
            }}
          >

            {filteredPlanets.length >
            0 ? (

              filteredPlanets.map(
                (planet) => (

                  <button
                    key={
                      planet.name
                    }

                    onClick={() =>
                      handleSearchPlanet(
                        planet
                      )
                    }

                    style={{
                      width: "100%",

                      padding:
                        "12px 14px",

                      background:
                        "transparent",

                      border: "none",

                      borderBottom:
                        "1px solid rgba(255,255,255,0.06)",

                      color: "white",

                      textAlign:
                        "left",

                      cursor:
                        "pointer",

                      fontSize:
                        "14px",
                    }}
                  >
                    🪐{" "}
                    {planet.name}
                  </button>

                )
              )

            ) : (

              <div
                style={{
                  padding:
                    "13px",
                  color:
                    "#777",
                  fontSize:
                    "13px",
                }}
              >
                No planet found
              </div>

            )}

          </div>

        )}

      </div>


      {/* ========================================
          RESET CAMERA
      ======================================== */}

      <button
        onClick={
          handleResetCamera
        }

        style={{
          position: "absolute",

          top: "88px",
          right: "20px",

          zIndex: 20,

          ...buttonStyle,

          background:
            "rgba(10,10,15,0.82)",

          backdropFilter:
            "blur(12px)",
        }}
      >
        ⟳ Reset Camera
      </button>


      {/* ========================================
          PLANET INFO CARD
      ======================================== */}

      {selectedPlanet && (

        <div
          style={{
            position: "absolute",

            top: "155px",
            right: "20px",

            width: "300px",

            padding: "22px",

            borderRadius: "18px",

            background:
              "rgba(12,12,18,0.88)",

            border:
              "1px solid rgba(255,255,255,0.12)",

            backdropFilter:
              "blur(18px)",

            color: "white",

            zIndex: 20,

            boxShadow:
              "0 20px 60px rgba(0,0,0,0.45)",

            boxSizing:
              "border-box",
          }}
        >

          {/* CLOSE */}

          <button
            onClick={() => {

              setSelectedPlanet(
                null
              );

              selectedPlanetRef.current =
                null;

            }}

            style={{
              position: "absolute",

              top: "12px",
              right: "12px",

              width: "32px",
              height: "32px",

              borderRadius:
                "50%",

              border: "none",

              background:
                "rgba(255,255,255,0.08)",

              color: "white",

              fontSize: "20px",

              cursor:
                "pointer",
            }}
          >
            ×
          </button>


          {/* PLANET NAME */}

          <div
            style={{
              color: "#8c8cff",

              fontSize: "11px",

              letterSpacing:
                "2px",

              textTransform:
                "uppercase",

              marginBottom:
                "6px",
            }}
          >
            Planet
          </div>


          <h2
            style={{
              margin:
                "0 0 20px 0",

              fontSize:
                "28px",

              letterSpacing:
                "0.5px",
            }}
          >
            {selectedPlanet.name}
          </h2>


          {/* TEMPERATURE */}

          <div
            style={{
              padding:
                "14px",

              marginBottom:
                "16px",

              borderRadius:
                "12px",

              background:
                "rgba(255,255,255,0.06)",

              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <div
              style={{
                fontSize:
                  "11px",

                color:
                  "#888",

                marginBottom:
                  "5px",

                textTransform:
                  "uppercase",

                letterSpacing:
                  "1px",
              }}
            >
              Average Temperature
            </div>

            <div
              style={{
                fontSize:
                  "24px",

                fontWeight:
                  "bold",
              }}
            >
              🌡️{" "}
              {selectedPlanet.temperature}
              °C
            </div>

          </div>


          {/* STATS */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              gap: "10px",
            }}
          >

            <div
              style={{
                padding:
                  "11px",

                borderRadius:
                  "10px",

                background:
                  "rgba(255,255,255,0.045)",
              }}
            >

              <div
                style={{
                  fontSize:
                    "10px",
                  color:
                    "#777",
                  marginBottom:
                    "4px",
                }}
              >
                RADIUS
              </div>

              <div
                style={{
                  fontSize:
                    "13px",
                  fontWeight:
                    "600",
                }}
              >
                {
                  selectedPlanet.radius
                }
              </div>

            </div>


            <div
              style={{
                padding:
                  "11px",

                borderRadius:
                  "10px",

                background:
                  "rgba(255,255,255,0.045)",
              }}
            >

              <div
                style={{
                  fontSize:
                    "10px",
                  color:
                    "#777",
                  marginBottom:
                    "4px",
                }}
              >
                MOONS
              </div>

              <div
                style={{
                  fontSize:
                    "13px",
                  fontWeight:
                    "600",
                }}
              >
                {
                  selectedPlanet.moons
                }
              </div>

            </div>


            <div
              style={{
                padding:
                  "11px",

                borderRadius:
                  "10px",

                background:
                  "rgba(255,255,255,0.045)",
              }}
            >

              <div
                style={{
                  fontSize:
                    "10px",
                  color:
                    "#777",
                  marginBottom:
                    "4px",
                }}
              >
                DISTANCE
              </div>

              <div
                style={{
                  fontSize:
                    "13px",
                  fontWeight:
                    "600",
                }}
              >
                {
                  selectedPlanet.distance
                }
              </div>

            </div>


            <div
              style={{
                padding:
                  "11px",

                borderRadius:
                  "10px",

                background:
                  "rgba(255,255,255,0.045)",
              }}
            >

              <div
                style={{
                  fontSize:
                    "10px",
                  color:
                    "#777",
                  marginBottom:
                    "4px",
                }}
              >
                YEAR
              </div>

              <div
                style={{
                  fontSize:
                    "13px",
                  fontWeight:
                    "600",
                }}
              >
                {
                  selectedPlanet.orbitalPeriod
                }
              </div>

            </div>

          </div>


          {/* ACTION BUTTONS */}

          <div
            style={{
              display: "flex",

              gap: "8px",

              marginTop:
                "18px",
            }}
          >

            <button
              onClick={
                handleFocusPlanet
              }

              style={{
                flex: 1,

                padding:
                  "11px",

                borderRadius:
                  "10px",

                border: "none",

                background:
                  "white",

                color:
                  "black",

                fontWeight:
                  "bold",

                cursor:
                  "pointer",
              }}
            >
              🎯 Focus
            </button>


            <button
              onClick={
                handleCompare
              }

              style={{
                flex: 1,

                padding:
                  "11px",

                borderRadius:
                  "10px",

                border:
                  "1px solid rgba(255,255,255,0.15)",

                background:
                  "rgba(255,255,255,0.08)",

                color:
                  "white",

                fontWeight:
                  "bold",

                cursor:
                  "pointer",
              }}
            >
              ⭐ Compare
            </button>

          </div>

        </div>

      )}


      {/* ========================================
          BOTTOM CONTROL BAR
      ======================================== */}

      {showControls && (

        <div
          style={{
            position: "absolute",

            bottom: "20px",
            left: "50%",

            transform:
              "translateX(-50%)",

            zIndex: 20,

            display: "flex",

            alignItems:
              "center",

            gap: "8px",

            padding:
              "9px",

            borderRadius:
              "14px",

            background:
              "rgba(10,10,15,0.82)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            backdropFilter:
              "blur(16px)",

            boxShadow:
              "0 12px 40px rgba(0,0,0,0.4)",
          }}
        >

          {/* PAUSE */}

          <button
            onClick={() =>
              setPaused(
                !paused
              )
            }

            style={buttonStyle}
          >
            {paused
              ? "▶ Resume"
              : "⏸ Pause"}
          </button>


          {/* SPEED */}

          <div
            style={{
              display: "flex",

              alignItems:
                "center",

              gap: "5px",

              padding:
                "0 4px",
            }}
          >

            <span
              style={{
                color:
                  "#888",

                fontSize:
                  "12px",
              }}
            >
              Speed
            </span>

            <select
              value={
                speedMultiplier
              }

              onChange={(event) =>
                setSpeedMultiplier(
                  Number(
                    event.target.value
                  )
                )
              }

              style={{
                padding:
                  "8px",

                borderRadius:
                  "8px",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                background:
                  "#17171d",

                color:
                  "white",

                outline:
                  "none",

                cursor:
                  "pointer",
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


          {/* DIVIDER */}

          <div
            style={{
              width: "1px",
              height: "25px",
              background:
                "rgba(255,255,255,0.1)",
            }}
          />


          {/* SOUND */}

          <button
            onClick={
              toggleSound
            }

            style={buttonStyle}
          >
            {soundEnabled
              ? "🔊 Sound"
              : "🔇 Sound"}
          </button>


          {/* LABELS */}

          <button
            onClick={() =>
              setShowLabels(
                !showLabels
              )
            }

            style={buttonStyle}
          >
            {showLabels
              ? "🏷 Labels"
              : "🏷 Hidden"}
          </button>

        </div>

      )}


      {/* ========================================
          HIDE CONTROLS BUTTON
      ======================================== */}

      <button
        onClick={() =>
          setShowControls(
            !showControls
          )
        }

        style={{
          position: "absolute",

          bottom: "20px",
          right: "20px",

          zIndex: 20,

          ...buttonStyle,
        }}
      >
        {showControls
          ? "⌄"
          : "⌃"}
      </button>


      {/* ========================================
          COMPARISON PANEL
      ======================================== */}

      {comparePlanets.length >
        0 && (

        <div
          style={{
            position: "absolute",

            bottom: "85px",
            left: "20px",

            width: "390px",

            padding:
              "18px",

            borderRadius:
              "16px",

            background:
              "rgba(10,10,15,0.9)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            backdropFilter:
              "blur(16px)",

            color:
              "white",

            zIndex: 20,

            boxSizing:
              "border-box",
          }}
        >

          <div
            style={{
              display:
                "flex",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginBottom:
                "15px",
            }}
          >

            <strong>
              ⭐ Compare Planets
            </strong>

            <button
              onClick={() =>
                setComparePlanets(
                  []
                )
              }

              style={{
                border:
                  "none",

                background:
                  "transparent",

                color:
                  "#888",

                cursor:
                  "pointer",
              }}
            >
              Clear
            </button>

          </div>


          {comparePlanets.length ===
            1 && (

            <div
              style={{
                color:
                  "#888",

                fontSize:
                  "13px",
              }}
            >
              Select another planet
              to compare.
            </div>

          )}


          {comparePlanets.length ===
            2 && (

            <div>

              <div
                style={{
                  display:
                    "grid",

                  gridTemplateColumns:
                    "80px 1fr 1fr",

                  gap:
                    "9px",

                  fontSize:
                    "12px",

                  alignItems:
                    "center",
                }}
              >

                <span
                  style={{
                    color:
                      "#666",
                  }}
                >
                  STAT
                </span>

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


                <span
                  style={{
                    color:
                      "#777",
                  }}
                >
                  Temp
                </span>

                <span>
                  🌡️{" "}
                  {
                    comparePlanets[0]
                      .temperature
                  }°C
                </span>

                <span>
                  🌡️{" "}
                  {
                    comparePlanets[1]
                      .temperature
                  }°C
                </span>


                <span
                  style={{
                    color:
                      "#777",
                  }}
                >
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


                <span
                  style={{
                    color:
                      "#777",
                  }}
                >
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


                <span
                  style={{
                    color:
                      "#777",
                  }}
                >
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
                  display:
                    "flex",

                  gap:
                    "7px",

                  marginTop:
                    "15px",
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
                    ...buttonStyle,

                    fontSize:
                      "11px",

                    padding:
                      "7px 9px",
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
                    ...buttonStyle,

                    fontSize:
                      "11px",

                    padding:
                      "7px 9px",
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

    </div>
  );
}


export default App;