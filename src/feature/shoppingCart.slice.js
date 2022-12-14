/* eslint-disable import/prefer-default-export */
import { createSlice } from '@reduxjs/toolkit';
import { getDepotsList, postOrder } from '../AsyncChunk/AsyncChunkShoppingCart';
import { removeLocalStorage } from '../utils/localStorage';

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: {
    shoppingCart: [],
    count: 0,
    cartAmount: 0,
    depots: [],
    selectedDepot: '',
    selectedDepotId: 0,
    serverMessage: '',
    isCreditCardLayout: false,
  },
  extraReducers: {
    [getDepotsList.pending]: () => {
      // console.log('[getDepotsList]waiting...');
    },
    [getDepotsList.fulfilled]: (state, { payload }) => {
      state.depots = payload;
      // console.log('[getDepotsList] OK!');
    },
    [getDepotsList.rejected]: () => {
      // console.log('[getDepotsList] request rejected');
    },
    [postOrder.pending]: () => {
      // console.log('[postOrder]waiting...');
    },
    [postOrder.fulfilled]: (state, { payload }) => {
      if (!payload.error) {
        state.serverMessage = ' Commande effectuée, bon appétit!';
      }
      else {
        state.serverMessage = payload.message;
      }
      state.shoppingCart = [];
      state.count = 0;
      state.cartAmount = 0;
      state.selectedDepot = '';
      state.selectedDepotId = 0;
    },
    [postOrder.rejected]: () => {
      console.log('[postOrder] request rejected');
    },
  },
  reducers: {
    setCount: (state, { payload }) => {
      if (state.count === 0 && payload < 0) {
        state.count = 0;
      }
      else {
        state.count += payload;
      }
    },
    pushInCart: (state, { payload }) => {
      state.shoppingCart = payload;
    },
    setIsCreditCardLayout: (state, { payload }) => {
      state.isCreditCardLayout = payload;
    },
    setCartAmount: (state) => {
      const arrayToReduce = [];
      state.shoppingCart.forEach((element) => {
        arrayToReduce.push(element.quantity * parseFloat(element.price));
      });
      state.cartAmount = arrayToReduce.reduce((x, y) => x + y, 0).toFixed(2);
    },
    deleteShoppingCart: (state) => {
      state.shoppingCart = [];
      state.count = 0;
      removeLocalStorage('shoppingCart');
      removeLocalStorage('count');
    },
    setSelectedDepot: (state, { payload }) => {
      state.selectedDepot = payload;
    },
    getSelectedDepotId: (state) => {
      const depot = state.depots.data.find((element) => element.address === state.selectedDepot);
      state.selectedDepotId = depot.id;
    },
    deleteServerMessage: (state) => {
      state.serverMessage = '';
    },
    setServerMessage: (state, { payload }) => {
      state.serverMessage = payload;
    },
  },
});
export const {
  setCount,
  pushInCart,
  setCartAmount,
  setSelectedDepot,
  getSelectedDepotId,
  deleteServerMessage,
  deleteShoppingCart,
  setServerMessage,
  setIsCreditCardLayout,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
