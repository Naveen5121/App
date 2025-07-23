// redux/slices/examSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exams: [
    {
      id: '1',
      title: 'Science Basic Assessment Test',
      duration: '30 Min',
      status: 'pending',
    },
    {
      id: '2',
      title: 'General Knowledge Level IV',
      duration: '30 Min',
      status: 'completed',
      score: '40/200',
    },
    {
      id: '3',
      title: 'Math Super 20 Exam',
      duration: '30 Min',
      status: 'pending',
    },
    {
      id: '4',
      title: 'General Knowledge Level III',
      duration: '30 Min',
      status: 'completed',
      score: '40/200',
    },
    {
      id: '5',
      title: 'English Basic Assessment Test',
      duration: '30 Min',
      status: 'pending',
    },
    {
      id: '6',
      title: 'General Knowledge Level II',
      duration: '30 Min',
      status: 'pending',
    },
    {
      id: '7',
      title: 'Maths Super 50',
      duration: '50 Min',
      status: 'pending',
    },
    {
      id: '8',
      title: 'General Knowledge Level IV',
      duration: '30 Min',
      status: 'pending',
    },
  ],
  currentExamId: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    updateExamStatus: (state, action) => {
      const { id, status, score } = action.payload;
      const index = state.exams.findIndex((exam) => exam.id === id);
      if (index!==-1) {
        state.exams[index].status = status;
        if (score) state.exams[index].score = score;
      }
    },
    setCurrentExamId: (state, action) => {
      state.currentExamId = action.payload;
    },
  },
});

export const { updateExamStatus, setCurrentExamId } = examSlice.actions;
export default examSlice.reducer;
