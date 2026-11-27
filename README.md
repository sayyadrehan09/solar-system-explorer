# 🪐 Solar System Explorer

An interactive, real-time 3D Solar System simulation built with **React 19**, **Three.js**, and **React Three Fiber (@react-three/fiber)**. Explore all 8 planets, orbiting moons, Saturn's rings, thousands of tumbling asteroids in the Asteroid Belt, dynamic audio effects, and embark on a cinematic guided solar tour.

---

## ✨ Features

### 🌌 3D Planetary System
- **All 8 Planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune with accurate surface textures, proportional orbit distances, scales, and rotation speeds.
- **The Sun & Lighting**: Centerpiece star with point-light emission and atmospheric ambient illumination.
- **Moons & Rings**: Natural satellites orbiting their parent planets and Saturn's signature ring system.
- **Orbit Paths**: Visual orbital track rings illustrating each planet's trajectory.
- **Deep Space Backdrop**: Dynamic starfield and multi-layered cosmic stars.

### 🪨 High-Performance Asteroid Belt
- **1,600+ 3D Asteroid Chunks**: Positioned between Mars ($r = 6.0$) and Jupiter ($r = 8.0$).
- **Optimized with `instancedMesh`**: Draws thousands of tumbling, irregular rocky bodies in a **single GPU draw call** for a silky-smooth 60 FPS.
- **Dynamic Orbital Motion**: Slowly revolves in orbit around the Sun, responding to speed and pause controls.
- **Toggleable**: Show or hide the asteroid belt with a single click.

### 🚀 Cinematic Guided Solar Tour
- **Automatic Guided Fly-Through**: One-click tour that smoothly glides the camera through all 8 planets from Mercury to Neptune.
- **Smart Camera Tracking**: Smooth linear interpolation (`lerp`) tracks each planet in real time as it moves along its orbit.
- **Interactive Tour HUD**: Floating banner showing current stop, countdown progress bar (6.5s per stop), manual `❮ Prev` and `Next ❯` buttons, and `⏸ Pause / Resume`.

### 🎮 Interactive Controls & Exploration
- **3D Camera Navigation**: Orbit, pan, and zoom with constrained bounds (`OrbitControls`).
- **Planet Focus**: Click any planet in 3D or search via the autocomplete search bar to lock the camera onto it.
- **Camera Reset**: Instantly returns to the wide elevated overview angle.
- **Time Controls**: Pause/resume orbital motion and scale simulation speed ($0.25\times$ to $5\times$).
- **Label Toggle**: Turn planet names on or off for clean cinematic viewing.

### 📊 Planet Information Cards & Comparison
- **Detailed Telemetry**:
  - ✨ "Did You Know?" astronomical facts
  - 🌡️ Average surface temperature with climate status
  - 📏 Radius, distance to Sun, moon count, and orbital year length
- **Side-by-Side Planet Comparison**: Select any two planets to compare their physical stats, sizes, temperatures, and moons side by side.

### 🔊 Audio Effects & Ambient Sound
- **Ambient Space Music**: Toggleable space atmosphere soundtrack.
- **Web Audio API Synth Fallback**: Seamless cosmic drone synthesizer fallback ensuring audio always works across all browsers.
- **Interactive Audio Chimes**: Subtle sci-fi sound effects when selecting and focusing planets.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **3D Graphics Engine**: [Three.js](https://threejs.org/)
- **React 3D Renderer**: [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- **3D Helpers & Controls**: [@react-three/drei](https://github.com/pmndrs/drei)
- **Code Quality**: ESLint 9

---

## 📁 Project Structure

```text
solar-system-explorer/
├── public/
│   ├── sounds/
│   │   └── space.mp3            # Ambient space audio
│   └── textures/                # High-res planetary texture maps
│       ├── sun.jpg
│       ├── mercury.jpg
│       ├── venus.jpg
│       ├── earth.jpg
│       ├── mars.jpg
│       ├── jupiter.jpg
│       ├── saturn.jpg
│       ├── uranus.jpg
│       ├── neptune.jpg
│       └── moon.jpg
├── src/
│   ├── components/
│   │   ├── AsteroidBelt.jsx     # High-performance instanced asteroid ring
│   │   ├── Moon.jsx             # Orbiting moon component
│   │   ├── Orbit.jsx            # Planetary orbit path rings
│   │   ├── Planet.jsx           # Individual planet mesh & label
│   │   ├── Ring.jsx             # Planetary ring system geometry
│   │   ├── Starfield.jsx        # Background cosmic starfield
│   │   └── Sun.jsx              # Central sun mesh & light
│   ├── data/
│   │   └── planets.js           # Physical stats, orbits, textures, facts
│   ├── App.jsx                  # Main application, camera controller & UI
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/solar-system-explorer.git
   cd solar-system-explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with HMR |
| `npm run build` | Compiles and builds production-ready assets into `dist/` |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |
| `npm run preview` | Serves the production build locally for verification |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
