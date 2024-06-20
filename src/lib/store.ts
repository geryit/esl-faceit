import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import postsReducer from "@/lib/features/posts/postsSlice";

// `combineSlices` automatically combines the reducers using their `reducerPath`s.
const rootReducer = combineSlices({ posts: postsReducer });
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow creating unique store instances.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
