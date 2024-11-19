import React, { useEffect, useMemo, useState } from "react";
import { feed, reviewConnection } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../store/feedSlice";
import UserCard from "./UserCard";
import FeedSkeleton from "./skeletons/FeedSkeleton";
import { useSwipeable } from "react-swipeable";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed.feed);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStyle, setDragStyle] = useState({});
  const swipeSound = useMemo(() => new Audio("../../assets/swipe.mp3"), []);

  const getFeed = () => {
    if (feedData) return;
    setLoading(true);
    feed()
      .then((data) => {
        dispatch(addFeed(data?.data?.users));
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => setLoading(false));
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSwipe = (direction) => {
    const status = direction === "Left" ? "ignored" : "interested";
    const userId = feedData[currentIndex]?._id;
    swipeSound.play();
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < feedData.length ? prevIndex + 1 : prevIndex
    );
    setDragStyle({});
    dispatch(removeUserFromFeed(userId));

    reviewConnection(status, userId).catch((err) => {
      console.error("Error reviewing connection:", err);
    });
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (eventData) => {
      if (currentIndex < feedData.length) {
        setDragStyle({
          transform: `translate(${eventData.deltaX}px, ${
            eventData.deltaY
          }px) rotate(${eventData.deltaX * 0.08}deg)`,
          transition: "transform 0.05s ease",
        });
      }
    },
    onSwipedLeft: () => handleSwipe("Left"),
    onSwipedRight: () => handleSwipe("Right"),
    onSwiped: () => setDragStyle({}), // Reset style when swipe ends
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable mouse dragging for desktop
  });

  return (
    <div className="flex justify-center my-10 relative">
      {loading && <FeedSkeleton />}
      {!loading && (!feedData || currentIndex >= feedData.length) && (
        <h1 className="md:text-3xl text-xl ">No More Users Found</h1>
      )}
      {!loading && feedData && currentIndex < feedData.length && (
        <div
          {...swipeHandlers}
          className="absolute transition-transform duration-300 ease-in-out"
          style={{
            ...dragStyle,
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        >
          <UserCard user={feedData[currentIndex]} />
        </div>
      )}
      {feedData && currentIndex < feedData.length && (
        <div className="flex justify-around w-full md:mt-[35%] relative mt-[140%]">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-3">
              <img
                src="../../assets/swipe_left.png"
                alt="Swipe Left"
                className="w-12 h-12 mb-2"
              />
            </div>
            <span className="text-sm py-1">Swipe Left to Ignore</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-3">
              <img
                src="../../assets/swipe_right.png"
                alt="Swipe Right"
                className="w-12 h-12 mb-2"
              />
            </div>
            <span className="text-sm py-1">Swipe Right to Connect</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
