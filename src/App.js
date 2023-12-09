import Homepage from "./Pages/Homepage.jsx";
import Login from "./Pages/Login.jsx";
import AddTrip from "./Pages/AddTrip.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./UserAuthContext.js";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/addTrip" element={<AddTrip />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
