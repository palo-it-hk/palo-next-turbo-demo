import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// With typescript, you may want to extract the root State
// type and dispatch type so that they can be referenced as needed .

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
