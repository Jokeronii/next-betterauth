import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

import LoginForm from './_components/LoginForm';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  //check session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/');
  }

  return <LoginForm />;
}
