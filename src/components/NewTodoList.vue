<script setup lang="ts">
import type { SubmitEventPromise } from 'vuetify/lib/framework.mjs';

import { ref } from 'vue';
import { useRules } from '@/utils/rules';

const emit = defineEmits(['create']);

const isLoading = ref(false);
const title = ref('');

const { rules } = useRules();

const onAdd = async (e: SubmitEventPromise) => {
  const { valid } = await e;
  if (!valid) return;

  isLoading.value = true;

  emit('create', { title: title.value }, () => {
    isLoading.value = false;
    title.value = '';
  });
};
</script>

<template>
  <v-form validate-on="submit" @submit.prevent="onAdd" :disabled="isLoading">
    <v-text-field
      v-model="title"
      variant="outlined"
      label="Todo List"
      prepend-inner-icon="mdi-plus"
      :rules="[rules.required]"
    ></v-text-field>
  </v-form>
</template>
