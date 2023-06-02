import Link from 'next/link';

import { PostBody, PostTitleWrapper, Wrapper } from './index.styles';

type PostCardProps = {
  id: string;
  title: string;
  content: string;
};

export const PostCard = ({ id, title, content }: PostCardProps) => {
  return (
    <Wrapper key={id}>
      <Link href={`/redux-demo/post/${id}`}>
        <PostTitleWrapper>
          <h1 className={'font-bold'}>{title}</h1>
        </PostTitleWrapper>
      </Link>
      <PostBody>
        <p>{content.substring(0, 100)}</p>
      </PostBody>
    </Wrapper>
  );
};

export default PostCard;
