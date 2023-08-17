export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const randomNum = Math.floor(Math.random() * 6);
  console.log('number GET()');
  return NextResponse.json({
    randomNumber: randomNum,
  });
}
