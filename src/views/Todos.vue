<script setup lang="ts">
import type { Ref } from 'vue';
import type { ITodo } from '@/utils/zod';

import { ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  useTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/utils/queries';
import { toast } from 'vue3-toastify';

import Todo from '@/components/Todo.vue';
import NewTodo from '@/components/NewTodo.vue';
import FilterTodos from '@/components/FilterTodos.vue';
import ListTransition from '@/components/ListTransition.vue';

const filteredTodos = ref<ITodo[]>([]);

const route = useRoute();
const {
  data,
  isLoading: isDataLoading,
  isError,
} = useTodosQuery({
  id: route.params.id as string,
  enabled: !!route.params.id,
});
const { mutateAsync: addTodo } = useAddTodoMutation({
  id: route.params.id as string,
});
const { mutateAsync: updateTodo } = useUpdateTodoMutation({
  id: route.params.id as string,
});
const { mutateAsync: deleteTodo } = useDeleteTodoMutation({
  id: route.params.id as string,
});

const onFilter = (todos: Ref<ITodo[]>) => {
  filteredTodos.value = todos.value;
};

const onCreate = async (todo: Omit<ITodo, 'id'>, done: () => void) => {
  try {
    await addTodo(todo);
    toast.success('Todo added successfully');
  } catch {
    toast.error('Error adding todo');
  } finally {
    done();
  }
};

const onUpdate = async (
  id: string,
  todo: Partial<Omit<ITodo, 'id'>>,
  done: () => void
) => {
  try {
    await updateTodo({
      id,
      todo,
    });
    toast.success('Todo updated successfully');
  } catch {
    toast.error('Error updating todo');
  } finally {
    done();
  }
};

const onDelete = async (id: string, done: () => void) => {
  try {
    await deleteTodo({ id });
    toast.success('Todo deleted successfully');
  } catch {
    toast.error('Error deleting todo');
  } finally {
    done();
  }
};
</script>

<template>
  <v-container class="mt-8">
    <v-row>
      <v-col cols="12">
        <FilterTodos @filter="onFilter" :todos="data" />
      </v-col>
      <v-col cols="12">
        <NewTodo @create="onCreate" />
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row no-gutters v-if="isError">
      <v-alert color="error" border="start"> Error fetching todos! </v-alert>
    </v-row>
    <v-row no-gutters justify="center" v-else-if="isDataLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular
    ></v-row>
    <v-row dense v-else-if="filteredTodos?.length">
      <ListTransition>
        <v-col cols="12" v-for="item in filteredTodos" :key="item.id">
          <Todo :item="item" @update="onUpdate" @delete="onDelete" />
        </v-col>
      </ListTransition>
    </v-row>
    <v-row no-gutters v-else>
      <v-alert border="start"> No todo items found. Add a new one! </v-alert>
    </v-row>
  </v-container>
</template>
