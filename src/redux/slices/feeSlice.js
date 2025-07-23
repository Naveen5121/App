import { createSlice } from '@reduxjs/toolkit';

const feeData = {
  schoolFees: [
    {
      id: '1',
      month: 'January',
      date: '06 May',
      paid: true,
      amount: '₹ 16,600',
      details: {
        totalFee: '₹ 14,500',
        extraFee: '₹ 2,000',
        lateCharges: '₹ 600',
        discount: '- ₹ 500',
        paidFee: '₹ 16,600',
      },
    },
  ],
  examFees: [
    {
      id: 'e1',
      month: 'March',
      date: '15 Mar',
      paid: true,
      amount: '₹ 1,500',
      details: {
        examType: 'Quarterly',
        subjectCount: '6',
        paidFee: '₹ 1,500',
      },
    },
  ],
  activityFees: [],
  otherFees: [],
};

const initialState = {
  schoolFees: [],
  examFees: [],
  activityFees: [],
  otherFees: [],
};

const feeSlice = createSlice({
  name: 'fee',
  initialState,
  reducers: {
    loadFees: (state) => {
      state.schoolFees = feeData.schoolFees;
      state.examFees = feeData.examFees;
      state.activityFees = feeData.activityFees;
      state.otherFees = feeData.otherFees;
    },
  },
});

export const { loadFees } = feeSlice.actions;
export default feeSlice.reducer;
