import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ArchiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    SetArchive: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});
export const GetArchive = (state) => state.archive;
export const { SetArchive } = ArchiveSlice.actions;
export default ArchiveSlice.reducer;
