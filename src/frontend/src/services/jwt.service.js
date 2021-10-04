// the key to store the token in LocalStorage
const ID_TOKEN_KEY = "token";

// method to get token by key from LocalStorage
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

// method for saving token by key in LocalStorage
export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

// method to remove token by key from LocalStorage
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

// export the service as an object with 3 methods
export default { getToken, saveToken, destroyToken };
