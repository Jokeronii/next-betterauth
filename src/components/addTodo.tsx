'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from './ui/textarea';

interface AddTodoProps {
  addTodo: (text: string) => Promise<void>;
}

export const todoSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Text must be at least 1 character').max(500, 'Text must be at most 500 characters'),
  done: z.boolean().default(false),
});

const todoInputSchema = todoSchema.pick({ text: true });

export default function AddTodo({ addTodo }: AddTodoProps) {
  const form = useForm<z.infer<typeof todoInputSchema>>({
    resolver: zodResolver(todoInputSchema),
    defaultValues: {
      text: '',
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = handleSubmit(async (values: z.infer<typeof todoInputSchema>) => {
    await addTodo(values.text);
    reset();
  });

  return (
    <div>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-10">
              <FormField
                control={control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Todo Text</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" placeholder="input your todo text here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full" type="submit">
                {isSubmitting ? 'Adding Todo...' : 'Add Todo'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
