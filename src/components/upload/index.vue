<template>
    <el-container>
        <el-header>
            <div class="el-menu-demo">
                <div class="left-block">
                    <i class="logo bcc-iconfont bcc-icon-logo"></i>
                    <a class="main-site" href="/" target="_blank">
                        <i class="bcc-iconfont bcc-icon-icon_dingdao_zhuzhan"></i>
                        <span>主站</span>
                    </a>
                </div>
                <div class="right-block">
                    <div class="message">
                        <el-popover
                            placement="bottom"
                            width="150"
                            trigger="hover">
                            <div class="i-frame-message">
                                <a href="/message/getBack" target="_blank" class="im-list" @click="get('GetBack')">
                                    <el-badge :is-dot="GetBack" class="item">
                                    回复我的
                                    </el-badge>
                                </a>
                                <a href="/message/attentionMe" target="_blank" class="im-list" @click="get('AttentionMe')">
                                    <el-badge :is-dot="AttentionMe" class="item">
                                    关注我的
                                    </el-badge>
                                </a>
                                <a href="/message/likes" target="_blank" class="im-list" @click="get('Likes')">
                                    <el-badge :is-dot="Likes" class="item">
                                    收到的赞
                                    </el-badge>
                                </a>
                                <a href="/message/systemNot" target="_blank" class="im-list" @click="get('SystemNot')">
                                    <el-badge :is-dot="SystemNot" class="item">
                                    系统通知
                                    </el-badge>
                                </a>
                                <a href="/message/myMessage" target="_blank" class="im-list" @click="get('MyMessage')">
                                    <el-badge :is-dot="MyMessage" class="item">
                                    我的消息
                                    </el-badge>
                                </a>
                            </div>
                            <a href="/message/getBack" target="_blank" style="font-size: 26px" slot="reference">
                                <el-badge :is-dot="GetBack || AttentionMe || Likes || SystemNot || MyMessage" class="item">
                                    <i class="el-icon-message"></i>
                                </el-badge>
                            </a>
                        </el-popover>
                    </div>
                    <div class="avater">
                        <el-popover
                            placement="bottom"
                            width="0"
                            trigger="hover">
                            <div class="i-frame-message">
                                <a href="/center/info" target="_blank" class="im-list">
                                    <i class="el-icon-user"></i>
                                    个人中心
                                </a>
                                <a href="/upload/uploadVideo" target="_blank" class="im-list">
                                    <i class="el-icon-video-camera"></i>
                                    投稿管理
                                </a>
                                <a v-on:click="logout" class="im-list">
                                    <i class="el-icon-right"></i>
                                    退出登录
                                </a>
                            </div>
                            <a :href="'/space/'+userInfo.iD+'/index'" target="_blank" slot="reference">
                                <img :src="qiniuAddress+userInfo.picture" class="face"/>
                            </a>
                        </el-popover>
                    </div>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" style="height: 100%">
                <el-col :span="24">
                    <el-menu
                        class="el-menu-vertical-demo"
                        :default-active="activeIndex"
                        @open="handleOpen"
                        @close="handleClose">
                        <router-link to="/upload/uploadVideo" style="color: white">
                            <el-menu-item index="upload">
                                <el-popover
                                    placement="right"
                                    width="0"
                                    trigger="hover">
                                    <div class="i-frame">
                                        <router-link to="/upload/uploadVideo">
                                            <a class="im-list">
                                                <i class="el-icon-video-camera"></i>
                                                视频投稿
                                            </a>
                                        </router-link>
                                    </div>
                                    <el-button type="primary" slot="reference" style="width: 80%">
                                        <i class="el-icon-upload2" style="color: white"></i>
                                        投稿
                                    </el-button>
                                </el-popover>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/upload/home">
                            <el-menu-item index="home">
                                    <i class="el-icon-house"></i>
                                    <span slot="title">首页</span>
                            </el-menu-item>
                        </router-link>
                        <el-submenu index="content">
                            <template slot="title">
                                <i class="el-icon-video-camera"></i>
                                <span>内容管理</span>
                            </template>
                            <el-menu-item-group>
                            <router-link to="/upload/videoManage">
                                <el-menu-item index="videoManage">稿件管理</el-menu-item>
                            </router-link>
                            </el-menu-item-group>
                            <el-menu-item-group>
                            <router-link to="/upload/appealManage">
                                <el-menu-item index="appealManage">申诉管理</el-menu-item>
                            </router-link>
                            </el-menu-item-group>
                        </el-submenu>
                        <router-link to="/upload/fansManage">
                            <el-menu-item index="fansManage">
                                    <i class="el-icon-user"></i>
                                    <span slot="title">粉丝管理</span>
                            </el-menu-item>
                        </router-link>
                        <el-submenu index="message">
                            <template slot="title">
                                <i class="el-icon-chat-line-round"></i>
                                <span>互动管理</span>
                            </template>
                            <el-menu-item-group>
							<router-link to="/upload/commentManage">
                                <el-menu-item index="commentManage">评论管理</el-menu-item>
							</router-link>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Stomp from 'stompjs'
import { loginApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
      return {
        client: Stomp.client('ws://localhost:15674/ws'),
        qiniuAddress: this.Global,
        userInfo: this.UserInfo,
        activeIndex: 'home',
        isMessageShow: false,
        GetBack: false,
        AttentionMe: false,
        Likes: false,
        SystemNot: false,
        MyMessage: false
      };
    },
    methods: {
        getRouter() {
            let path = this.$route.fullPath
            this.activeIndex = path.substring(path.lastIndexOf('/')+1)
        },
        logout() {
            loginApi.logout().then((response) => {
                if (response === 200) {
                    location.reload()
                } else {
                    Message.error('错误', response)
                }
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        errorHandler() {
            return true
        },
        get(val) {
            switch (val) {
                case 'GetBack':
                    this.GetBack = false
                    break;
                case 'AttentionMe':
                    this.AttentionMe = false
                    break;
                case 'Likes':
                    this.Likes = false
                    break;
                case 'SystemNot':
                    this.Likes = false
                    break;
                case 'MyMessage':
                    this.MyMessage = false
                    break;
            }
        },
        onConnected: function(frame) {
		  //订阅频道
            const topic = "/queue/queue_"+this.userInfo.iD;
            console.log(topic)
	        this.client.subscribe(topic, this.responseCallback, this.onFailed);
	    },
	    onFailed: function(frame) {
	        console.log("MQ Failed: " + frame);
	    },
	    responseCallback: function(frame) {
            alert(frame.body)
            //接收消息处理
            switch (frame.body) {
                case 'new comment':
                    this.GetBack = true
                    break;
                case 'new attention':
                    this.AttentionMe = true
                    break;
                case 'video like':
                    this.Likes = true
                    break;
                case 'comment like':
                    this.Likes = true
                    break;
            }
	    },
	    connect: function() {
        //初始化mqtt客户端，并连接mqtt服务
            console.log('MQ start')
            const headers = {
                login: 'guest',
                passcode: 'guest',
                host: "/"
            };
            this.client.connect(headers, this.onConnected, this.onFailed);
	    }
    },
    watch: {
        '$route': 'getRouter'
    },
    mounted() {
        this.getRouter()
        this.connect()
    }
}
</script>

<style scoped>
.el-menu-demo {
    height: 60px;
    border-bottom: 2px solid #eee;
}
.el-menu-demo .left-block {
    float: left;
    height: 60px;
    width: 50%;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.el-menu-demo .left-block .logo {
    font-style: normal;
    font-size: 26px;
    font-weight: bold;
    color: #00a1d6;
    cursor: pointer;
}
.bcc-icon-logo:before {
    content: "创作中心";
}
.el-menu-demo .left-block .main-site {
    margin-left: 24px;
    font-size: 17px;
    color: #00a1d6;
}
.left-block .main-site .bcc-iconfont {
    width: 25px;
    height: 18px;
    background-image: url('../../assets/images/icons.png');
    background-repeat: no-repeat;
    background-position: -891px -84px;
    display: inline-block;
    padding: 0 0 0 20px;
}
.el-menu-demo .right-block {
    height: 60px;
    width: 15%;
    float: right;
    display: flex;
    align-items: center;
}
.el-menu-demo .right-block .message {
    margin-right: 36px;
    padding-right: 4px;
}
.el-menu-demo .right-block .message .i-frame-message {
    display: inline-block;
    padding: 5px 10px;
    color: #fff;
    position: absolute;
    z-index: 1;
    left: 86.5%;
    width: 0px;
    top: 50px;
    background: #fff;
}
.i-frame-message .item {
  margin-top: 10px;
  margin-right: 40px;
}
.i-frame-message .im-list {
    position: relative;
    display: block;
    padding: 6px;
    color: black;
    border-bottom: 2px solid #eee;
    padding-left: 14px;
}
.i-frame-message .im-list:hover {
    color: #00a1d6;
		background-color: #f4f4f4 !important
}
.i-frame .im-list:hover {
	color: #00a1d6;
	background: #f1f3f7;
}
.face {
    z-index: 20;
    width: 32px;
    height: 32px;
    left: 8px;
    top: 0;
    transition: .3s;
    border: 0 solid #fff;
    border-radius: 50%;
}
</style>