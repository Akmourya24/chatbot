import { useState, useRef } from "react";
import { Send, Paperclip, Mic, Square, Image, X } from "lucide-react";

const InputBar = ({ value, onChange, onSend, onImageSelect, onVoiceMessage, disabled = false, placeholder = "Type your message..." }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if ((value.trim() || selectedImages.length > 0) && !disabled) {
      onSend(selectedImages);
      setSelectedImages([]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        if (onVoiceMessage) {
          onVoiceMessage(audioBlob, audioUrl);
        }

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        setAudioChunks([]);
      };

      setAudioChunks(chunks);
      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = () => {
    imageInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Handle file attachments here
    console.log('Files selected:', files);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file: file,
          url: e.target.result,
          name: file.name
        };
        setSelectedImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });

    if (onImageSelect) {
      onImageSelect(imageFiles);
    }
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => prev.filter(img => img.id !== imageId));
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl">
            {selectedImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <X size={10} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate">
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`flex items-end gap-3 bg-gray-50 rounded-2xl px-4 py-3 transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-20 bg-white shadow-sm' : 'hover:bg-gray-100'
        }`}>

        {/* File Attachment Button */}
        <button
          onClick={handleFileSelect}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-all duration-200 flex-shrink-0 hover:cursor-not-allowedt"
          title="Attach file"
          disabled={true}/* disabled prop can be passed to disable this button */
        >
          <Paperclip size={18} />
        </button>

        {/* Image Selection Button */}
        <button
          onClick={handleImageSelect}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-all duration-200 flex-shrink-0"
          title="Add image"
          disabled={disabled}
        >
          <Image size={18} />
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            placeholder={placeholder}
            className="w-full bg-transparent resize-none border-none outline-none text-gray-800 placeholder-gray-500 py-2 max-h-32 min-h-[24px] leading-6"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            rows={1}
            style={{
              height: 'auto',
              minHeight: '24px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
            }}
          />
        </div>

        {/* Voice Recording Button */}
        <button
          onClick={toggleRecording}
          className={`p-2 rounded-xl transition-all duration-200 flex-shrink-0 ${isRecording
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
            }`}
          title={isRecording ? "Stop recording" : "Voice message"}
        >
          {isRecording ? <Square size={18} /> : <Mic size={18} />}
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={(!value.trim() && selectedImages.length === 0) || disabled}
          className={`p-2 rounded-xl transition-all duration-200 flex-shrink-0 ${(value.trim() || selectedImages.length > 0) && !disabled
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          title="Send message"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept="*/*"
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center mt-3 text-red-500 animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping"></div>
          <span className="text-sm font-medium">Recording...</span>
        </div>
      )}

      {/* Character Count (optional) */}
      {value.length > 100 && (
        <div className="flex justify-end mt-2">
          <span className={`text-xs ${value.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
            {value.length}/1000
          </span>
        </div>
      )}
    </div>
  );
};

export default InputBar;