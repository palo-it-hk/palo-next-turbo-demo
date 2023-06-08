export async function getData() {
  const res = await fetch(`http://localhost:3000/api/data`, {});
  return res.json();
}
