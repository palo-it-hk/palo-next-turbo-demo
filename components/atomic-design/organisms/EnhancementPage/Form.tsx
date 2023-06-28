import { MutableRefObject } from 'react';
import InputField from '../InputField';

type Props = {
  action: (formData: FormData) => Promise<void>;
  formRef: MutableRefObject<any>;
};

export default function Form({ action, formRef }: Props) {
  return (
    <form action={action} ref={formRef}>
      <InputField />
      <button type="submit">submit</button>
    </form>
  );
}
