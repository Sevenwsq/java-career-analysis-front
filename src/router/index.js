import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/positions'
    },
    {
      path: '/positions',
      component: () => import('@/views/position/position-list.vue')
    },
    {
      path: '/position/histogram',
      component: () => import('@/views/position/position-histogram.vue')
    },
    {
      path: '/position/line',
      component: () => import('@/views/position/position-line.vue')
    },
    {
      path: '/position/pie',
      component: () => import('@/views/position/position-pie.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
