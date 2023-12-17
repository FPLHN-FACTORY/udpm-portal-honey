import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const NotificationPresidentSlice = createSlice({
  name: "notificationPresident",
  initialState,
  reducers: {
    AddNotification: (state, action) => {
      state.push(action.payload);
    },
    UpdateNotification: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      }
    },
    PutNotification: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    DeleteNotification: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    SetNotification: (state, action) => {
      return action.payload;
    },
    FindByIdNotification: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetNotification = (state) => state.notificationPresident;
export const {
  AddNotification,
  UpdateNotification,
  DeleteNotification,
  SetNotification,
  PutNotification,
  FindByIdNotification,
} = NotificationPresidentSlice.actions;
export default NotificationPresidentSlice.reducer;
