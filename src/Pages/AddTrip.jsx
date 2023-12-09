import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import AddTripForm from "../Components/addTripForm";

const AddTrip = () => {
  return (
    <Container>
      <div className="muse__body">
        <Sidebar />
        <div className="body">
          <Navbar heading="Add Trip" />
          <div className="form">
            <AddTripForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 0;
  padding: 0;
  max-width: 100vw;
  max-height: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 100vh;
  .form {
    display: flex;
    justify-content: center;
    padding: 2rem;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    border-radius: 2rem;
    background-color: rgba(255, 255, 255, 1);
    /* border: 0.05rem solid black; */
    box-shadow: 2px 2px 2px #b3b3b3;
  }
  .muse__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    background-color: rgb(16, 198, 222);
    .body {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
`;

export default AddTrip;
