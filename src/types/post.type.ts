export type Post = {
  id: string;
  title: string;
  content: string;
};

export type TransportLayer = {
  fetchPosts: () => Promise<Response>;
  updateServer: (title: string, content: string) => Promise<Response>;
};
