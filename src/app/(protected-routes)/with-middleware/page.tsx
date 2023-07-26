'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from 'components/atomic-design/atoms/Button-SC';

async function getData() {
  let res;
  try {
    res = await fetch('/api/data', { cache: 'no-store' });
  } catch (e) {
    return;
  }

  if (!res?.ok) {
    return;
  }

  return await res.json();
}

export default function Page() {
  const router = useRouter();

  const [message, setMessage] = useState('');
  useEffect(() => {
    getData().then((res) => {
      const { message } = res;
      setMessage(message);
    });
  }, []);

  async function logOut() {
    await fetch('http://localhost:3000/api/user/logout', { method: 'POST' });

    router.refresh();
  }

  return (
    <>
      {message}
      <Button label="Logout" onClick={logOut} />
    </>
  );
}
