import { API_URL } from "@/config/constants";
import { handleError } from "@/utils/handleResponseError";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const url = `${API_URL}?_start=${offset}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw await handleError(response);
    }
    return (await response.json()) as Post[];
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Could not fetch posts";
      });
  },
});

export default postsSlice.reducer;
