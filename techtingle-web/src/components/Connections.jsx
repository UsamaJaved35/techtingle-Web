import React, { useEffect, useState } from "react";
import SmallUserCard from "./SmallUserCard";
import { getConnections } from "../api/user";
import FeedSkeleton from "./skeletons/FeedSkeleton";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchConnections = async () => {
    try {
      setLoading(true);
      getConnections()
        .then((data) => {
          console.log(data);
          setLoading(false);
          setConnections(data?.data?.connections);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading && connections.length === 0)
    return (
      <div className="flex justify-center">
        <FeedSkeleton />
      </div>
    );

  if (!loading && connections.length === 0)
    return (
      <h1 className="text-white text-bold text-center md:text-3xl text-xl py-4">
        No Connections Found 🥺
      </h1>
    );
  return (
    connections && (
      <div>
        <h1 className="text-white text-bold text-center md:text-3xl text-xl py-4">
          Connections
        </h1>
        <div>
          {connections.map((user) => (
            <SmallUserCard
              key={user._id}
              user={user}
              isButtonsRequired={false}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Connections;
