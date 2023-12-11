import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import TripCard from "../Components/TripCard";
import {
  query,
  where,
  limit,
  doc,
  collection,
  getDocs,
  getDocsFromServer,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useSelector } from "react-redux";

export default function Homepage() {
  const [trips, setTrips] = useState([]);
  const userId = useSelector((state) => state.uid);

  useEffect(() => {
    const tripsCollection = collection(db, "Trips");
    const tripsQuery = query(tripsCollection, where("driverId", "==", userId));

    // Set up a real-time listener
    const unsubscribe = onSnapshot(tripsQuery, (snapshot) => {
      const fetchedTrips = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(fetchedTrips);
    });

    // Clean up the listener when the component unmounts or userId changes
    return () => unsubscribe();
  }, [userId]);
  return (
    <Container>
      <div className="muse__body">
        <Sidebar />
        <div className="body">
          <Navbar heading="My Trips" />
          <div className="body-contents">
            {trips.map((trip) => (
              <TripCard
                date={trip.date}
                stops={trip.stops}
                to={trip.to}
                from={trip.from}
                time={trip.time}
                acceptedRiders={trip.acceptedRiders}
                pendingRiders={trip.pendingRiders}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  /* max-width: 100vw;
  max-height: 100vw; */
  min-height: 100vh;
  overflow: hidden;
  /* display: grid;
  grid-template-rows: 100vh; */
  .muse__body {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 15vw 85vw;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    background-color: rgb(16, 198, 222);
    padding-bottom: 1rem;

    .body-contents {
      margin-left: 1rem;
      justify-content: center;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-row-gap: 2rem;
    }
    .body {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
  }
`;
