import EditPostFormRedux from 'components/atomic-design/organisms/EditPostFormRedux';

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;

  return <EditPostFormRedux id={postId} />;
}
