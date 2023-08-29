'use client';

import { notFound, usePathname } from 'next/navigation';
import Link from 'next/link';
import { RootState } from 'store/state-management/redux/store';

import { PostCard } from '../PostCard';
import { Button } from '../../atoms/Button-SC';
import { observer } from 'mobx-react-lite';
import { MobxContext } from '../../templates/Providers';
import { useContext } from 'react';

export const SinglePostMobx = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const route = pathname.split('/')[1] as 'mobx' | 'redux';

  // Gets the current state of the postStore
  const postStore = useContext(MobxContext);

  const post = postStore.getPostById(id);

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
      <Link href={`/${route}/edit-post/${id}`}>
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

// wrap in observer so it can subscribe to changes in state
export default observer(SinglePostMobx);
