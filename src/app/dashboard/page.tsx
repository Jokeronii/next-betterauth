'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login'); // redirect to login page
        },
      },
    });
  };

  return (
    <div>
      <h1>dashboard</h1>
      <button onClick={signOut}>sign out</button>
    </div>
  );
}
