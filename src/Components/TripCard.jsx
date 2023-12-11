import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import AccessTime from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Accepted from "@mui/icons-material/Check";
import Pending from "@mui/icons-material/HourglassEmpty";
import { TbArrowBigRightLines } from "react-icons/tb";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  where,
  query,
  arrayRemove,
  arrayUnion,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export default function TripCard({
  from,
  to,
  date,
  time,
  pendingRiders,
  acceptedRiders,
  stops,
  acceptedRidersNames,
  pendingRidersNames,
}) {
  const userData = useSelector((state) => state);

  const handleAcceptRider = async (index) => {
    try {
      const tripsRef = collection(db, "Trips");
      const queryRef = query(
        tripsRef,
        where("from", "==", from),
        where("to", "==", to),
        where("driverId", "==", userData.uid),
        where("date", "==", date)
      );
      const historyRef = collection(db, "History");
      const historyQueryRef = query(
        historyRef,
        where("from", "==", from),
        where("to", "==", to),
        where("driverId", "==", userData.uid),
        where("date", "==", date)
      );

      const historyQuerySnapshot = await getDocs(historyQueryRef);
      if (!historyQuerySnapshot.empty) {
        const historyDoc = historyQuerySnapshot.docs[0];
        const historyData = historyDoc.data();
        await updateDoc(historyDoc.ref, {
          status: "Accepted",
        });
      }
      const querySnapshot = await getDocs(queryRef);
      if (!querySnapshot.empty) {
        const tripDoc = querySnapshot.docs[0];
        const tripData = tripDoc.data();

        await updateDoc(tripDoc.ref, {
          pendingRiders: arrayRemove(tripData.pendingRiders[index]),
          acceptedRiders: arrayUnion(tripData.pendingRiders[index]),
          pendingRidersNames: arrayRemove(tripData.pendingRidersNames[index]),
          acceptedRidersNames: arrayUnion(tripData.pendingRidersNames[index]),
        });

        console.log("Document updated successfully!");
      } else {
        console.log("No matching document found");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleRejectRider = async (index) => {
    try {
      const tripsRef = collection(db, "Trips");
      const queryRef = query(
        tripsRef,
        where("from", "==", from),
        where("to", "==", to),
        where("driverId", "==", userData.uid),
        where("date", "==", date)
      );
      const historyRef = collection(db, "History");
      const historyQueryRef = query(
        historyRef,
        where("from", "==", from),
        where("to", "==", to),
        where("driverId", "==", userData.uid),
        where("date", "==", date)
      );

      const historyQuerySnapshot = await getDocs(historyQueryRef);
      if (!historyQuerySnapshot.empty) {
        const historyDoc = historyQuerySnapshot.docs[0];
        await updateDoc(historyDoc.ref, {
          status: "Rejected",
        });
      }
      const querySnapshot = await getDocs(queryRef);
      if (!querySnapshot.empty) {
        const tripDoc = querySnapshot.docs[0];
        const tripData = tripDoc.data();

        await updateDoc(tripDoc.ref, {
          pendingRiders: arrayRemove(tripData.pendingRiders[index]),
          pendingRidersNames: arrayRemove(tripData.pendingRidersNames[index]),
        });

        console.log("Document updated successfully!");
      } else {
        console.log("No matching document found");
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography level="title-lg" sx={{ marginBottom: "0.5rem" }}>
          {date}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
          }}
        >
          <Typography level="body-sm">
            <DriveEtaIcon /> {from}
          </Typography>
          <Typography>
            <TbArrowBigRightLines size={"2rem"} />
          </Typography>
          <Typography level="body-sm">
            {to} <LocationOnIcon />
          </Typography>
        </div>
        <Typography level="body-sm">
          <AccessTime /> {time}
        </Typography>
      </div>
      <CardContent orientation="horizontal">
        <div style={{ width: "100%" }}>
          <Typography level="body-xs">Pending Riders:</Typography>
          {pendingRidersNames.map((rider, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Pending sx={{ marginRight: "0.5rem" }} />
                <Typography fontSize="lg" fontWeight="lg">
                  {rider}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  color="success"
                  size="sm"
                  startIcon={<CheckIcon />}
                  onClick={() => handleAcceptRider(index)}
                >
                  Accept
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  color="danger"
                  size="sm"
                  startIcon={<CloseIcon />}
                  onClick={() => handleRejectRider(index)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
          {pendingRidersNames.length === 0 && (
            <Typography>No pending riders</Typography>
          )}

          <Typography level="body-xs">Accepted Riders:</Typography>
          {acceptedRidersNames.map((rider, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <Accepted sx={{ marginRight: "0.5rem" }} />
              <Typography fontSize="lg" fontWeight="lg">
                {rider}
              </Typography>
            </div>
          ))}
          {acceptedRidersNames.length === 0 && (
            <Typography>No accepted riders</Typography>
          )}

          <Typography level="body-xs" sx={{ marginBottom: "0.5rem" }}>
            Stops:
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "0.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {stops.map((stop, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#e0e0e0",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  marginRight: "0.5rem",
                }}
              >
                {stop}
              </div>
            ))}
          </div>
          {stops.length === 0 && <Typography>No stops</Typography>}
        </div>
      </CardContent>
    </Card>
  );
}
