import { headers } from 'next/headers';
import SignUpForm from './_components/SignupForm';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <h1>Sign Up Page</h1>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
