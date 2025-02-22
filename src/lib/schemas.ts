import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Task name is required'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: 'Priority must be high, medium, or low' }),
  }),
  uploadCover: z.instanceof(File).optional(),
  deadline: z.string().optional(),
  time: z.string().optional(),
  completed: z.boolean(),
});
