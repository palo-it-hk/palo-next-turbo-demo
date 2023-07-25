import allPosts from '@/data/allPosts';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({
    allPosts: allPosts,
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
