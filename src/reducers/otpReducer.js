// reducers/otpReducer.js
const initialState = {
  phone: '',
  otp: '12345', // Static OTP for now
  isOtpVerified: false,
  newPassword: '',
};

export const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_OTP':
      return { ...state, otp: action.payload };
    case 'OTP_VERIFIED':
      return { ...state, isOtpVerified: true };
    case 'OTP_FAILED':
      return { ...state, isOtpVerified: false };
    case 'SET_NEW_PASSWORD':
      return { ...state, newPassword: action.payload };
    default:
      return state;
  }
};
