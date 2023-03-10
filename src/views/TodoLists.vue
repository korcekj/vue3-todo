<script setup lang="ts">
import type { ITodoList } from '@/utils/zod';

import {
  useTodoListsQuery,
  useAddTodoListMutation,
  useDeleteTodoListMutation,
} from '@/utils/queries';

import TodoList from '@/components/TodoList.vue';
import NewTodoList from '@/components/NewTodoList.vue';
import ListTransition from '@/components/ListTransition.vue';

const { data, isLoading: isDataLoading } = useTodoListsQuery();
const { mutateAsync: addTodoList } = useAddTodoListMutation();
const { mutateAsync: deleteTodoList } = useDeleteTodoListMutation();

const onAdd = async (list: Pick<ITodoList, 'title'>, done: () => void) => {
  await addTodoList(list);
  done();
};

const onDelete = async (id: string, done: () => void) => {
  await deleteTodoList({ id });
  done();
};
</script>

<template>
  <v-container class="mt-8">
    <NewTodoList @create="onAdd" />
  </v-container>
  <v-container>
    <v-row justify="center" no-gutters v-if="isDataLoading">
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
