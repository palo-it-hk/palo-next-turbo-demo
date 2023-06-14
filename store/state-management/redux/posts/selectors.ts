// This a separate file to store selectors

import { EntityAdapter } from '@reduxjs/toolkit';

import { Post } from 'store/posts';

import { useAppSelector } from '../hook';
import { RootState } from '../store';

export default function (postsAdapter: EntityAdapter<Post>) {
  // postsAdapter is created with createEntityAdapter(). It enables built-in selectors such as the below
  // For more basic selectors, see https://redux-toolkit.js.org/api/createEntityAdapter#selector-functions
  const defaultSelector = postsAdapter.getSelectors(
    (state: RootState) => state.posts,
  );

  const getPostStatus = useAppSelector((state) => state.posts.status);
  const getErrorStatus = useAppSelector((state) => state.posts.error);

  return { ...defaultSelector, getPostStatus, getErrorStatus };
}
