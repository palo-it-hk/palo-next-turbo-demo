import { notFound } from 'next/navigation';

async function getData() {
  //node fetch issues if using localhost, src: https://github.com/node-fetch/node-fetch/issues/1624
  let res;
  try {
    res = await fetch(`http://127.0.0.1:3000/api/data`, {
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

export default async function SampleSegTwo() {
  return (
    <>
      <p>Data is: </p>
      {/* @ts-expect-error Async Server Component */}
      <DataComponent />
    </>
  );
}
