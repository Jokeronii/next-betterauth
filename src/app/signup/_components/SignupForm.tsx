'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const userSchema = z.object({
  name: z.string().min(2, 'Name at least 2 characters').max(20),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password at least 8 characters').max(16, 'Password at most 16 characters'),
});

export default function SignUpForm() {
  //const form = useForm() not destructuring
  //const {register} = useForm() use destructuring instead of calling one by one
  //create form with type: typeOf userSchema
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    const { name, email, password } = values;
    const { data, error } = await authClient.signUp.email(
      {
        name,
        email,
        password,
        callbackURL: '/signin',
      },
      {
        onRequest(context) {
          toast.loading('Signing up...');
        },
        onSuccess(context) {
          toast.success('success');
          form.reset();
        },
        onError(context) {
          toast.error(context.error.message);
        },
      }
    );
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Please fill out the form</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@me.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/signin" className="underline underline-offset-4">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
