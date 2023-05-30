'use client';

import { notFound, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  postUpdated,
  selectPostById,
} from 'store/state-management/redux/posts/postsSlice';
import Subtitle from '../../atoms/Subtitle/Subtitle';
import PostForm from '../PostForm/PostForm';
import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';

export const EditPostForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const post = useAppSelector((state) => selectPostById(state, id));

  if (!post) {
    notFound();
  }

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useAppDispatch();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id, title, content }));
      router.push(`/redux-demo/post/${id}`);
    }
  };

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
