async function getData() {
  //node fetch issues if using localhost, src: https://github.com/node-fetch/node-fetch/issues/1624
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

// An async Server Components will cause a 'Promise<Element>' is not a valid JSX element type error where it is used.
// As a temporary workaround, you can add {/* @ts-expect-error Async Server Component */} above the component to disable type checking for it.
// Make sure you install Typescript@5.1 or higher and @types/react 18.2.8 or higher.
// https://nextjs.org/docs/app/building-your-application/configuring/typescript

export default async function Page() {
  return (
    <>
      <p>Data is: </p>
      <DataComponent />
    </>
  );
}
