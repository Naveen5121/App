import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    phone : '',
    name : '',
    classSection: '',
    profileDetails: {},
    profileMap : {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { phone, name, classSection } = action.payload;
      state.phone = phone;
      state.name = name;
      state.classSection = classSection;

      if (!state.profileMap) state.profileMap ={}; 
        state.profileDetails=state.profileMap[phone] || {};
    
    },
     updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      if (!state.profileDetails) state.profileDetails = {};
      state.profileDetails[field] = value;

      if (!state.profileMap) state.profileMap = {};
      if (!state.profileMap[state.phone]) {
        state.profileMap[state.phone] = {};
      }
      state.profileMap[state.phone][field] = value;
    },
    logout: (state) => {
      state.phone = '';
      state.name = '';
      state.classSection = '';
      state.profileDetails = {};
    }
  },
});

export const { setUser,updateProfileField,logout } = authSlice.actions;
export default authSlice.reducer;