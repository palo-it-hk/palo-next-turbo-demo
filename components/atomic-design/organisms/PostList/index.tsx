import { Post } from 'store/posts';
import PostCard from '../PostCard';

const PostList = ({ posts }: { posts: Post[] }) => {
  const list = posts.map((post) => (
    <div key={post.id}>
      <PostCard id={post.id} title={post.title} content={post.content} />
    </div>
  ));
  return <>{list}</>;
};

export default PostList;
