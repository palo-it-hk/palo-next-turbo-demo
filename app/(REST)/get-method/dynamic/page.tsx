import PostList from '@/components/atomic-design/organisms/PostList';
import { Post } from 'store/posts';

async function getPosts() {
  // To fetch fresh data on every fetch request, use the cache: 'no-store' option.
  // As such, This page will be rendered in the server every time a request is received.
  const res = await fetch('http://localhost:3000/api/data/posts', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Page() {
  const posts: Post[] = (await getPosts()).allPosts;
  return <PostList posts={posts} />;
}
