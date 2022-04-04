import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Index'
import Signup from '@/components/Signup/signup'
import DashBoard from "@/components/dashboard/Index";
import Home from "@/components/dashboard/Home/home";
import createAlert from "@/components/dashboard/Alert/Create"
import editAlert from "@/components/dashboard/Alert/Edit"
import Alert from "@/components/dashboard/Alert/Index"
import createPortfolio from "@/components/dashboard/Portfolio/Create"
import editPortfolio from "@/components/dashboard/Portfolio/Edit"
import Portfolio from "@/components/dashboard/Portfolio/Index"
import NotFound from "@/components/dashboard/NotFound";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard,
      redirect: { name: "Home" },
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: Home,
          props: true,
        },
        {
          path: 'Alert',
          name: 'Alert',
          component: Alert,
        },
        {
          path: 'createAlert',
          name: 'createAlert',
          component: createAlert,
        },
        {
          path: 'editAlert',
          name: 'editAlert',
          component: editAlert,
        },
        {
          path: 'Portfolio',
          name: 'Portfolio',
          component: Portfolio,
        },
        {
          path: 'createPortfolio',
          name: 'createPortfolio',
          component: createPortfolio,
        },
        {
          path: 'editPortfolio',
          name: 'editPortfolio',
          component: editPortfolio,
        },
        {
          path: '/:catchAll(.*)',
          name: 'NotFound',
          component: NotFound,
        },
      ]
    }
  ]
})
