export const revalidate = 0;

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <p className="font-bold">This is slot 3</p>;
}
