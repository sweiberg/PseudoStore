import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userId: localStorage.getItem('userId') || null,
  username: localStorage.getItem('username') || null,
  isLoggedIn: !!localStorage.getItem('token'), // Convert the string to boolean
  darkMode: true,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { userId, username, jwt } = action.payload;
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('token', jwt);
      state.isLoggedIn = true;
      state.userId = userId;
      state.username = username;
      state.token = jwt;
    },
    logoutUser: (state) => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.userId = null;
      state.username = null;
      state.token = null;
      toast.success("You have successfully logged out");
    },
    changeMode: (state) => {
      state.darkMode = !state.darkMode;
      if(state.darkMode){
        document.querySelector('html').setAttribute('data-theme', "dark");
      }else{
        document.querySelector('html').setAttribute('data-theme', "winter");
      }
    }
  },
});

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;