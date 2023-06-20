'use client';

import { createContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PostStore, postStore } from 'store/state-management/mobx/post/store';
import { postTransportLayer } from 'store/state-management/mobx/post/transport-layer';
import { store as ReduxStore } from 'store/state-management/redux/store';

export const MobxContext = createContext<PostStore>(postStore);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={ReduxStore}>
      <MobxContext.Provider value={new PostStore(postTransportLayer)}>
        {children}
      </MobxContext.Provider>
    </ReduxProvider>
  );
}
