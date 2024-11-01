import React from "react";

const UserCard = ({ user, isButtonsRequired }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="User" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{gender.toUpperCase() + " - " + age + " years old"}</p>
        {isButtonsRequired && (
          <div className="card-actions justify-end my-4">
            <button className="btn bg-red-400 text-black hover:bg-red-500 font-semibold ">
              Ignore
            </button>
            <button className="btn text-black bg-green-500 hover:bg-green-600 font-semibold">
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
