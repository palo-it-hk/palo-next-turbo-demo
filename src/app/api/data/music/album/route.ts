import { NextResponse } from 'next/server';

// artificially extended to stimulate large data. Only applicable in dev mode. Has no effect in prod
export async function GET(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return NextResponse.json({
    songs: [
      "Who's Theme",
      'Death Wish',
      'World Without Words',
      'The Million Way of Drum',
      'Tsurugi no Mai',
    ],
  });
}
