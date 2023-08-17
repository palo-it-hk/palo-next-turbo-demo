'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from 'components/atomic-design/atoms/Button-SC';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  console.log('layout()');

  function revalidateWithPath() {
    fetch(
      '/api/revalidate/revalidatepath?path=/(REST)/get-method/revalidation/on-demand',
    )
      .then((res) => res.json())
      .then(() => {
        router.refresh();
        return;
      })
      .catch(() => {
        setErrorMsg('Error with server');
      });
  }

  function revalidateWithTag() {
    fetch('/api/revalidate/revalidatetag?tag=collection')
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
      <Button
        label="Revalidate with revalidatePath"
        size="small"
        onClick={() => revalidateWithPath()}
      />
      <Button
        label="Revalidate with revalidateTag"
        size="small"
        onClick={() => revalidateWithTag()}
      />
      <p> {errorMsg}</p>

      <hr />
      {children}
    </>
  );
}
