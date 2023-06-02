import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Post = {
  id: string;
  title: string;
  content: string;
};

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      // Use the PayloadAction type to declare the contents of `action.payload` the returned result of the prepare function must be
      // the same with action in the reducer function here
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string) {
        return {
          payload: {
            id: (initialState.length + 1).toString(),
            title,
            content,
          },
        };
      },
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
