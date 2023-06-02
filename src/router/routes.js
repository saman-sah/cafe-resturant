
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/store/:name', component: () => import('pages/Store.vue') },
      { path: '/store/:name/:slug', component: () => import('pages/Recipes.vue') },
      { path: '/account/profile', component: () => import('pages/Profile.vue') },
      { path: '/account/register-admin', component: () => import('pages/RegisterAdmin.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
