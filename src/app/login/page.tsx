'use client';

import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      fetchOptions: {
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          alert('success');
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      },
    });
  };
  return (
    <div>
      <button onClick={signInGoogle}>signIn with google</button>
    </div>
  );
}
