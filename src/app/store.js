import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../feature/products.slice';
import userReducer from '../feature/user.slice';
import shoppingCartReducer from '../feature/shoppingCart.slice';
import navigationReducer from '../feature/navigation.slice';

export default configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    shoppingCart: shoppingCartReducer,
    navigation: navigationReducer,
  },
});
