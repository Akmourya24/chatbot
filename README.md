# chatbot

# AI Chat Assistant

This is a React-based AI chat application that leverages Google's Gemini AI API to create an interactive chat experience. The application allows users to have text-based conversations with the AI assistant.

## Features

- Modern, responsive UI designed with Tailwind CSS
- Real-time chat interface
- Support for multiple Gemini AI models
- Secure API key management
- Message history display with timestamps
- Loading indicators for feedback during AI response generation

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- NPM (v8 or later)
- A Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-chat-assistant.git
cd ai-chat-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Using the Application

1. When you first open the application, you'll be prompted to enter your Gemini API key.
2. After connecting with your API key, you can start chatting with the AI assistant.
3. You can select different Gemini models from the dropdown menu in the header.
4. The chat history is maintained during your session.

## Getting a Gemini API Key

To use this application, you'll need a Google Gemini API key:

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Create or sign in to your Google account
3. Get an API key from the API section
4. Use this key when prompted by the application

## Technology Stack

- React 18
- Google Gemini AI API (@google/genai)
- Tailwind CSS for styling
- LocalStorage for API key persistence

## Security Note

The application stores your API key in your browser's local storage for convenience. This means you don't have to re-enter it each time you use the app, but it also means anyone with access to your browser could potentially access your API key. If you're concerned about security, you may want to clear your browser's local storage after using the application.

## Customization

You can customize the appearance and behavior of the application by modifying the source code. The main components are:

- `src/App.jsx`: The main application component
- `src/index.css`: Tailwind CSS imports and custom styles

## License

MIT