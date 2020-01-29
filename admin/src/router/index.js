import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Main from '../views/Main';
import Login from '../views/Login'
import CategoryEdit from '../views/CategoryEdit';
import CategoryList from '../views/CategoryList';
import ItemEdit from '../views/ItemEdit';
import ItemList from '../views/ItemList';
import HeroEdit from '../views/HeroEdit';
import HeroList from '../views/HeroList';
import ArticleEdit from '../views/ArticleEdit';
import ArticleList from '../views/ArticleList';
import AdEdit from '../views/AdEdit';
import AdList from '../views/AdList';
import AdminUserEdit from '../views/AdminUserEdit';
import AdminUserList from '../views/AdminUserList';

// 定义路由
const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    name: 'Main',
    path: '/',
    redirect: '/categories/create',
    component: Main,
    children:[
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList},
      { path: '/categories/edit/:id', component: CategoryEdit, props: true},

      { path: '/items/create', component: ItemEdit },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },

      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/list', component: HeroList },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },

      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/list', component: ArticleList },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/list', component: AdList },
      { path: '/ads/edit/:id', component: AdEdit, props: true },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/list', component: AdminUserList },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true }
    ]
  },

  {
    path: '*',
    redirect: '/main'
    // 首次加载显示 comA (首页) 没有匹配到路径也显示首页
    // 重定向, 如果以上配置路由都没有匹配到, 就显示 * 中定义的路由  即 /comA
  }
];

// 实例化
const router = new Router({
  routes: routes
});

router.beforeEach((to, from, next) => {
  if(!(to.meta && to.meta.isPublic) && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router