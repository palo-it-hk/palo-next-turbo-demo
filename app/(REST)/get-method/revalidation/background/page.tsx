async function getData() {
  let res;

  // You can set the revalidate period in seconds.
  // The data will be initially fetched as if a static page.
  // You can see the demo by refreshing the page every 10 seconds.
  // Read about background revalidation:
  // https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating
  try {
    res = await fetch(`http://localhost:3000/api/data/time`, {
      next: { revalidate: 30 },
    });
  } catch (e) {
    return;
  }

  return res.json();
}

export default async function Page() {
  let content;
  const data = await getData();

  if (!data) {
    content = <>No data can be fetched</>;
  } else {
    content = <>{data.currentTime}</>;
  }

  return (
    <>
      <p className="font-bold text-green-500">
        Please view this page in prod mode.
      </p>
      <div className="my-10">
        <p className="font-bold">Whats happening in the background</p>
        <ol className="list-inside list-decimal">
          <li>
            The page is generated during build time, and the data shown
            initially is cached from build time.
          </li>
          <li>
            After 30 seconds, the page can be rebuilt again but must be prompted
            by a user requesting for the page. Note the requester still can only
            see the stale data.
          </li>
          <li>
            The next user requesting the page will see the new page as soon as
            it is built.
          </li>
        </ol>
      </div>
      <span className="my-10 font-bold">Data</span>: {content}
    </>
  );
}
