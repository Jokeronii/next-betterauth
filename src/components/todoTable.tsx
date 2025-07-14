import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getData } from '@/actions/todoAction';
import DeleteTodoButton from './deleteTodoButton';

export default async function TodoTable() {
  const todos = await getData();
  return (
    <Table className="mt-6">
      <TableCaption>A list of your recent todo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Todo Text</TableHead>
          <TableHead className="text-right">Create At</TableHead>
          <TableHead className="text-right">Update At</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, index) => (
          <TableRow key={todo.id} className={`${index % 2 === 0 ? 'bg-neutral-300' : 'bg-neutral-400'}`}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>{todo.done ? 'Done' : 'Not Done'}</TableCell>
            <TableCell>{todo.text}</TableCell>
            <TableCell className="text-right">{todo.createdAt?.toLocaleString()}</TableCell>
            <TableCell className="text-right">{todo.updateAt?.toLocaleString()}</TableCell>
            <TableCell className="text-right">
              <DeleteTodoButton id={todo.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Todo Total</TableCell>
          <TableCell className="text-right">{todos.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
