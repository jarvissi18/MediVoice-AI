<div align="center">

# 🏥 MediVoice AI

### AI-Powered Hospital Management System with Voice Assistant

<p align="center">

Modern Hospital Management Platform built using
<strong>React • FastAPI • PostgreSQL • SQLAlchemy • JWT Authentication</strong>

</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

## 🚀 Overview

**MediVoice AI** is a modern AI-powered Hospital Management System designed to simplify hospital operations through intelligent automation, secure authentication, and voice-assisted workflows.

The platform enables hospital administrators and receptionists to efficiently manage patients, monitor analytics, maintain user accounts, and streamline healthcare operations through an intuitive dashboard.

The application follows a scalable client-server architecture with a React frontend, FastAPI backend, PostgreSQL database, and secure JWT-based authentication.

---

# ✨ Key Features

### 🔐 Authentication

- Secure JWT Authentication
- Role-Based Access Control
- Protected Routes
- Password Encryption
- Session Management

---

### 👨‍⚕️ Patient Management

- Add New Patients
- Update Patient Records
- Delete Patients
- Search Patients
- Patient Profile Management

---

### 📊 Analytics Dashboard

- Hospital Statistics
- Interactive Charts
- Patient Insights
- Real-Time Dashboard
- Performance Metrics

---

### 👥 User Management

- Administrator Access
- Receptionist Access
- User Roles
- User Management Panel

---

### 🎤 AI Voice Features

- Voice Assisted Patient Entry
- AI Integrated Workflow
- Faster Registration Process

---

### ⚙️ Settings

- System Configuration
- User Preferences
- Voice Settings
- Application Settings

---

## 📸 Project Preview

Screenshots of the application are available below.
---

# 📸 Application Screenshots

## 🔐 Login Page

<img src="docs/login.png" width="100%" alt="Login Page"/>

---

## 📊 Dashboard

<img src="docs/dashboard.png" width="100%" alt="Dashboard"/>

---

## 👥 Patient Management

<img src="docs/patient_management.png" width="100%" alt="Patient Management"/>

---

## ➕ Add New Patient

<img src="docs/add_new_patient.png" width="100%" alt="Add Patient"/>

---

## 📈 Analytics Dashboard

### Analytics Overview

<img src="docs/analytics1.png" width="100%" alt="Analytics"/>

### Performance Insights

<img src="docs/analytics2.png" width="100%" alt="Analytics"/>

### Reports & Charts

<img src="docs/analytics3.png" width="100%" alt="Analytics"/>

---

## 👤 User Management

<img src="docs/users.png" width="100%" alt="Users"/>

---

# 🛠 Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- React Toastify

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- JWT Authentication
- Passlib (bcrypt)
- Pydantic

---

## Database

- PostgreSQL

---

## AI Integration

- Google Gemini AI
- Voice Assisted Workflow

---

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- Swagger UI

---

# 🏗 System Architecture

```text
                +----------------------+
                |      React UI        |
                +----------+-----------+
                           |
                           |
                     Axios REST API
                           |
                           ▼
                +----------------------+
                |      FastAPI         |
                | Authentication       |
                | Patient APIs         |
                | Analytics APIs       |
                | Voice APIs           |
                +----------+-----------+
                           |
                    SQLAlchemy ORM
                           |
                           ▼
                +----------------------+
                |     PostgreSQL       |
                +----------------------+

                           |
                           ▼

                 Google Gemini AI
```

---

# 📂 Project Structure

```text
MediVoice-AI
│
├── backend
│   ├── app
│   │   ├── ai
│   │   ├── auth
│   │   ├── routers
│   │   ├── database.py
│   │   ├── models.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── routes
│   │   ├── contexts
│   │   └── types
│   │
│   ├── package.json
│   └── ...
│
├── docs
│   ├── login.png
│   ├── dashboard.png
│   ├── patient_management.png
│   ├── add_new_patient.png
│   ├── analytics1.png
│   ├── analytics2.png
│   ├── analytics3.png
│   └── users.png
│
├── README.md
└── LICENSE
```

---

# 🧩 Core Modules

- Authentication
- Dashboard
- Patient Management
- Analytics
- User Management
- Voice Assistant
- Settings
- Database Layer
- REST APIs

---

# ⚙️ Installation Guide

## Prerequisites

Before running the project, make sure the following software is installed:

- Python 3.11+
- Node.js 20+
- PostgreSQL 16+
- Git
- VS Code (Recommended)

---

# 📥 Clone Repository

```bash
git clone https://github.com/jarvissi18/MediVoice-AI.git
```

```bash
cd MediVoice-AI
```

---

# 🖥 Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate the environment

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend server

```bash
uvicorn app.main:app --reload
```

Backend will start on:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 💻 Frontend Setup

Open another terminal.

Move into frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Run frontend.

```bash
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# 🗄 Database Configuration

Database Used

- PostgreSQL

Example configuration

```
Database Name : medivoice_ai
Host          : localhost
Port          : 5432
```

The application uses SQLAlchemy ORM for database communication.

---

# 🔐 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/medivoice_ai

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=1440

GEMINI_API_KEY=your_google_gemini_api_key
```

> Never commit the `.env` file to GitHub.

---

# 🔑 Authentication

The application implements secure authentication using JWT.

Features include:

- Login Authentication
- Password Hashing
- JWT Token Generation
- Protected Routes
- Role-Based Authorization
- Session Validation

---

# 📡 REST API Modules

The backend exposes APIs for:

