import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // PUBLIC ROUTES
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Public/HomeView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Public/RegisterView.vue'),
      meta: { requiresGuest: true }
    },

    // PROTECTED ROUTES
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/dashboard/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/views/dashboard/CategoriesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/goals',
      name: 'Goals',
      component: () => import('@/views/dashboard/GoalsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: () => import('@/views/dashboard/TransactionsView.vue'),
      meta: { requiresAuth: true }
    },

    // FALLBACK
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('access_token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (isAuthenticated && requiresGuest) {
    return next('/dashboard');
  }

  if (requiresAuth && !isAuthenticated) {
    return next({ path: '/auth', replace: true });
  }

  next();
});
export default router