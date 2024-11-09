import React from "react";
import UserCard from "./UserCard";
const PhoneView = ({ user }) => {
  return (
    <div>
      <div className="mockup-phone border-primary">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            <h4 className="text-primary pt-2">Profile View 👀</h4>
            <UserCard user={user} isButtonsRequired={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneView;
