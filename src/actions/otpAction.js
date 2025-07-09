// actions/otpActions.js
export const setPhoneNumber = (phone) => ({
  type: 'SET_PHONE',
  payload: phone,
});

export const setOTP = (otp) => ({
  type: 'SET_OTP',
  payload: otp,
});

export const verifyOTP = (inputOtp) => (dispatch, getState) => {
  const { otp } = getState().otp;

  if (inputOtp === otp) {
    dispatch({ type: 'OTP_VERIFIED' });
  } else {
    dispatch({ type: 'OTP_FAILED' });
  }
};

export const setNewPassword = (password) => ({
  type: 'SET_NEW_PASSWORD',
  payload: password,
});
