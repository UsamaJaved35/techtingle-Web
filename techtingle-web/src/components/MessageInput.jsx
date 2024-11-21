import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(""); // Clear the input
    }
  };

  return (
    <div className="flex items-center p-4 border-t bg-base-100 pb-24">
      <input
        type="text"
        className="flex-1 p-4 border rounded mr-2"
        placeholder="Type something here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-3 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
