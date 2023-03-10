import type { ITodoList } from '@/utils/zod';

import { useQuery, useMutation, useQueryClient } from 'vue-query';

export const useTodoListsQuery = () =>
  useQuery(
    'todoLists',
    () =>
      fetch('https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists').then(
        (res) => res.json()
      ) as Promise<ITodoList[]>
  );

export const useAddTodoListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    'addTodoList',
    (todoList: Pick<ITodoList, 'title'>) =>
      fetch('https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoList),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todoLists');
      },
    }
  );
};

export const useDeleteTodoListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id }: Pick<ITodoList, 'id'>) =>
      fetch(`https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists/${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todoLists');
      },
    }
  );
};
