const planets = [
  {
    name: "Mercury",
    texture: "/textures/mercury.jpg",
    position: [2.8, 0, 0],
    scale: 0.2,

    rotationSpeed: 0.01,
    orbitSpeed: 0.03,

    hasMoon: false,
    hasRing: false,

    radius: "2,439.7 km",
    distance: "57.9 Million km",
    orbitalPeriod: "88 Days",
    moons: 0,
    fact: "Mercury is the smallest planet and closest to the Sun.",
    temperature: 167
  },

  {
    name: "Venus",
    texture: "/textures/venus.jpg",
    position: [3.9, 0, 0],
    scale: 0.35,

    rotationSpeed: 0.005,
    orbitSpeed: 0.02,

    hasMoon: false,
    hasRing: false,

    radius: "6,051.8 km",
    distance: "108.2 Million km",
    orbitalPeriod: "225 Days",
    moons: 0,
    fact: "Venus is the hottest planet with thick clouds of sulfuric acid.",
    temperature: 464
  },

  {
    name: "Earth",
    texture: "/textures/earth.jpg",
    position: [4.8, 0, 0],
    scale: 0.5,

    rotationSpeed: 0.02,
    orbitSpeed: 0.01,

    hasMoon: true,
    hasRing: false,

    radius: "6,371 km",
    distance: "149.6 Million km",
    orbitalPeriod: "365 Days",
    moons: 1,
    fact: "Earth is the only known planet to support life.",
    temperature: 15
  },

  {
    name: "Mars",
    texture: "/textures/mars.jpg",
    position: [6.5, 0, 0],
    scale: 0.4,

    rotationSpeed: 0.015,
    orbitSpeed: 0.008,

    hasMoon: true,
    hasRing: false,

    radius: "3,389.5 km",
    distance: "227.9 Million km",
    orbitalPeriod: "687 Days",
    moons: 2,
    fact: "Mars is home to Olympus Mons, the largest volcano in the solar system.",
    temperature: -65
  },

  {
    name: "Jupiter",
    texture: "/textures/jupiter.jpg",
    position: [11.5, 0, 0],
    scale: 0.85,

    rotationSpeed: 0.03,
    orbitSpeed: 0.005,

    hasMoon: true,
    hasRing: false,

    radius: "69,911 km",
    distance: "778.5 Million km",
    orbitalPeriod: "11.9 Years",
    moons: 95,
    fact: "Jupiter is the largest planet in our solar system and has a giant storm called the Great Red Spot.",
    temperature: -110
  },

  {
    name: "Saturn",
    texture: "/textures/saturn.jpg",
    position: [17.0, 0, 0],
    scale: 0.75,

    rotationSpeed: 0.02,
    orbitSpeed: 0.003,

    hasMoon: true,
    hasRing: true,

    radius: "58,232 km",
    distance: "1.43 Billion km",
    orbitalPeriod: "29.5 Years",
    moons: 146,
    fact: "Saturn has the most spectacular ring system made of billions of chunks of ice and rock.",
    temperature: -140
  },

  {
    name: "Uranus",
    texture: "/textures/uranus.jpg",
    position: [23.5, 0, 0],
    scale: 0.55,

    rotationSpeed: 0.015,
    orbitSpeed: 0.002,

    hasMoon: true,
    hasRing: false,

    radius: "25,362 km",
    distance: "2.87 Billion km",
    orbitalPeriod: "84 Years",
    moons: 28,
    fact: "Uranus rotates on its side, making it unique in the solar system.",
    temperature: -195
  },

  {
    name: "Neptune",
    texture: "/textures/neptune.jpg",
    position: [30.0, 0, 0],
    scale: 0.53,

    rotationSpeed: 0.015,
    orbitSpeed: 0.0012,

    hasMoon: true,
    hasRing: false,

    radius: "24,622 km",
    distance: "4.5 Billion km",
    orbitalPeriod: "165 Years",
    moons: 16,
    fact: "Neptune has the fastest supersonic winds in the solar system, reaching over 2,000 km/h.",
    temperature: -200
  }
];

export default planets;
