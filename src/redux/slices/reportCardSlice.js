import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  attendance: {},
  results: {},
  remarks: {},
};

const reportCardSlice = createSlice({
  name: 'reportCard',
  initialState,
  reducers: {
    setReportCardData: (state, action) => {
      const { phone, attendance, results, remarks } = action.payload;
      state.attendance[phone] = attendance;
      state.results[phone] = results;
      state.remarks[phone] = remarks;
    },
  },
});

export const { setReportCardData } = reportCardSlice.actions;
export default reportCardSlice.reducer;
