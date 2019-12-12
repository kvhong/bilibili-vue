import Vue from 'vue'
import Router from 'vue-router'
import BParVideo from 'components/parVideo/BParVideo'
import Home from 'components/home/index'
import Login from 'components/login/index'
import Register from 'components/register/index'
import History from 'components/history/index'
import Message from 'components/message/index'
import BVideo from 'components/video/index'
import Center from 'components/center/index'

Vue.use(Router)

export default new Router({
    mode:'history',   
    routes:[
        { 
            path: '/login',
            component: Login,
            hidden: true 
        },
        {
            path: '/register',
            component: Register,
            hidden: true
        },
        {
            path: '/par/:name/:id',
            component: BParVideo,
            hidden: true
        },
        {
            path: '/video/:id',
            component: BVideo,
            hidden: true
        },
        {
            path: '/',
            component: Home,
            hidden: true
        },
        {
            path: '/history',
            component: History,
            hidden: true
        },
        {
            path: '/message',
            component: Message,
            hidden: true
        },
        {
            path: '/center',
            component: Center,
            hidden: true
        }
    ]
})