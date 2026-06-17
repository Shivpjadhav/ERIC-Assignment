# 🚀 ERIC Robotics Insight.IO Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160.0-000000?logo=three.js)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.3-0055FF?logo=framer)](https://www.framer.com/motion/)

> A professional-grade robotics control dashboard inspired by ERIC Robotics' Insight.IO platform. Built with modern web technologies for real-time robot monitoring and control.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Component Documentation](#component-documentation)
- [Responsive Design](#responsive-design)
- [Animations & Interactions](#animations--interactions)
- [Performance Optimization](#performance-optimization)
- [Browser Compatibility](#browser-compatibility)
- [Troubleshooting](#troubleshooting)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 📖 Overview

The **ERIC Robotics Insight.IO Dashboard** is a full-featured robotics command center interface designed for monitoring and controlling autonomous robots. It combines real-time video feeds, 3D point cloud visualization, and interactive controls in a polished, professional UI.

### Purpose
This dashboard serves as a central control hub for robotics operations, providing:
- Live camera monitoring
- 3D environment mapping
- Real-time telemetry
- Mission control capabilities
- Emergency intervention systems

### Design Philosophy
- **Industrial Aesthetic**: Dark navy themes with glassmorphism
- **Robotics-Grade UI**: Foxglove Studio and RViz inspired
- **Mission-Critical Focus**: Emergency systems prominently placed
- **Intuitive Controls**: Auto/Manual mode switching with visual feedback

---

## ✨ Key Features

### 🎥 Camera View
- **Live Video Feed**: Real-time camera streaming with warehouse simulation
- **HUD Overlay**: Corner brackets, scan line effects, and camera label
- **Video Controls**: Play/Pause functionality
- **Responsive**: Adapts to any screen size

### 🗺️ 3D Map View
- **Point Cloud Visualization**: Interactive 3D environment using Three.js
- **Orbit Controls**: Pan, zoom, and rotate around the scene
- **PCD File Support**: Load and display `.pcd` point cloud files
- **Real-time Robot Tracking**: Animated robot marker with rotating ring
- **Fallback Generation**: Automatically creates a sample point cloud if no PCD file is available

### 📊 Telemetry Status
- **Battery**: 100% with animated pulsing indicator
- **Signal**: Strong signal strength
- **Failsafe**: System health monitoring
- **System**: Overall system status
- **Live Indicators**: Glowing green dots with pulse animation

### 🎮 Mission Control
- **Mission Tracking**: "On Mission 1234" with elapsed timer
- **Pause/Resume**: Control mission timing
- **Stop**: Reset mission timer
- **Status Indicator**: Active mission with pulsing green dot

### 🔄 Mode Switcher
- **AUTO Mode**: Autonomous pilot mode
- **MANUAL Mode**: Manual control override
- **Sliding Indicator**: Smooth spring animation between modes
- **Status Feedback**: Visual indication of current mode

### 🛑 Emergency Systems
- **Emergency Stop**: Industrial-grade emergency button
- **Pulse Animation**: Attention-grabbing glow effect
- **Three-Arrow Design**: Static bold arrows in red center
- **Hover Feedback**: Scale and shadow effects

### 🕹️ Joystick Control
- **WASD Controls**: Directional buttons (W, A, S, D)
- **Drag Functionality**: Click and drag the center joystick
- **Visual Feedback**: Hover animations and depth effects
- **Mobile Friendly**: Touch-optimized for mobile devices

### 📱 Mini Preview
- **View Switching**: Click to toggle between Camera and Map views
- **Live Preview**: Shows actual content of alternate view
- **Glassmorphism**: Premium glass card design
- **Hover Effects**: Scale and glow on interaction

### 🔍 Zoom Controls
- **Zoom In/Out**: Plus and minus buttons
- **Vertical Slider**: Visual zoom level indicator
- **Percentage Display**: Current zoom level shown
- **Hover States**: Interactive button feedback

---

## 🛠️ Tech Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React DOM | 18.2.0 | DOM Rendering |
| Vite | 5.0.8 | Build Tool & Dev Server |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 3.3.6 | Utility-first CSS |
| Inter Font | - | Typography |

### Animations
| Technology | Version | Purpose |
|------------|---------|---------|
| Framer Motion | 11.0.3 | Component Animations |
| CSS Animations | - | Pulse, Spin, Ping effects |

### 3D Visualization
| Technology | Version | Purpose |
|------------|---------|---------|
| Three.js | 0.160.0 | 3D Rendering |
| OrbitControls | - | Camera Controls |
| PCDLoader | - | Point Cloud Loading |

### Icons
| Technology | Version | Purpose |
|------------|---------|---------|
| React Icons | 5.0.1 | Icon Library |

---

## 📁 Project Structure

eric-robotics-dashboard/
├── public/
│ ├── assets/
│ │ ├── videos/
│ │ │ └── warehouse.mp4 # Sample warehouse video
│ │ └── pointcloud/
│ │ └── sample.pcd # Point cloud data file
│ └── vite.svg # Vite icon
│
├── src/
│ ├── components/
│ │ ├── Sidebar.jsx # Navigation sidebar (70px, glass effect)
│ │ ├── TopStatusBar.jsx # Telemetry indicators (Battery, Signal, etc.)
│ │ ├── MissionCard.jsx # Mission control with timer
│ │ ├── ModeSwitcher.jsx # AUTO/MANUAL mode toggle
│ │ ├── EmergencyButton.jsx # Emergency stop with pulse animation
│ │ ├── Joystick.jsx # WASD joystick controller
│ │ ├── MiniPreview.jsx # View switcher preview card
│ │ └── ZoomControls.jsx # Zoom in/out controls
│ │
│ ├── pages/
│ │ ├── CameraView.jsx # Live camera feed with HUD
│ │ └── MapView.jsx # 3D point cloud map view
│ │
│ │
│ ├── App.jsx # Main application component
│ ├── main.jsx # Application entry point
│ └── index.css # Global styles (Tailwind + custom)
│
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # PostCSS configuration
├── vite.config.js # Vite configuration
├── README.md # Documentation
└── .gitignore # Git ignore file

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: For version control

### Step 1: Clone the Repository
```bash
git clone https://github.com/Shivpjadhav/ERIC-Assignment.git
cd eric-robotics-dashboard