- Authentication
- Dashboard
- Patient Management
- Analytics
- User Management
- Voice Assistant
- Settings

---

# 🧪 Testing the Application

After starting both frontend and backend:

- Open the Login Page
- Sign in with a valid account
- Access Dashboard
- Add a Patient
- Search Patient Records
- View Analytics
- Manage Users
- Test Voice Features

---

# ⚡ Performance Highlights

- FastAPI asynchronous backend
- Optimized SQLAlchemy queries
- PostgreSQL relational database
- Modular React components
- JWT-based stateless authentication
- Responsive Tailwind CSS interface

---

# 🔒 Security Features

MediVoice AI is designed with security and reliability in mind.

### Authentication Security

- JWT-based Authentication
- Secure Password Hashing using bcrypt
- Protected API Routes
- Role-Based Access Control (RBAC)
- Token Validation
- Session Management

---

### Database Security

- SQLAlchemy ORM
- Parameterized Queries
- PostgreSQL Relational Database
- Data Integrity Constraints

---

### Frontend Security

- Protected Routes
- Secure API Communication
- Axios Request Interceptors
- Input Validation

---

### Backend Security

- FastAPI Validation
- Pydantic Request Validation
- Exception Handling
- Structured API Responses

---

# 📈 Project Roadmap

### Completed

- User Authentication
- JWT Authorization
- Dashboard
- Patient Management
- User Management
- Analytics Dashboard
- Voice Integration
- Responsive UI
- PostgreSQL Integration
- FastAPI Backend

---

### In Progress

- AI Voice Commands
- Smart Patient Search
- Enhanced Analytics

---

### Planned Features

- Appointment Scheduling
- Electronic Medical Records (EMR)
- Prescription Management
- Billing & Payments
- Doctor Management
- Department Management
- File Uploads
- PDF Report Generation
- Email Notifications
- SMS Notifications
- Audit Logs
- Multi-language Support
- Dark Mode
- Docker Support
- CI/CD Pipeline
- Cloud Deployment

---

# 📊 Performance Goals

- Fast Page Load
- Optimized API Response
- Scalable Architecture
- Modular Components
- Clean Code Structure
- Reusable Components
- Responsive Design

---

# 📚 Learning Outcomes

This project demonstrates practical experience with:

- React
- TypeScript
- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- REST APIs
- Tailwind CSS
- AI Integration
- CRUD Operations
- Role-Based Access Control
- Component-Based Architecture
- Full-Stack Development

---

# 🤝 Contributing

Contributions are welcome.

If you'd like to improve this project:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📝 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project under the terms of the MIT License.

See the `LICENSE` file for more information.

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the following technologies:

- React
- FastAPI
- PostgreSQL
- SQLAlchemy
- Tailwind CSS
- Vite
- Lucide React
- JWT
- Google Gemini AI

---

# ⭐ Support

If you found this project useful:

- ⭐ Star this repository
- 🍴 Fork the repository
- 💡 Share feedback
- 🛠 Suggest improvements

Your support helps improve the project and motivates future development.

---

# 👨‍💻 Author

<div align="center">

## Harshad

**Computer Engineering Student | Full-Stack Developer | AI Enthusiast**

Building modern AI-powered applications with a focus on scalable architecture, clean UI, and real-world problem solving.

</div>

---

# 📬 Connect With Me

<p align="center">

<a href="https://github.com/jarvissi18">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://www.linkedin.com/">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin"/>
</a>

<a href="mailto:your-email@example.com">
<img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

</p>

> **Update the LinkedIn URL and Email with your own details.**

---

# 💡 Why MediVoice AI?

Healthcare systems require speed, security, and simplicity.

MediVoice AI was developed to demonstrate how Artificial Intelligence and modern web technologies can simplify hospital workflows through secure authentication, intelligent dashboards, role-based access control, and AI-assisted operations.

This project showcases practical full-stack software engineering principles while focusing on usability, scalability, and maintainability.

---

# 🌟 Key Highlights

- Modern React + TypeScript Frontend
- FastAPI Backend
- PostgreSQL Database
- SQLAlchemy ORM
- JWT Authentication
- Role-Based Authorization
- AI Voice Integration
- Analytics Dashboard
- Responsive UI
- Modular Architecture
- Enterprise-Inspired Design

---

# 📊 Repository Statistics

Project Type

```
Full Stack Web Application
```

Architecture

```
Client → REST API → Database
```

Backend

```
FastAPI + SQLAlchemy
```

Frontend

```
React + TypeScript
```

Database

```
PostgreSQL
```

Authentication

```
JWT + bcrypt
```

---

# 🚀 Future Vision

The long-term goal of MediVoice AI is to evolve into a complete AI-powered Hospital Management Platform featuring:

- AI Medical Assistant
- Speech-to-Text Consultation
- Electronic Health Records (EHR)
- Doctor Appointment Scheduling
- Intelligent Reporting
- Predictive Analytics
- Cloud Deployment
- Multi-Hospital Support
- Mobile Application
- AI Chat Assistant
- OCR-Based Document Processing
- Real-Time Notifications

---

# ⭐ If You Like This Project

If you found this project useful:

- ⭐ Star this repository
- 🍴 Fork the project
- 🛠️ Contribute with improvements
- 📢 Share it with others

---

<div align="center">

## 🏥 MediVoice AI

### Intelligent Healthcare. Smarter Every Day.

Made with ❤️ using React, FastAPI, PostgreSQL & AI

© 2026 Swapnil. Licensed under the MIT License.

</div>
