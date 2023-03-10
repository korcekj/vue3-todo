<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify/lib/framework.mjs';

import { ref } from 'vue';
import { useRules } from '@/utils/rules';

const emit = defineEmits(['create']);

const initTodo = {
  title: '',
  description: '',
  deadline: '',
};

const dialog = ref(false);
const isLoading = ref(false);
const todo = ref({ ...initTodo });

const { rules } = useRules();

const closeDialog = () => {
  dialog.value = false;
};

const onAdd = async (e: SubmitEventPromise) => {
  const { valid } = await e;
  if (!valid) return;

  isLoading.value = true;

  emit(
    'create',
    {
      title: todo.value.title,
      description: todo.value.description,
      deadline: new Date(todo.value.deadline),
      completed: false,
    },
    () => {
      todo.value = { ...initTodo };
      isLoading.value = false;
      closeDialog();
    }
  );
};
</script>

<template>
  <v-dialog v-model="dialog" persistent width="1024">
    <template v-slot:activator="{ props }">
      <v-btn block prepend-icon="mdi-plus" size="large" v-bind="props"
        >Create new item</v-btn
      >
    </template>
    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h5">New Todo</span>
        </v-card-title>
        <v-form
          validate-on="submit"
          @submit.prevent="onAdd"
          :disabled="isLoading"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="todo.title"
                  label="Title"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="todo.description"
                  label="Description"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="todo.deadline"
                  type="datetime-local"
                  label="Deadline"
                  variant="outlined"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="button" variant="text" @click="closeDialog">
              Close
            </v-btn>
            <v-btn
              type="submit"
              color="secondary"
              variant="text"
              :loading="isLoading"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
