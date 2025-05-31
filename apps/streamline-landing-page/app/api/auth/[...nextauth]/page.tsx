'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to ChatApp</h1>

      <button
        className="mb-4 px-6 py-2 bg-black text-white rounded"
        onClick={() => signIn('github', { callbackUrl: '/chat' })}
      >
        Sign in with GitHub
      </button>

      <button
        className="px-6 py-2 bg-blue-600 text-white rounded"
        onClick={() => signIn('google', { callbackUrl: '/chat' })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
