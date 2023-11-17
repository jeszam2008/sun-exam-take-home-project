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
      { path: '', name: 'article-list', component: () => import('../views/article/ArticleList.vue') },
      { path: 'add', name: "add-article", component: () => import('../views/article/AddArticle.vue') },
      { path: 'details/:id', name: "article-details", component: () => import('../views/article/ArticleDetails.vue') },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../components/NotFound.vue')
  },
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
