import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  console.log('this ran');
  const path = request.nextUrl.pathname;

  if (path === '/get-method/revalidation/on-demand') {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }
  return NextResponse.json({ revalidated: false });
}
