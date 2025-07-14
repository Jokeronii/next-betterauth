'use client';

import { editTodo } from '@/actions/todoAction';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { todoSchema } from './addTodo';
import { useState } from 'react';
import { Textarea } from './ui/textarea';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Switch } from './ui/switch';

interface EditTodoProps {
  id: string;
  text: string;
  done: boolean;
}

// const todoEditSchema = todoSchema.pick({ text: true, done: true });

export default function EditTodoButton({ id, text, done }: EditTodoProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: id,
      text: text,
      done: done,
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = form;
  const onEditSubmit = handleSubmit(async (values) => {
    try {
      await editTodo(values.id, values.text, values.done);
      toast.success('Todo edited successfully');
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Edit Todo</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure to Edit this todo?</DialogTitle>
            <DialogDescription>This action will edit your todo data from our servers.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onEditSubmit} className="space-y-8">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Todo Text</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" placeholder="edit your todo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="done"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={(checked) => field.onChange(checked)} />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">{field.value ? 'Task is Done ✅' : 'Task not done ❌'}</p>
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
