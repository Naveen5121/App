// reducers/homeworkReducer.js
const initialState = [
  {
    id: 1,
    date: '2025-07-08',
    subject: 'Math',
    title: 'Chapter 1 – Algebra',
    completed: false,
  },
  {
    id: 2,
    date: '2025-07-07',
    subject: 'Science',
    title: 'Lab Report',
    completed: true,
  },
];

const homeworkReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_HOMEWORK':
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
    default:
      return state;
  }
};

export default homeworkReducer;
