import { API_URL } from "@/config/constants";
import { handleError } from "@/utils/handleResponseError";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
}
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsState {
  posts: Post[];
  users: { [key: number]: User };
  status: "idle" | "loading" | "succeeded" | "failed";
  usersStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  hasMoreData: boolean;
}

const initialState: PostsState = {
  posts: [],
  users: {},
  status: "idle",
  usersStatus: "idle",
  error: null,
  page: 1,
  hasMoreData: true,
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

export const fetchUsers = createAsyncThunk(
  "posts/fetchUserIds",
  async (userIds: number[]) => {
    return Promise.all(
      userIds.map(async (userId) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
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
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
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
