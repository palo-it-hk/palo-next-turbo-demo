'use client';

import { useEffect } from 'react';

import Subtitle from '@/components/atomic-design/atoms/Subtitle-TW';
import PostList from '@/components/atomic-design/organisms/PostList';
import {
  useAppDispatch,
  useAppSelector,
} from 'store/state-management/redux/hook';
import { postSelectorInit } from 'store/state-management/redux/posts/selectors';
import { fetchPosts } from 'store/state-management/redux/posts/slice';

export default function Page() {
  const dispatch = useAppDispatch();
  const postSelector = postSelectorInit();
  const posts = useAppSelector(postSelector.selectAll);
  const postStatus = postSelector.getPostStatus;
  const error = postSelector.getErrorStatus;

  useEffect(() => {
    // originally we check if this data has already been fetched before by assigning it a postState
    // But because Next has a caching which detects if a data has already been fetched, there
    // may be no use for this checking.
    // But for now lets use the post status until the cache feature is fully understood
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content: JSX.Element | JSX.Element[] = <div>Loading</div>;

  if (postStatus === 'succeeded') {
    content = <PostList posts={posts} />;
  } else if (postStatus === 'failed') {
    content = <>{error}</>;
  }

  return (
    <section>
      <Subtitle subtitle="Posts" />
      {content}
    </section>
  );
}
