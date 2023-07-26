'use client';

import { createContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PostStore, postStore } from 'store/state-management/mobx/post/store';
import { store as ReduxStore } from 'store/state-management/redux/store';

// createContext must taken in an initial value
export const MobxContext = createContext<PostStore>(postStore);

export default function StateManagementProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider store={ReduxStore}>
      <MobxContext.Provider value={postStore}>{children}</MobxContext.Provider>
    </ReduxProvider>
  );
}
