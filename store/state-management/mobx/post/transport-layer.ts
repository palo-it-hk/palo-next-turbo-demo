export const postTransportLayer = {
  fetchPosts: async () => {
    return await fetch('http://localhost:3000/api/data/posts');
  },
};
