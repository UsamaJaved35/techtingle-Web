import React from "react";

const Toast = ({ message, isError }) => {
  return (
    <div>
      <div className={`alert alert-${isError ? "error" : "success"}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
