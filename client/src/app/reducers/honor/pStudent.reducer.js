import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const PStudentSlice = createSlice({
  name: "pStudent",
  initialState,
  reducers: {
    AddPStudent: (state, action) => {
      state.shift(action.payload);
      return state;
    },
    SetPStudent: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const GetPStudent = (state) => state.pStudent;
export const { AddPStudent, SetPStudent } = PStudentSlice.actions;
export default PStudentSlice.reducer;
