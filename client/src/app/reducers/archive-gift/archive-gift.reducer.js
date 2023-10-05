import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ArchiveGiftSlice = createSlice({
  name: "archiveGift",
  initialState,
  reducers: {
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
  },
});

export const GetArchiveGift = (state) => state.archiveGift;
export const { DeleteArchiveGift, SetArchiveGift, FindByIdArchiveGift } =
  ArchiveGiftSlice.actions;
export default ArchiveGiftSlice.reducer;
