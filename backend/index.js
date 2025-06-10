import connectDB from "./db/connect.js";
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { app } from "./App.js";
import cors from 'cors';

// Load environment variables first
dotenv.config({ path: "./.env" });
app.use(cors({
  origin: process.env.ORIGIN
}));
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create a global chat instance (shared context)
let chat;

async function initChat() {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Hi! How can I help you today?" }],
        },
      ],
    });
    console.log("Chat initialized successfully");
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    throw error;
  }
}

// 🧠 Route to handle messages
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  if (!chat) {
    return res.status(500).json({ error: "Chat not initialized. Please try again later." });
  }

  try {
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    res.status(500).json({ error: "Failed to get response from Gemini." });
  }
});

// Initialize database and chat, then start server
async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Initialize chat
    await initChat();
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start the application
startServer();