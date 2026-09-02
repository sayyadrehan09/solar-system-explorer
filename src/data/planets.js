const planets = [
  {
    name: "Mercury",
    texture: "/textures/mercury.jpg",
    position: [2, 0, 0],
    scale: 0.2,

    rotationSpeed: 0.01,
    orbitSpeed: 0.03,

    hasMoon: false,
    hasRing: false,

    radius: "2,439.7 km",
    distance: "57.9 Million km",
    orbitalPeriod: "88 Days",
    moons: 0,

    temperature: 167
  },

  {
    name: "Venus",
    texture: "/textures/venus.jpg",
    position: [3, 0, 0],
    scale: 0.35,

    rotationSpeed: 0.005,
    orbitSpeed: 0.02,

    hasMoon: false,
    hasRing: false,

    radius: "6,051.8 km",
    distance: "108.2 Million km",
    orbitalPeriod: "225 Days",
    moons: 0,

    temperature: 464
  },

  {
    name: "Earth",
    texture: "/textures/earth.jpg",
    position: [4, 0, 0],
    scale: 0.5,

    rotationSpeed: 0.02,
    orbitSpeed: 0.01,

    hasMoon: true,
    hasRing: false,

    radius: "6,371 km",
    distance: "149.6 Million km",
    orbitalPeriod: "365 Days",
    moons: 1,

    temperature: 15
  },

  {
    name: "Mars",
    texture: "/textures/mars.jpg",
    position: [6, 0, 0],
    scale: 0.4,

    rotationSpeed: 0.015,
    orbitSpeed: 0.008,

    hasMoon: true,
    hasRing: false,

    radius: "3,389.5 km",
    distance: "227.9 Million km",
    orbitalPeriod: "687 Days",
    moons: 2,

    temperature: -65
  },

  {
    name: "Saturn",
    texture: "/textures/saturn.jpg",
    position: [10, 0, 0],
    scale: 0.8,

    rotationSpeed: 0.02,
    orbitSpeed: 0.003,

    hasMoon: true,
    hasRing: true,

    radius: "58,232 km",
    distance: "1.43 Billion km",
    orbitalPeriod: "29.5 Years",
    moons: 146,

    temperature: -140
  }
];


export default planets;