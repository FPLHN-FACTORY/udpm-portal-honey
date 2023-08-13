import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const StudentSemesterSlice = createSlice({
  name: "studentSemester",
  initialState,
  reducers: {
    AddStudentSemester: (state, action) => {
      state.push(action.payload);
      return state;
    },
    UpdateStudentSemester: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
        return state;
      }
    },
    PutStudentSemester: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    },

    DeleteStudentSemester: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetStudentSemester: (state, action) => {
      state = action.payload;
      return state;
    },
    FindByIdStudentSemester: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        return state[index];
      }
    },
  },
});

export const GetStudentSemester = (state) => state.studentSemester;
export const { AddStudentSemester, UpdateStudentSemester, DeleteStudentSemester, SetStudentSemester, PutStudentSemester, FindByIdStudentSemester } = StudentSemesterSlice.actions;
export default StudentSemesterSlice.reducer;
