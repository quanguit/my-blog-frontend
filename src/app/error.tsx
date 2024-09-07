'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMessage(error.message);
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Something went wrong
        </h1>
        <p className="my-6 text-lg leading-7 text-gray-600">
          {message ||
            'An unexpected error has occurred. Please try again later.'}
        </p>
        <div className="flex flex-row items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={
              // Attempt to recover by trying to re-render the page
              () => reset()
            }
          >
            Try Again
          </button>
          <Link href="/" className="font-semibold text-blue-600">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
