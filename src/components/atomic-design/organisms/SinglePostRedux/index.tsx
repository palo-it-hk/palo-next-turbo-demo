'use client';

import { notFound, usePathname } from 'next/navigation';
import Link from 'next/link';
import { RootState } from 'store/state-management/redux/store';

import getSelectors from 'store/state-management/redux/posts/selectors';
import { useAppSelector } from 'store/state-management/redux/hook';
import { postsAdapter } from 'store/state-management/redux/posts/slice';

import { PostCard } from '../PostCard';
import { Button } from '../../atoms/Button-SC';

export const SinglePostRedux = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const route = pathname.split('/')[1] as 'mobx' | 'redux';
  const postSelector = getSelectors(postsAdapter);
  const post = useAppSelector((state: RootState) =>
    postSelector.selectById(state, id),
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <PostCard
        title={post.title}
        content={post.content}
        id={post.id}
        route={route}
      />
      <Link href={`/redux/edit-post/${id}`}>
        <Button
          label="edit post"
          size="small"
          style={{ marginTop: '10px' }}
          primary
        />
      </Link>
    </>
  );
};

export default SinglePostRedux;
