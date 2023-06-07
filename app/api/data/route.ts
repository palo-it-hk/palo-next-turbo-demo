import { NextResponse } from 'next/server';

// Artificially delayed to simulate large fetch
export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json({ message: 'hi this is data' });
}
