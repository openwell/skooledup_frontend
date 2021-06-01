import axios from 'axios';
// import jwt from 'jwt-decode';
// import { store } from 'store/store';
import config from '../config/index';

const apiWithToken = axios.create({
  baseURL: config.serverURI,
});
const apiWithoutToken = axios.create({
  baseURL: config.serverURI,
});

// export const checkExpiredToken = (tokens) => {
//   if (tokens) {
//     const { exp } = jwt(tokens);
//     const time = exp * 1000;
//     const isExpired = time > Date.now();
//     return !isExpired;
//   }
//   return true;
// };

// apiWithToken.interceptors.request.use(
//   function (config) {
//     const getToken = store?.getState()?.auth?.token;
//     config.headers.Authorization = 'bearer ' + getToken;

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error, 'axios interceptor');
//   }
// );
export { apiWithToken, apiWithoutToken };
