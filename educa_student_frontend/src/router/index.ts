import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/homelayout.vue'),
    children: [
      {
        path: 'studentlist',
        name: 'StudentList',
        component: () => import('@/pages/studentList.vue'),
        meta: { title: 'Consult Student' },
      },
      {
        path: 'studentform',
        name: 'StudentForm',
        component: () => import('@/pages/studentForm.vue'),
        meta: { title: 'Student Registration' },
      },
    ],
  },
  {
    path: '/home',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
