import { Suspense } from 'react';

import { getData } from '@/services/data';
import { getAlbum, getArtist } from '@/services/music';

async function Data({ promise }: { promise: Promise<any> }) {
  const data = await promise;
  return <p>{data.message}</p>;
}

async function Album({ promise }: { promise: Promise<any> }) {
  const res: { songs: string[] } = await promise;
  const songList = res.songs.map((song, id) => <li key={id}>{song}</li>);
  return <ol>{songList}</ol>;
}

export default async function Page() {
  const artistData: { name: string } = await getArtist();
  const data = getData();
  const album = getAlbum();

  //We can save time by initiating both requests in parallel, however, the user won't see the rendered result until both promises are resolved.

  return (
    <>
      <p className="font-bold">Artist :</p>

      {/* 
    Will load first because it has already been fetched  */}
      <p>{artistData.name}</p>
      <p className="font-bold">Album (takes 5 seconds to load):</p>

      <Suspense fallback={<p>Loading..</p>}>
        {/* @ts-expect-error Async Server Component */}
        <Album promise={album} />
      </Suspense>

      <p className="font-bold">Data (takes 2 seconds to load):</p>
      <Suspense fallback={<p>Loading..</p>}>
        {/* @ts-expect-error Async Server Component */}
        <Data promise={data} />
      </Suspense>
    </>
  );
}
