import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendanceByPhone:''
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceData: (state, action) => {
      const { phone, data } = action.payload;
      state.attendanceByPhone[phone] = data;
    },
  },
});

export const { setAttendanceData } = attendanceSlice.actions;
export default attendanceSlice.reducer;
