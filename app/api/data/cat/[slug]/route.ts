import { catLibrary } from 'data/catData';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const catId = params.slug;

  for (let cat of catLibrary) {
    console.log('cat ', cat);
    if (cat.id === catId) {
      return NextResponse.json({
        catInfo: cat,
        message: 'Cat info fetched!',
      });
    }
  }
  return NextResponse.json({
    catInfo: null,
    message: 'No cat matches this ID',
  });
}
