import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getData } from '@/actions/todoAction';

export default async function TodoTable() {
  const todos = await getData();
  return (
    <Table className="mt-6">
      <TableCaption>A list of your recent todo.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Todo Text</TableHead>
          <TableHead className="text-right">Create At</TableHead>
          <TableHead className="text-right">Update At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.id}</TableCell>
            <TableCell>{todo.done ? 'Done' : 'Not Done'}</TableCell>
            <TableCell>{todo.text}</TableCell>
            <TableCell className="text-right">{todo.createdAt?.toLocaleString()}</TableCell>
            <TableCell className="text-right">{todo.updateAt?.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
