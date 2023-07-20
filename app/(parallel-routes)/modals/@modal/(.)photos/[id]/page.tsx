import Image from 'next/image';
import ModalWrapper from '@/components/atomic-design/organisms/modal-page/Modal';

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
    </ModalWrapper>
  );
}
