import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const CountNotificationPresidentSlice = createSlice({
  name: "countNotificationPresident",
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

export const GetCountNotification = (state) => state.countNotificationPresident;
export const { SetCountNotification, AddNotification } =
  CountNotificationPresidentSlice.actions;
export default CountNotificationPresidentSlice.reducer;
