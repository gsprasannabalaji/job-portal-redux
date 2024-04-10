import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newJob: {
    title: "",
    description: "",
    applyLink: "",
    companyName: "",
    salary: "",
  },
  error: {
    message: "",
    status: 200,
  },
};

export const newJobSlice = createSlice({
  name: "addJob",
  initialState,
  reducers: {
    setNewJob: (state, action) => {
      state.newJob = action.payload;
    },
    setNewJobError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNewJob, setNewJobError } = newJobSlice.actions;

export default newJobSlice.reducer;
