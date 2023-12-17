import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const CountNotificationTeacherSlice = createSlice({
  name: "countNotificationTeacher",
  initialState,
  reducers: {
    SetCountNotification: (state, action) => {
      state = action.payload;
      return state;
    },
    AddNotification: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const GetCountNotification = (state) => state.countNotificationTeacher;
export const { SetCountNotification, AddNotification } =
  CountNotificationTeacherSlice.actions;
export default CountNotificationTeacherSlice.reducer;
