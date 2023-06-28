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

// An async Server Components will cause a 'Promise<Element>' is not a valid JSX element type error where it is used.
// As a temporary workaround, you can add {/* @ts-expect-error Async Server Component */} above the component to disable type checking for it.
// This should be solved when Typescript 5.1
// https://nextjs.org/docs/app/building-your-application/configuring/typescript

export default async function Page() {
  return (
    <>
      <p>Data is: </p>
      <DataComponent />
    </>
  );
}
