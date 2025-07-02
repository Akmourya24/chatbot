import { useState, useEffect, useRef } from "react";
import {
  Plus, MessageSquare, Clock, User,
  ChevronRight, Trash2, LogOut,
  LogIn
} from "lucide-react";

import AuthComponent from "./auth/AuthComponents"

const ChatBox = ({ message, ChatScreen, WelcomeScreen }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const historyListRef = useRef(null);

  // 🔐 Auth Modal control
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleOpenAuth = () => setShowAuthModal(true);
  const handleCloseAuth = () => setShowAuthModal(false);

  const handleDeleteItem = (id) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  const getFirstUserMessage = (messages) => {
    if (!Array.isArray(messages)) return '';
    const userMessage = messages.find(msg => msg.sender === 'user');
    return userMessage ? userMessage.message : '';
  };

  const handleNewChat = () => {
    let messageText = '';
    if (Array.isArray(message) && message.length > 0) {
      messageText = getFirstUserMessage(message);
    } else if (typeof message === 'string') {
      messageText = message;
    } else if (message && typeof message === 'object' && message.message) {
      messageText = String(message.message);
    }

    if (messageText && messageText.trim() !== '' && messageText !== "Hello! I'm your AI assistant. How can I help you today?") {
      const newChatItem = {
        id: Date.now(),
        message: messageText.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };
      setHistoryItems(prev => [...prev, newChatItem]);
    }

    if (ChatScreen) {
      ChatScreen({ action: 'CLEAR_AND_START_NEW' });
    }
  };

  const handleLoadChat = (chatItem) => {
    if (ChatScreen) {
      ChatScreen(chatItem);
    }
  };

  useEffect(() => {
    if (historyListRef.current) {
      historyListRef.current.scrollTop = historyListRef.current.scrollHeight;
    }
  }, [historyItems]);

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 transition-all duration-300">
        <aside
          className="w-64 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 p-4 space-y-6 h-full shadow-sm
          fixed md:static top-0 left-0 z-40"
        >

          {/* Header */}
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <MessageSquare className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">AI Chatbot</h2>
                <p className="text-xs text-gray-500">Your AI Assistant</p>
              </div>
            </div>
          </div>


          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
            <span className="font-medium">New Chat</span>
          </button>

          {/* History */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-gray-500" />
              <h3 className="font-semibold text-gray-800">Recent Chats</h3>
            </div>
            <div className="space-y-1 h-56 overflow-y-auto" ref={historyListRef}>
              {historyItems.length === 0 ? (
                <p className="text-xs text-gray-400 italic p-3">No recent chats</p>
              ) : (
                historyItems.slice().reverse().map((chatItem) => (
                  <div
                    key={chatItem.id}
                    className="group relative"
                    onMouseEnter={() => setHoveredItem(chatItem.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      onClick={() => handleLoadChat(chatItem)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-200"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {chatItem.message.length > 30
                            ? `${chatItem.message.substring(0, 30)}...`
                            : chatItem.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{chatItem.timestamp}</p>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <ChevronRight size={14} className="text-gray-400" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(chatItem.id);
                          }}
                          className="p-1 hover:bg-red-100 rounded-md transition-colors duration-200"
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Account Section */}
          <div className="pt-4 border-t border-gray-200 relative ">
            <div
              className="flex items-center space-x-3 p-3 hover:bg-white hover:shadow-sm cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0 absolute">
                <p className="text-sm font-medium text-gray-700 truncate ml-8">Account</p>
                <p className="text-xs text-gray-500 ml-8">Free Plan</p>
              </div>
              <ChevronRight size={14} className="text-gray-400 relative left-16" />
            </div>

            <div
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 cursor-pointer"
              onClick={handleOpenAuth}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <LogIn size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">Log in</p>
              </div>
              <ChevronRight size={14} className="text-gray-400 relative right-20" />
            </div>
          </div>
        </aside>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-1 max-w-sm w-full relative">
              <button
                onClick={handleCloseAuth}
                className="absolute top-4 right-5 text-gray-600 hover:text-gray-800 z-50 font-bold"
              >
                ✕
              </button>
              <AuthComponent />
            </div>
          </div>
        )}

        {/* Welcome Screen */}
        {showWelcome && <WelcomeScreen />}

      </div>
    </>
  );
};

export default ChatBox;
