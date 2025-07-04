import axios from "axios";

export const askGemini = async (message) => {
  try {
    const res = await axios.post("http://localhost:5000/api/chat", {
      message,
    });

    return res.data.reply;
  } catch (error) {
    console.error("Gemini request failed:", error);
    throw new Error("Failed to fetch response from Gemini AI");
  }
};
