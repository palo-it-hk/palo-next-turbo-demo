'use client';

import React, { useState } from 'react';
import Subtitle from '../../atoms/Subtitle/Subtitle';
import {
  postAdded,
  selectAllPosts,
} from 'store/state-management/redux/posts/postsSlice';
import PostForm from '../PostForm/PostForm';
import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const allPosts = useAppSelector(selectAllPosts);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: (allPosts.length + 1).toString(),
          title,
          content,
        }),
      );
      setTitle('');
      setContent('');
    }
  };

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  return (
    <>
      <Subtitle subtitle="Add a new Post" />

      <PostForm
        title={title}
        titleAction={onTitleChanged}
        content={content}
        contentAction={onContentChanged}
        saveAction={onSavePostClicked}
      />
    </>
  );
};
