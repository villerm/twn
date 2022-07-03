import { createRouter, createWebHistory } from 'vue-router'

import List from '../views/ListView.vue'
import Article from '../views/ArticleView.vue'

const routes = [
  {
    path: '/',
    name: 'List',
    component: List
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: Article
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
