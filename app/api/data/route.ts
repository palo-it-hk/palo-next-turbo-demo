import { NextResponse } from 'next/server';

// artificially extended to stimulate large data. Only applicable in dev mode. Has no effect in prod
export async function GET(request: Request) {
  console.log('The GET method of Data has been received');
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json({ message: 'hi this is data' });
}
