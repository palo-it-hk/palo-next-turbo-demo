import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = new NextResponse();
  response.cookies.delete('identity');

  return response;
}
