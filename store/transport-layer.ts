import { Post } from './state-management/mobx/post/store';

export type PostTransportLayer = {
  fetchPosts: () => Promise<Response>;
};
