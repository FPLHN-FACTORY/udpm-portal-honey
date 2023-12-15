import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const CountNotificationCensorSlice = createSlice({
  name: "countNotificationCensor",
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

export const GetCountNotification = (state) => state.countNotificationCensor;
export const { SetCountNotification, AddNotification } =
  CountNotificationCensorSlice.actions;
export default CountNotificationCensorSlice.reducer;
