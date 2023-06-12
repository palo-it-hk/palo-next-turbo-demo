'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@/components/atomic-design/atoms/Button-SC';

import { initJwtStore } from 'store/state-management/mobx/mobx-domain-store';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('test-user');
  const [password, setPassword] = useState('test-password');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit() {
    let receivedToken;
    try {
      const res = await fetch('http://localhost:3000/api/user/auth', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token } = await res.json();
      receivedToken = token;
    } catch (e) {
      setErrorMessage('Error with validation');
      return;
    }

    if (!receivedToken) {
      setErrorMessage('Invalid username or password');
      return;
    }

    const store = initJwtStore();
    console.log('receivedToken is', receivedToken);
    store.setJwt(receivedToken);
    router.back();
  }

  return (
    <>
      <InputField fieldName="Username" action={setUsername} value={username} />
      <InputField fieldName="Password" action={setPassword} value={password} />
      <div>
        <Button label="submit" size="small" onClick={handleSubmit} />
      </div>
      <p style={{ color: 'red' }}>{errorMessage}</p>
    </>
  );
}

function InputField({
  fieldName,
  action,
  value,
}: {
  fieldName: string;
  action: Dispatch<SetStateAction<string>>;
  value: string;
}) {
  return (
    <label>
      <p>{fieldName}</p>
      <input
        type="text"
        value={value}
        style={{ border: '1px solid black' }}
        onChange={(e) => action(e.target.value)}
        required
      />
    </label>
  );
}
