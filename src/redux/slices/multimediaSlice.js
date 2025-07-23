import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   items : [],
};

const multimediaSlice = createSlice({
  name: 'multimedia',
  initialState,
  reducers: {
    setMultimediaItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMultimediaItems } = multimediaSlice.actions;
export default multimediaSlice.reducer;
