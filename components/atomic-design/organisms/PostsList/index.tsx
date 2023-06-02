'use client';

import React from 'react';

import { selectAllPosts } from 'store/state-management/redux/posts/slice';
import { useAppSelector } from 'store/state-management/redux/hook';

import { PostCard } from '../PostCard';
import Subtitle from '../../atoms/Subtitle-TW';

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

export default PostsList;
