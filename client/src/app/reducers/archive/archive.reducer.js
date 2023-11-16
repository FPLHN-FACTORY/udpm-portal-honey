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
export const GetArchive = (state) => state.archive;
export const { SetArchive } = ArchiveSlice.actions;
export default ArchiveSlice.reducer;
