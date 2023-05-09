import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = request.body;

  console.log('token is ', token);

  return NextResponse.json({ message: 'ok' });
  //if token is valid, then response ok
}
