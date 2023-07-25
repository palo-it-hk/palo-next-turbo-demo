'use client';

import Subtitle from '@/components/atomic-design/atoms/Subtitle-TW';
import PostForm from '@/components/atomic-design/organisms/PostForm';
import { MobxContext } from '@/components/atomic-design/templates/Providers';
import { observer } from 'mobx-react-lite';
import { useCallback, useContext, useState } from 'react';

const Page = () => {
  // Gets the current state of the postStore
  const postStore = useContext(MobxContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSavePostClicked = useCallback(
    (title: string, content: string) => {
      if (title && content) {
        postStore.addNewPost(title, content);
        setTitle('');
        setContent('');
      }
    },
    [postStore],
  );

  const onTitleChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value),
    [],
  );

  const onContentChanged = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    [],
  );

  return (
    <>
      <Subtitle subtitle="Add a new Post" />
      <PostForm
        title={title}
        titleAction={onTitleChanged}
        content={content}
        contentAction={onContentChanged}
        saveAction={onSavePostClicked}
      />
    </>
  );
};

// wrap in observer so it can subscribe to changes in state
export default observer(Page);
