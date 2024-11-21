import React from "react";

const MessageArea = ({ messages, name, imageUrl }) => {
  return (
    <>
      <div className="justify-between p-2 w-full">
        <div className="navbar bg-primary text-primary-content">
          <img
            alt="Tailwind CSS Navbar component"
            className="w-10 h-10 rounded-full"
            src={imageUrl}
          />
          <div className=" px-4 flex-1">
            <h4 className="text-xl">{name}</h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-3/4 w-full bg-base-100 p-4 shadow">
        <div className="mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 ${
                message.isSender ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.isSender
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageArea;
