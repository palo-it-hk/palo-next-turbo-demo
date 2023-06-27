'use client';

import { Button } from '@/components/atomic-design/atoms/Button-SC';
import { format } from 'date-fns';
import { cache, useState } from 'react';

export default function Page() {
  const [time, setTime] = useState('');

  //POST requests are automatically deduplicated when using fetch
  const handleSubmit = cache(async () => {
    const currentTime = format(new Date(), 'PPpp');
    const res = await fetch('/api/data/time', {
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
      <p className="font-bold text-green-500">
        Please view this page in prod mode.
      </p>

      <div className="my-10">
        <p className="font-bold">Whats happening in the background</p>
        <ol className="list-inside list-decimal">
          <li>
            The button sends the current time to the server. The server returns
            to the client what it has received and the client displays it below.
          </li>
          <li>
            POST requests are not cached by default therefore the data is fresh
            on every request
          </li>
        </ol>
      </div>
      <Button label="Share current time" size="small" onClick={handleSubmit} />
      <p>
        <span className="font-bold">Time submitted :</span> {time}
      </p>
    </>
  );
}
