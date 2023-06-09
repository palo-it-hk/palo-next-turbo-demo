import { format } from 'date-fns';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const currentTime = format(new Date(), 'PPpp');
  return NextResponse.json({
    currentTime: currentTime,
  });
}

export async function POST(request: Request) {
  const { time } = await request.json();
  return NextResponse.json({ time });
}
