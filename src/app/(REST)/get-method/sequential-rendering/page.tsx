import { Suspense } from 'react';

import Album from 'components/atomic-design/organisms/Album';
import { getData } from '@/src/services/data';
import { getAlbum, getArtist } from '@/src/services/music';

// To improve the user experience, you can add a suspense boundary to break up the rendering work and show fetch results in the desired sequence

// Whenever possible, it's best to fetch data in the segment that uses it.
// This also allows you to show a loading state for only the part of the page that is loading, and not the entire page.
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching

async function Container1() {
  // waits for the data to resolve first
  const data = await getData();

  // initiates the next fetch
  const album = getAlbum();
  return (
    <>
      <Suspense fallback={<p>Loading...(2/3)</p>}>
        {/* Passes the promise to the next */}
        <Container2 promise={album} />
      </Suspense>
      <p className="font-bold">Data is:</p>
      <p> {data.message}</p>
    </>
  );
}

async function Container2({ promise }: { promise: Promise<any> }) {
  // waits fo the second data to resolve
  const album = await promise;

  // initiates the next fetch
  const artist = getArtist();
  return (
    <>
      <Suspense fallback={<p>Loading...(3/3)</p>}>
        {/* passes the promise to the next */}
        <Container3 promise={artist} />
      </Suspense>

      <p className="font-bold"> album data</p>
      <Album album={album.songs} />
    </>
  );
}

async function Container3({ promise }: { promise: Promise<any> }) {
  // waits for the last data to be fetched
  const artist = await promise;
  return (
    <>
      <p className="font-bold">Artist Name</p>
      <p>{artist.name}</p>
    </>
  );
}

export default function Page() {
  return (
    <>
      <p>
        The loading sequence is determined by the fetch pattern. In this demo,
        the data appears to render from bottom to the top to demonstrate the
        ability to control the sequence of data rendering.
      </p>

      <p className="text-green-500 font-bold">
        Please view this page in dev mode as the fetch delay is not demonstrated
        in prod mode.
      </p>

      <Suspense fallback={<p>Loading(1/3)</p>}>
        <Container1 />
      </Suspense>
    </>
  );
}
