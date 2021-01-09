import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import activateAccount from '../views/activateAccount.vue';
import forgotPassword from '../views/forgotPassword.vue';
import resetPassword from '../views/resetPassword.vue';
import notFound from '../views/notFound.vue';
import panel from '../views/panel.vue';
import dosPasos from '../views/dosPasos.vue';

//import VueCryptojs from 'vue-cryptojs';

Vue.use(VueRouter);
//Vue.use(VueCryptojs)
const routes = [
  {path: '/',name: 'home',component: Home,},
  {path: '/about',name: 'about',component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),},
  {path:'/login',name:'login',component:login},
  {path:'/register',name:'register',component:register},
  {path:'/activateAccount/:token',name:'activateAccount',component:activateAccount},
  {path:'/forgotPassword',name:'forgotPassword',component:forgotPassword},
  {path:'/resetPassword/:token',name:'resetPassword',component:resetPassword},
  {path:'/panel',name:'panel',component:panel},
  {path:'/dosPasos',name:'dosPasos',component:dosPasos},
  {path: '/404', component:notFound}

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
