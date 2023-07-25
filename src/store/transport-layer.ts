export type PostTransportLayer = {
  fetchPosts: () => Promise<Response>;
};
