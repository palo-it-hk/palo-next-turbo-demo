// Slices represents layers of state including it's initial state, reducers and actions.
// You can understand how this slice is created by following the numbered comments.

// 1a) Create the Slice and the initial state and the entity adaptor
// 1b) Create the initial state
// 2)  Create some reducers
// 3a) Thunk
// 3b) Create Thunk actions using createAsyncThunk
// 4)  Action creators
// 5)  Export it

import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Post } from 'store/posts';

export type InitialStateType = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

// 1c) Create the entity adaptor
// which gens a set of prebuilt reducers and selectors for CRUD actions for normalized state structures.
export const postsAdapter = createEntityAdapter<Post>();

// 1b) Create the initial state
const initialState: EntityState<Post> & InitialStateType =
  postsAdapter.getInitialState({
    status: 'idle',
    error: undefined,
  });

// 3b) Create Thunk actions using createAsyncThunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/api/data/posts');
  const allPosts: Post[] = (await response.json()).allPosts;
  return allPosts;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: { title: string; content: string }) => {
    const res = await fetch('/api/data/posts', {
      method: 'POST',
      body: JSON.stringify(initialPost),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await (
      await res.json()
    ).newPost;
  },
);

// 1a) Create the Slice,  initial state and entity adaptor
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 2) Create some reducers
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, ...changes } = action.payload;
      const existingPostId = postsAdapter.selectId(action.payload);
      if (existingPostId) {
        postsAdapter.updateOne(state, { id, changes });
      }
    },
  },
  // 3a ->) Thunk
  // Reducers with Async logic are attached here
  // This is to map out the logic/actions that ensue for each status (pending, fulfilled, rejected)
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // postsAdaptor is created with createEntityAdaptor.
        // The following .upsertMany is an example of the built-in CRUD actions
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

// 4) Pulls out the actions incased within the slice so that it can used by components.
export const { postUpdated } = postsSlice.actions;

// 5) Export it
export default postsSlice.reducer;
