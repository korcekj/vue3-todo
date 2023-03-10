import type { ITodoList, ITodo } from '@/utils/zod';

import { useQuery, useMutation, useQueryClient } from 'vue-query';

export const useTodoListsQuery = () =>
  useQuery(
    'todoLists',
    () =>
      fetch('https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists').then(
        (res) => res.json()
      ) as Promise<ITodoList[]>
  );

export const useTodosQuery = ({
  id,
  enabled,
}: Pick<ITodoList, 'id'> & { enabled: boolean }) =>
  useQuery(
    ['todos', id],
    () =>
      fetch(
        `https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists/${id}/todos`
      ).then((res) => res.json()) as Promise<ITodo[]>,
    {
      enabled,
    }
  );

export const useAddTodoListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
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

export const useAddTodoMutation = ({ id }: Pick<ITodoList, 'id'>) => {
  const queryClient = useQueryClient();
  return useMutation(
    (todo: Omit<ITodo, 'id'>) =>
      fetch(
        `https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists/${id}/todos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos', id]);
      },
    }
  );
};

export const useUpdateTodoMutation = ({
  id: listId,
}: Pick<ITodoList, 'id'>) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      id: todoId,
      todo,
    }: Pick<ITodo, 'id'> & {
      todo: Partial<Omit<ITodo, 'id'>>;
    }) =>
      fetch(
        `https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists/${listId}/todos/${todoId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      ),
    {
      onError: () => {
        queryClient.invalidateQueries(['todos', listId]);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['todos', listId]);
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

export const useDeleteTodoMutation = ({
  id: listId,
}: Pick<ITodoList, 'id'>) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id: todoId }: Pick<ITodo, 'id'>) =>
      fetch(
        `https://6409f2c4d16b1f3ed6e20883.mockapi.io/todo-lists/${listId}/todos/${todoId}`,
        {
          method: 'DELETE',
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos', listId]);
      },
    }
  );
};
