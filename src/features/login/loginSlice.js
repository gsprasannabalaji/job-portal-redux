import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    email: "",
    password: "",
  },
  apiError: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setApiError: (state, action) => {
      state.apiError = action.payload;
    },
  },
});

export const { setFormData, setApiError } = loginSlice.actions;

export default loginSlice.reducer;
