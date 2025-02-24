import { nanoid } from 'nanoid';
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().default(() => nanoid()),
  name: z.string().min(1, 'Task name is required'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low'], {
    errorMap: () => ({ message: 'Priority must be high, medium, or low' }),
  }),
  image: z.optional(
    z.object({
      url: z.string().optional(),
      name: z.string().optional(),
      size: z.string().optional(),
    }),
  ),
  deadline: z
    .string()
    .or(z.date())
    .refine((val) => val instanceof Date || !isNaN(Date.parse(val as string)), {
      message: 'Invalid date',
    })
    .default(new Date()),
  time: z.string().min(1, 'Required'),
  status: z.enum(['pending', 'in progress', 'completed']).default('pending'),
});

export type Task = z.infer<typeof TaskSchema>;
