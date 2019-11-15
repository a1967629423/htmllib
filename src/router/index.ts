import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/transparentrect',
    name:'trect',
    component:()=>import('../views/TransparentRect.vue'),
    meta:{
      bgColor:'#222',
      textColor:'#5187bd',
      textColorLight:'#bbdaf8'
    }
  },
  {
    path:'/mask',
    name:'mask',
    component:()=>import('../views/Mask.vue'),
    meta:{
      bgColor:'#6e0e55',
      textColor:'#6f6340',
      textColorLight:'#b95842'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((t,f,next)=>{
  let bgColor = t.meta.bgColor||"#eee";
  let textColor = t.meta.textColor||"#2c3e50";
  let textColorLight = t.meta.textColorLight || "#42b983";
  document.documentElement.style.setProperty('--bg-color',bgColor);
  document.documentElement.style.setProperty('--text-color',textColor);
  document.documentElement.style.setProperty('--text-color-light',textColorLight);
  next();
})
export default router
