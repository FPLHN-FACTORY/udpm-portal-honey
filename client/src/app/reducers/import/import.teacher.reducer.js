import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const ImportTeacherSlice = createSlice({
  name: "importTeacher",
  initialState,
  reducers: {
    AddImport: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateImport: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutImport: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteImport: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetImport: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdImport: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetImport = (state) => state.importTeacher;
export const {
  AddImport,
  UpdateImport,
  DeleteImport,
  SetImport,
  PutImport,
  FindByIdImport,
} = ImportTeacherSlice.actions;
export default ImportTeacherSlice.reducer;
