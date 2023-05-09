import ProtectionLayout from 'components/protection';

export default async function ProtectedPage() {
  const content = Content();

  const object = {
    children: content,
  };

  return await ProtectionLayout(object);
}

function Content() {
  return <p>You are seeing content protected by layout.tsx</p>;
}
