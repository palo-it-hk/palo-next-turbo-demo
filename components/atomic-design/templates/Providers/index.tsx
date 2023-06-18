'use client';

import { createContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Post, postStore } from 'store/state-management/mobx/post-store';
import { store as ReduxStore } from 'store/state-management/redux/store';

const MobxContext = createContext<Post>(postStore);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={ReduxStore}>
      <MobxContext.Provider value={new Post()}>{children}</MobxContext.Provider>
    </ReduxProvider>
  );
}
