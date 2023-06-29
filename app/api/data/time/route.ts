import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('time GET()');
  const currentTime = new Date();
  return NextResponse.json({
    currentTime: currentTime,
  });
}

export async function POST(request: Request) {
  const { time } = await request.json();
  return NextResponse.json({ time });
}
