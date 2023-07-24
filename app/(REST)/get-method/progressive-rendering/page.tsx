import { Suspense } from 'react';

import { getData } from '@/services/data';
import { getAlbum, getArtist } from '@/services/music';

// Whenever possible, it's best to fetch data in the segment that uses it.
// This also allows you to show a loading state for only the part of the page that is loading, and not the entire page.
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

async function Data() {
  const { message }: { message: string } = await getData();
  return <p>{message}</p>;
}

async function Album() {
  const { songs }: { songs: string[] } = await getAlbum();
  const songList = songs.map((song, id) => <li key={id}>{song}</li>);
  return <ol>{songList}</ol>;
}

export default async function Page() {
  const artistData: { name: string } = await getArtist();

  return (
    <>
      <p>
        This page demonstrates that by wrapping each component in suspense and
        having them fetch their own data, they will render as soon as the data
        has been fetched regardless of it&apos;s location in the page.
      </p>
      <p className="font-bold text-primary">
        Please view this page in dev mode.
      </p>
      <p className="font-bold">Artist :</p>
      {/* 
    Will load first because it has already been fetched  */}
      <p>{artistData.name}</p>

      <p className="font-bold">Album (takes 5 seconds to load in dev mode):</p>

      <Suspense fallback={<p>Loading..</p>}>
        <Album />
      </Suspense>

      <p className="font-bold">Data (takes 2 seconds to load in dev mode):</p>
      <Suspense fallback={<p>Loading..</p>}>
        <Data />
      </Suspense>
    </>
  );
}
