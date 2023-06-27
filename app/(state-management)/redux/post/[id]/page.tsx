import SinglePostRedux from '@/components/atomic-design/organisms/SinglePostRedux';

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;

  return <SinglePostRedux id={postId} />;
}
