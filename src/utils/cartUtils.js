/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
export const changeQuantityProduct = (list, product, quantity) => {
  const productsCopy = [...list];
  if (productsCopy.some((element) => element.slug === product.slug)) {
    const item = productsCopy.find((element) => element.slug === product.slug);
    const newItem = { ...item };
    newItem.quantity += quantity;
    const newArrayForState = productsCopy.filter((element) => element.slug !== product.slug);
    if (newItem.quantity <= 0) {
      return newArrayForState
        .sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
    }
    newArrayForState.push(newItem);
    return newArrayForState
      .sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
  }
  productsCopy.push(product);
  return productsCopy
    .sort((a, b) => ((a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
};
//
//
export const navigationInProduct = (products, product, increment) => {
  const indexOfActuallyProduct = products.indexOf(product);
  let nextProduct = products[(indexOfActuallyProduct + increment)];
  if (products.indexOf(nextProduct) === -1) {
    if (increment === 1) {
      [nextProduct] = products;
    }
    else {
      nextProduct = products[(products.length - 1)];
    }
  }
  return nextProduct;
};
