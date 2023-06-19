'use client';

import { createContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PostStore, postStore } from 'store/state-management/mobx/post-store';
import { store as ReduxStore } from 'store/state-management/redux/store';

export const MobxContext = createContext<PostStore>(postStore);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={ReduxStore}>
      <MobxContext.Provider value={new PostStore()}>
        {children}
      </MobxContext.Provider>
    </ReduxProvider>
  );
}
