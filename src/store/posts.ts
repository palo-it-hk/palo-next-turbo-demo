export type Post = {
  id: string;
  title: string;
  content: string;
};

export type transportLayer = {
  fetchPosts: () => Promise<Response>;
  updateServer: (title: string, content: string) => Promise<Response>;
};
