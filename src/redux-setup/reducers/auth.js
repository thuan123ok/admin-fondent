import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    currentCustomer: null,
    logged: false,
    error: false,
    accessToken: null,
  },
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.login.logged = true;
      state.login.currentCustomer = action.payload.user;
      state.login.accessToken = action.payload.accessToken;
      state.login.error = false;
    },
    loggedOut: (state) => {
      state.login = {
        currentCustomer: null,
        logged: false,
        error: false,
        accessToken: null,
      };
    },
    updateInfo: (state, action) => {
      state.login.currentCustomer = {
        ...state.login.currentCustomer,
        ...action.payload,
      };
    },
    updateAccessToken: (state, action) => {
      state.login.accessToken = action.payload;
    },
  },
});

export const { loggedIn, loggedOut, updateInfo, updateAccessToken } =
  authReducer.actions;
export default authReducer.reducer;
