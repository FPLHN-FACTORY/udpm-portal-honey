import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const SemesterSlice = createSlice({
    name: "semester",
    initialState,
    reducers: {
        AddSemester: (state, action) => {
            state.push(action.payload);
            return state;
        },
        UpdateSemester: (state, action) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state[index] = action.payload
                return state;
            }
        },
        PutSemester: (state, action) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state[index] = action.payload
            } else {
                state.push(action.payload);
            }
            return state;
        },
        
        DeleteSemester: (state, action) => {
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
                return state;
            }
        },
        SetSemester: (state, action) => {
            state = action.payload;
            return state;
        },
        FindByIdSemester: (state, action) => { 
            const index = state.findIndex((el) => el.id === action.payload.id);
            if (index > -1) {
                return state[index]
            }
        }
    }
})

export const GetSemester = (state) => state.semester;
export const { AddSemester, UpdateSemester, DeleteSemester, SetSemester, PutSemester, FindByIdSemester } = SemesterSlice.actions;
export default SemesterSlice.reducer;
