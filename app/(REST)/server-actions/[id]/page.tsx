'use client';

import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import {
  handleSubmitButton,
  handleSubmitForm,
} from '@/services/server-actions';

export default function Page({ params }: { params: { id: string } }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');

  const nameFormRef = useRef<any>();

  return (
    <>
      <p>
        Invocation with <span className="font-bold">action</span>
      </p>
      <form
        action={async (formData) => {
          nameFormRef.current.reset();
          const res = await handleSubmitForm(formData);
          const { message } = JSON.parse(res);
          setMessage(message);
        }}
        ref={nameFormRef}
      >
        <input
          type="text"
          name="name"
          className="border border-solid border-black"
        />
        <button className="bg-slate-500" type="submit">
          Submit
        </button>
        <p>The server says: {message}</p>
      </form>
      <hr />
      <p>
        Invocation with <span className="font-bold">formAction</span>
      </p>
      <form>
        <input
          type="text"
          name="name"
          className="border border-solid border-black"
        />
        <button className="bg-slate-500" formAction={handleSubmitForm}>
          Submit
        </button>
      </form>
      <hr />
      <p>
        Invocation with <span className="font-bold">useTransition</span>
      </p>
      <Button
        label="submit"
        onClick={() => startTransition(() => handleSubmitButton(params.id))}
      />
    </>
  );
}
