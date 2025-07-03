'use client';

import { authClient } from '@/lib/auth-client';
import { useTransition } from 'react';
import { toast } from 'sonner';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const signInGoogle = async () => {
    //do transition
    startTransition(async () => {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
        fetchOptions: {
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            toast.success('success');
          },
          onError: (ctx) => {
            // display the error message
            toast.error(ctx.error.message);
          },
        },
      });
    });
  };
  return (
    <div>
      <h1>Login Page</h1>
      {/* <button onClick={testToast}>test toast</button> */}
      <button disabled={isPending} onClick={signInGoogle}>
        {isPending ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
}
