import React, { useEffect, useState } from "react";
import { feed } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./userCard";
import FeedSkeleton from "./skeletons/FeedSkeleton";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed.feed);
  const [loading, setLoading] = useState(false);

  const getFeed = () => {
    if (feedData) return;
    feed()
      .then((data) => {
        dispatch(addFeed(data?.data?.users));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getFeed();
  });

  return (
    <div className="flex justify-center my-10">
      {loading && <FeedSkeleton />}
      {!loading && !feedData && <h1>No Feed Found</h1>}
      {!loading &&
        feedData &&
        feedData.map((user) => (
          <UserCard key={user._id} user={user} isButtonsRequired={true} />
        ))}
    </div>
  );
};

export default Feed;
