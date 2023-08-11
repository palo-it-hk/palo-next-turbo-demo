// On-demand data fetching allows you to selectively validate data.
// Imagine the user has updated something. If background revalidation is used, the user creating the data will not
// be able to see the updated until the end of the revalidation period.
// With on-demand data fetching, we can selectively allow the regeneration of the page upon a received request.
// Once the request is received, the page will be built and will be available as soon as possible.

import { getNum } from 'frontend-api/number';
import { getTime } from 'frontend-api/time';

export default async function Page() {
  console.log('Page()');

  let content;

  // You can set how often the page revalidate by tags.
  // In this case, we randomly picked the word 'collection' as a string for the tag.
  const data = await getTime('collection');
  const num = await getNum();

  if (!data || !num) {
    content = <>No data can be fetched</>;
  } else {
    content = (
      <div>
        <p>
          <span className="font-bold">Time: </span>
          {data.currentTime}
        </p>
        <p>
          <span className="font-bold">Number: </span>
          {num.randomNumber}
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="font-bold text-primary">
        Because dev mode rebuilds the page for each render, it&apos;s not able
        to demo the affects of caching. Please view this page in prod mode.
      </p>
      <div className="my-10">
        <p className="font-bold">Whats happening in the background</p>
        <ol className="list-inside list-decimal">
          <li>
            The buttons sends a request the revalidation APIs. One is
            revalidated by it&apos;s URL, the other is revalidated by tags.
          </li>
        </ol>
      </div>

      {content}
    </>
  );
}
