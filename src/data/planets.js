const planets = [
  {
    name: "Mercury",
    position: [2, 0, 0],
    color: "gray",
    scale: 0.2,
    rotationSpeed: 0.01,
    orbitSpeed: 0.03,
    hasMoon: false
  },
  {
    name: "Venus",
    position: [3, 0, 0],
    color: "yellow",
    scale: 0.35,
    rotationSpeed: 0.005,
    orbitSpeed: 0.02,
    hasMoon: false
  },
  {
  name: "Earth",
  position: [4,0,0],
  color: "blue",
  scale: 0.5,
  rotationSpeed: 0.02,
  orbitSpeed: 0.01,
  hasMoon: true,
},
  {
    name: "Mars",
    position: [6, 0, 0],
    color: "red",
    scale: 0.4,
    rotationSpeed: 0.015,
    orbitSpeed: 0.008,
    hasMoon: false
  },
  {
    name:"Saturn",
    position:[10,0,0],
    color:"tan",
    scale:0.8,
    rotationSpeed:0.02,
    orbitSpeed:0.003,
    hasMoon:false,
    hasRing:true
}
];

export default planets;