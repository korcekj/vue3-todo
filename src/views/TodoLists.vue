<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify/lib/framework.mjs';

import { ref } from 'vue';
import {
  useTodoListsQuery,
  useAddTodoListMutation,
  useDeleteTodoListMutation,
} from '@/utils/queries';
import { useRules } from '@/utils/rules';

import TodoList from '@/components/TodoList.vue';
import ListTransition from '@/components/ListTransition.vue';

const title = ref('');

const { rules } = useRules();
const { data, isLoading: isDataLoading } = useTodoListsQuery();
const { mutateAsync: addTodoList, isLoading: isFormLoading } =
  useAddTodoListMutation();
const { mutateAsync: deleteTodoList } = useDeleteTodoListMutation();

const onAdd = async (e: SubmitEventPromise) => {
  const { valid } = await e;
  if (!valid) return;

  await addTodoList({ title: title.value });
  title.value = '';
};

const onDelete = async (id: string, done: () => void) => {
  await deleteTodoList({ id });
  done();
};
</script>

<template>
  <v-container class="my-8">
    <v-form
      validate-on="submit"
      @submit.prevent="onAdd"
      :disabled="isFormLoading"
    >
      <v-text-field
        v-model="title"
        variant="outlined"
        label="Todo List"
        prepend-inner-icon="mdi-plus"
        :rules="[rules.required]"
      ></v-text-field>
    </v-form>
    <div class="py-4">
      <v-row justify="center" dense v-if="isDataLoading">
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
    </div>
  </v-container>
</template>
