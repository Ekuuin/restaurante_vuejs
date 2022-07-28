import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Clientes from '@/views/Clientes.vue'

// @ is an alias to /src

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
    component: Clientes
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
  {
    path: '/Facturas',
    name: 'Facturas',
    component: () => import('../views/Facturas.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  // If your built project is in dist folder, use this base ----> base: '/dist'
})

export default router
