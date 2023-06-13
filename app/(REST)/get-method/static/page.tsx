import CatInfoDisplay from '@/components/atomic-design/organisms/CatInfoDisplay';
import { Cat } from 'store/cat';

async function getCatInfo(id: string) {
  // By default, Next.js will cache the result of fetch() requests unless you specify otherwise
  // Therefore, the below fetch is a form of static data fetching.

  // You should avoid caching for user-specific data (i.e. requests that derive data from cookies() or headers())
  let res;
  try {
    //  NOTE  It's not possible to access the next API in a static page. Read more in the root README.md
    // This can only be demo'd during development mode
    res = await fetch(`http://localhost:3000/api/data/cat/${id}`);
  } catch (e) {
    console.log('error');
  }
  if (res?.ok) {
    return res.json();
  }
}

export default async function Page() {
  // This fetch will cache the results
  const fetchedData1 = await getCatInfo('1');

  // This fetch will use the previous cached results
  const fetchedData2 = await getCatInfo('1');

  if (!fetchedData1 || !fetchedData2) {
    return <>Error when fetching data</>;
  }

  const cat1: Cat = fetchedData1.catInfo;
  const cat2: Cat = fetchedData2.catInfo;

  return (
    <>
      <p className="font-bold">First fetch</p>
      <CatInfoDisplay cat={cat1} />
      <hr />
      <p className="font-bold">Second fetch (using the cached fetch)</p>
      <CatInfoDisplay cat={cat2} />
    </>
  );
}
