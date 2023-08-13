import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const HoneySlice = createSlice({
  name: "honey",
  initialState,
  reducers: {
    AddHoney: (state, action) => {
      let data = action.payload;
      let obj = {
        content: data.comment.content,
        createdDate: data.comment.createdDate,
        id: data.comment.id,
        reply: data.comment.reply,
        userID: data.user.id,
        userName: data.user.name,
        userImg: data.user.img,
        listReply: [],
      };
      state.push(obj);
      return state;
    },

    AddReply: (state, action) => {
      const { comment, user } = action.payload;
      const reply = {
        content: comment.content,
        createdDate: comment.createdDate,
        id: comment.id,
        reply: comment.reply,
        userID: user.id,
        userName: user.name,
        userImg: user.img,
      };
      const commentIndex = state.findIndex((item) => item.id === comment.reply);
      if (commentIndex !== -1) {
        state[commentIndex].listReply.push(reply);
      }
      return state;
    },

    UpdateHoney: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutHoney: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteHoney: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetHoney: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdHoney: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetHoney = (state) => state.honey;
export const {
  AddHoney,
  AddReply,
  UpdateHoney,
  DeleteHoney,
  SetHoney,
  PutHoney,
  FindByIdHoney,
} = HoneySlice.actions;
export default HoneySlice.reducer;
