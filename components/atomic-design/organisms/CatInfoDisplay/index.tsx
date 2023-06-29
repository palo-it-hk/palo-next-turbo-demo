import { Cat } from 'store/cat';

export default function CatInfoDisplay({ cat }: { cat: Cat }) {
  const { id, name, color } = cat;
  return (
    <>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      <p>Color: {color}</p>
    </>
  );
}
