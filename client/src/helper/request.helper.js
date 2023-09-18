/** @format */

import axios from "axios";
import { AppConfig } from "../AppConfig";
// import { getToken } from "./userToken";

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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0Y2YyMWY0LWYzZTAtNDkwZS1iMWNjLTA4ZGJiNzQzZGQ3ZCIsIm5hbWUiOiJUcmlldSBWYW4gVHVvbmcgUEggMiA2IDEgNCA5IiwiZW1haWwiOiJ0dW9uZ3R2cGgyNjE0OUBmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0dW9uZ3R2cGgyNjE0OSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMU0hTd1cxb3B2ZVRzTjI4RGdHS0pLSWNYekpsY3hJd090c0VfbGZsZjk4SXc9czk2LWMiLCJpZFRyYWluaW5nRmFjaWxpdHkiOiI3OTZhNGZhNC04YWFiLTQyYzQtOWYzNS04NzBiYjAwMDVhZjEiLCJsb2NhbEhvc3QiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgiLCJyb2xlIjoiQURNSU4iLCJyb2xlTmFtZXMiOiJRdeG6o24gdHLhu4sgdmnDqm4iLCJuYmYiOjE2OTUwMzA5NjksImV4cCI6MTc2ODY0Mzc2OSwiaWF0IjoxNjk1MDMwOTY5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ5MDUzIn0.Zxmp3Ax5QVp2PK3b5BNfhcgs7c9bbWCYGF6R0QExd5s";
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
