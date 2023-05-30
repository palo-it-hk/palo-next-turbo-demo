import SinglePost from '@/components/atomic-design/organisms/SinglePost/SinglePost';

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;

  return <SinglePost id={postId} />;
}
