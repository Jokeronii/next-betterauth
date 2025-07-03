'use client';

import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const HandleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('success');
            router.push('/signin');
          },
        },
      });
    });
  };

  return (
    <Button disabled={isPending} onClick={HandleLogout}>
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
