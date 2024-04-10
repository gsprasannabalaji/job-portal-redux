import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  galleryImages: [],
  error: {
    message: "",
    status: 200,
  },
};


export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleryImages: (state, action) => {
        debugger;
        state.galleryImages = action.payload;
    },
    setGalleryError: (state, action) => {
        debugger;
        state.error = action.payload;
    }
  },
});

export const { setGalleryImages, setGalleryError } = gallerySlice.actions;

export default gallerySlice.reducer;
