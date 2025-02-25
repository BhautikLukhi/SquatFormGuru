# Squat Form Guru

**Squat Form Guru**  leverages computer vision and pose estimation to provide feedback on gym form. It counts repetitions, angles, gauge meter, progress, analyzes exercise posture, and offers personalized coaching to help users perfect their workout technique and reduce the risk of injury.

## Features

- **Real-Time Pose Estimation:**  
  Utilizes pre-trained models from MediaPipe to detect key body points in exercise videos.
- **Form Analysis:**  
  Compares user movements against thresholds and provides actionable suggestions for improvement.
- **Rep Counting:**  
  Automatically counts exercise repetitions using movement analysis algorithms.


## Project Structure

```plaintext
SquatFormGuru/
├─ backend/
│   ├─ server.js             (Node backend for file uploads & listing)
│   ├─ video_processing.py   (Python backend for pose estimation)
│   ├─ requirements.txt      (Python dependencies)
│   └─ ...
├─ build/                    (Production build folder from React)
├─ node_modules/             (Installed dependencies for React)
├─ public/                   (Public assets for React)
├─ src/                      (React source code)
│   └─ App.js                (Main React component)
├─ uploads/                  (Folder for uploaded files; created at runtime)
├─ package.json              (React project config)
├─ package-lock.json         (Exact dependency lock for React)
└─ README.md                 (This file)
```


## Getting Started

Follow these instructions to set up and run Gym Form Guru locally.

### Prerequisites

  - Python 3.8+  
  - pip (Python package manager)
  - Virtual environment tool (venv or virtualenv)
  - Node.js and npm

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/SquatFormGuru.git
   cd SquatFormGuru

2. **start node backend:**

   ```bash
   cd backend
   node server.js
   

3. **Start python server**

   ```bash
   python video_processing.py

4. **start react app:**

   ```bash
   cd ..
   npm start

