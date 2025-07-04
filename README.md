# OpenBot - AI Chatbot Web App

OpenBot is a modern AI chatbot web application built with React.js (frontend) and Node.js/Express (backend). It features user authentication, chat history, image and voice message support, and integrates with the Gemini AI API for intelligent responses.

---

## Features

- 💬 **AI Chat**: Chat with an AI assistant powered by Gemini AI.
- 🖼️ **Image Support**: Upload images for analysis (demo).
- 🎤 **Voice Messages**: Record and send voice messages (demo).
- 🕒 **Chat History**: View and manage recent chats.
- 🔐 **User Authentication**: Register, login, and logout (demo or real backend).
- 🌙 **Modern UI**: Responsive, clean, and mobile-friendly design using Tailwind CSS.
- ⚡ **Fast**: Built with Vite for instant reloads and fast builds.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **AI Integration**: Gemini AI API (Google Generative AI)
- **Authentication**: JWT, bcrypt (backend), demo mode (frontend)
- **Other**: Axios, Lucide React Icons

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/openbot.git
cd openbot
```

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file with your MongoDB URI and Gemini API key
cp .env.example .env
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

- Frontend runs on [http://localhost:5173](http://localhost:5173)
- Backend runs on [http://localhost:5000](http://localhost:5000)

---

## Environment Variables

**Backend (`backend/.env`):**
```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
ORIGIN=http://localhost:5173
```

---

## Folder Structure

```
openbot/
  backend/
    controller/
    models/
    routes/
    ...
  frontend/
    src/
      components/
      pages/
      api/
      ...
```

---

## Screenshots

> _Add screenshots of your app UI here!_

---

## License

MIT

---

## Credits

- [Google Gemini AI](https://ai.google.dev/)
-[Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Made with ❤️ by [Alok Mourya]**