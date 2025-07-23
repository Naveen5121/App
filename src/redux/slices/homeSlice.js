import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const  initialState ={
    homeworks:[
        {
            id: 1,
            title: 'Learn Chapter 5 with one Essay',
            subject: 'English',
            date: dayjs().format('YYYY-MM-DD'),
            completed: false,
          },
          {
            id: 2,
            title: 'Exercise Trigonometry 1st topic',
            subject: 'Maths',
            date: dayjs().format('YYYY-MM-DD'),
            completed: true,
          },
          {
            id: 3,
            title: 'Hindi writing 3 pages',
            subject: 'Hindi',
            date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
            completed: false,
          },
          {
            id: 4,
            title: 'Test for History first session',
            subject: 'Social Science',
            date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
            completed: false,
          },
          {
            id: 5,
            title: 'Learn Atoms Physics',
            subject: 'Science',
            date: '2025-07-07',
            completed: false,
          },
          {
            id: 6,
            title: 'English writing 3 pages',
            subject: 'English',
            date: '2025-07-06',
            completed: false,
          },
    ],
    notices:[
        {
            id: '1',
            title: 'School is going for vacation in next month',
            date: '08 July 2025',
            image: require('../../assets/icons/summer.png'),
            bgColor: '#DFF6DD',
        },
        {
            id: '2',
            title: 'Summer Book Fair at School Campus in June',
            date: '08 July 2025',
            image: require('../../assets/icons/bookshelf.png'),
            bgColor: '#DAEFFF',
        },
        {
            id: '3',
            title: 'School is going for vacation in next month',
            date: '08 July 2025',
            image: require('../../assets/icons/summer.png'),
            bgColor: '#FFD9D9',
        },
        {
            id: '4',
            title: 'School is going for vacation in next month',
            date: '08 July 2025',
            image: require('../../assets/icons/summer.png'),
            bgColor: '#DFF6DD',
        },
        {
            id: '5',
            title: 'Summer Book Fair at School Campus in June',
            date: '08 July 2025',
            image: require('../../assets/icons/bookshelf.png'),
            bgColor: '#DAEFFF',
        },
        {
            id: '6',
            title: 'School is going for vacation in next month',
            date: '08 July 2025',
            image: require('../../assets/icons/summer.png'),
            bgColor: '#FFD9D9',
        },
        {
            id: '7',
            title: 'School is going for vacation in next month',
            date: '08 July 2025',
            image: require('../../assets/icons/summer.png'),
            bgColor: '#DFF6DD',
        },

    ],
}

const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{
        toggleHomework:(state,action)=>{
            const id = action.payload;
            const index = state.homeworks.findIndex((hw)=>hw.id===id);
            if(index!==-1){
                state.homeworks[index].completed = !state.homeworks[index].completed;
            }
        },
        addHomework : (state,action)=>{
            state.homeworks.push(action.payload);
        },
        deleteHomework: (state,action)=>{
            const id = action.payload;
            state.homeworks = state.homeworks.filter((hw)=>hw.id !== id);
        },
        updateHomework: (state, action) => {
            const updated = action.payload;
            const index = state.homeworks.findIndex((hw) => hw.id === updated.id);
            if (index !== -1) {
                state.homeworks[index] = { ...state.homeworks[index], ...updated };
            }
        },
        addNotice: (state, action) => {
            state.notices.push(action.payload);
        },
    },
});

export const {
  toggleHomework,
  addHomework,
  deleteHomework,
  updateHomework,
  addNotice,
} = homeSlice.actions;

export default homeSlice.reducer;