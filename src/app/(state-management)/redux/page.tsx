'use client';

import { useEffect } from 'react';

import Subtitle from 'components/atomic-design/atoms/Subtitle-TW';
import PostList from 'components/atomic-design/organisms/PostList';
import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';
import getSelectors from 'store/state-management/redux/posts/selectors';
import {
  fetchPosts,
  postsAdapter,
} from 'store/state-management/redux/posts/slice';
import { usePathname } from 'next/navigation';

const Page = () => {
  // Initiate dispatch
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const route = pathname.split('/')[1] as 'mobx' | 'redux';

  const postSelector = getSelectors(postsAdapter);
  const allPosts = useAppSelector(postSelector.selectAll);

  const { postStatus, errorStatus } = postSelector;

  useEffect(() => {
    if (postStatus === 'idle' || postStatus === 'failed') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content = <div>Loading</div>;

  if (postStatus === 'succeeded') {
    content = <PostList posts={allPosts} route={route} />;
  } else if (postStatus === 'failed') {
    content = <>{errorStatus}</>;
  }

  return (
    <section>
      <Subtitle subtitle="Posts" />
      {content}
    </section>
  );
};

export default Page;
