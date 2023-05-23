import { notFound } from 'next/navigation';
import { Cat } from 'store/cat';

async function getCatInfo(id: string) {
  let res;
  try {
    // There are data for cat profile 1 and 2. You can trigger notfound() by searching profile 3 because it doesn't exist.

    res = await fetch(`http://127.0.0.1:3000/api/data/cat/${id}`);
  } catch (e) {
    return;
  }
  return res.json();
}

export default async function CatProfile({
  params,
}: {
  params: { id: string };
}) {
  const catId = params.id;

  const fetchedData = await getCatInfo(catId);
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
