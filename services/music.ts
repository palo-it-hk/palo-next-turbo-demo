import { Album, Artist } from 'store/music';

export async function getArtist(): Promise<Artist> {
  try {
    const res = await fetch('http://localhost:3000/api/data/music/artist', {
      cache: 'no-store',
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return {
      name: '',
    };
  }
}

export async function getAlbum(): Promise<Album> {
  try {
    const res = await fetch('http://localhost:3000/api/data/music/album', {
      cache: 'no-store',
    });
    return res.json();
  } catch (e) {
    console.log(e);
    return {
      songs: [],
    };
  }
}
