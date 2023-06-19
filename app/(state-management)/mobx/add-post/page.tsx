'use client';

import Subtitle from '@/components/atomic-design/atoms/Subtitle-TW';
import PostForm from '@/components/atomic-design/organisms/PostForm';
import { MobxContext } from '@/components/atomic-design/templates/Providers';
import { observer } from 'mobx-react-lite';
import { memo, useCallback, useContext, useState } from 'react';

const Page = () => {
  const postStore = useContext(MobxContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSavePostClicked = useCallback((title: string, content: string) => {
    if (title && content) {
      postStore.addNewPost(title, content);
      setTitle('');
      setContent('');
    }
  }, []);

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

export default observer(Page);
