import { useState, useEffect, useRef } from "react";
import ChatBar from "../components/ChatBox";
import InputBox from "../components/InputBar";
import MessageBubble from "../components/MassageBubble";
import { askGemini } from "../api/GeminiAi";
import { Bot, Sparkles, Zap, Camera } from "lucide-react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current && messagesEndRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Function to handle ChatScreen actions from ChatBox component
  const handleChatScreenAction = (actionOrChatItem) => {
    if (typeof actionOrChatItem === 'object' && actionOrChatItem.action === 'CLEAR_AND_START_NEW') {
      // Clear current chat and start fresh
      setMessages([]);
      setInput("");
      setIsLoading(false);
      setIsTyping(false);
      
      // Add welcome message after clearing
      setTimeout(() => {
        setMessages([{
          id: 1,
          sender: "ai",
          message: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date()
        }]);
      }, 100);
    } else if (actionOrChatItem && actionOrChatItem.message) {
      // Load a specific chat from history
      setMessages([
        {
          id: 1,
          sender: "ai",
          message: "Hello! I'm your AI assistant. How can I help you today?",
          timestamp: new Date()
        },
        {
          id: 2,
          sender: "user",
          message: actionOrChatItem.message,
          timestamp: actionOrChatItem.timestamp ? new Date(actionOrChatItem.timestamp) : new Date()
        }
      ]);
    }
  };

  const handleSend = async (selectedImages = []) => {
    if (!input.trim() && selectedImages.length === 0) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: input,
      images: selectedImages,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      let aiReply;
      if (selectedImages.length > 0) {
        aiReply = `I can see you've shared ${selectedImages.length} image(s). I'd love to help analyze them, but image processing isn't fully implemented yet. However, I can help with: ${input || 'discussing what you \'d like to know about these images!'}`;
      } else {
        aiReply = await askGemini(input);
      }

      setIsTyping(false);
      setMessages([...updatedMessages, {
        id: Date.now() + 1,
        sender: "ai",
        message: aiReply,
        timestamp: new Date()
      }]);
    } catch (error) {
      setIsTyping(false);
      setMessages([...updatedMessages, {
        id: Date.now() + 1,
        sender: "ai",
        message: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      }]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceMessage = async (audioBlob, audioUrl) => {
    // Add voice message to chat
    const voiceMessage = {
      id: Date.now(),
      sender: "user",
      message: "🎤 Voice message",
      audioUrl: audioUrl,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, voiceMessage]);

    // Simulate voice-to-text processing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "ai",
        message: "I received your voice message! Voice-to-text processing will be implemented soon. For now, please type your message.",
        timestamp: new Date()
      }]);
    }, 2000);
  };

  const handleImageSelect = (imageFiles) => {
    console.log('Images selected for processing:', imageFiles);
  };

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        sender: "ai",
        message: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date()
      }]);
    }
  }, []);

  const WelcomeScreen = () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Bot size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to AI Chat
        </h2>
        <p className="text-gray-600 mb-8">
          Start a conversation with your AI assistant. Ask questions, share images, or record voice messages!
        </p>
        <div className="grid grid-cols-1 gap-4 text-left">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Sparkles className="text-blue-500" size={20} />
            <span className="text-sm text-gray-700">Ask any question</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Camera className="text-purple-500" size={20} />
            <span className="text-sm text-gray-700">Share images for analysis</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Zap className="text-green-500" size={20} />
            <span className="text-sm text-gray-700">Record voice messages</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar - Pass messages and ChatScreen function */}
      <ChatBar 
        message={messages} 
        ChatScreen={handleChatScreenAction}
      />

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">AI Assistant</h1>
              <p className="text-sm text-gray-500">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white scroll-smooth"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <div className="p-4 space-y-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id || msg.timestamp}
                  sender={msg.sender}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  images={msg.images}
                  audioUrl={msg.audioUrl}
                />
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <MessageBubble
                  sender="ai"
                  message=""
                  isTyping={true}
                />
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <InputBox
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          onImageSelect={handleImageSelect}
          onVoiceMessage={handleVoiceMessage}
          disabled={isLoading}
          placeholder={
            isLoading
              ? "AI is thinking..."
              : "Type your message, add images, or record voice..."
          }
        />
      </div>
    </div>
  );
};

export default Home;