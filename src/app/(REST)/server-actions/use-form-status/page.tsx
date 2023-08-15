// The useFormStatus must be in a client component
'use client';

import { doSomething } from 'frontend-api/server-actions';
import styles from './styles.module.css';

// The error is expected: Module '"react-dom"' has no exported member 'experimental_useFormStatus'
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

function Submit() {
  const { pending } = useFormStatus();

  return (
    <input
      type="submit"
      disabled={pending}
      className="border"
      value={pending ? 'processing...' : 'Submit'}
    />
  );
}

export default function Page() {
  return (
    <>
      <div className={styles.wrapper}>
        <p className="font-bold">Whats happening in the background</p>
        <p>
          The experimental useFormStatus hook can be used within Form Actions,
          and provides the pending property.
          <br />
          The hook subscribes to the closest {'<form>'} tag and provides the
          pending status.
        </p>
        <p>
          When the button below is clicked, it sends a request to the server to
          perform a 2 second action. During this time, the pending status is set
          to true and the button&apos;s name will be changed from
          &apos;Submit&apos; to &apos;processing...&apos;.
        </p>
        <p>
          Once the server has returned a response, the pending status will be
          set to false and the button name is reverted
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
