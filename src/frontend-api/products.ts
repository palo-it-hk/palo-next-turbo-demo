export async function getProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (res.ok) {
    return res.json();
  }
}
