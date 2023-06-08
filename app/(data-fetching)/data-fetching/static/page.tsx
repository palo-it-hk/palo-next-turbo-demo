import CatInfoDisplay from '@/components/atomic-design/organisms/CatInfoDisplay';
import { Cat } from 'store/cat';

async function getCatInfo(id: string) {
  // By default, Next.js will cache the result of fetch() requests
  // that do not specifically opt out of caching behavior.
  // Therefore, the below fetch is a form of static data fetching.

  // You should avoid caching for user-specific data (i.e. requests that derive data from cookies() or headers())
  const res = await fetch(`http://127.0.0.1:3000/api/data/cat/${id}`);
  return res.json();
}

async function getDate() {
  // You an set the cache lifetime of a resource (in seconds) with the revalidate property
  const res = await fetch(`http://localhost:3000/api/data/time`, {
    next: { revalidate: 5 },
  });
  return res.json();
}

export default async function Page() {
  // This fetch will cache the results
  const fetchedData1 = await getCatInfo('1');

  // This fetch will use the previous cached results
  const fetchedData2 = await getCatInfo('1');

  const date = await getDate();

  if (!fetchedData1 || !fetchedData2) {
    throw new Error("Can't fetch cat data");
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
      {/* Only fetches 5 seconds after the last fetch. Note that you can only see 
      the changes only if you start a new tab. Refreshing will not show results due 
      to nextJS persists components.  */}
      <p className="font-bold">Current time and date</p>
      Now is {date.currentTime}
    </>
  );
}
