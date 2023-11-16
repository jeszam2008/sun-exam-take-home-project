import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    component: () => import('../views/user/Login.vue'),
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/article/Article.vue'),
    children: [
      { path: '', component: () => import('../views/article/ArticleList.vue') },
      { path: 'details', component: () => import('../views/article/ArticleDetails.vue') },
    ]
  },
  {
    path: '/',
    redirect: '/article'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
