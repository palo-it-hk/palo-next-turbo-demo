export function getCats(id: string) {
  return fetch(`http://127.0.0.1:3000/api/data/cat/${id}`).then((res) => {
    return res.json();
  });
}
