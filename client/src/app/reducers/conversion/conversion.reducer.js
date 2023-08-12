import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ConversionSlice = createSlice({
  name: "conversion",
  initialState,
  reducers: {
    AddConversion: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateConversion: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutConversion: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteConversion: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetConversion: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdConversion: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetConversion = (state) => state.conversion;
export const {
  AddConversion,
  UpdateConversion,
  DeleteConversion,
  SetConversion,
  PutConversion,
  FindByIdConversion,
} = ConversionSlice.actions;
export default ConversionSlice.reducer;
