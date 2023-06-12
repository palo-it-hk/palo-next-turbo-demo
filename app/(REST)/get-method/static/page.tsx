import CatInfoDisplay from '@/components/atomic-design/organisms/CatInfoDisplay';
import { Cat } from 'store/cat';

async function getCatInfo(id: string) {
  // By default, Next.js will cache the result of fetch() requests
  // that do not specifically opt out of caching behavior.
  // Therefore, the below fetch is a form of static data fetching.

  // You should avoid caching for user-specific data (i.e. requests that derive data from cookies() or headers())
  let res;
  try {
    res = await fetch(`http://localhost:3000/api/data/cat/${id}`);
  } catch (e) {
    console.log('error');
  }
  if (res?.ok) {
    return res.json();
  }
}

async function getDate() {
  // You an set the cache lifetime of a resource (in seconds) with the revalidate property
  let res;
  try {
    res = await fetch(`http://localhost:3000/api/data/time`);
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

  const date = await getDate();

  console.log('fetchedData1', fetchedData1);

  if (!fetchedData1 || !fetchedData2 || !date) {
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
      <hr />
      <p className="font-bold">Current time and date</p>
      {/* Only displays new result after 5 seconds from the last one. Note that you can only see 
      the updated fetch result only if you start a new tab. Refreshing will not show results due 
      to nextJS persisting renders.  */}
      Now is {date.currentTime}
    </>
  );
}
