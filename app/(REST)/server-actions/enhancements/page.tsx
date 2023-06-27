'use client';

import { getMessage, send } from '@/services/server-actions';
import {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from 'react';

function FormComponent({ message }: { message: string[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    message,
    (state, newMessage: string) => [...state, newMessage],
  );

  const formRef = useRef<any>();

  return (
    <div>
      {optimisticMessages.map((str, id) => {
        return <p key={id}>{str}</p>;
      })}
      <form
        action={async (formData) => {
          const str = formData.get('message');
          formRef.current.reset();
          addOptimisticMessage(str!.toString());
          await send(formData);
        }}
        ref={formRef}
      >
        <input type="text" name="message" required />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default function Page() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    getMessage()
      .then((data) => JSON.parse(data))
      .then(({ message }) => setMessage(message));
  }, []);

  return <FormComponent message={message} />;
}
