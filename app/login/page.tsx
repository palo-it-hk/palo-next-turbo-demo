'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { useJwtStore } from 'store/domain-store';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    const store = useJwtStore();
    console.log('receivedToken is', receivedToken);
    store.setJwt(receivedToken);
    router.push('http://localhost:3000/protected-page-with-layout');
  }

  return (
    <>
      <InputField
        fieldName="Username"
        action={setUsername}
        value={username}
        placeholder="test-user"
      />
      <InputField
        fieldName="Password"
        action={setPassword}
        value={password}
        placeholder="test-password"
      />
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
  placeholder,
}: {
  fieldName: string;
  action: Dispatch<SetStateAction<string>>;
  value: string;
  placeholder: string;
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
        placeholder={placeholder}
      />
    </label>
  );
}
