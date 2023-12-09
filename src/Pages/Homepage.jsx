import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

export default function Homepage() {
  return (
    <Container>
      <div className="muse__body">
        <Sidebar />
        <div className="body">
          <Navbar heading="My Trips" />
          {/* <div className="body__contents">
            <Body />
          </div> */}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vw;
  overflow: hidden;
  display: grid;
  grid-template-rows: 100vh;
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
