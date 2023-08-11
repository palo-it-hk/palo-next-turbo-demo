'use client';

import { useRef, useState, useTransition } from 'react';

import {
  handleSubmitButton,
  handleSubmitForm,
} from 'frontend-api/server-actions';
import { Button } from 'components/atomic-design/atoms/Button-SC';
import InputField from 'components/atomic-design/organisms/ServerActionsPage/InputField';
import InvocationDescription from 'components/atomic-design/organisms/ServerActionsPage/Description';

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

  const invocationOptions = [
    {
      method: 'action',
      description:
        'Your form handling function is in the action prop of the <form> tag.',
      demo: (
        <form action={handleFormData} ref={nameFormRef}>
          <InputField />
          <button className="bg-slate-500" type="submit">
            Submit
          </button>
        </form>
      ),
    },
    {
      method: 'formActions',
      description:
        'Your form handling function is in the formAction prop of the <button> tag.',
      demo: (
        <form ref={nameFormRef}>
          <InputField />
          <button className="bg-slate-500" formAction={handleFormData}>
            Submit
          </button>
        </form>
      ),
    },
    {
      method: 'useTransition',
      description:
        'If you want to use Server Actions outside of forms, buttons, or inputs, you can achieve this by using startTransition provided by the useTransition hook',
      demo: (
        <Button
          label="submit page params"
          onClick={() => startTransition(() => handleParamData())}
          size="small"
        />
      ),
    },
    {
      method: 'calling directly',
      description: 'You call the Server Action directly.',
      demo: (
        <Button
          label="submit page params"
          onClick={handleParamData}
          size="small"
        />
      ),
    },
  ];

  return (
    <>
      <p className="text-green-500 font-bold">
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
      <div className="my-10">
        {invocationOptions.map((invocationOption, key) => {
          return (
            <div key={key} className="my-5">
              <InvocationDescription
                params={invocationOption}
                optionNumber={key + 1}
              />
              {invocationOption.demo}
            </div>
          );
        })}
      </div>

      <hr />
      <p>
        <span className="font-bold">The server received:</span> {message}
      </p>
    </>
  );
}
