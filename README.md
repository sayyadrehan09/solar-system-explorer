# 🪐 Solar System Explorer

An interactive, real-time 3D Solar System simulation built with **React 19**, **Three.js**, and **React Three Fiber (@react-three/fiber)**. Explore all 8 planets with realistic astronomical scaling, authentic 360° NASA texture maps, dynamic day/night solar illumination, an orbiting asteroid belt, a guided cinematic solar tour, and live telemetry dashboards.

---

## ✨ Features

### 🌌 Realistically Scaled 3D Planetary System
- **Astronomically Proportional Orbits**: Planet distances are modeled after real Astronomical Unit (AU) and kilometer gaps while preserving clean visibility around the Sun:
  - **Mercury** ($r = 2.8$): Safely positioned outside the Sun's radiant corona.
  - **Venus** ($r = 3.9$): Modeled with a $0.33\text{ AU}$ gap from Mercury.
  - **Earth** ($r = 4.8$): Accurately captures the tighter $0.28\text{ AU}$ gap to Venus.
  - **Mars** ($r = 6.5$): Displays the wider $0.52\text{ AU}$ step to the inner solar boundary.
  - **The Asteroid Belt** ($r = 8.2 - 9.8$): Fills the massive $3.68\text{ AU}$ void between Mars and Jupiter.
  - **Jupiter** ($r = 11.5$) & **Saturn** ($r = 17.0$): Spaced out with room for Saturn's majestic rings.
  - **Uranus** ($r = 23.5$) & **Neptune** ($r = 30.0$): Emphasizes the immense deep-space distances of the outer ice giants.
- **3D Billboard Labels**: Planet names are wrapped in `@react-three/drei`'s `<Billboard>`, dynamically orienting to always face the user's camera from any angle or elevation.

### ☀️ Realistic Day/Night Solar Illumination (The Terminator)
- **Self-Luminous Sun**: Engineered with `meshBasicMaterial` and an outer additive glowing corona halo (`args={[1.85, 64, 64]}`), ensuring the Sun blazes at 100% full brightness and never goes dark.
- **True Solar Ray Cast**: Central radial point light beams outward from `[0, 0, 0]`:
  - **Daylit Hemisphere**: The side facing the Sun is brightly illuminated with intense sunlight.
  - **Nightside Shadow**: The hemisphere facing away from the Sun drops into soft, dark cosmic starlight ($0.1$ ambient), producing a natural spherical day/night terminator line.
  - **Dynamic Revolution**: As planets orbit around the Sun, the day/night boundary sweeps across their spherical surfaces in real time.

### 🗺️ Full 360° Equirectangular Texture Maps
- Replaced square/cropped photos with official **2:1 Equirectangular Cylindrical Projection Maps** (from NASA Visible Earth and Three.js):
  - ☀️ **Sun**: High-res $1024 \times 512$ solar flare texture
  - ☿ **Mercury**: Full $1024 \times 512$ cratered topography
  - ♀ **Venus**: Full $1024 \times 512$ dense atmosphere
  - 🌍 **Earth**: NASA Blue Marble $2048 \times 1024$ equirectangular map with oceans, continents, and cloud coverage wrapping seamlessly with zero pole distortion
  - 🌙 **Moon**: Full $1024 \times 512$ lunar crater map
  - ♂ **Mars**: Full $1024 \times 512$ Martian terrain
  - ♃ **Jupiter**: Full $1024 \times 512$ atmospheric bands & Great Red Spot
  - ♄ **Saturn**: Full $1800 \times 900$ atmospheric bands
  - ♅ **Uranus**: Full $1024 \times 512$ cyan ice giant texture
  - ♆ **Neptune**: Full $1024 \times 512$ deep azure winds texture

### 🪨 High-Performance 3D Asteroid Belt
- **1,600+ Asteroid Chunks**: Irregular 3D dodecahedrons placed in the realistic gap between Mars ($r = 6.5$) and Jupiter ($r = 11.5$).
- **Optimized with `instancedMesh`**: Draws all 1,600 tumbling, rock-shaded bodies in a **single GPU draw call** for a silky-smooth 60 FPS.
- **Dynamic Orbital Motion**: Slowly revolves around the Sun and obeys global pause and speed multipliers.
- **Toggleable**: Show or hide the asteroid belt on demand.

