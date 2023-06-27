'use client';

import { useRef, useState, useTransition } from 'react';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import {
  handleSubmitButton,
  handleSubmitForm,
} from '@/services/server-actions';
import InputField from '@/components/atomic-design/organisms/InputField';

export default function Page({ params }: { params: { id: string } }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');

  const nameFormRef = useRef<any>();

  async function handleFormData(formData: FormData) {
    nameFormRef.current.reset();

    const res = await handleSubmitForm(formData);
    const { message } = JSON.parse(res);
    setMessage(message);
  }

  async function handleParamData() {
    const res = await handleSubmitButton(params.id);
    const { id } = JSON.parse(res);
    setMessage(`ID received is ${id}`);
  }

  return (
    <>
      <p className="font-bold text-green-500">
        Please view this page in prod mode.
      </p>
      <div className="my-5">
        <p className="font-bold">Whats happening in the background</p>
        <p>
          With server actions which is an experimental feature, you are able to
          execute server functions without creating APIs.
          <br />
          It can be called only within the {'<Form>'} tag via the action
          property, the formActions property and useTransition.
        </p>
      </div>
      <div className="my-5">
        <p>
          Invocation with <span className="font-bold">action</span>
        </p>
        <form action={handleFormData} ref={nameFormRef}>
          <InputField />
          <button className="bg-slate-500" type="submit">
            Submit
          </button>
        </form>
      </div>

      <div className="my-5">
        <p>
          Invocation with <span className="font-bold">formAction</span>
        </p>
        <form ref={nameFormRef}>
          <InputField />
          <button className="bg-slate-500" formAction={handleFormData}>
            Submit
          </button>
        </form>
      </div>

      <div className="my-5">
        <p>
          Invocation with <span className="font-bold">useTransition</span>
        </p>
        <Button
          label="submit page params"
          onClick={() => startTransition(() => handleParamData())}
        />
      </div>
      <hr />
      <p>
        <span className="font-bold">The server received:</span> {message}
      </p>
    </>
  );
}
