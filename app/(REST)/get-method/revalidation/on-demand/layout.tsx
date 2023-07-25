'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/atomic-design/atoms/Button-SC';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  console.log('layout()');

  function revalidate() {
    fetch('/api/revalidate/revalidatepath')
      .then((res) => res.json())
      .then(() => {
        router.refresh();
        return;
      })
      .catch(() => {
        setErrorMsg('Error with server');
      });
  }

  return (
    <>
      <Button label="Revalidate" size="small" onClick={() => revalidate()} />
      <p> {errorMsg}</p>

      <hr />
      {children}
    </>
  );
}
