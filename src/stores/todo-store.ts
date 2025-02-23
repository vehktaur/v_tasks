import { Todo } from '@/lib/schemas';
import { createStore } from 'zustand/vanilla';

export type TodosState = {
  todos: Todo[];
};

export type TodoActions = {
  addTodo: (todo: Todo) => void;
  editTodo: (todo: Partial<Todo>) => void;
  deleteTodo: (id: string | number) => void;
};
