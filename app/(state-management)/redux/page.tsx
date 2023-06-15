'use client';

import { useEffect } from 'react';

import Subtitle from '@/components/atomic-design/atoms/Subtitle-TW';
import PostList from '@/components/atomic-design/organisms/PostList';
import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';
import getSelectors from 'store/state-management/redux/posts/selectors';
import {
  fetchPosts,
  postsAdapter,
} from 'store/state-management/redux/posts/slice';

export const Page = () => {
  // Initiate dispatch
  const dispatch = useAppDispatch();
  //
  const postSelector = getSelectors(postsAdapter);
  const allPosts = useAppSelector(postSelector.selectAll);
  const postStatus = postSelector.getPostStatus;
  const error = postSelector.getErrorStatus;

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content: JSX.Element | JSX.Element[] = <div>Loading</div>;

  if (postStatus === 'succeeded') {
    content = <PostList posts={allPosts} />;
  } else if (postStatus === 'failed') {
    content = <>{error}</>;
  }

  return (
    <section>
      <Subtitle subtitle="Posts" />
      {content}
    </section>
  );
};

export default Page;
