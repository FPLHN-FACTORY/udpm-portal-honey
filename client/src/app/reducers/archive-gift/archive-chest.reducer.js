import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ArchiveChestSlice = createSlice({
  name: "archiveChest",
  initialState,
  reducers: {
    SetArchiveChest: (state, action) => {
      state = action.payload;
      return state;
    },
    DeleteArchiveChest: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
  },
});

export const GetArchiveChest = (state) => state.archiveChest;
export const { SetArchiveChest, DeleteArchiveChest } =
  ArchiveChestSlice.actions;
export default ArchiveChestSlice.reducer;
