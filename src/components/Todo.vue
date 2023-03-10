<script setup lang="ts">
import type { ITodo } from '@/utils/zod';

import { ref, computed } from 'vue';

const props = defineProps<{ item: ITodo }>();

const emit = defineEmits(['delete', 'update']);

const isLoading = ref(false);
const isCompleted = ref(props.item?.completed);
const remainingDays = computed(() => {
  if (!props.item?.deadline) return 0;
  const diff = new Date(props.item.deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

const onCompleteChange = () => {
  isLoading.value = true;
  isCompleted.value = !isCompleted.value;
  emit('update', props.item.id, { completed: isCompleted.value }, () => {
    isLoading.value = false;
  });
};

const onDelete = () => {
  isLoading.value = true;
  emit('delete', props.item?.id, () => {
    isLoading.value = false;
  });
};
</script>

<template>
  <v-card
    :variant="isCompleted ? 'outlined' : 'elevated'"
    class="d-flex"
    @click="onCompleteChange"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-actions>
      <v-checkbox-btn :model-value="isCompleted"></v-checkbox-btn>
    </v-card-actions>
    <div class="flex-grow-1">
      <v-card-title>{{ item?.title }}</v-card-title>
      <v-card-text> {{ item?.description }}</v-card-text>
      <v-row no-gutters class="ma-2">
        <v-chip
          v-if="remainingDays > 0"
          color="secondary"
          label
          text-color="white"
          size="small"
        >
          <v-icon start icon="mdi-calendar-clock-outline"></v-icon>
          {{ remainingDays }} day(s)
        </v-chip>
        <v-chip
          v-else-if="item?.deadline"
          color="error"
          label
          text-color="white"
          size="small"
        >
          <v-icon start icon="mdi-calendar-clock-outline"></v-icon>
          {{ new Date(item.deadline).toLocaleString() }}
        </v-chip>
      </v-row>
    </div>
    <v-card-actions>
      <v-btn icon variant="plain" @click.stop="onDelete">
        <v-icon icon="mdi-delete" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
