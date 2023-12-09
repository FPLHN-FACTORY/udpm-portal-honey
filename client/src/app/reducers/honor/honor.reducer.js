import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const HonorSlice = createSlice({
  name: "honor",
  initialState,
  reducers: {
    AddHonor: (state, action) => {
      state.shift(action.payload);
      return state;
    },
    SetHonor: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const GetHonor = (state) => state.honor;
export const { AddHonor, SetHonor } = HonorSlice.actions;
export default HonorSlice.reducer;
