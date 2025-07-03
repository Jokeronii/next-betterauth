'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(10),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export default function SignUpForm() {
  //const form = useForm() not destructuring
  //const {register} = useForm() use destructuring instead of calling one by one
  //create form with type: typeOf userSchema
  const { register } = useForm<z.infer<typeof userSchema>>();
  return <div>Sign Up Form</div>;
}
