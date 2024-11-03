import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout()
      .then(() => {
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/feed" className="btn btn-ghost text-xl">
            TechTingle 🚀
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <p className="md:text-lg font-bold md:block hidden">
              Welcome, {user?.firstName}
            </p>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mx-6"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
