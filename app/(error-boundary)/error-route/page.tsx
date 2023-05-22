'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { useEffect, useState } from 'react';

export default function ErrorFunction() {
  useEffect(() => {
    async function asd() {
      const res = await fetch(`asd`);
      const thing = await res.json();
      setAsd(thing);
    }

    asd();
    console.log('hi');
  });

  const [err, setErr] = useState(false);
  const [asd, setAsd] = useState('');

  if (err) {
    throw new Error('Error triggered.');
  }

  function crash() {
    setErr(true);
  }

  return (
    <>
      <p>Click the below button to trigger an error boundary</p>
      <div>
        <Button label="Click me" size="small" onClick={crash} />
        <p>{asd}</p>
      </div>
    </>
  );
}
