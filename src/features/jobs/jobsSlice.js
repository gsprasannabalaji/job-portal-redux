import {createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobsList: [],
    error: {
        message: "",
        status: 200
    }
}

export const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJobsList: (state, action) => {
            state.jobsList = action.payload;
        },
        setJobError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const { setJobsList, setJobError } = jobsSlice.actions;

export default jobsSlice.reducer;