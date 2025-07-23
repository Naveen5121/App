import { configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from './slices/userSlice';
import homeReducer from './slices/homeSlice';
import authReducer from './slices/authSlice';
import feeReducer from './slices/feeSlice';
import academicYearReducer from './slices/academicYearSlice';
import attendanceReducer from './slices/attendanceSlice';
import calendarReducer from './slices/calendarSlice';
import multimediaReducer from './slices/multimediaSlice';
import examReducer from './slices/examSlice';
import reportCardReducer from './slices/reportCardSlice';

const rootReducer = combineReducers({
    user : userReducer,
    home :  homeReducer,
    auth : authReducer,
    fee : feeReducer,
    academicYear : academicYearReducer,
    attendance : attendanceReducer,
    calendar : calendarReducer,
    multimedia : multimediaReducer,
    exam : examReducer,
    reportCard : reportCardReducer,
});

const persistConfig = {
    key:'root',
    storage:AsyncStorage,
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
});

export const persistor = persistStore(store);