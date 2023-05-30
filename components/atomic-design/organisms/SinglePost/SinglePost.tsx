'use client';

import { notFound } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectPostById } from 'store/state-management/redux/posts/postsSlice';
import { RootState } from 'store/state-management/redux/store';
import { PostCard } from '../PostCard/PostCard';
import { Button } from '../../atoms/Button-SC';
import Link from 'next/link';

export const SinglePost = ({ id }: { id: string }) => {
  const post = useSelector((state: RootState) => selectPostById(state, id));

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostCard title={post.title} content={post.content} />
      <Link href={`/redux-demo/edit-post/${id}`}>
        <Button label="edit post" size="small" style={{ marginTop: '10px' }} />
      </Link>
    </>
  );
};

export default SinglePost;
