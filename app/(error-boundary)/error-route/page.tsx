'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { useState } from 'react';

export default function ErrorFunction() {
  const [err, setErr] = useState(false);

  // There was an attempt to use a function to crash:
  // function iCrash() { throw new error ('error here')}

  // However it will just throw an error without redirecting to the error page.
  // I'm guessing this is because clicking the button is completely on the client side and there is no way that the server can connect the action to error.tsx.

  // The working method will trigger a render which I guess will prompt the connection, even though it is 'use client', I suspect some of the inner workings still depend on some server side logic.

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
      </div>
    </>
  );
}
