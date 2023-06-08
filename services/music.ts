export async function getArtist() {
  const res = await fetch('http://localhost:3000/api/data/music/artist', {});
  return res.json();
}

export async function getAlbum() {
  const res = await fetch('http://localhost:3000/api/data/music/album');
  return res.json();
}
