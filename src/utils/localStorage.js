/* eslint-disable import/prefer-default-export */
export const setLocalStorageToken = (token) => localStorage.setItem('user', JSON.stringify({
  token,
}));
export const setLocalStorageShoppingCart = (shoppingCart) => localStorage.setItem('shoppingCart', JSON.stringify({
  shoppingCart,
}));
export const setLocalStorageCount = (count) => localStorage.setItem('count', JSON.stringify({
  count,
}));
export const removeLocalStorage = (item) => localStorage.removeItem(item);

export const setLocalStorageCurrentProduct = (currentProduct) => localStorage.setItem('currentProduct', JSON.stringify({
  currentProduct,
}));
