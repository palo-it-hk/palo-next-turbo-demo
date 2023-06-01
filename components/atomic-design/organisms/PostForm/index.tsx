import { Wrapper } from './index.styles';

type PostFormProps = {
  title: string;
  titleAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  content: string;
  contentAction: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saveAction: () => void;
};

export const PostForm = ({
  title,
  titleAction,
  content,
  contentAction,
  saveAction,
}: PostFormProps) => {
  return (
    <Wrapper>
      <p>Post Title:</p>
      <input type="text" value={title} onChange={titleAction} />
      <p>Content:</p>
      <textarea value={content} onChange={contentAction} />
      <button type="button" onClick={saveAction}>
        Save Post
      </button>
    </Wrapper>
  );
};

export default PostForm;
