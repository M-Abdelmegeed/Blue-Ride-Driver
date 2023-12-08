import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  email: "",
  name: "",
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.uid = "";
      state.email = "";
      state.name = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logout } = loginSlice.actions;
export default loginSlice.reducer;
