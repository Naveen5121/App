
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phone: '',
  password: '',
  otp: '',
  token: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    login: (state, action) => {
      const { phone, password } = action.payload;
      if (phone === phone && password === password) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    logout: (state) => {
      state.phone = '';
      state.password = '';
      state.token = '';
      state.otp = '';
      state.isLoggedIn = false;
    },
    generateOtp: (state) => {
      const otp = Math.floor(10000 + Math.random() * 90000).toString();
      state.otp = otp;
      console.log("Generated OTP (simulate SMS):",otp);
    },
    verifyOtp : (state,action) => {
      const enteredOtp = action.payload;
      state.isLoggedIn = enteredOtp === state.otp;
    }
  },
});

export const {
  setPhone,
  setPassword,
  setToken,
  setOtp,
  generateOtp,
  verifyOtp,
  login,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
