import { transportLayer } from 'store/posts';

// transport layer allows you to use and swap fetch logic

export const postTransportLayer: transportLayer = {
  fetchPosts: async () => {
    return await fetch('http://localhost:3000/api/data/posts');
  },
  updateServer: async (title: string, content: string) => {
    return await fetch('http://localhost:3000/api/data/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
