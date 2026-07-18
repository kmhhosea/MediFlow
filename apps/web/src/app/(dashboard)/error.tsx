'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="p-6 text-center">
      <p>Something went wrong loading this page.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
