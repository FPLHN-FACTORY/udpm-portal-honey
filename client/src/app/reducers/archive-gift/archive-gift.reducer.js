import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ArchiveGiftSlice = createSlice({
  name: "archiveGift",
  initialState,
  reducers: {
    AddArchiveGift: (state, action) => {
      state.push(action.payload);
      return state;
    },
    DeleteArchiveGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetArchiveGift: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdArchiveGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
    PutArchiveGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },
  },
});

export const GetArchiveGift = (state) => state.archiveGift;
export const {
  DeleteArchiveGift,
  AddArchiveGift,
  SetArchiveGift,
  PutArchiveGift,
  FindByIdArchiveGift,
} = ArchiveGiftSlice.actions;
export default ArchiveGiftSlice.reducer;
