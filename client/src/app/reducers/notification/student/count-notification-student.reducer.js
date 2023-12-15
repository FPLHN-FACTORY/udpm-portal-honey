import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const CountNotificationStudentSlice = createSlice({
  name: "countNotificationStudent",
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
// export const countNotification = (state) => state.notification.length;

export const GetCountNotification = (state) => state.countNotificationStudent;
export const { SetCountNotification, AddNotification } =
  CountNotificationStudentSlice.actions;
export default CountNotificationStudentSlice.reducer;
