export default function Album({ album }: { album: string[] }) {
  const songList = album.map((song, id) => <li key={id}>{song}</li>);
  return <ol>{songList}</ol>;
}
