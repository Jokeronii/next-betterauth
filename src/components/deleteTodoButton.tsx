'use client';

import { deleteTodo } from '@/actions/todoAction';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { useState } from 'react';

interface DeleteTodoButtonProps {
  id: string;
}

export default function DeleteTodoButton({ id }: DeleteTodoButtonProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      toast.success('Todo deleted successfully');
      setOpen(false);
    } catch (error) {
      toast.error('Error deleting todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'destructive'}>Delete Todo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete your Todo's data from our servers.</DialogDescription>
          <Button disabled={isLoading} variant={'destructive'} onClick={() => handleDelete(id)}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
