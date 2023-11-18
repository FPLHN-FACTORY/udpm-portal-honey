import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const GiftArchiveSlice = createSlice({
  name: "giftArchive",
  initialState,
  reducers: {
    SetGiftArchive: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const GetGiftArchive = (state) => state.giftArchive;
export const { SetGiftArchive } = GiftArchiveSlice.actions;
export default GiftArchiveSlice.reducer;
