'use client';

import { useState } from 'react';

import { Button } from '@/components/atomic-design/atoms/Button-SC';

export default async function Page() {
  const [err, setErr] = useState(false);

  if (err) {
    throw new Error('Error triggered.');
  }

  function crash() {
    setErr(true);
  }

  return (
    <>
      <p className="font-bold">This is slot 2</p>

      <p>
        Clicking the below button will cause the slot to render the error.tsx,
        but you will see that it&apos;s independent to other slots.
      </p>
      <div>
        <Button label="Click me" size="small" onClick={crash} />
      </div>
    </>
  );
}
