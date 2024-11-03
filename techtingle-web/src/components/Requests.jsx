import React, { useEffect, useState } from "react";
import { getRequests, reviewRequest } from "../api/user";
import SmallUserCard from "./SmallUserCard";
import FeedSkeleton from "./skeletons/FeedSkeleton";
import Toast from "./Toast";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    isError: false,
    message: "",
  });
  const fetchRequests = async () => {
    try {
      setLoading(true);
      getRequests()
        .then((data) => {
          console.log(data.data.data);
          setLoading(false);
          setRequests(data?.data?.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleReviewRequest = async (status, requestId) => {
    try {
      await reviewRequest(status, requestId)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setToast({
              show: true,
              isError: false,
              message: data?.message || "Request updated successfully",
            });
            setRequests((prevRequests) =>
              prevRequests.filter((req) => req._id !== requestId)
            );
          } else if (data.status !== 200) {
            setToast({
              show: true,
              isError: true,
              message: data?.error || "Something went wrong 🥺",
            });
            console.log(data);
          }
        })
        .catch((err) => {
          console.log(err);
          setToast({
            show: true,
            isError: true,
            message: err?.response?.data?.error || "Something went wrong 🥺",
          });
        });
    } catch (err) {
      setToast({
        show: true,
        isError: true,
        message: err || "Something went wrong 🥺",
      });
    } finally {
      setTimeout(() => setToast({ show: false }), 3000);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading && requests.length === 0)
    return (
      <div className="flex justify-center">
        <FeedSkeleton />
      </div>
    );

  if (!loading && requests.length === 0)
    return (
      <h1 className="text-white text-bold text-center text-3xl py-4">
        No Requests Found 🥺
      </h1>
    );
  return (
    requests && (
      <div>
        <h1 className="text-white text-bold text-center text-3xl py-4">
          Connection Requests
        </h1>
        {toast.show && (
          <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none z-20">
            {toast.isError ? (
              <Toast
                className="w-full max-w-md px-4 py-2 bg-red-500 text-white rounded-md shadow-lg"
                message={toast?.message}
                isError={true}
              />
            ) : (
              <Toast
                className="w-full max-w-md px-4 py-2 bg-green-500 text-white rounded-md shadow-lg"
                message={toast?.message}
                isError={false}
              />
            )}
          </div>
        )}
        <div>
          {requests.map((request) => (
            <SmallUserCard
              key={request._id}
              requestId={request._id}
              user={request?.sender}
              isButtonsRequired={true}
              handleReviewRequest={handleReviewRequest}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Requests;
