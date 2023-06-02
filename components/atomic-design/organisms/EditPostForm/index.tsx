'use client';

import { notFound, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  postUpdated,
  selectPostById,
} from 'store/state-management/redux/posts/slice';
import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';

import Subtitle from '../../atoms/Subtitle-TW';
import PostForm from '../PostForm';

export const EditPostForm = ({ id }: { id: string }) => {
  const post = useAppSelector((state) => selectPostById(state, id));

  if (!post) {
    notFound();
  }

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useAppDispatch();

  const onTitleChanged = useCallback(() => {
    return (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  }, []);

  const onContentChanged = useCallback(() => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      setContent(e.target.value);
  }, []);

  const router = useRouter();

  const onSavePostClicked = useCallback(() => {
    return () => {
      if (title && content) {
        dispatch(postUpdated({ id, title, content }));
        router.push(`/redux-demo/post/${id}`);
      }
    };
  }, []);

  return (
    <>
      <Subtitle subtitle="Edit Post" />
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

export default EditPostForm;
