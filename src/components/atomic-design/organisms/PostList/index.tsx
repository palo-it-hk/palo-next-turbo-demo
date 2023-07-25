import { Post } from 'types/post.type';
import PostCard from '../PostCard';

const PostList = ({
  posts,
  route,
}: {
  posts: Post[];
  route: 'mobx' | 'redux';
}) => {
  const list = posts.map((post) => (
    <div key={post.id}>
      <PostCard
        id={post.id}
        title={post.title}
        content={post.content}
        route={route}
      />
    </div>
  ));
  return <>{list}</>;
};

export default PostList;
