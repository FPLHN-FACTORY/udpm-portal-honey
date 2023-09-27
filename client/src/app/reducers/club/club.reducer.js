import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ClubSlice = createSlice({
  name: "club",
  initialState,
  reducers: {
    AddClub: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateClub: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutClub: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteClub: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetClub: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdClub: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetClub = (state) => state.club;
export const {
  AddClub,
  UpdateClub,
  DeleteClub,
  SetClub,
  PutClub,
  FindByIdClub,
} = ClubSlice.actions;
export default ClubSlice.reducer;
