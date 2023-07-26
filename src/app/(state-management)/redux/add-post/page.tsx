'use client';

import { useCallback, useState } from 'react';

import Subtitle from 'components/atomic-design/atoms/Subtitle-TW';
import PostForm from 'components/atomic-design/organisms/PostForm';
import { useAppDispatch } from 'store/state-management/redux/hook';
import { addNewPost } from 'store/state-management/redux/posts/slice';

export default function Page() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSavePostClicked = useCallback(
    (title: string, content: string) => {
      if (title && content) {
        dispatch(addNewPost({ title, content }));
        setTitle('');
        setContent('');
      }
    },
    [dispatch],
  );

  const onTitleChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    [],
  );

  const onContentChanged = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
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
}
