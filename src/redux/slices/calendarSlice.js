import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventsMap: {
    '2025-07-08': [
      { title: 'National Day', type: 'Holiday', color: '#ffe6e6', date: '2025-07-08' },
      { title: 'School Function', type: 'Event', color: '#d1f3ff', date: '2025-07-08' }
    ],
    '2025-07-09': [
      { title: 'Dean Meeting', type: 'Meeting', color: '#dcfff4', date: '2025-07-09' }
    ],
    '2025-07-10': [
      { title: 'Parent-Teacher Meeting', type: 'Event', color: '#ffe6e6', date: '2025-07-10' }
    ]
  }
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.eventsMap = action.payload;
    }
  }
});

export const { setEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
