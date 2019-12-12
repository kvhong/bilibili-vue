import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from 'api/auth'

const whiteList = ['/login', '/', '/register']// 不重定向白名单
const whiteListReg_par = /^\/par\/+/
const whiteListReg_video = /^\/video\/+/
router.beforeEach((to, from, next) => {
    if (getToken()) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
            //     store.dispatch('GetInfo').then((res) => { // 拉取user_info
            //       next({ path: '/' })
            //     }).catch(() => {
            //       store.dispatch('FedLogOut').then(() => {
            //         Message.error('验证失败,请重新登录')
            //         next({ path: '/login' })
            //       })
            //     })
            // } else {
            next()
            // }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1 || whiteListReg_par.test(to.path) || whiteListReg_video.test(to.path)) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
    }
})