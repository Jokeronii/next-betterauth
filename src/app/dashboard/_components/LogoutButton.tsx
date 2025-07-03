'use client';

import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const HandleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('success');
            router.push('/login');
          },
        },
      });
    });
  };

  return (
    <button disabled={isPending} onClick={HandleLogout}>
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
