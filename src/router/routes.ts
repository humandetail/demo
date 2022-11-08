import { RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/ca-transition',
    name: 'CATransition',
    component: () => import('../pages/CATransition/index.vue'),
    meta: {
      title: '转场动画'
    }
  },
  {
    path: '/css-graphic',
    name: 'CSSGraphic',
    component: () => import('../pages/CSSGraphic/index.vue'),
    meta: {
      title: 'CSS图像'
    }
  }
]

export default routes
