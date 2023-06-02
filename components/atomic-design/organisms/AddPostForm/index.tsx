'use client';

import React, { useCallback, useState } from 'react';

import { postAdded } from 'store/state-management/redux/posts/slice';
import { useAppDispatch } from 'store/state-management/redux/hook';

import Subtitle from '../../atoms/Subtitle-TW';
import PostForm from '../PostForm';

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content));
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
