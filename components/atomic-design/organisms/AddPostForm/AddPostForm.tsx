'use client';

import React, { useState } from 'react';
import Subtitle from '../../atoms/Subtitle/Subtitle';
import { Wrapper } from './AddPostForm.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  postAdded,
  selectAllPosts,
} from 'store/state-management/redux/posts/postsSlice';

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);
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
    <Wrapper>
      <Subtitle subtitle="Add a new Post" />

      <p>Post Title:</p>
      <input type="text" value={title} onChange={onTitleChanged} />
      <p>Content:</p>
      <textarea value={content} onChange={onContentChanged} />
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </Wrapper>
  );
};
