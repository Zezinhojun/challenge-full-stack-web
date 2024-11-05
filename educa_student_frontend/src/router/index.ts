import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/',
    component: () => import('@/layouts/homelayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: 'studentlist',
      },
      {
        path: 'studentlist',
        name: 'StudentList',
        component: () => import('@/pages/studentList.vue'),
        meta: {
          title: 'Consult Student',
          requiresAuth: true,
        },
      },
      {
        path: 'studentform',
        name: 'StudentForm',
        component: () => import('@/pages/studentForm.vue'),
        meta: {
          title: 'Student Registration',
          requiresAuth: true,
        },
      },
      {
        path: 'studentform/:id',
        name: 'EditStudentForm',
        component: () => import('@/pages/studentForm.vue'),
        meta: {
          title: 'Edit Student',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

let authChecked = false;
router.beforeEach(async (to, from, next) => {
  if (!authChecked) {
    await store.dispatch('checkAuth');
    authChecked = true;
  }

  const isLogged = store.getters.isAuthenticated;
  const isLoadingStudents = store.getters.isLoadingStudents;

  if (to.meta.requiresAuth && !isLogged) {
    next('/login');
    return;
  }

  if (to.meta.requiresGuest && isLogged) {
    next('/');
    return;
  }
  if (to.name === 'StudentList') {
    if (!isLoadingStudents && store.getters.getStudents.length === 0) {
      await store.dispatch('loadStudents');
    }
  }
  next();
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
