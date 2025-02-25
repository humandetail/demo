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
  },
  {
    path: '/dotdotdot',
    name: 'DotDotDot',
    component: () => import('../pages/DotDotDot/index.vue'),
    meta: {
      title: '点点点'
    }
  },
  {
    path: '/dotdotdot-pro',
    name: 'DotDotDotPro',
    component: () => import('../pages/DotDotDotPro/index.vue'),
    meta: {
      title: '点点点(Pro)'
    }
  },
  {
    path: '/lines-link',
    name: 'LinesLink',
    component: () => import('../pages/LinesLink/index.vue'),
    meta: {
      title: '两点连接'
    }
  },
  {
    path: '/virtual-rocker',
    name: 'VirtualRocker',
    component: () => import('../pages/VirtualRocker/index.vue'),
    meta: {
      title: '虚拟摇杆'
    }
  }
]

export default routes
