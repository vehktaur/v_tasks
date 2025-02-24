import { Task } from '@/lib/schemas';
import { create } from 'zustand';
import { tasks as initialTasks } from '@/lib/placeholder-data';
import { toast } from 'sonner';

export type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (id: string | number, task: Partial<Task>) => void;
  deleteTask: (id: string | number) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: initialTasks,

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

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
    toast.success('Task Deleted')
  },
}));
