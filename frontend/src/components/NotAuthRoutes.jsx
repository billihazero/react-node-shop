import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//로그인하지 않았다면 Outlet= 로그인, 회원가입으로
const NotAuthRoutes = ({ isAuth }) => {
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

export default NotAuthRoutes;
