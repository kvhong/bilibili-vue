import Vue from 'vue'
import Router from 'vue-router'
import BParVideo from 'components/parVideo/BParVideo'
import Home from 'components/home/index'
import Login from 'components/login/index'
import Register from 'components/register/index'
import Search from 'components/search/index'
import Content from 'components/search/Content'
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
import SpaceCollect from 'components/space/SpaceCollect'
import UploadHome from 'components/upload/UploadHome'
import UploadVideo from 'components/upload/UploadVideo'
import VideoManage from 'components/upload/VideoManage'
import VideoEdit from 'components/upload/VideoEdit'
import FansManage from 'components/upload/FansManage'
import CommentManage from 'components/upload/CommentManage'
import AppealManage from 'components/upload/AppealManage'
import Follow from 'components/space/Follow'
import Fans from 'components/space/Fans'
import Attention from 'components/space/Attention'
import Hot from 'components/hot/index'
import GetBack from 'components/message/GetBack'
import AttentionMe from 'components/message/AttentionMe'
import Likes from 'components/message/Likes'
import SystemNot from 'components/message/SystemNot'
import MyMessage from 'components/message/MyMessage'
import Other from 'components/ospace/Other'
import OSpaceVideo from 'components/ospace/OSpaceVideo'
import OSpaceHome from 'components/ospace/OSpaceHome'
import OSpaceCollect from 'components/ospace/OSpaceCollect'
import OFollow from 'components/ospace/OFollow'
import OAttention from 'components/ospace/OAttention'
import OFans from 'components/ospace/OFans'
import Topic from 'components/banner/index'

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
            path: '/search',
            component: Search,
            hidden: true
        },
        {
            path: '/search/index',
            component: Content,
            hidden: true
        },
        {
            path: '/topic',
            component: Topic,
            hidden: true
        },
        {
            path: '/par/:name/:id',
            component: BParVideo,
            hidden: true
        },
        {
            path: '/hot',
            component: Hot,
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
            hidden: true,
            children: [
                {
                    path: '/message/getBack',
                    name: 'GetBack',
                    component: GetBack
                },
                {
                    path: '/message/attentionMe',
                    name: 'AttentionMe',
                    component: AttentionMe
                },
                {
                    path: '/message/likes',
                    name: 'Likes',
                    component: Likes
                },
                {
                    path: '/message/systemNot',
                    name: 'SystemNot',
                    component: SystemNot
                },
                {
                    path: '/message/myMessage',
                    name: 'MyMessage',
                    component: MyMessage
                }
            ]
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
                },
                {
                    path: '/space/:id/fav',
                    name: 'SpaceCollect',
                    component: SpaceCollect
                },
                {
                    path: '/space/:id/follow',
                    name: 'Follow',
                    component: Follow,
                    hidden: true,
                    children: [
                        {
                            path: '/space/:id/follow/fans',
                            name: 'Fans',
                            component: Fans
                        },
                        {
                            path: '/space/:id/follow/attention',
                            name: 'Attention',
                            component: Attention
                        }
                    ]
                }
            ]
        },
        {
            path: '/ospace',
            component: Other,
            hidden: true,
            children: [
                {
                    path: '/ospace/index',
                    name: 'OSpaceHome',
                    component: OSpaceHome
                },
                {
                    path: '/ospace/video',
                    name: 'OSpaceVideo',
                    component: OSpaceVideo,
                },
                {
                    path: '/ospace/fav',
                    name: 'OSpaceCollect',
                    component: OSpaceCollect
                },
                {
                    path: '/ospace/follow',
                    name: 'OFollow',
                    component: OFollow,
                    hidden: true,
                    children: [
                        {
                            path: '/ospace/follow/fans',
                            name: 'OFans',
                            component: OFans
                        },
                        {
                            path: '/ospace/follow/attention',
                            name: 'OAttention',
                            component: OAttention
                        }
                    ]
                }
            ]
        },
        {
            path: '/upload',
            component: Upload,
            hidden: true,
            children: [
                {
                    path: '/upload/home',
                    name: 'UploadHome',
                    component: UploadHome
                },
                {
                    path: '/upload/uploadVideo',
                    name: 'UploadVideo',
                    component: UploadVideo
                },
                {
                    path: '/upload/videoManage',
                    name: 'VideoManage',
                    component: VideoManage
                },
                {
                    path: '/upload/videoEdit',
                    name: 'VideoEdit',
                    component: VideoEdit
                },
                {
                    path: '/upload/appealManage',
                    name: 'AppealManage',
                    component: AppealManage
                },
                {
                    path: '/upload/fansManage',
                    name: 'FansManage',
                    component: FansManage
                },
                {
                    path: '/upload/commentManage',
                    name: 'CommentManage',
                    component: CommentManage
                }
            ]
        }
    ]
})