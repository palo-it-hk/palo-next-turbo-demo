'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // The cause of an error can sometimes be temporary. In these cases, simply trying again
          // might resolve the issue.
          // An error component can use the reset() function to prompt the user to attempt
          // to recover from the error.
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
