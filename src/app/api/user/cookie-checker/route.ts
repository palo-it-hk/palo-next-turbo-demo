import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const identity = request.cookies.get('identity');

  return NextResponse.json(
    { message: `identity is ${identity?.value}` },
    { status: 200 },
  );
}
