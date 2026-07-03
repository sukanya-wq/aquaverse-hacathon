# 🌊 Ocean Guard: Immersive Marine Exploration & Conservation

Ocean Guard is an immersive, highly interactive full-stack digital experience designed to explore the depths of Earth's oceans, understand marine biology across distinct vertical zones, diagnose water contaminants using advanced machine vision, and advocate for proactive global stewardship.

Built using **React (Vite)**, **Express**, **Tailwind CSS**, and **Google Gemini (GenAI SDK)**, Ocean Guard provides an educational journey from the light-bathed surface down to the crushing pressures of the abyss.

---

## 🚀 Core Features

### 1. Depth-Adaptive Ocean Zones
*   **The Vertical Traverse**: Journey through four distinct biological depths: **Sunlight Zone** (Epipelagic), **Twilight Zone** (Mesopelagic), **Midnight Zone** (Bathypelagic), and **Abyssal Plain** (Abyssopelagic).
*   **Interactive Sidebar Depth Tracker**: A real-time indicators tracking vertical scrolling, showing active depth markers, atmospheric pressure (atm), temperature (°C), and light penetration percentage.
*   **Volumetric Environmental Renderers**: Staggered atmospheric light ray penetration, real-time depth-varying ambient shadows, and physics-inspired canvas water particle flows.

### 2. High-Fidelity Marine Biology Explorer
*   **Custom Realistic SVG Renderers**: Immersive, dynamically styled vector-drawn species including the *Deep-Sea Anglerfish*, *Biophosphorescent Lanternfish*, *Giant Squid*, *Aurelia Jellyfish*, *Green Sea Turtle*, *Silver Barracuda*, and *Reef Clownfish*.
*   **Sonar-Guided Scan Mode**: Trigger a global multi-spectral laser scan that sweeps the interface, highlighting biological organs and emitting a deep hydrophone ping.

### 3. AI-Powered Optical Water Quality Analyzer
*   **Computer Vision Diagnostics**: Upload water sample images or select pristine/contaminated presets to run multi-spectral optical density checks.
*   **Structured Gemini Engine**: Utilizes the modern `@google/genai` SDK and server-side Structured Output JSON Schemas to analyze turbidity, diagnose key contaminants (microplastics, toxic runoffs, algae, silt), and generate tailored step-by-step remediation procedures.

### 4. Cinematic Underwater Observation Cam
*   **Ambient Observation Deck**: Switch to a theatrical, borderless viewing mode that fades out the dashboard layout to let you observe passing sea creatures, particulate currents, and light ray shifts in full-screen serenity.

### 5. Hydrophone Soundscape
*   **Synthetic Audio Engine**: Plays ambient marine low-frequency hydrophone sounds, active sonar echoes, and sonar ping feedback directly within the browser using Web Audio API nodes.

---

## 🛠️ Technology Stack

*   **Frontend**: React (v19) + Vite (v6) + TypeScript
*   **Backend**: Node.js + Express (Proxying visual intelligence requests securely to protect secrets)
*   **Styling**: Tailwind CSS with customized glassmorphism overlays and ambient fluid color schemes
*   **Animations**: Motion (`motion/react`) for smooth scrolling, modal transitions, and responsive interactive hover feedback
*   **AI Engine**: `@google/genai` SDK utilizing highly-optimized, low-latency structured schemas with robust transient-error fallbacks

---

## 💻 Local Development Setup

To run this project locally in your own development environment (such as **VS Code**):

### 1. Prerequisites
Ensure you have the following installed on your local computer:
*   [Node.js](https://nodejs.org/) (v18.x or higher recommended)
*   [npm](https://www.npmjs.com/) (usually packaged with Node.js)
*   [Visual Studio Code](https://code.visualstudio.com/) (with recommended extensions like *Tailwind CSS IntelliSense* and *ESLint*)

### 2. Installation Steps
1.  **Clone or Download the Project**:
    ```bash
    git clone <your-repository-url>
    cd ocean-guard
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a new `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and insert your Google Gemini API Key (obtained from [Google AI Studio](https://aistudio.google.com/)):
    ```env
    GEMINI_API_KEY="AIzaSyYourActualAPIKeyGoesHere"
    APP_URL="http://localhost:3000"
    ```

### 3. Launching the App
Run the full-stack development environment (which runs both the client-side compiler and the Express API server):
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`** to begin exploring!

---

## 🗃️ Available Scripts

In the project directory, you can run the following commands:

| Script | Command | Description |
| :--- | :--- | :--- |
| **`npm run dev`** | `tsx server.ts` | Runs the full-stack server using TSX. Mounts Vite's HMR middleware for ultra-fast frontend development. |
| **`npm run build`** | `vite build && esbuild...` | Compiles front-end assets to static files inside `dist/` and compiles TypeScript `server.ts` into a self-contained, high-performance production CJS bundle (`dist/server.cjs`). |
| **`npm run start`** | `node dist/server.cjs` | Runs the compiled production-ready server from the bundled build directory. |
| **`npm run lint`** | `tsc --noEmit` | Validates TypeScript type-safety across the entire codebase to catch compilation issues. |
| **`npm run clean`**| `rm -rf dist` | Clears local build outputs and caches to ensure a fresh, clean compilation. |

---

## 🔒 Security & Key Protection
To safeguard developer credentials, **all Gemini API traffic is proxied through the server-side Express Router** (`/api/analyze-water`). 
*   **No API keys are exposed to the browser console or client bundle.**
*   API client instances utilize **lazy initialization**, meaning they will fail fast with clear diagnostic prompts if credentials are not configured, rather than crashing the server during cold startup.

---

## 🌊 Join the Tide of Conservation
Inside the application, navigate to the **Pledge Registry** to join thousands of digital ocean guards in committing to reduce single-use plastics, support marine-protected areas, and raise ecological awareness. Every minor action helps keep our deep-blue ecosystems thriving.

> **"Because the sea, once it casts its spell, holds one in its net of wonder forever."** — *Jacques Cousteau*
