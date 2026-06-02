# LLM Playground App

A full-stack AI chat application built with FastAPI, Next.js, and Ollama, designed to demonstrate practical AI engineering concepts including backend API development, local LLM integration, frontend development, and conversational interfaces.

## Features

* AI-powered chat interface
* FastAPI backend API
* Ollama integration
* Llama 3 support
* Chat history management
* Settings panel
* Responsive user interface
* Real-time AI responses
* Local LLM execution
* REST API architecture

---

## Tech Stack

### Backend

* Python 3.14
* FastAPI
* Uvicorn
* Ollama

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

### AI Model

* Llama 3
* Ollama Runtime

---

## Project Structure

```text
LLM_Playground_App/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── docker/
├── docs/
└── README.md
```

---

## Architecture

```text
User Interface (Next.js)
          │
          ▼
FastAPI Backend
          │
          ▼
Ollama Service
          │
          ▼
Llama 3 Model
          │
          ▼
AI Response
```

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Mastean12/LLM_Playground_App.git

cd LLM_Playground_App
```

### 2. Backend Setup

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt
```

Start backend:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

### 3. Install Ollama

Download Ollama and pull Llama 3:

```bash
ollama pull llama3
```

Test model:

```bash
ollama run llama3
```

---

### 4. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

## API Endpoints

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "healthy",
  "service": "llm-playground-api"
}
```

### Chat Endpoint

```http
POST /api/v1/chat
```

Request:

```json
{
  "prompt": "What is Artificial Intelligence?"
}
```

Response:

```json
{
  "response": "Artificial Intelligence is..."
}
```

---

## Learning Objectives

This project was built to gain hands-on experience with:

* Large Language Models (LLMs)
* AI Application Development
* FastAPI
* Next.js
* REST APIs
* Ollama
* Prompt Engineering
* Frontend–Backend Integration
* Git & GitHub Workflow

---

## Future Improvements

* User authentication
* Streaming responses
* Multiple model support
* Dark mode
* Docker deployment
* PostgreSQL integration
* Redis caching
* Cloud deployment
* Conversation memory

---

## Version

Current Release:

```text
v1.0.0
```

---

## Author

Stephen Mariga

AI Engineer | Data Analyst | Software Developer

GitHub:
https://github.com/Mastean12
