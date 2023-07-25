import { getCats } from '@/src/frontend-api/cats';
import { notFound } from 'next/navigation';
import { Cat } from 'store/cat';

export default async function CatProfile({
  params,
}: {
  params: { id: string };
}) {
  const catId = params.id;

  const fetchedData = await getCats(catId);
  const catInfo: Cat = fetchedData.catInfo;

  if (!catInfo) {
    console.log('not found ran');
    notFound();
  }

  const { id, name, color } = catInfo;

  return (
    <>
      <p className="font-primary font-bold">Cat Profile</p>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      <p>Color: {color}</p>
    </>
  );
}
