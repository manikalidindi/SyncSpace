

A Notion-inspired full-stack collaborative workspace platform with AI-powered document assistance, recursive document organization, and a modern rich text editing experience.

---

## 🚀 Features

### 🔐 Authentication & Security

* JWT-based authentication
* Secure login and registration system
* Password hashing with protected routes
* Middleware-based authorization

### 📝 Rich Document Editor

* Block-based editor powered by BlockNote
* Slash commands support
* Checklists, headings, tables, and formatting tools
* Drag-and-drop block reordering

### 📂 Infinite Nested Documents

* Recursive document tree structure
* Create pages inside pages
* Dynamic sidebar navigation
* Scalable workspace organization

### 🤖 AI Assistant

* AI-powered content generation
* Contextual editing and suggestions
* Custom AI API endpoints (`/api/ai`)
* Writing automation workflows

### ⚡ Full CRUD Functionality

* Create, read, update, and delete documents
* MongoDB persistence using Mongoose models
* RESTful API architecture

### 🎨 Modern Workspace UI

* Responsive Notion-inspired design
* Tailwind CSS styling
* Clean and minimal user experience
* Optimized layout for productivity

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* BlockNote Editor

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Tokens)
* bcrypt password hashing

## State Management

* Lightweight custom store (`useStore.js`)

---

# 📁 Project Structure

```bash
mern-ai-workspace/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── ...
│
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js (v16 or later)
* npm
* MongoDB or MongoDB Atlas

---

# 🔧 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/mern-ai-workspace.git
cd mern-ai-workspace
```

---

## 2. Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_ai_api_key
```

---

# ▶️ Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# 🌐 API Endpoints

## Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

## Documents

* `GET /api/documents`
* `POST /api/documents`
* `PUT /api/documents/:id`
* `DELETE /api/documents/:id`

## AI

* `POST /api/ai`

---

# ✨ Highlights

* Recursive document architecture
* AI-assisted productivity workflows
* Rich block-based editing system
* Modern SaaS-inspired UI/UX
* Modular and scalable backend structure

---

# 📌 Future Improvements

* Real-time collaboration
* WebSocket integration
* Team workspaces
* Document sharing & permissions
* Version history
* Dark mode enhancements

---

# 👨‍💻 Author

Mani Kalidindi

---

# 📄 License

This project is licensed under the MIT License.
