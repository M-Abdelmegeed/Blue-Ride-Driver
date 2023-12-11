import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import BlueRide from "../Assets/BlueRideASUDark.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img src={BlueRide} alt="BlueRideASU" />
        </div>
        <ul>
          <li onClick={() => navigate("/home")}>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li onClick={() => navigate("/addTrip")}>
            <IoIosAddCircle />
            <span>Add Trip</span>
          </li>
        </ul>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 1rem 0 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;