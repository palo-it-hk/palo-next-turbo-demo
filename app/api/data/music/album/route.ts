import { NextResponse } from 'next/server';

// Artificially delayed to simulate large fetch
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
