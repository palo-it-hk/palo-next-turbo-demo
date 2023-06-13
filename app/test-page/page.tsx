import PostList from '@/components/atomic-design/organisms/PostList';

async function getPosts() {
  let res;

  try {
    res = await fetch('http://localhost:3000/api/data/posts');
  } catch (e) {
    return;
  }

  return res.json();
}

export default async function Page() {
  const posts = await getPosts();

  if (!posts) {
    return <>No posts are fetched. </>;
  }

  return <PostList posts={posts.allPosts} />;
}
