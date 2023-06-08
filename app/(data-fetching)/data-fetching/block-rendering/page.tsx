import Album from '@/components/atomic-design/organisms/Album';
import { Suspense } from 'react';

async function getArtist() {
  const res = await fetch('http://localhost:3000/api/data/music/artist', {});
  return res.json();
}

async function getData() {
  const res = await fetch(`http://localhost:3000/api/data`, {});
  return res.json();
}

async function getAlbum() {
  const res = await fetch('http://localhost:3000/api/data/music/album', {});
  return res.json();
}

async function Container1({ promise }: { promise: Promise<any> }) {
  const data = await promise;
  const album = getAlbum();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-expect-error Async Server Component */}
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
        {/* @ts-expect-error Async Server Component */}
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
        {/* @ts-expect-error Async Server Component */}
        <Container1 promise={data} />
      </Suspense>
    </>
  );
}
