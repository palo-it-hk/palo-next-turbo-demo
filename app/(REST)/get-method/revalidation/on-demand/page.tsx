// On-demand data fetching allows you to selectively validate data.
// Imagine the user has updated something. If background revalidation is used, the user creating the data will not
// be able to see the updated until the end of the revalidation period.
// With on-demand data fetching, we can selectively allow the regeneration of the page upon a received request.
// Once the request is received, the page will be built and will be available as soon as possible.

async function getDataOnDemand() {
  let res;

  try {
    res = await fetch('http://localhost:3000/api/data/time', {
      next: { revalidate: 5 },
    });
  } catch (e) {
    return;
  }

  return res.json();
}

export default async function Page() {
  let content;
  const data = await getDataOnDemand();

  if (!data) {
    content = <>No data can be fetched</>;
  } else {
    content = data.currentTime;
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
            The button sends a request to &apos;/api/revalidate&apos;, which is
            an API that revalidates APIs based on which page the request
            originated from.
          </li>
          <li>
            We refresh the page so that the fetch request for the data is
            fetched and the page is built again.
          </li>
        </ol>
      </div>
      <p>
        <span className="font-bold">Data</span>: {content}
      </p>
    </>
  );
}
