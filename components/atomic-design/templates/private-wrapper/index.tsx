'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useJwtStore } from 'store/domain-store';
import { User } from 'store/user';
import { Button } from '../../atoms/Button-SC';

type Props = {
  children: React.ReactNode;
};

export default function PrivateWrapper({ children }: Props) {
  const [displayContent, setDisplayContent] = useState(false);
  const router = useRouter();
  const store = useJwtStore();
  const token = store.getJwt;

  function authCheck() {
    if (token === '') {
      router.push('/login');
      return;
    }

    setDisplayContent(true);
  }

  function logout() {
    store.setJwt('');
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
}
