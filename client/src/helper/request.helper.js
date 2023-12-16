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
  (response) => {
    store.dispatch(finishLoading());
    return response;
  },
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
    console.log(error);
    // if (error.response && error.response.status === 400) {
    //   message.error(error.response.data.message);
    // }
    throw error;
  }
);
