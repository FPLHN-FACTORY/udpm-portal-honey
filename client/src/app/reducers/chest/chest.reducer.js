import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ChestSlice = createSlice({
  name: "chest",
  initialState,
  reducers: {
    AddChest: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateChest: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutChest: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteChest: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetChest: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdChest: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetChest = (state) => state.chest;
export const {
  AddChest,
  UpdateChest,
  DeleteChest,
  SetChest,
  PutChest,
  FindByIdChest,
} = ChestSlice.actions;
export default ChestSlice.reducer;
