'use client';

import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function Submit() {
  const { pending } = useFormStatus();
  return <input type="submit" disabled={pending} className="border" />;
}
