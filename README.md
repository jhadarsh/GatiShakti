# 🏙️ GatiShakti — AI-Powered Smart City Platform

> Smarter roads. Safer cities. Empowered citizens.

GatiShakti is an AI-powered smart city platform that enables real-time route optimization, traffic intelligence, and public issue reporting for safer and more efficient urban mobility. It combines live camera feeds, user complaints, and intelligent insights to improve decision-making and enhance city infrastructure management.

🌐 **Live Demo:** [gatishakti.netlify.app](https://gatishakti.netlify.app)  
🤖 **ML Models Repo:** [github.com/jhadarsh/GatiShakti-ML](https://github.com/jhadarsh/GatiShakti-ML)

---

## 📊 System Architecture

![GatiShakti Data Flow Diagram](./Data%20Flow%20Diagram.png)

The platform operates across two primary sides — **User** and **Admin** — both backed by a shared MongoDB database, live camera feeds, and external APIs.

---

## ✨ Features

### 👤 User Side
- **Plan Your Journey** — Get live traffic signal data at each signal along your route to optimize travel time
- **Raise Complaints** — Report potholes, broken infrastructure, or civic issues with image uploads and upvote support
- **Parking Booking** — Browse available parking slots in real time and book them seamlessly

### 🛡️ Admin Side
- **City-Wide Traffic Dashboard** — Monitor and control traffic lights across the city in real time
- **Bus Lane Violation Management** — Generate challans for vehicles violating bus lane rules
- **Vehicle Breakdown Alerts** — Receive instant alerts when a breakdown is detected on any road segment
- **Pothole Detection** — Get notified of newly detected potholes from live camera feeds
- **Sewage Overflow Dashboard** — Monitor sewage overflow predictions citywide
- **Parking Management** — Oversee all parking lots, occupancy, and bookings from a single panel
- **Complaint Management** — Review, respond to, and resolve citizen-reported complaints

### 🤖 Bhashini AI Bot
Integrated with the **Bhashini API** to provide a multilingual AI assistant, helping citizens interact with the platform in their native language.

---

## 🧠 AI/ML Models (TrafficAI)

The intelligence layer powering GatiShakti is **TrafficAI** — a suite of computer vision models built with **FastAPI**, **YOLO11**, **OpenCV**, and **Python**.

> 📁 All models are maintained separately at: [github.com/jhadarsh/GatiShakti-ML](https://github.com/jhadarsh/GatiShakti-ML)

| Model | Description |
|---|---|
| 🚥 **Traffic Signal Optimization** | Adaptive signal timing using real-time vehicle density from live feeds |
| 🚌 **Bus Lane Violation Detection** | Detects unauthorized vehicles in dedicated bus lanes |
| 🅿️ **Parking Occupancy Detection** | Polygon-based per-slot occupancy detection using YOLO + OpenCV |
| 🕳️ **Pothole Detection** | Identifies potholes from road camera footage |
| 🚗 **Vehicle Breakdown Detection** | Flags stalled vehicles on road segments |
| 🌊 **Sewage Overflow Prediction** | Predicts overflow events using sensor and MCD data via External API |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB |
| AI/ML | Python, FastAPI, YOLO11, OpenCV |
| Deployment | Netlify (Frontend), Render (Backend) |
| Language AI | Bhashini API |
| External Data | MCD API (Sewage), Live Camera Feeds |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- MongoDB instance (local or Atlas)

### Clone the Repository

```bash
git clone https://github.com/jhadarsh/GatiShakti.git
cd GatiShakti
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd Backend
npm install
node index.js
```

Backend runs on `http://localhost:8080` by default.

### ML Models Setup

Refer to the [GatiShakti-ML repository](https://github.com/jhadarsh/GatiShakti-ML) for model setup instructions. FastAPI server serves predictions via REST endpoints consumed by the backend.

---

## 🌐 Deployment

| Service | URL |
|---|---|
| Frontend | [gatishakti.netlify.app](https://gatishakti.netlify.app) |
| Backend API | [gatishakti-backend.onrender.com](https://gatishakti-backend.onrender.com) |

---

## 📁 Repository Structure
GatiShakti/

├── Frontend/          # React + Vite application

├── Backend/           # Node.js + Express API server

├── Models/            # Model integration configs

├── Data Flow Diagram.png

├── netlify.toml

└── .gitignore


---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

 

 

> Built with ❤️ for smarter, safer Indian cities.
