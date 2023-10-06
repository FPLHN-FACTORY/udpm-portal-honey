/** @format */

import axios from "axios";
import { AppConfig } from "../AppConfig";
import { getToken } from "./userToken";

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

// request.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (config.headers && token) {
//       config.headers["Authorization"] = token;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

request.interceptors.request.use((config) => {
  const token = getToken();
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/not-authorization";
    }
    // if (error.response && error.response.status === 404) {
    //   window.location.href = "/not-found";
    // }
    throw error;
  }
);
