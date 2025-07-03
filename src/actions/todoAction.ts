import { db } from '@/db/drizzle';
import { todo } from '@/db/schemas/todo';
import { eq, not } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const getData = async () => {
  try {
    const data = await db.select().from(todo);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTodo = async (id: number, text: string) => {
  try {
    await db.insert(todo).values({
      id: id,
      text: text,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await db.delete(todo).where(eq(todo.id, id));
    revalidatePath('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const toggleTodo = async (id: number) => {
  await db
    .update(todo)
    .set({
      done: not(todo.done),
    })
    .where(eq(todo.id, id));
  revalidatePath('/dashboard');
};

export const editTodo = async (id: number, text: string) => {
  await db
    .update(todo)
    .set({
      text: text,
    })
    .where(eq(todo.id, id));
  revalidatePath('/dashboard');
};
