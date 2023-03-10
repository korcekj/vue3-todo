<script setup lang="ts">
import type { ITodoList } from '@/utils/zod';

import {
  useTodoListsQuery,
  useAddTodoListMutation,
  useDeleteTodoListMutation,
} from '@/utils/queries';
import { toast } from 'vue3-toastify';

import TodoList from '@/components/TodoList.vue';
import NewTodoList from '@/components/NewTodoList.vue';
import ListTransition from '@/components/ListTransition.vue';

const { data, isLoading: isDataLoading, isError } = useTodoListsQuery();
const { mutateAsync: addTodoList } = useAddTodoListMutation();
const { mutateAsync: deleteTodoList } = useDeleteTodoListMutation();

const onAdd = async (list: Pick<ITodoList, 'title'>, done: () => void) => {
  try {
    await addTodoList(list);
    toast.success('Todo list added successfully');
  } catch {
    toast.error('Error adding todo list');
  } finally {
    done();
  }
};

const onDelete = async (id: string, done: () => void) => {
  try {
    await deleteTodoList({ id });
    toast.success('Todo list deleted successfully');
  } catch {
    toast.error('Error deleting todo list');
  } finally {
    done();
  }
  done();
};
</script>

<template>
  <v-container class="mt-8">
    <NewTodoList @create="onAdd" />
  </v-container>
  <v-container>
    <v-row no-gutters v-if="isError">
      <v-alert color="error" border="start">
        Error fetching todo lists!
      </v-alert>
    </v-row>
    <v-row justify="center" no-gutters v-else-if="isDataLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-row>
    <v-row dense v-else-if="data?.length">
      <ListTransition>
        <v-col cols="12" sm="4" md="3" v-for="list in data" :key="list.id">
          <TodoList :list="list" @delete="onDelete" />
        </v-col>
      </ListTransition>
    </v-row>
    <v-row no-gutters v-else>
      <v-alert border="start"> No todo lists found. Add a new one! </v-alert>
    </v-row>
  </v-container>
</template>
