'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RootState } from 'store/state-management/redux/store';

import { postSelectorInit } from 'store/state-management/redux/posts/selectors';
import { useAppSelector } from 'store/state-management/redux/hook';

import { PostCard } from '../PostCard';
import { Button } from '../../atoms/Button-SC';

export const SinglePost = ({ id }: { id: string }) => {
  const postSelector = postSelectorInit();
  const post = useAppSelector((state: RootState) =>
    postSelector.selectById(state, id),
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostCard title={post.title} content={post.content} id={post.id} />
      <Link href={`/redux-demo/edit-post/${id}`}>
        <Button label="edit post" size="small" style={{ marginTop: '10px' }} />
      </Link>
    </>
  );
};

export default SinglePost;
