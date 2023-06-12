import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Post } from 'store/posts';

export type InitialStateType = {
  // We can use this information to decide what to show in our UI as the request progresses,
  // and also add logic in our reducers to prevent cases like loading data twice.
  // But since NextJS has data caching (to be explored), this use case might not be applicable
  // However the status can be useful for manipulating loading status on the UI
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

export const postsAdapter = createEntityAdapter<Post>();

const initialState: EntityState<Post> & InitialStateType =
  postsAdapter.getInitialState({
    status: 'idle',
    error: undefined,
  });

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('http://www.localhost:3000/api/data/posts');
  const allPosts: Post[] = (await response.json()).allPosts;
  return allPosts;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: { title: string; content: string }) => {
    const res = await fetch('http://www.localhost:3000/api/data/posts', {
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

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, ...changes } = action.payload;
      const existingPostId = postsAdapter.selectId(action.payload);
      if (existingPostId) {
        postsAdapter.updateOne(state, { id, changes });
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
