import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/home/Home.vue';
import News from '../components/news/News.vue';
import NewsListContent from '../components/news/NewsListContent.vue'
import Login from '../components/login/Login.vue';
import Reg from '../components/reg/Reg.vue';

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            component:Home
        },
        {
            path:'/news',
            component:News,
            children:[
                {
                    path:':id',
                    component:NewsListContent
                }
            ]
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/reg',
            component:Reg
        }
    ]
});