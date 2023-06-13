import allPosts from 'data/allPosts';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('post GET()');
  return NextResponse.json({
    allPosts: [
      {
        id: '1',
        title: 'First Post',
        content: 'first post here!',
      },
      { id: '2', title: 'Second Post', content: 'Second post here!!' },
    ],
  });
}

export async function POST(request: Request) {
  const { title, content } = await request.json();

  const newPost = {
    id: (allPosts.length + 1).toString(),
    title,
    content,
  };

  allPosts.push(newPost);

  return NextResponse.json({ newPost });
}
