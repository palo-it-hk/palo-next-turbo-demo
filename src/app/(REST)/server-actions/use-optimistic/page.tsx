'use client';

import {
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from 'react';

import { getTasks, send } from 'frontend-api/server-actions';
import { MethodInfo } from 'types/description.type';
import MethodDemo from 'components/atomic-design/organisms/UseOptimisticPage/MethodDescription';

export default function Page() {
  // we have 2 tasks lists, one that uses useState and the other useOptimistic
  // This is to demonstrate the behavior differences

  const [tasksForOpt, setTasksForOpt] = useState<string[]>([]);
  const [tasksForUseState, setTasksForUseState] = useState<string[]>([]);

  // the optimistic logic is here
  const [optimisticList, addOptimisticList] = useOptimistic(
    tasksForOpt,
    (state, newTask: string) => [...state, newTask],
  );

  const formRefOpt = useRef<any>();
  const formRefUs = useRef<any>();

  useEffect(() => {
    // Hydrate the lists by retrieving existing tasks from the backend
    getTasks()
      .then((data) => JSON.parse(data))
      .then(({ tasks }) => {
        setTasksForOpt(tasks);
        setTasksForUseState(tasks);
      });
  }, []);

  async function handleSubmit(
    formData: FormData,
    use: 'useOptimistic' | 'useState',
  ) {
    const data = formData.get('name');
    const newTask = data!.toString();

    if (use === 'useOptimistic') {
      formRefOpt.current.reset();

      // adds a task immediately without rerendering the page
      addOptimisticList(newTask);

      // The above action is only a temporary visual state which goes away upon rerender,
      // We still need to add the task to the actual list.
      setTasksForOpt((prev) => [...prev, newTask]);
    } else if (use === 'useState') {
      formRefUs.current.reset();
      setTasksForUseState((prev) => [...prev, newTask]);
    }

    await send(formData);
  }

  const methodList: MethodInfo[] = [
    {
      method: 'useOptimistic',
      description: `You show the intended UI without waiting for the server to respond
      assuming that there is no error in the way. This makes the UI appear
      fast and interactive. The value is temporary and will be thrown away
      during a re-render.`,
      taskList: optimisticList,
      formRef: formRefOpt,
    },
    {
      method: 'useState',
      description: `The page will only re-render after the server has responded.`,
      taskList: tasksForUseState,
      formRef: formRefUs,
    },
  ];

  return (
    <>
      <p className="text-green-500 font-bold">
        Since turbo doesn&apos;t support server actions, the page should be run
        with &quot;yarn next dev&quot; or &quot;yarn start&quot;.
      </p>
      {methodList.map((method, key) => (
        <div key={key}>
          <MethodDemo methodInfo={method} handleSubmit={handleSubmit} />
        </div>
      ))}
    </>
  );
}
