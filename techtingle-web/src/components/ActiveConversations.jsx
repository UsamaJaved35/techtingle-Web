import React from "react";

const ActiveConversations = ({ conversations, onSelect }) => {
  return (
    <div className="bg-gray-600 p-4 md:w-1/4 overflow-y-auto scrollbar-hide pb-16">
      <h2 className="text-lg font-bold mb-4 text-white">Connections</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="flex items-center p-4 mb-2 bg-base-100 shadow rounded cursor-pointer hover:bg-base-200"
            onClick={() => onSelect(conversation)}
          >
            <img
              src={conversation.avatar}
              alt="User Avatar"
              className="md:w-10 md:h-10 w-6 h-6 rounded-full mr-2"
            />
            <div>
              <p className="font-bold truncate">{conversation.name}</p>
              <p className="md: text-sm text-white truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveConversations;
