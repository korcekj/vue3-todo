<script setup lang="ts">
import type { ITodo, ITodoFilter } from '@/utils/zod';

import { ref, computed, watchEffect } from 'vue';
import { TodoFilterSchema } from '@/utils/zod';

const props = defineProps<{
  todos?: ITodo[];
}>();

const emit = defineEmits(['filter']);

const search = ref('');
const filter = ref<ITodoFilter>('all');
const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return props.todos?.filter((todo) => !todo.completed);
  } else if (filter.value === 'done') {
    return props.todos?.filter((todo) => todo.completed);
  }
  return props.todos;
});
const searchedTodos = computed(() =>
  filteredTodos.value?.filter((todo) =>
    todo.title.toLowerCase().includes(search.value.toLowerCase())
  )
);

watchEffect(() => {
  emit('filter', searchedTodos);
});
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        variant="outlined"
        label="Search Todo"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-chip-group mandatory selected-class="text-primary" v-model="filter">
        <v-chip
          v-for="option in TodoFilterSchema.options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </v-chip>
      </v-chip-group>
    </v-col>
  </v-row>
</template>
