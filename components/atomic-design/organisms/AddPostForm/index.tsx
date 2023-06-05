'use client';

import React, { useCallback, useState } from 'react';

import { useAppDispatch } from 'store/state-management/redux/hook';
import { addNewPost } from 'store/state-management/redux/posts/slice';

import PostForm from '../PostForm';
import Subtitle from '../../atoms/Subtitle-TW';

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(addNewPost({ title, content }));
      setTitle('');
      setContent('');
    }
  };

  const onTitleChanged = useCallback(() => {
    (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  }, []);

  const onContentChanged = useCallback(
    () => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setContent(e.target.value),
    [],
  );

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
