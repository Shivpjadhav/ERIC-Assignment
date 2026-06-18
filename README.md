# ERIC Robotics – Insight.IO Dashboard Assignment

## Candidate Information

**Full Name:** Shivani Jadhav
**Contact Number:** +91 7420855518
**Email ID:** [jadhavshivani332@gmail.com](mailto:jadhavshivani332@gmail.com)

---

# Project Overview

This project is a frontend implementation of the ERIC Robotics Insight.IO Dashboard assignment.

The dashboard recreates the provided UI/UX design and includes:

* Camera View
* 3D Map View
* Mini Preview Window
* Emergency Stop Control
* Mission Status Panel
* Robot Status Indicators
* Zoom Controls
* Responsive Layout
* Smooth View Switching Animations

The application is built using React and modern frontend technologies with a focus on responsiveness, maintainability, and UI accuracy.

---

# Tech Stack

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* Three.js
* React Icons

---

# Features

## Camera View

* Full-screen video feed
* HUD overlay effects
* Responsive layout
* Camera status label

## 3D Map View

* Three.js rendering
* Grid visualization
* Robot marker
* Point cloud support using PCDLoader
* Orbit controls for navigation

## Mini Preview

* Interactive preview window
* Toggle between Camera and Map views
* Shared element transition animation

## Emergency Stop

* Industrial-style emergency stop button
* Custom SVG arrows
* Circular emergency text

## Dashboard Components

* Sidebar navigation
* Top status indicators
* Mission information card
* Mode switcher
* Zoom controls
* Joystick control panel

---

# Project Structure

src/

├── components/

│ ├── Sidebar.jsx

│ ├── TopStatusBar.jsx

│ ├── MissionCard.jsx

│ ├── ModeSwitcher.jsx

│ ├── EmergencyButton.jsx

│ ├── MiniPreview.jsx

│ ├── ZoomControls.jsx

│ └── Joystick.jsx

│

├── pages/

│ ├── CameraView.jsx

│ └── MapView.jsx

│

├── App.jsx

└── main.jsx

---

# Installation

Clone the repository:

git clone <repository-url>

Move into project directory:

cd project-name

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:5173

---

# Assets Used

## Camera Feed

* MP4 video file stored locally

## Map View

* Three.js Grid
* PCD Point Cloud Support

---

# Design Decisions

* Component-based architecture for maintainability
* Framer Motion used for animations and transitions
* Three.js used for 3D visualization
* Tailwind CSS used for rapid UI development
* Responsive design implemented for desktop and mobile devices

---

# Future Improvements

* Live ROS2 Integration
* Real-time Camera Streaming
* Dynamic Robot Telemetry
* Multi-Robot Monitoring
* WebSocket Communication
* Live Point Cloud Updates

---

# Assignment Deliverables

✔ Responsive Dashboard

✔ Camera View

✔ 3D Map View

✔ Point Cloud Support

✔ Interactive UI Components

✔ Local Self-Hosted Setup

✔ Documentation Included

---

Thank you for reviewing my submission.
