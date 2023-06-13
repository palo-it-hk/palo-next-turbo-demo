async function getData() {
  let res;

  // You can set the revalidate period in seconds.
  // The data will be initially fetched as if a static page.
  // You can see the demo by refreshing the page every 10 seconds.
  // Read about background revalidation:
  // https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating
  try {
    res = await fetch(`http://localhost:3000/api/data/time`, {
      next: { revalidate: 10 },
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

  return <>{data.currentTime}</>;
}
