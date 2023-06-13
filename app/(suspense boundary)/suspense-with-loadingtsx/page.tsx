async function getData() {
  let res;
  try {
    res = await fetch(`http://localhost:3000/api/data`);
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
      <DataComponent />
    </>
  );
}
