// The store is usually the very first thing you create when implementing Redux.
// This is where the states of the application lives. It's created by using the RTK's configureStore()
// and passing reducers in it.

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/slice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// If you are using typescript, you add the part below as you may want to extract the root State
// type and dispatch type so that they can be referenced as needed.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
