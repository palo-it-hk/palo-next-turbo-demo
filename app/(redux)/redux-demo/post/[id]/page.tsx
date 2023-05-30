import SinglePost from '@/components/atomic-design/organisms/SinglePost/SinglePost';

export default async function Post({ params }: { params: { id: string } }) {
  const postId = params.id;

  return <SinglePost id={postId} />;
}
