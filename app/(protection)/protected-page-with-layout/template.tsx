'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useJwtStore } from 'store/domain-store';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useJwtStore();
  const [displayContent, setDisplayContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    authCheck();
  });

  function authCheck() {
    const jwtToken = store.getJwt;
    if (jwtToken === '') {
      router.push('http://localhost:3000/login');
      return;
    }
    setDisplayContent(true);
  }

  function logout() {
    store.setJwt('');
    router.refresh();
  }

  return (
    <>
      {displayContent ? (
        <>
          {children}
          <div>
            <Button label="Logout" size="small" onClick={logout} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
