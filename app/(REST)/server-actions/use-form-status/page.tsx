// The useFormStatus must be in a client component
'use client';

import { doSomething } from '@/services/server-actions';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

function Submit() {
  const { pending } = useFormStatus();
  return <input type="submit" disabled={pending} className="border" />;
}

export default function Page() {
  return (
    <>
      <div className="my-5">
        <p className="font-bold">Whats happening in the background</p>
        <p>
          The experimental useFormStatus hook can be used within Form Actions,
          and provides the pending property.
          <br />
          The hook subscribes to the closest {'<form>'} tag and provides the
          pending status.
          <br />
          When the button below is clicked, the button component senses the form
          is stilling running async functions and the pending status is true.
        </p>
      </div>
      <p className="font-bold">
        Click to perform a server action that takes 2 seconds
      </p>
      <form action={doSomething}>
        <Submit />
      </form>
    </>
  );
}
