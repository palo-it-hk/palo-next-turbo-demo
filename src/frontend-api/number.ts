export async function getNum() {
  let res;

  try {
    res = await fetch(`http://localhost:3000/api/data/number`);
  } catch (e) {
    return;
  }

  return res.json();
}
