import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    width: 0,
    height: 0,
    baseUrl: 'https://admin-eshop.vann-dev.com',
    baseUrlNode: 'https://localhost:8000/api/stripe',
    navigationMessage: '',
    buttonText: '',
    redirection: '',
    showModal: false,
    loginWithGoogleRejected: false,
    isPhone: false,
    isPassword: false,
    firstOpening: true,
    cartOpening: true,
  },
  reducers: {

    setWidth: (state, { payload }) => {
      state.width = payload;
    },
    setHeight: (state, { payload }) => {
      state.height = payload;
    },
    setNavigationMessage: (state, { payload }) => {
      state.navigationMessage = payload;
    },
    deleteNavigationMessage: (state) => {
      state.navigationMessage = '';
    },
    setButtonText: (state, { payload }) => {
      state.buttonText = payload;
    },
    deleteButtonText: (state) => {
      state.buttonText = '';
    },
    setButtonIcon: (state, { payload }) => {
      state.buttonText = payload;
    },
    deleteRedirection: (state) => {
      state.redirection = '';
    },
    setRedirection: (state, { payload }) => {
      state.redirection = payload;
    },
    setShowModal: (state, { payload }) => {
      state.showModal = payload;
    },
    setIsPhone: (state, { payload }) => {
      state.isPhone = payload;
    },
    setIsPassword: (state, { payload }) => {
      state.isPassword = payload;
    },
    setLoginWithGoogleRejected: (state, { payload }) => {
      state.loginWithGoogleRejected = payload;
    },
    setFirstOpening: (state, { payload }) => {
      state.firstOpening = payload;
    },
    setCartOpening: (state, { payload }) => {
      state.cartOpening = payload;
    },
  },
});
export const {
  setWidth,
  setHeight,
  deleteNavigationMessage,
  setNavigationMessage,
  setShowModal,
  setButtonText,
  deleteButtonText,
  setRedirection,
  deleteRedirection,
  setParamsLoading,
  setLoginWithGoogleRejected,
  setIsPassword,
  setIsPhone,
  setFirstOpening,
  setCartOpening,
} = navigationSlice.actions;
export default navigationSlice.reducer;
