import SignInForm from './_components/SignInForm';

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <h1>Sign In Page</h1>
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
