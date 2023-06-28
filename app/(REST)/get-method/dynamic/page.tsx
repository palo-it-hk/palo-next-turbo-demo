async function getData() {
  let res;

  // To fetch fresh data on every fetch request, use the cache: 'no-store' option.
  // As such, This page will be rendered in the server every time a request is received.

  try {
    res = await fetch(`http://localhost:3000/api/data/time`, {
      cache: 'no-store',
    });
  } catch (e) {
    return;
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  if (!data) {
    return <>No data can be fetched</>;
  }

  return (
    <>
      <p className="font-bold text-green-500">
        Please view this page in prod mode.
      </p>
      <p>This data will update every refresh because it&apos;s not cached</p>
      <p>{data.currentTime}</p>
    </>
  );
}
