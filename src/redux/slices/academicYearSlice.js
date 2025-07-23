import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedYear:'',
};

const academicYearSlice = createSlice ({
    name : 'academicYear',
    initialState,
    reducers: {
        setAcademicYear: (state,action)=>{
            state.selectedYear = action.payload;
        },
        clearAcademicYear : (state)=> {
            state.selectedYear='';
        },
    },
});

export const {setAcademicYear, clearAcademicYear} = academicYearSlice.actions;
export default academicYearSlice.reducer;