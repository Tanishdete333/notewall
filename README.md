# 📝 NoteWall

> A production-ready full-stack sticky note application with private per-user workspaces powered by Clerk authentication.

🔗 **Live Demo:** https://getnotewall.vercel.app/

---

## Overview

NoteWall is a full-stack sticky note application where every user gets their own completely private note board.

Users can create, pin, color-tag, and delete notes through a responsive React interface. Authentication is handled by **Clerk**, ensuring every user's notes remain securely isolated. The backend exposes a REST API built with **Express.js**, while note data is stored in **MongoDB Atlas** using Mongoose schemas.

This project was built from scratch to gain hands-on experience with authentication, protected APIs, database modeling, and production deployment.

---

##Screenshots
<img width="1072" height="588" alt="image" src="https://github.com/user-attachments/assets/cc9ef2ed-c398-4aa0-afc9-cf0db85291c9" />


## Features

- Secure user authentication with Clerk
- Private note board for every account
- Create new notes
- Pin important notes
- Color-tag notes for organization
- Delete notes
- RESTful API
- Responsive interface
- Production deployment

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Clerk Authentication

### Backend

- Node.js
- Express.js
- REST API
- Mongoose ODM

### Database

- MongoDB Atlas

### Authentication

- Clerk
- Protected API routes
- Per-user data isolation

---

## Project Architecture

```
React + Clerk
        │
        ▼
Express REST API
        │
        ▼
MongoDB Atlas
```

---

## Folder Structure

```
notewall/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── ...
│
└── README.md
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/notewall.git
```

### Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

### Run the application

Frontend

```bash
npm run dev
```

Backend

```bash
npm start
```

---

## Environment Variables

Backend

```
MONGODB_URI=
CLERK_SECRET_KEY=
PORT=
```

Frontend

```
VITE_CLERK_PUBLISHABLE_KEY=
```

---
## Security

Every request to the backend is authenticated through Clerk.

Notes are filtered by the authenticated user's unique identifier, ensuring users can only access and manage their own data.

## API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /notes | Fetch authenticated user's notes |
| POST | /notes | Create a new note |
| DELETE | /notes/:id | Delete a note |

*(Update these endpoints if your API differs.)*

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Authentication | Clerk |

---

## Future Improvements

- Edit existing notes
- Drag-and-drop note positioning
- Search notes
- Archive notes
- Reminder system
- Labels and categories
- Rich text support
- Dark mode

---

## Lessons Learned

Building NoteWall helped strengthen my understanding of:

- Authentication and authorization
- Protecting REST APIs
- Per-user data isolation
- MongoDB schema design
- Full-stack application architecture
- Production deployment workflows

---

## Author

**Tanish Dete**

Full Stack Developer

GitHub: https://github.com/Tanishdete333

LinkedIn: https://linkedin.com/in/tanishdete

Portfolio: https://tanishdete.vercel.app
