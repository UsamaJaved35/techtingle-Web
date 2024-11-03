import React, { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import { useSelector } from "react-redux";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((store) => store.user.user);

  const handleEditClick = () => setIsEditing(true);

  if (isEditing) {
    return <ProfileEdit setIsEditing={setIsEditing} />;
  }

  return (
    <div className="flex justify-center py-2 my-14">
      <div className="card bg-base-300 md:w-[30rem] w-[20.5rem] shadow-xl">
        <div className="card-body">
          <div className="card-title justify-center">
            <div className="avatar">
              {!user?.photoUrl && <h2>Profile</h2>}
              {user?.photoUrl && (
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                  <img src={user?.photoUrl} alt="Profile" />
                </div>
              )}
            </div>
          </div>
          <div className="p-4 my-2 space-y-6">
            <div>
              <label className="block font-semibold mb-1">First Name:</label>
              <div className="input input-bordered input-info flex items-center gap-2 p-2">
                <p className="grow">{user?.firstName || "First Name"}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Last Name:</label>
              <div className="input input-bordered input-info flex items-center gap-2 p-2">
                <p className="grow">{user?.lastName || "Last Name"}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Email:</label>
              <div className="input input-bordered input-info flex items-center gap-2 p-2">
                <p className="grow">{user?.email || "Email"}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Age:</label>
              <div className="input input-bordered input-info flex items-center gap-2 p-2">
                <p className="grow">{user?.age || "Age"}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">About:</label>
              <div className="textarea textarea-info flex items-center gap-2 p-2">
                <p className="grow">{user?.about || "About"}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Gender:</label>
              <div className="input input-bordered input-info flex items-center gap-2 p-2">
                <p className="grow">{user?.gender || "Gender"}</p>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1">Skills:</label>
              <div className="textarea textarea-info flex items-center gap-2 p-2">
                <p className="grow">
                  {user?.skills?.join(", ") || "No skills selected"}
                </p>
              </div>
            </div>
          </div>
          <div className="card-actions justify-center">
            <button onClick={handleEditClick} className="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
