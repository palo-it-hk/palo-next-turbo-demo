'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    async function hydrate() {
      const res = await fetch(`http://localhost:3000/api/data/time`);
      const result = res.json();
      console.log('result is', result);
    }

    hydrate();
  }, []);

  return <></>;
}
