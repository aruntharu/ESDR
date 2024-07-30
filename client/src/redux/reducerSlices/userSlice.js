import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  isLoggedIn: false,
  token: '',
  kycVerifiedStatus: '',
  paymentVerifiedStatus: '',
  paymentDetails: {},
  userDetails: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLoginDetails(state, action) {
      const { user, token } = action.payload;
      state.isLoggedIn = true;
      state.token = token;
      state.userDetails = user;
    },
    logoutUser() {
      return initialState;
    },
    setUserKycVerifiedStatus(state, action) {
      state.kycVerifiedStatus = action.payload;
    },
    setPaymentVerifiedStatus(state, action) {
      state.paymentVerifiedStatus = action.payload;
    },
    setPaymentDetails(state, action) {
      state.paymentDetails = action.payload;
    },
    clearPaymentState(state) {
      state.paymentVerifiedStatus = '';
      state.paymentDetails = {};
    }
  }
});

export const { 
  setLoginDetails, 
  logoutUser, 
  setUserKycVerifiedStatus, 
  setPaymentVerifiedStatus, 
  setPaymentDetails, 
  clearPaymentState 
} = userSlice.actions;

export default userSlice.reducer;
