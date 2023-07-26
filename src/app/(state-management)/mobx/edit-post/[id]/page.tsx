import EditPostFormMobx from 'components/atomic-design/organisms/EditPostFormMobx';

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;
  console.log('postId is', postId);

  return <EditPostFormMobx id={postId} />;
}
