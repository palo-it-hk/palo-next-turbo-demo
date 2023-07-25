import { Suspense } from 'react';

async function getData() {
  let res;
  try {
    res = await fetch('/api/data', {
      cache: 'no-cache',
    });
  } catch (e) {
    return { message: '' };
  }
  return res.json();
}

async function DataComponent() {
  const { message } = await getData();

  return <p>I have loaded: {message}</p>;
}

export default async function Page() {
  return (
    <>
      <p>Data is: </p>

      <Suspense fallback={<p>Loading..</p>}>
        <DataComponent />
      </Suspense>
    </>
  );
}
