import Image from 'next/image';

export default function Page({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return <Image src={`/dogs/${photoId}.png`} width={200} height={200} alt="" />;
}
