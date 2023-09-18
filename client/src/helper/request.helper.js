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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkNTY2MDkyLWIyZGQtNDljNi1iMWMxLTA4ZGJiNzQzZGQ3ZCIsIm5hbWUiOiJQaMO5bmcgVmnhu4d0IEjDuW5nIFAgSCAyIDUgOSAyIDkiLCJlbWFpbCI6Imh1bmdwdnBoMjU5MjlAZnB0LmVkdS52biIsInVzZXJOYW1lIjoiaHVuZ3B2cGgyNTkyOSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJMjM0RjZsOUREQUM3UUFQTnpsSE9Ob0hRQzVJTWhQSlRNZjk2VHdINVFTQT1zOTYtYyIsImlkVHJhaW5pbmdGYWNpbGl0eSI6Ijc5NmE0ZmE0LThhYWItNDJjNC05ZjM1LTg3MGJiMDAwNWFmMSIsImxvY2FsSG9zdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODg4OCIsInJvbGUiOiJBRE1JTiIsInJvbGVOYW1lcyI6IlF14bqjbiB0cuG7iyB2acOqbiIsIm5iZiI6MTY5NTAyMDEyMSwiZXhwIjoxNjk3NjEyMTIxLCJpYXQiOjE2OTUwMjAxMjEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ5MDUzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDkwNTMifQ.ODk7g4y006BZjE8G5MY2HTooXyldi948YeyAKJgwC7A";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/not-authorization";
    }
    if (error.response && error.response.status === 404) {
      window.location.href = "/not-found";
    }
    throw error;
  }
);
