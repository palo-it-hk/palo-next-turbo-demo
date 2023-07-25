import CatInfoDisplay from 'components/atomic-design/organisms/CatInfoDisplay';
import { Cat } from '@/src/types/cat.type';

async function getCatInfo(id: string) {
  // By default, Next.js will cache the result of fetch() requests unless you specify otherwise
  // Therefore, the below fetch is a form of static data fetching.

  // You should avoid caching for user-specific data (i.e. requests that derive data from cookies() or headers())
  let res;
  try {
    res = await fetch(`http://localhost:3000/api/data/cat/${id}`);
  } catch (e) {
    return;
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

  let content;

  if (!fetchedData1 || !fetchedData2) {
    content = <>Error when fetching data</>;
  } else {
    const cat1: Cat = fetchedData1.catInfo;
    const cat2: Cat = fetchedData2.catInfo;
    content = (
      <>
        <p className="font-bold">First fetch</p>
        <CatInfoDisplay cat={cat1} />
        <hr />
        <p className="font-bold">Second fetch (using the cached fetch)</p>
        <CatInfoDisplay cat={cat2} />
      </>
    );
  }

  return (
    <>
      <p className="text-green-500 font-bold">
        Please view this page in dev mode.
      </p>

      <div className="my-10">
        <p className="font-bold">Whats happening in the background</p>
        <p className="my-3">
          By default, all fetch() requests are cached and deduplicated
          automatically. This means that if you make the same request twice, the
          second request will reuse the result from the first request.
        </p>
        <p className="my-3">
          Therefore the display of the second cat is the result from the first
          request.
        </p>
        <p className="my-3">
          Static pages are rendered upon build, and since the fetch are cached
          and has not set to revalidate in a certain period of time. This page
          is truly static and will not change unless the website is rebuilt.
        </p>
        <p className="my-3">
          Hence for demo purposes, please view this page in dev mode, which
          rebuilds the site upon refresh
        </p>
      </div>

      {content}
    </>
  );
}
