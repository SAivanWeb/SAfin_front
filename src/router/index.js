import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // PUBLIC
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Public/HomeView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/auth/',
      name: 'Auth',
      component: () => import('@/views/Public/RegisterView.vue'),
    },
    // DASHBOARD
    {
      path: '/profile/',
      name: 'Profile',
      component: () => import('@/views/dashboard/ProfileView.vue'),
    },
    {
      path: '/categories/',
      name: 'Categories',
      component: () => import('@/views/dashboard/CategoriesView.vue'),
    },
    {
      path: '/dashboard/',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
    },
    {
      path: '/goals/',
      name: 'Goals',
      component: () => import('@/views/dashboard/GoalsView.vue'),
    },
    {
      path: '/transactions/',
      name: 'Transactions',
      component: () => import('@/views/dashboard/TransactionsView.vue'),
    },
  ]
})

export default router