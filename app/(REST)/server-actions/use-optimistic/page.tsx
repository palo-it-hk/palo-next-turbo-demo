'use client';

import {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from 'react';
import Form from '@/components/atomic-design/organisms/EnhancementPage/Form';
import { getTasks, send } from '@/services/server-actions';

export default function Page() {
  const [tasksForOpt, setTasksForOpt] = useState<string[]>([]);
  const [tasksForUseState, setTasksForUseState] = useState<string[]>([]);

  const [optimisticList, addOptimisticList] = useOptimistic(
    tasksForOpt,
    (state, newTask: string) => [...state, newTask],
  );

  const formRefOpt = useRef<any>();
  const formRefUs = useRef<any>();

  useEffect(() => {
    getTasks()
      .then((data) => JSON.parse(data))
      .then(({ tasks }) => {
        setTasksForOpt(tasks);
        setTasksForUseState(tasks);
      });
  }, []);

  async function handleSubmit(
    formData: FormData,
    use: 'optimistic' | 'useState',
  ) {
    const data = formData.get('name');
    const newTask = data!.toString();
    if (use === 'optimistic') {
      formRefOpt.current.reset();
      addOptimisticList(newTask);
    } else {
      formRefUs.current.reset();
      setTasksForUseState((prev) => [...prev, newTask]);
    }
    await send(formData);
  }

  return (
    <>
      <p className="font-bold text-green-500">
        To see this feature, you must set reactStrictMode to false in
        next.config.js
      </p>
      <div className="my-5">
        <p className="font-bold">Form that uses useOptimistic</p>
        <p className="mb-5">
          You show the intended UI without waiting for the server to respond
          assuming that there is no error in the way. This makes the UI appear
          fast and interactive. The value is temporary and will be thrown away
          during a re-render.
        </p>
        {optimisticList.map((str, id) => {
          return <p key={id}>{str}</p>;
        })}
        <Form
          action={async (formData) => {
            handleSubmit(formData, 'optimistic');
          }}
          formRef={formRefOpt}
        />
      </div>

      <hr />

      <div className="my-5">
        <p className="font-bold">Form that uses useState</p>
        <p className="mb-5">
          The page will only re-render after the server has responded.
        </p>

        {tasksForUseState.map((str, id) => {
          return <p key={id}>{str}</p>;
        })}
        <Form
          action={async (formData) => {
            handleSubmit(formData, 'useState');
          }}
          formRef={formRefUs}
        />
      </div>
    </>
  );
}
