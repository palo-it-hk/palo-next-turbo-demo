'use client';

import { observer } from 'mobx-react-lite';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

import PostList from '@/components/atomic-design/organisms/PostList';
import { MobxContext } from '@/components/atomic-design/templates/Providers';

const Page = () => {
  const pathname = usePathname();
  const route = pathname.split('/')[1] as 'mobx' | 'redux';

  // Gets the current state of the postStore
  const postStore = useContext(MobxContext);

  const { status, posts, error } = postStore;
  // [x] const {state,posts,error, fetchPosts} = postStore
  // Methods that have "this" should not be deconstructed out
  // This is because the this reference is not referencing postStore but the global
  useEffect(() => {
    if (status === 'idle' || status === 'failed') {
      postStore.fetchPosts();
    }
  }, [status, postStore]);

  let content = <>Loading...</>;

  if (status === 'succeeded') {
    content = <PostList posts={posts} route={route} />;
  } else if (status === 'failed') {
    content = <>{error}</>;
  }

  return <>{content}</>;
};

// wrap in observer so it can subscribe to changes in state
export default observer(Page);
