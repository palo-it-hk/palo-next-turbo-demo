'use client';

import PostList from '@/components/atomic-design/organisms/PostList';
import { MobxContext } from '@/components/atomic-design/templates/Providers';
import { observer } from 'mobx-react-lite';

import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const Page = () => {
  const pathname = usePathname();
  const route = pathname.split('/')[1] as 'mobx' | 'redux';
  const postStore = useContext(MobxContext);

  const { status, posts, error } = postStore;

  useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      postStore.fetchPosts();
    }
  }, [status]);

  let content = <>Loading...</>;

  if (status === 'succeeded') {
    content = <PostList posts={posts} route={route} />;
  } else if (status === 'failed') {
    content = <>{error}</>;
  }

  return <>{content}</>;
};

export default observer(Page);
