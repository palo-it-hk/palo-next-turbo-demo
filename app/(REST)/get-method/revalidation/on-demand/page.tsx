// On-demand data fetching allows you to selectively validate data.
// Imagine the user has updated something. If background revalidation is used, the user creating the data will not
// be able to see the updated, but the next user can see it.
// With on-demand data fetching, we can selectively allow instant fetching of the newest data when necessary .

import PostList from '@/components/atomic-design/organisms/PostList';

async function getAllPostsOnDemand() {
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
  const resOnDemand = await getAllPostsOnDemand();

  if (!resOnDemand) {
    return <>No Posts</>;
  }

  return (
    <>
      <p className="font-bold">
        Fetch that revalidates every 10 seconds and onDemand
      </p>
      <PostList posts={resOnDemand.allPosts} />
    </>
  );
}
