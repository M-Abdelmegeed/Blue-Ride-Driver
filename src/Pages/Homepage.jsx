import React from "react";
import { useSelector } from "react-redux";

const Homepage = () => {
  const userData = useSelector((state) => state.login);
  return (
    <>
      <div>Name: {userData.name}</div>
      <div>Email: {userData.email}</div>
      <div>UID: {userData.uid}</div>
    </>
  );
};

export default Homepage;
