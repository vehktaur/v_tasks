import { Task } from '@/lib/schemas';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { tasks as initialTasks } from '@/lib/data';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';

export type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (id: string | number, task: Partial<Task>) => void;
  deleteTask: (id: string | number) => void;
};
export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: nanoid() }],
        })),

      editTask: (id, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task,
          ),
        })),

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
        toast.success('Task Deleted');
      },
    }),
    { name: 'techinnover-tasks', skipHydration: true },
  ),
);
