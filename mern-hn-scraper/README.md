# MERN Hacker News Scraper

A full-stack MERN application that scrapes top stories from Hacker News, stores them in MongoDB, and allows authenticated users to bookmark stories.

---

# Features

## Backend
- Scrape top 10 stories from Hacker News
- Store stories in MongoDB
- JWT Authentication
- Register/Login APIs
- Bookmark stories
- Protected routes
- RESTful API structure

## Frontend
- React + Vite
- React Router
- Context API authentication
- Login/Register pages
- Story listing page
- Bookmark functionality
- Protected bookmarks page

---

# Tech Stack

## Frontend
- React
- React Router DOM
- Axios

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cheerio
- Axios

---

# Folder Structure

backend/
├── src/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ └── app.js
├── server.js
└── .env

frontend/
├── src/
│ ├── api/
│ ├── context/
│ ├── pages/
│ └── App.jsx

---

# Environment Variables

## Backend (.env)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hn-scraper
JWT_SECRET=supersecretkey
```

---

# Installation

## Clone Repository

```bash
git clone <your-repo-url>
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Endpoints

## Auth APIs

### Register
POST /api/auth/register

### Login
POST /api/auth/login

---

## Story APIs

### Get All Stories
GET /api/stories

### Get Single Story
GET /api/stories/:id

### Toggle Bookmark
POST /api/stories/:id/bookmark

### Get Bookmarks
GET /api/stories/bookmarks/all

---

# Scraper

The scraper:
- runs automatically on server start
- can also be triggered manually

### Trigger Scraper
POST /api/scrape

---

# Author

Vaibhav