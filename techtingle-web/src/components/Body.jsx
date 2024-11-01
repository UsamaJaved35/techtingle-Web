import React, { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { profileView } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user.user);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const fetchUser = async () => {
    const token = getCookie("token");
    if (userData || !token) return;
    profileView()
      .then((data) => {
        dispatch(setUser(data?.user));
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/login");
        }
        console.error(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
