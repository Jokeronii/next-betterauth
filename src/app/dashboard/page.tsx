import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import LogoutButton from './_components/LogoutButton';
import { redirect } from 'next/navigation';
import { addTodo, getData } from '@/actions/todoAction';
import AddTodo from '@/components/addTodo';
import TodoTable from '@/components/todoTable';
import { Button } from '@/components/ui/button';

export default async function Dashboard() {
  const todos = await getData();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome</h2>
      <p>welcome, {session?.user.name}</p>
      <AddTodo addTodo={addTodo} />
      <div className="flex flex-row">
        <div className="p-6 ">
          <TodoTable />
        </div>
      </div>
      {/* <h1>Todo item</h1> */}
      {/* <pre>{JSON.stringify(todos, null, 4)}</pre> */}
      <LogoutButton />
    </div>
  );
}
