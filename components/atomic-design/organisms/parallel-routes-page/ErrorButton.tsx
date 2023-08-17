'use client';

import { useState } from 'react';

import { Button } from '@/components/atomic-design/atoms/Button-SC';

export default function ErrorButton() {
  const [err, setErr] = useState(false);

  if (err) {
    throw new Error('Error triggered.');
  }

  function crash() {
    setErr(true);
  }

  return <Button label="Click me" size="small" onClick={crash} />;
}
