import React from "react";

const SmallUserCard = ({
  user,
  isButtonsRequired,
  handleReviewRequest,
  requestId,
}) => {
  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-md max-w-sm flex items-center h-40 my-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-row items-center p-4">
          {/* Profile Picture */}
          <img
            className="w-16 h-16 rounded-full shadow-md mr-4"
            src={user.photoUrl}
            alt="User image"
          />
          <div className="flex flex-col justify-center">
            {/* User Name */}
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h5>
            {/* User Bio */}
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mt-2">
              {user.about}
            </p>
          </div>
        </div>
        {/* Buttons */}
        {isButtonsRequired && (
          <div className="ml-auto flex flex-col items-center p-4 space-y-2">
            <button
              className="border border-green-400 text-green-400 font-bold px-3 py-2 rounded hover:bg-green-600 hover:text-black transition"
              onClick={() => handleReviewRequest("accepted", requestId)}
            >
              Accept
            </button>
            <button
              className="border border-red-400 text-red-400 font-bold px-3 py-2 my-4 rounded hover:bg-red-600 hover:text-black transition"
              onClick={() => handleReviewRequest("rejected", requestId)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallUserCard;
