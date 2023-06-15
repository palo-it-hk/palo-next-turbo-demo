import PostList from '@/components/atomic-design/organisms/PostList';

async function getAllPosts() {
  let res;
  try {
    res = await fetch('http://localhost:3000/api/data/posts', {
      next: { revalidate: 10 },
    });
  } catch (e) {
    return;
  }

  if (res.ok) {
    return res.json();
  }
}

export default async function Page() {
  const res = await getAllPosts();

  if (!res) {
    return <>No Posts</>;
  }

  return (
    <>
      <p className="font-bold">Fetch that revalidates every 10 seconds</p>
      <PostList posts={res.allPosts} />
      <hr />
    </>
  );
}
