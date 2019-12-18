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
import Info from 'components/center/Info'
import UpdateInfo from 'components/center/UpdateInfo'
import HeadIcon from 'components/center/HeadIcon'
import UploadIcon from 'components/center/UploadIcon'
import AccountSecurity from 'components/center/AccountSecurity'
import ChooseWay from 'components/center/ChooseWay'
import Bind from 'components/center/Bind'
import Space from 'components/space/index'
import Upload from 'components/upload/index'
import SpaceHome from 'components/space/SpaceHome'
import SpaceVideo from 'components/space/SpaceVideo'
import VideoList from 'components/space/VideoList'
import UnderReview from 'components/space/UnderReview'
import DeletedVideo from 'components/space/DeletedVideo'
import SpaceSetting from 'components/space/SpaceSetting'

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
            hidden: true,
            children: [  //二级路由
                {
                  path: '/center/info',
                  name: 'Info',
                  component: Info
                },
                {
                  path: '/center/updateInfo',
                  name: 'UpdateInfo',
                  component: UpdateInfo
                },
                {
                  path: '/center/headIcon',
                  name: 'HeadIcon',
                  component: HeadIcon
                },
                {
                    path: '/center/headIcon/upload',
                    name: 'Upload',
                    component: UploadIcon
                },
                {
                    path: '/center/accountSecurity',
                    name: 'AccountSecurity',
                    component: AccountSecurity
                },
                {
                    path: '/center/accountSecurity/chooseWay',
                    name: 'ChooseWay',
                    component: ChooseWay
                },
                {
                    path: '/center/accountSecurity/bind',
                    name: 'Bind',
                    component: Bind
                }
              ]
        },
        {
            path: '/space/:id',
            component: Space,
            hidden: true,
            children: [
                {
                    path: '/space/:id/index',
                    name: 'SpaceHome',
                    component: SpaceHome
                },
                {
                    path: '/space/:id/video',
                    name: 'SpaceVideo',
                    component: SpaceVideo,
                    hidden: true,
                    children: [
                        {
                            path: '/space/:id/video/index',
                            name: 'VideoList',
                            component: VideoList
                        },
                        {
                            path: '/space/:id/video/underReview',
                            name: 'UnderReview',
                            component: UnderReview
                        },
                        {
                            path: '/space/:id/video/deletedVideo',
                            name: 'DeletedVideo',
                            component: DeletedVideo
                        }
                    ]
                },
                {
                    path: '/space/:id/setting',
                    name: 'SpaceSetting',
                    component: SpaceSetting
                }
            ]
        },
        {
            path: '/upload',
            component: Upload,
            hidden: true
        }
    ]
})