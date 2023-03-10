import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  deadline: z.coerce.date(),
});

export const TodoListSchema = z.object({
  id: z.string(),
  title: z.string(),
  todos: z.array(TodoSchema),
});

export const TodoFilterSchema = z.enum(['all', 'active', 'done']);

export type ITodo = z.infer<typeof TodoSchema>;
export type ITodoList = z.infer<typeof TodoListSchema>;
export type ITodoFilter = z.infer<typeof TodoFilterSchema>;
