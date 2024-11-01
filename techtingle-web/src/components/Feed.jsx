import React, { useEffect } from "react";
import { feed } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed.feed);

  const getFeed = () => {
    if (feedData) return;
    feed()
      .then((data) => {
        dispatch(addFeed(data?.data?.users));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getFeed();
  });

  return (
    feedData && (
      <div className="flex justify-center my-10">
        {feedData.map((user) => (
          <UserCard key={user._id} user={user} isButtonsRequired={true} />
        ))}
      </div>
    )
  );
};

export default Feed;
