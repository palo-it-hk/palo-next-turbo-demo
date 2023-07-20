import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getPhotoUrls() {
  const photosDir = path.join(process.cwd(), 'public/dogs');
  const fileNames = fs.readdirSync(photosDir);
  return fileNames.map((fileName) => `/dogs/${fileName}`);
}

export default function Page() {
  const photos = getPhotoUrls();
  console.log('photos are', photos);

  return (
    <div className="my-10 flex">
      {photos.map((path, id) => {
        return (
          <Link href={`/modals/photos/${id + 1}`} key={id}>
            <Image
              src={path}
              width={150}
              height={150}
              alt=""
              className="mx-10 hover:border-2 hover:border-solid hover:border-indigo-600"
            />
          </Link>
        );
      })}
    </div>
  );
}
