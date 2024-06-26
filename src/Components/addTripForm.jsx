import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";

export default function AddTripForm() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const [showMorningModal, setShowMorningModal] = useState(false);
  const [showAfternoonModal, setShowAfternoonModal] = useState(false);

  const destinations = [
    "ASU",
    "Heliopolis",
    "Rehab",
    "Gate 3",
    "Gate 4",
    "Tayaran",
    "Abbas el Akkad",
    "Makram Ebeid",
    "Dokki",
    "Tahrir Square",
    "Youssef Abbas",
    "Wafaa wel Amal",
    "Cairo Opera House",
    "Ahmed Fakhry",
    "Sheraton",
    "Madinaty",
    "Sherouk",
    "Mokattam",
  ];

  const stopsOptions = [
    "Heliopolis",
    "Rehab",
    "Tayaran",
    "Abbas el Akkad",
    "Makram Ebeid",
    "Dokki",
    "Tahrir Square",
    "Youssef Abbas",
    "Wafaa wel Amal",
    "Cairo Opera House",
    "Ahmed Fakhry",
    "Sheraton",
    "Madinaty",
    "Sherouk",
    "Mokattam",
  ];

  const [formData, setFormData] = useState({
    to: "",
    from: "",
    date: "",
    stops: [],
    price: "",
    time: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.to === "" ||
      formData.from === "" ||
      formData.date === "" ||
      formData.stops.length === 0 ||
      formData.price === "" ||
      formData.time === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (formData.time === "7:30AM") {
      const tomorrowDate = new Date();
      tomorrowDate.setDate(currentDate.getDate() + 1);

      const shouldDisplayModal =
        formData.time === "7:30 AM" &&
        formData.date === tomorrowDate.toISOString().split("T")[0] &&
        currentDate.getHours() >= 22;

      if (shouldDisplayModal) {
        setShowMorningModal(true);
        return;
      }
    }

    if (formData.time === "5:30 PM") {
      const shouldDisplayAfternoonModal =
        formData.date === currentDate.toISOString().split("T")[0] &&
        currentDate.getHours() >= 13;

      if (shouldDisplayAfternoonModal) {
        setShowAfternoonModal(true);
        return;
      }
    }

    try {
      const docRef = await addDoc(collection(db, "Trips"), {
        acceptedRiders: [],
        pendingRiders: [],
        pendingRidersNames: [],
        acceptedRidersNames: [],
        driverName: userData.name,
        driverId: userData.uid,
        from: formData["from"],
        to: formData["to"],
        date: formData["date"],
        price: Number(formData["price"]),
        stops: formData["stops"],
        time: formData["time"],
      });

      console.log("Document written with ID: ", docRef.id);
      navigate("/home");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleStopsChange = (event, value) => {
    setFormData({ ...formData, stops: value });
  };

  useEffect(() => {
    if (
      formData.from === "ASU" ||
      formData.from === "Gate 3" ||
      formData.from === "Gate 4"
    ) {
      setFormData((prevData) => ({ ...prevData, time: "5:30 PM" }));
    } else if (
      formData.to === "ASU" ||
      formData.to === "Gate 3" ||
      formData.to === "Gate 4"
    ) {
      setFormData((prevData) => ({ ...prevData, time: "7:30 AM" }));
    }
  }, [formData.from, formData.to]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* "From" Dropdown */}
        <FormControl sx={{ m: 1, width: "65ch" }}>
          <InputLabel htmlFor="from-destination">From</InputLabel>
          <Select
            id="from-destination"
            label="From"
            value={formData.from}
            onChange={handleInputChange("from")}
          >
            {destinations.map((destination) => (
              <MenuItem key={destination} value={destination}>
                {destination}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* "To" Dropdown */}
        <FormControl sx={{ m: 1, width: "65ch" }}>
          <InputLabel htmlFor="to-destination">To</InputLabel>
          <Select
            id="to-destination"
            label="To"
            value={formData.to}
            onChange={handleInputChange("to")}
          >
            {destinations.map((destination) => (
              <MenuItem key={destination} value={destination}>
                {destination}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Input */}
        <FormControl sx={{ m: 1, width: "65ch" }}>
          <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.date}
            onChange={handleInputChange("date")}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />
        </FormControl>

        {/* Stops Multi-Select */}
        <FormControl sx={{ m: 1, width: "65ch" }}>
          <Autocomplete
            multiple
            id="stops"
            options={stopsOptions}
            disableCloseOnSelect
            value={formData.stops}
            onChange={handleStopsChange}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} />
                <ListItemText primary={option} />
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Stops" placeholder="Select Stops" />
            )}
          />
        </FormControl>

        {/* Price Input */}
        <FormControl sx={{ m: 1, width: "65ch" }}>
          <InputLabel htmlFor="price">Price</InputLabel>
          <OutlinedInput
            id="price"
            startAdornment={
              <InputAdornment position="start">EGP</InputAdornment>
            }
            label="Price"
            value={formData.price}
            onChange={handleInputChange("price")}
          />
        </FormControl>

        {/* Time Input */}
        <FormControl sx={{ m: 1, width: "65ch" }}>
          <TextField
            id="time"
            label="Time"
            value={formData.time}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>

        {/* Morning Modal */}
        <Modal
          open={showMorningModal}
          onClose={() => setShowMorningModal(false)}
          aria-labelledby="morning-modal-title"
          aria-describedby="morning-modal-description"
        >
          <ModalDialog variant="solid">
            <ModalClose />
            <DialogTitle>Oops, too late!</DialogTitle>
            <DialogContent>
              You cannot add an morning ride now, it is past 10 PM.
            </DialogContent>
          </ModalDialog>
        </Modal>

        {/* Afternoon Modal */}
        <Modal
          open={showAfternoonModal}
          onClose={() => setShowAfternoonModal(false)}
          aria-labelledby="afternoon-modal-title"
          aria-describedby="afternoon-modal-description"
        >
          <ModalDialog variant="solid">
            <ModalClose />
            <DialogTitle>Oops, too late!</DialogTitle>
            <DialogContent>
              You cannot add an afternoon ride now, it is past 1 PM, but just
              for the sake of the demo it will be added
            </DialogContent>
          </ModalDialog>
        </Modal>
      </div>
    </Box>
  );
}
