/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setButtonText,
  setIsPassword,
  setIsPhone,
  setLoginWithGoogleRejected,
  setNavigationMessage,
  setRedirection,
  setShowModal,
} from '../feature/navigation.slice';
import { removeLocalStorage, setLocalStorageToken } from '../utils/localStorage';
//
//
//
export const setUser = createAsyncThunk(
  'user/setUser',
  async (token, { getState, rejectWithValue, dispatch }) => {
    let isError = false;
    try {
      const result = await axios.get(`${getState().navigation.baseUrl}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data.data;
    }
    catch (error) {
      dispatch(setRedirection('/'));
      dispatch(setButtonText('Connexion'));
      isError = true;
      return rejectWithValue(error.response.data);
    }
    finally {
      if (isError) {
        dispatch(setShowModal(true));
      }
    }
  },
);
//
//
//
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { username, password } = getState().user.login;
    let isError = false;
    try {
      const result = await axios.post(`${getState().navigation.baseUrl}/api/login_check`, {
        username,
        password,
      });
      const { token } = result.data;
      setLocalStorageToken(token);
      return result.data;
    }
    catch (error) {
      if (error.response.data.error === 'Invalid credentials.') {
        dispatch(setNavigationMessage('Identifiants invalides!'));
      }
      dispatch(setButtonText('Connexion'));
      isError = true;
      return rejectWithValue(error.response.data);
    }
    finally {
      if (isError) {
        dispatch(setShowModal(true));
      }
    }
  },
);
//
//
//
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { username } = getState().user.login;
    let isError = false;
    try {
      const result = await axios.post(`${getState().navigation.baseUrl}/api/v1/reset-password`, {
        email: username,
      });
      dispatch(setButtonText('ok!'));
      dispatch(setNavigationMessage('Un email avec un lien de réinitialisation t\'a été envoyé'));
      return result.data;
    }
    catch (error) {
      isError = true;
      dispatch(setButtonText('ok!'));
      dispatch(setNavigationMessage(error.response.data.message));
      return rejectWithValue(error.response.data);
    }
    finally {
      dispatch(setShowModal(true));
    }
  },
);
//
//
//
export const loginUserWithGoogle = createAsyncThunk(
  'user/loginUserWithGoogle',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { sub } = getState().user.user;
    try {
      const result = await axios.post(`${getState().navigation.baseUrl}/api/login_google`, {
        sub,
      });
      const { token } = result.data;
      removeLocalStorage('user');
      setLocalStorageToken(token);
      return result.data;
    }
    catch (error) {
      if (error.response.request.status === 404) {
        dispatch(setLoginWithGoogleRejected(true));
        dispatch(setIsPhone(true));
      }
      return rejectWithValue(error.response.data);
    }
  },
);
//
//
//
export const createUser = createAsyncThunk(
  'user/createUser',
  async (isGoogleCreate, { getState, rejectWithValue, dispatch }) => {
    const {
      firstname,
      lastname,
      phone,
      email,
      emailNotifications,
      password,
      sub,
    } = getState().user.user;
    const currentSub = () => {
      if (sub === '') {
        return null;
      }

      return sub;
    };
    let isError = false;
    try {
      const result = await axios.post(`${getState().navigation.baseUrl}/api/v1/users/create`, {
        email,
        password,
        firstname,
        lastname,
        phone,
        sub: currentSub(),
        emailNotifications,
      });
      return result.data;
    }
    catch (error) {
      if (isGoogleCreate === true && error.response.request.status === 400) {
        dispatch(setLoginWithGoogleRejected(true));
        dispatch(setIsPassword(true));
      }
      isError = true;
      return rejectWithValue(error.response.data);
    }
    finally {
      if (isError) {
        dispatch(setShowModal(true));
      }
    }
  },
);
//
//
//
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const {
      token, oldPassword, email, firstname, lastname, phone, paymentCustomerId, emailNotifications,
    } = getState().user.user;
    const update = {
      currentpassword: oldPassword,
      email,
      firstname,
      lastname,
      phone,
      emailNotifications,
      paymentCustomerId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios
        .patch(
          `${getState().navigation.baseUrl}/api/v1/users/update`,
          update,
          config,
        );
      dispatch(setButtonText('valider'));
      return result.data;
    }
    catch (error) {
      dispatch(setButtonText('valider'));
      return rejectWithValue(error.response.data);
    }
    finally {
      dispatch(setShowModal(true));
    }
  },
);
//
//
export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (token, { getState, rejectWithValue, dispatch }) => {
    const {
      password,
    } = getState().user.user;
    const update = {
      password,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios
        .patch(
          `${getState().navigation.baseUrl}/api/v1/update-password`,
          update,
          config,
        );
      dispatch(setButtonText('retour à l\'accueil'));
      dispatch(setRedirection('/'));
      dispatch(setNavigationMessage('Le mot de passe a été réinitialisé'));
      return result.data;
    }
    catch (error) {
      dispatch(setButtonText('retour à l\'accueil'));
      dispatch(setRedirection('/'));
      dispatch(setNavigationMessage('une erreur s\'est produite'));
      return rejectWithValue(error.response.data);
    }
    finally {
      dispatch(setShowModal(true));
    }
  },
);
//
//
//
export const updateUserWithGoogle = createAsyncThunk(
  'user/updateUserWithGoogle',
  async (_, { getState }) => {
    const {
      email, password, sub,
    } = getState().user.user;
    //
    const update = {
      email,
      password,
      sub,
    };

    const result = await axios
      .patch(
        `${getState().navigation.baseUrl}/api/v1/users/google_update`,
        update,
      );
    const { token } = result.data;
    removeLocalStorage('user');
    setLocalStorageToken(token);
    return result.data;
  },
);
//
//
//
export const getOrderHistory = createAsyncThunk(
  'user/getOrderHistory',
  async (_, { getState }) => {
    const { token } = getState().user.user;
    const result = await axios.get(`${getState().navigation.baseUrl}/api/v1/orders/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  },
);
