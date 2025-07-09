import { auth } from '@/lib/auth';
import SignInForm from './_components/SignInForm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <h1>Sign In Page</h1>
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
