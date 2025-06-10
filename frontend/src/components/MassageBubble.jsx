import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const MessageBubble = ({ sender, message, timestamp }) => {
  const [copied, setCopied] = useState(false);
  const isUser = sender === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div className="flex flex-col max-w-xs lg:max-w-md group">
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
            isUser 
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-sm" 
              : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm hover:border-gray-200"
          }`}
          style={{
            animation: 'slideUp 0.3s ease-out'
          }}
        >
          <div className="text-sm leading-relaxed break-words">
            {message}
          </div>
          
          {/* Copy button for non-user messages */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm border border-gray-200"
              title="Copy message"
            >
              {copied ? (
                <Check size={10} className="text-green-600" />
              ) : (
                <Copy size={10} className="text-gray-600" />
              )}
            </button>
          )}
          
          {/* Message tail */}
          <div className={`absolute w-2 h-2 ${
            isUser 
              ? "bg-blue-600 -bottom-1 -right-1" 
              : "bg-white border-b border-r border-gray-100 -bottom-1 -left-1"
          } rotate-45`}></div>
        </div>
        
        {/* Timestamp */}
        {timestamp && (
          <div className={`text-xs text-gray-500 mt-1 px-2 ${
            isUser ? "text-right" : "text-left"
          }`}>
            {new Date(timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MessageBubble;