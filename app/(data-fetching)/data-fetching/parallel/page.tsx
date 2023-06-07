import Album from '@/components/atomic-design/organisms/Album';
import { Suspense } from 'react';

async function getArtist() {
  const res = await fetch('http://localhost:3000/api/data/music/artist');
  return res.json();
}

async function getAlbum() {
  const res = await fetch('http://localhost:3000/api/data/music/album');
  return res.json();
}

export default async function Page() {
  // Initiate both requests in parallel
  // By starting the fetch prior to calling await in the Server Component, each request can eagerly start to fetch requests at the same time.
  const artistData = getArtist();
  const albumData = getAlbum();

  // Wait for the promises to resolve
  const [artist, album] = await Promise.all([artistData, albumData]);

  //We can save time by initiating both requests in parallel, however, the user won't see the rendered result until both promises are resolved.

  return (
    <>
      <p className="font-bold">Artist :</p>
      <p> {artist.name}</p>
      <p className="font-bold">Album :</p>
      <Album album={album.songs} />
    </>
  );
}
