'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtStore } from 'store/state-management/mobx/auth/store';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [displayContent, setDisplayContent] = useState(false);
  const router = useRouter();
  const token = jwtStore.jwtToken;

  function authCheck() {
    if (token === '') {
      router.push('/login');
      return;
    }

    setDisplayContent(true);
  }

  function logout() {
    jwtStore.setJwt('');
    router.refresh();
  }

  useEffect(() => {
    authCheck();
  });

  return (
    <>
      {displayContent ? (
        <div>
          <div>
            <Button label="Logout" size="small" onClick={logout} />
          </div>
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Layout;
