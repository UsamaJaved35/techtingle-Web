import React from "react";

const FeedSkeleton = () => {
  return (
    <div>
      <div className="flex w-80 flex-col gap-4 my-20">
        <div className="skeleton h-40 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="flex justify-center gap-4">
          <div className="skeleton h-12 w-16"></div>
          <div className="skeleton h-12 w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedSkeleton;
