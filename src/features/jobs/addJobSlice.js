import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newJob: {
    title: "",
    description: "",
    applyLink: "",
    companyName: "",
    salary: "",
  },
};

export const newJobSlice = createSlice({
  name: "addJob",
  initialState,
  reducers: {
    setNewJob: (state, action) => {
      state.newJob = action.payload;
    },
  },
});

export const { setNewJob } = newJobSlice.actions;

export default newJobSlice.reducer;
