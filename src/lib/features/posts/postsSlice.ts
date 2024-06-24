import {API_URL, FEED_PER_PAGE} from "@/config/constants";
import type { Post } from "@/types/Post";
import type { User } from "@/types/User";
import { handleError } from "@/utils/handleResponseError";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PostsState {
  posts: Post[];
  users: { [key: number]: User };
  status: "idle" | "loading" | "succeeded" | "failed";
  singleStatus: "idle" | "loading" | "succeeded" | "failed";
  usersStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  hasMoreData: boolean;
}

const initialState: PostsState = {
  posts: [],
  users: {},
  status: "idle",
  singleStatus: "idle",
  usersStatus: "idle",
  error: null,
  page: 1,
  hasMoreData: false,
};

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId: number) => {
    const response = await fetch(`${API_URL}/posts/${postId}`);
    if (!response.ok) {
      throw await handleError(response);
    }
    return (await response.json()) as Post;
  }
);

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (page: number) => {
    const limit = FEED_PER_PAGE;
    const offset = (page - 1) * limit;
    const url = `${API_URL}/posts/?_start=${offset}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw await handleError(response);
    }
    return (await response.json()) as Post[];
  }
);

export const fetchUsers = createAsyncThunk(
  "posts/fetchUserIds",
  async (userIds: number[]) => {
    return Promise.all(
      userIds.map(async (userId) => {
        const response = await fetch(`${API_URL}/users/${userId}`);
        if (!response.ok) {
          throw await handleError(response);
        }
        return (await response.json()) as User;
      })
    );
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePost.pending, (state) => {
        state.singleStatus = "loading";
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.singleStatus = "succeeded";
        // add the new post to the array if it doesnt exist
        if (!state.posts.find((p) => p.id === action.payload.id)) {
          state.posts.push(action.payload);
        }
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        state.singleStatus = "failed";
        state.error = action.error.message || "Could not fetch post";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // empty your posts array if its the first page
        if (state.page === 1) {
          state.posts = [];
        }

        state.posts = state.posts.concat(action.payload);
        state.page += 1;
        state.hasMoreData = action.payload.length > 0;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Could not fetch posts";
      })
      .addCase(fetchUsers.pending, (state) => {
        state.usersStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        action.payload.forEach((user) => {
          state.users[user.id] = user;
        });
        state.usersStatus = "succeeded";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.error = action.error.message || "Could not fetch users";
      });
  },
});

export default postsSlice.reducer;
