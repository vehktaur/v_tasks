import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Task name is required'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: 'Priority must be high, medium, or low' }),
  }),
  image: z.union([z.string().url(), z.instanceof(File)]).optional(),
  deadline: z.string().optional(),
  time: z.string().optional(),
  status: z.enum(['pending', 'in progress', 'completed']).default('pending'),
});

export type Task = z.infer<typeof TaskSchema>;
