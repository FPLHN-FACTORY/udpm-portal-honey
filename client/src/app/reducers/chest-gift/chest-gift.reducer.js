import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ChestGiftSlice = createSlice({
  name: "chestGift",
  initialState,
  reducers: {
    AddChestGift: (state, action) => {
      state.push(...action.payload);
      return state;
    },
    PutChestGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteChestGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetChestGift: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdChestGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetChestGift = (state) => state.chestGift;
export const {
  AddChestGift,
  DeleteChestGift,
  SetChestGift,
  PutChestGift,
  FindByIdChestGift,
} = ChestGiftSlice.actions;
export default ChestGiftSlice.reducer;
