import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'components/atomic-design/atoms/Button-SC';
import ModalWrapper from 'components/atomic-design/wrappers/ModalWrapper';

export default function Modal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  return (
    <ModalWrapper>
      <Image
        src={`/dogs/${photoId}.png`}
        width={300}
        height={300}
        alt=""
        className="col-span-2 aspect-square w-full object-cover"
      />
      <Link href="/modals/info">
        <Button label="More info" size="small" primary />
      </Link>
    </ModalWrapper>
  );
}
