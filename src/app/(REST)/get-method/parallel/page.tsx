import { getAlbum, getArtist } from '@/src/frontend-api/music';
import Album from 'components/atomic-design/organisms/Album';

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
      <p className="text-green-500 font-bold">
        Please view this page in dev mode.
      </p>
      <p className="my-3">Please read the page.tsx for code explanation.</p>
      <p className="font-bold">Artist :</p>
      <p> {artist.name}</p>
      <p className="font-bold">Album :</p>
      <Album album={album.songs} />
    </>
  );
}
