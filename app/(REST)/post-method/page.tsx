'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { format } from 'date-fns';
import { cache, useState } from 'react';

export default function Page() {
  const [time, setTime] = useState('');

  //POST requests are automatically deduplicated when using fetch
  const handleSubmit = cache(async () => {
    const currentTime = format(new Date(), 'PPpp');
    const res = await fetch('http://localhost:3000/api/data/time', {
      method: 'POST',
      body: JSON.stringify({ time: currentTime }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const timeReceived = await res.json();
    setTime(timeReceived.time);
  });

  return (
    <>
      <Button label="Share current time" size="small" onClick={handleSubmit} />
      <p className="font-bold">Time submitted</p>
      <p>{time}</p>
    </>
  );
}
