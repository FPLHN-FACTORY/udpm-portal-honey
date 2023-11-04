import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ArchiveCountGiftSlice = createSlice({
  name: "archiveCountGift",
  initialState,
  reducers: {
    SetArchiveCountGift: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const GetArchiveCountGift = (state) => state.archiveCountGift;
export const { SetArchiveCountGift } = ArchiveCountGiftSlice.actions;
export default ArchiveCountGiftSlice.reducer;
