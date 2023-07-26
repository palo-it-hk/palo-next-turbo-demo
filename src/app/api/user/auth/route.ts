import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'test-user' && password === 'test-password') {
    const res = NextResponse.json({
      message: 'User verified',
      token: 'secret-token',
    });

    res.cookies.set('identity', 'authorized person');

    return res;
  } else {
    return NextResponse.json(
      { message: 'Authorization failed' },
      { status: 401 },
    );
  }
}
