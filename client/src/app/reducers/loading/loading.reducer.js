import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const LoaddingSlice = createSlice({
  name: "loadding",
  initialState,
  reducers: {
    startLoading: (state) => {
      state = true;
      return state;
    },
    finishLoading: (state) => {
      state = false;
      return state;
    },
  },
});

export const GetLoading = (state) => state.loadding;
export const { startLoading, finishLoading } = LoaddingSlice.actions;
export const SelectLoading = (state) => state.loadding;
export default LoaddingSlice.reducer;
