import { ref } from 'vue';

export const useRules = () => {
  const rules = ref({
    required: (value: string) => !!value.trim() || 'This field is required',
  });

  return { rules };
};
