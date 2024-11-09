import React from "react";
const UserCard = ({ user, isButtonsRequired }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-200 md:w-96 w-80 shadow-xl cursor-grab">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="User" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <p>{`${gender.toUpperCase()} - ${age} years old`}</p>
      </div>
    </div>
  );
};

export default UserCard;
