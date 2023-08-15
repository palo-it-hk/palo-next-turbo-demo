import SubmitBox from './SubmitBox';
import { MethodInfo } from 'types/description.type';

type Props = {
  methodInfo: MethodInfo;
  handleSubmit: (
    formData: FormData,
    use: 'useOptimistic' | 'useState',
  ) => Promise<void>;
};

export default function MethodDemo({ methodInfo, handleSubmit }: Props) {
  const { method, description, taskList, formRef } = methodInfo;

  return (
    <div className="border-b-2 py-5">
      <p className="font-bold">Form that uses {method}</p>
      <p className="mb-5">{description}</p>

      {taskList.map((str, id) => {
        return <p key={id}>{str}</p>;
      })}
      <SubmitBox
        action={async (formData) => {
          await handleSubmit(formData, method);
        }}
        formRef={formRef}
      />
    </div>
  );
}
