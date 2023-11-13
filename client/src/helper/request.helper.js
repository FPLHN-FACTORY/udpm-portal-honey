/** @format */

import axios from "axios";
import { AppConfig } from "../AppConfig";
import { getToken } from "./userToken";
import {
  finishLoading,
  startLoading,
} from "../app/reducers/loading/loading.reducer";
import { store } from "../app/store";

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

request.interceptors.request.use((config) => {
  store.dispatch(startLoading());
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (config) => {
    store.dispatch(finishLoading());
    return config;
  },
  (response) => response,
  (error) => {
    store.dispatch(finishLoading());
    if (error.response.status === 404) {
      window.location.href = window.location.origin + "/404";
      return;
    }
    if (error.response.status === 401) {
      window.location.href = window.location.origin + "/401";
      return;
    }
    return Promise.reject(error);
  }
);
