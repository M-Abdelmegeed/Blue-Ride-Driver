import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import "@fontsource/roboto/300.css";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../UserAuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/loginReducer";

const StyledH1 = styled.h1`
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 3rem;
  font-weight: 300;
`;

export default function Navbar({ heading }) {
  const userData = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { logOut } = useUserAuth();

  const handleLogOut = () => {
    dispatch(logout());
    logOut();
    navigate("/");
  };

  return (
    <Container>
      <div className="heading">
        <StyledH1>{heading}</StyledH1>
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userData.name}</span>
        </a>
      </div>
      <div className="avatar" onClick={() => handleLogOut()}>
        <div>
          <IoLogOut />
          <span>Logout</span>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: none;
  h1 {
    color: white;
    fontfamily: "Roboto";
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out;
    &:hover {
      background-color: white;
      color: black;
      a {
        color: black;
      }
      div {
        color: black;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        color: #c7c5c5;
        border-radius: 1rem;
      }
    }
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        color: #c7c5c5;
        border-radius: 1rem;
      }
    }
  }
`;
