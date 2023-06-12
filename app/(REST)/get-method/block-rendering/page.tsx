import Album from '@/components/atomic-design/organisms/Album';
import { getData } from '@/services/data';
import { getAlbum, getArtist } from '@/services/music';
import { Suspense } from 'react';

// NextJS recommends fetching data directly in the component that needs it,
// even if you're requesting the same data in multiple components,
// rather than passing the data between components as props.
// https://nextjs.org/docs/app/building-your-application/data-fetching/caching

async function Container1({ promise }: { promise: Promise<any> }) {
  const data = await promise;
  const album = getAlbum();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Container2 promise={album} />
      </Suspense>
      <p className="font-bold">Data is:</p>
      <p> {data.message}</p>
    </>
  );
}

async function Container2({ promise }: { promise: Promise<any> }) {
  const album = await promise;
  const artist = getArtist();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Container3 promise={artist} />
      </Suspense>

      <p className="font-bold"> album data</p>
      <Album album={album.songs} />
    </>
  );
}

async function Container3({ promise }: { promise: Promise<any> }) {
  const artist = await promise;
  return (
    <>
      <p className="font-bold">Artist Name</p>
      <p>artist.name</p>
    </>
  );
}

export default function Page() {
  const data = getData();

  return (
    <>
      <p> The loading sequence will start from container 3, 2 and 1</p>

      <Suspense fallback={<p>Loading</p>}>
        <Container1 promise={data} />
      </Suspense>
    </>
  );
}
