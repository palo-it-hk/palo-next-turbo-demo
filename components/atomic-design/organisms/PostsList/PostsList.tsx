'use client';

import React from 'react';
import { selectAllPosts } from 'store/state-management/redux/posts/postsSlice';
import { PostCard } from '../PostCard/PostCard';
import Subtitle from '../../atoms/Subtitle/Subtitle';
import { useAppSelector } from 'store/state-management/redux/hook';

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);

  const renderedPosts = posts.map((post) => (
    <div key={post.id}>
      <PostCard id={post.id} title={post.title} content={post.content} />
    </div>
  ));

  return (
    <section>
      <Subtitle subtitle="Posts" />
      {renderedPosts}
    </section>
  );
};
