import { createRouter, createWebHistory } from 'vue-router';

import TodoLists from '@/views/TodoLists.vue';
import Todos from '@/views/Todos.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TodoLists },
    { path: '/todo-lists/:id', component: Todos },
    { path: '/:pathMatch(.*)', component: NotFound },
  ],
});

export default router;
