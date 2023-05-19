'use client';

import { FormEvent } from 'react';

export default function LoginPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log('target is ', e.target);
    e.preventDefault();
  }

  return (
    <>
      <form>
        <label>
          <p>Username</p>
          <input
            type="text"
            name="name"
            style={{ border: '1px solid black' }}
          />
        </label>
        <input type="submit" value="Submit" style={{ display: 'block' }} />
      </form>
    </>
  );
}
