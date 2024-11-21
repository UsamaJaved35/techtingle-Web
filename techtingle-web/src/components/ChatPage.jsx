import React, { useState } from "react";
import ActiveConversations from "./ActiveConversations";
import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Hello, how can I help you today?",
      isSender: false,
    },
    {
      text: "I need help with my account.",
      isSender: true,
    },
  ]);

  const conversations = [
    {
      id: 1,
      name: "Henry Dholi",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I came across your profile and...",
    },
    {
      id: 2,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 3,
      name: "Henry Dholi",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I came across your profile and...",
    },
    {
      id: 4,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 5,
      name: "Henry Dholi",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I came across your profile and...",
    },
    {
      id: 6,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 7,
      name: "Henry Dholi",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I came across your profile and...",
    },
    {
      id: 8,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 9,
      name: "Henry Dholi",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I came across your profile and...",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    {
      id: 10,
      name: "Mariya Desoja",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "I like your confidence 💪",
    },
    // Add more conversations as needed
  ];

  const handleSend = (text) => {
    setMessages([...messages, { text, isSender: true }]);
  };

  return (
    <div className="flex h-screen">
      {/* <div className="overflow-y-auto scrollbar-hide"> */}
      <ActiveConversations
        conversations={conversations}
        onSelect={(conversation) => {
          setSelectedConversation(conversation);
          setMessages([
            {
              text: "Hello, how can I help you today?",
              isSender: false,
            },
            {
              text: "I need help with my account.",
              isSender: true,
            },
          ]); // Reset messages for demo
        }}
      />
      {/* </div> */}
      <div className="flex flex-col md:flex-grow">
        {selectedConversation ? (
          <>
            <div className="flex-grow overflow-y-auto scrollbar-hide">
              <MessageArea
                messages={messages}
                name={selectedConversation.name}
                imageUrl={selectedConversation.avatar}
              />
            </div>

            {/* Input Area */}
            <div className="border-t">
              <MessageInput onSend={handleSend} />
            </div>
          </>
        ) : (
          <div className="md:flex items-center justify-center text-white hidden">
            Select a connection to start chatting 👋
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
