'use client';

import { notFound, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';
import {
  postUpdated,
  postsAdapter,
} from 'store/state-management/redux/posts/slice';
import getSelectors from 'store/state-management/redux/posts/selectors';
import { RootState } from 'store/state-management/redux/store';

import Subtitle from '../../atoms/Subtitle-TW';
import PostForm from '../PostForm';

export const EditPostFormRedux = ({ id }: { id: string }) => {
  const router = useRouter();
  const postSelector = getSelectors(postsAdapter);
  const initialPost = useAppSelector((state: RootState) =>
    postSelector.selectById(state, id),
  );

  if (!initialPost) {
    notFound();
  }

  const [title, setTitle] = useState(initialPost.title);
  const [content, setContent] = useState(initialPost.content);

  const dispatch = useAppDispatch();

  const onTitleChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    [],
  );

  const onContentChanged = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    [],
  );

  const onSavePostClicked = useCallback(
    (title: string, content: string) => {
      if (title && content) {
        dispatch(postUpdated({ id, title, content }));
        router.push(`/redux/post/${id}`);
      }
    },
    [dispatch, id, router],
  );

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

export default EditPostFormRedux;
