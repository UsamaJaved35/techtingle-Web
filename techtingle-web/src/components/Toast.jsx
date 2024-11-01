import React from "react";

const Toast = ({ message }) => {
  return (
    <div>
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
