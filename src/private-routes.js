import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state);
  let location = useLocation();

  if (user.uid === (null || "")) {
    return (
      <>
        <div>You are not authorized to access this page</div>
        <Navigate to="/" state={{ from: location }} replace />
      </>
    );
  }
  return children;
};

export default ProtectedRoute;
