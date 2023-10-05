import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const GiftSlice = createSlice({
  name: "gift",
  initialState,
  reducers: {
    AddGift: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetGift: (state, action) => {
      state = action.payload;
      return state;
    },
    PushGift: (state, action) => {
      const data = action.payload;
      // let newGift = {
      //   id: data.id,
      //   code: data.code,
      //   name: data.name,
      //   image: data.image,
      //   stt: data.stt,
      // };
      state = [...data, ...state];
      return state;
    },
    FindByIdGift: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetGift = (state) => state.gift;
export const {
  AddGift,
  PushGift,
  UpdateGift,
  DeleteGift,
  SetGift,
  PutGift,
  FindByIdGift,
} = GiftSlice.actions;
export default GiftSlice.reducer;
