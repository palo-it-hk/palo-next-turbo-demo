export const revalidate = 0;

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <p className="font-bold">This is slot 1</p>;
}
