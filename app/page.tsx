import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foilerplate',
  description: 'IDK man',
};

function Home() {
  return (
    <div>
      <p className="font-primary">Open sans</p>
      <p className="font-secondary font-bold">Arvo</p>
      <p>Verdana</p>
    </div>
  );
}

export default Home;
