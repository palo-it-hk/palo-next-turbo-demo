import SinglePostMobx from 'components/atomic-design/organisms/SinglePostMobx';

export default async function Page({ params }: { params: { id: string } }) {
  const postId = params.id;

  return <SinglePostMobx id={postId} />;
}
