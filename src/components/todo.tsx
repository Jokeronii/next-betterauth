import { TodoType } from '@/types/todoType';
import { ChangeEvent, useState } from 'react';

interface TodoProps {
  todo: TodoType;
  changeTodoText: (id: number, text: string) => void;
  toggleIsTodoDone: (id: number, done: boolean) => void;
  deleteTodoItem: (id: number) => void;
}

export default function Todo({ todo, changeTodoText, toggleIsTodoDone, deleteTodoItem }: TodoProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [isDone, setIsDone] = useState(todo.done);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleIsDone = async () => {
    toggleIsTodoDone(todo.id, !isDone);
    setIsDone((prev) => !prev);
  };

  const handleSave = async () => {
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  return (
    <div>
      {/* mark is done */}
      <input type="checkbox" checked={isDone} onChange={handleIsDone} className="mr-2" />
      <input type="text" value={text} onChange={handleTextChange} readOnly={!editing} className={`${todo.done ? 'line-through' : ''}outline-none read-only:border-transparent focus:border border-gray-200 rounded px-2 py-1`} />
    </div>
  );
}
