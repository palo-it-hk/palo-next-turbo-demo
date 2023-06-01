import EditPostForm from '@/components/atomic-design/organisms/EditPostForm';

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;

  return <EditPostForm id={postId} />;
}
