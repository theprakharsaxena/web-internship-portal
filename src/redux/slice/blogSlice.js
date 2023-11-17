import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    value: null,
  },
  reducers: {
    addAllblogs: (state, action) => {
      state.value = action.payload;
    },
    removeblogs: (state, action) => {
      state.value = null;
    },
  },
});

export const { addAllblogs, removeBlogs } = blogSlice.actions;
export default blogSlice.reducer;
