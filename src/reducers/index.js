import { combineReducers } from 'redux';
import homeworkReducer from './homeworkReducer';

const rootReducer = combineReducers({
  homework: homeworkReducer,
});

export default rootReducer;
