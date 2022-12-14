/* eslint-disable prefer-regex-literals */
/* eslint-disable import/prefer-default-export */
export const validateUpperCase = (password) => {
  const regExp = new RegExp('(?=.*[A-Z])');
  if (password.match(regExp)) {
    return true;
  }
  return false;
};
export const validateDigit = (password) => {
  const regExp = new RegExp('[0-9]+');
  if (password.match(regExp)) {
    return true;
  }
  return false;
};
export const validateLength = (password) => {
  if (password.length > 6) {
    return true;
  }
  return false;
};

export const validateScdPassword = (password, scdPassword) => {
  if (scdPassword && password) {
    if (password === scdPassword) {
      return true;
    }
  }
  return false;
};
export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
