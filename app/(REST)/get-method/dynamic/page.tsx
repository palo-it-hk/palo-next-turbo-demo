import PostList from '@/components/atomic-design/organisms/PostList';
import { Post } from 'store/posts';

async function getPosts() {
  const res = await fetch('http://localhost:3000/api/data/posts', {
    //To fetch fresh data on every fetch request, use the cache: 'no-store' option.
    cache: 'no-store',
  });
  return res.json();
}

export default async function Page() {
  const posts: Post[] = (await getPosts()).allPosts;

  console.log('something is ', posts);

  return <PostList posts={posts} />;
}
