/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setButtonText, setRedirection, setShowModal } from '../feature/navigation.slice';

export const checkSales = createAsyncThunk(
  'products/sales',
  async (_, { getState, rejectWithValue }) => {
    try {
      const result = await axios.get(`${getState().navigation.baseUrl}/api/v1/sales`, {
      });
      return result.data;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getProducts = createAsyncThunk(
  'products/setProducts',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { token } = getState().user.user;
    let isError = false;
    try {
      const result = await axios.get(`${getState().navigation.baseUrl}/api/v1/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    }
    catch (error) {
      dispatch(setRedirection('/'));
      dispatch(setButtonText('Connexion'));
      isError = true;
      return rejectWithValue(error.response.data);
    }
    finally {
      if (isError) {
        dispatch(setButtonText('Valider'));
        dispatch(setShowModal(true));
      }
    }
  },
);
export const getCategories = createAsyncThunk(
  'products/setCategories',
  async (_, { getState }) => {
    const { token } = getState().user.user;
    const result = await axios.get(`${getState().navigation.baseUrl}/api/v1/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  },
);
export const getCarts = createAsyncThunk(
  'products/getCart',
  async (_, { getState }) => {
    const { token } = getState().user.user;
    const result = await axios.get(`${getState().navigation.baseUrl}/api/v1/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  },
);
