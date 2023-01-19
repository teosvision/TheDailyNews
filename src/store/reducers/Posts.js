import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostsByid } from "../utils/Thunks";
export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    loading: true,
    articles: {
      items: [],
    },
  },
  reducers: {
    clearPostById: (state, action) => {
      state.postById = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchPostsByid.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByid.fulfilled, (state, action) => {
        state.loading = false;
        state.postById = action.payload;
      })
      .addCase(fetchPostsByid.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { clearPostById } = postsSlice.actions;
export default postsSlice.reducer;
