import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Clientes',
    name: 'Clientes',
    component: () => import('../views/Clientes.vue')
  },
  {
    path: '/Productos',
    name: 'Productos',
    component: () => import('../views/Productos.vue')
  },
  {
    path: '/Mesa/:id',
    name: 'Ordenes',
    props: true,
    component: () => import('../views/Ordenes.vue')
  },
  {
    path: '/Meseros',
    name: 'Meseros',
    component: () => import('../views/Meseros.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
