import { RootState } from '../store';
import { postsAdapter } from './slice';
import { useAppSelector } from '../hook';

export const postSelectorInit = () => {
  // This here gives you all the basic selectors described here https://redux-toolkit.js.org/api/createEntityAdapter#selector-functions
  const defaultSelector = postsAdapter.getSelectors(
    (state: RootState) => state.posts,
  );

  const getPostStatus = useAppSelector((state) => state.posts.status);
  const getErrorStatus = useAppSelector((state) => state.posts.error);

  return { ...defaultSelector, getPostStatus, getErrorStatus };
};
