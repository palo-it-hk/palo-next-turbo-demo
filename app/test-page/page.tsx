async function getDate() {
  console.log('this ran');
  // You an set the cache lifetime of a resource (in seconds) with the revalidate property
  let res;
  try {
    res = await fetch(`http://localhost:3000/api/data/time`);
  } catch (e) {
    console.log('error');
  }
  if (res?.ok) {
    return res.json();
  }
}

export default async function Page() {
  let displayTime = '';

  const date = await getDate();
  console.log('date is ', date);

  if (date) {
    displayTime = date.currentTime;
  }
  return <>{displayTime}</>;
}
