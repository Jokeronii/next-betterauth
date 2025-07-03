import SignUpForm from './_components/SignupForm';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 ">
      <h1>Sign Up Page</h1>
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
