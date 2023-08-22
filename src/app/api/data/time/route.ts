// // Add this to disable the caching behavior of  this route
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('time GET()');
  const currentTime = new Date();
  return NextResponse.json({
    currentTime: currentTime,
  });
}

// // Routes with POST functions also disable caching
export async function POST(request: NextRequest) {
  const currentTime = new Date();
  return NextResponse.json({
    currentTime: currentTime,
  });
}
