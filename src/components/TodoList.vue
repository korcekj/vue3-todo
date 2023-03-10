<script setup lang="ts">
import type { PropType } from 'vue';
import type { ITodoList } from '@/utils/zod';

import { ref, computed } from 'vue';
import { toast } from 'vue3-toastify';

const { list } = defineProps<{ list: ITodoList }>();

const emit = defineEmits(['delete']);

const isLoading = ref(false);

const notCompletedCount = computed(() =>
  list?.todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0)
);

const onDelete = () => {
  if (list.todos.length > 0) {
    toast.error('Cannot delete a list with todos');
    return;
  }

  isLoading.value = true;
  emit('delete', list?.id, () => {
    isLoading.value = false;
  });
};
</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
    variant="outlined"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-item>
      <div>
        <v-row no-gutters>
          <div class="text-overline mb-1">TODO LIST</div>
          <v-spacer />
          <v-btn size="small" icon variant="plain" @click="onDelete">
            <v-icon icon="mdi-close" />
          </v-btn>
        </v-row>
        <div class="text-h6 mb-1">{{ list?.title }}</div>
        <div class="text-caption">
          Remaining <b>{{ notCompletedCount }}</b> item(s)
        </div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="outlined" :to="`/todo-lists/${list?.id}`"> Open </v-btn>
    </v-card-actions>
  </v-card>
</template>
