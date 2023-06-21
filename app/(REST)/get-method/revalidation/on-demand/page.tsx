// On-demand data fetching allows you to selectively validate data.
// Imagine the user has updated something. If background revalidation is used, the user creating the data will not
// be able to see the updated until the end of the revalidation period.
// With on-demand data fetching, we can selectively allow the regeneration of the page upon a received request.
// Once the request is received, the page will be built and will be available as soon as possible.

async function getDataOnDemand() {
  let res;

  try {
    res = await fetch('http://localhost:3000/api/data/time', {
      next: { revalidate: 30 },
    });
  } catch (e) {
    return;
  }

  return res.json();
}

export default async function Page() {
  console.log('page()');
  const data = await getDataOnDemand();

  if (!data) {
    return <>No data can be fetched</>;
  }

  return <>{data.currentTime}</>;
}
