import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import LogoutButton from './_components/LogoutButton';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session?.user.name}</p>
      <LogoutButton />
    </div>
  );
}
