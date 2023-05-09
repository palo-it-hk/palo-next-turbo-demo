'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useJwtStore } from 'store/domain-store';

const ProtectionLayout = ({ children }: { children: ReactNode }) => {
  const [displayContent, setDisplayContent] = useState(false);

  useEffect(() => {
    authCheck();
  }, []);

  function authCheck() {
    const store = useJwtStore();
    const jwtToken = store.getJwt;

    if (jwtToken === '') {
      console.log('there is no token');
      return;
    }
    console.log('token is', jwtToken);
    setDisplayContent(true);
  }

  return <>{displayContent ? children : <p>Loading...</p>}</>;
};

export default ProtectionLayout;