### 🚀 Cinematic Guided Solar Tour
- **Automatic Guided Fly-Through**: One-click tour that smoothly glides the camera through all 8 planets from Mercury to Neptune.
- **Smart Camera Tracking**: Smooth linear interpolation (`lerp`) tracks each planet in real time as it moves along its orbit.
- **Interactive Tour HUD**: Floating banner showing current stop, countdown progress bar (6.5s per stop), manual `❮ Prev` and `Next ❯` buttons, and `⏸ Pause / Resume`.

### 📊 NASA-Inspired Planet Telemetry & Comparison Dashboard
- **Modern Glassmorphic Card**: Semi-transparent obsidian glass with blurred backdrop and glowing borders.
- **Rank & Category Badge**: Displays the planet's order from the Sun (e.g., `PLANET #3 FROM SUN • Solar System`).
- **Thermal Climate Indicator**: Live temperature with color-coded climate badges (🔥 Scorching, ☀️ High Heat, 🌿 Habitable, ❄️ Sub-Zero, 🧊 Deep Freeze).
- **2x2 Telemetry Grid**:
  - 📏 **Radius**: Physical size in kilometers
  - 🌑 **Moons**: Satellite count
  - ☀️ **Sun Distance**: Average distance in million km
  - ⏱️ **Year Period**: Orbital duration (Earth days/years)
- **✨ NASA Insight Box**: Highlights verified astronomical facts and discoveries.
- **Side-by-Side Planet Comparison**: Compare any two planets' stats, sizes, temperatures, and moons side by side.

### 🎮 Interactive Controls & Exploration
- **3D Camera Navigation**: Orbit, pan, and zoom with custom bounds (`OrbitControls`, `maxDistance = 80`).
- **Planet Focus & Track**: Click any planet in 3D or search via the autocomplete bar to lock the camera onto it.
- **Camera Reset**: Returns the camera to a balanced wide-angled overview angle (`[0, 14, 33]`).
- **Time Controls**: Pause/resume orbital motion and scale simulation speed ($0.25\times$ to $5\times$).
- **Visual Toggles**: Quick buttons to toggle asteroid belt, labels, sound, and controls.

### 🔊 Audio Effects & Ambient Sound
- **Ambient Space Soundtrack**: Toggleable space atmosphere background audio.
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
│   └── textures/                # 2:1 High-res 360° spherical texture maps
│       ├── sun.jpg              # 1024x512 Equirectangular Sun map
│       ├── mercury.jpg          # 1024x512 Equirectangular Mercury map
│       ├── venus.jpg            # 1024x512 Equirectangular Venus map
│       ├── earth.jpg            # 2048x1024 NASA Blue Marble Earth map
│       ├── moon.jpg             # 1024x512 Equirectangular Moon map
│       ├── mars.jpg             # 1024x512 Equirectangular Mars map
│       ├── jupiter.jpg          # 1024x512 Equirectangular Jupiter map
│       ├── saturn.jpg           # 1800x900 Equirectangular Saturn map
│       ├── uranus.jpg           # 1024x512 Equirectangular Uranus map
│       └── neptune.jpg          # 1024x512 Equirectangular Neptune map
├── src/
│   ├── components/
│   │   ├── AsteroidBelt.jsx     # High-performance 1,600+ instanced asteroid belt
│   │   ├── Moon.jsx             # Orbiting textured moon component
│   │   ├── Orbit.jsx            # Planetary orbit path rings
│   │   ├── Planet.jsx           # Individual planet mesh, material & billboard label
│   │   ├── Ring.jsx             # Planetary ring system geometry
│   │   ├── Starfield.jsx        # Background cosmic starfield
│   │   └── Sun.jsx              # Self-luminous Sun mesh with glowing corona
│   ├── data/
│   │   └── planets.js           # Real astronomical stats, orbits, textures & facts
│   ├── App.jsx                  # Main application, camera controller & NASA UI
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
