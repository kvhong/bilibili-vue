<template>
    <div>
        <TopContainer></TopContainer>
        <div class="top-banner">
            <img src="../../assets/images/4f59bf959d51592016e07efe62969c411288826a.png" style="height: 86px;width: 100%;margin-top: -5px"/>
        </div>
        <div class="security_content">
            <div data-v-35019306="" class="security-left">
                <span class="security-title">个人中心</span>
                <ul id="ser-ul" class="security-ul">
                    <li :class="isShow === 'info' ? 'security-list router-link-exact-active on' : 'security-list'" @click="to('info')">
                        <i class="security-icon icon-0"></i> 
                        <span class="security-nav-name">
                            首<b style="width:28px; display:inline-block" ></b>页
                        </span>
                    </li>
                    <li :class="isShow === 'updateInfo' ? 'security-list router-link-exact-active on' : 'security-list'" @click="to('updateInfo')">
                        <i class="security-icon icon-3"></i> 
                        <span class="security-nav-name" >我的信息</span>
                    </li>
                    <li :class="isShow === 'headIcon' ? 'security-list router-link-exact-active on' : 'security-list'" @click="to('headIcon')">
                        <i class="security-icon icon-4"></i> 
                        <span class="security-nav-name">我的头像</span>
                    </li>
                    <li :class="isShow === 'accountSecurity' ? 'security-list router-link-exact-active on' : 'security-list'" @click="to('accountSecurity')">
                        <i class="security-icon icon-6"></i> 
                        <span class="security-nav-name">账号安全</span>
                    </li>
                </ul> 
                <ul id="securityOutLink" class="security-ul report-wrap-module">
                    <li class="security-list-jump">
                        <a :href="'/space/'+userInfo.iD+'/index'" target="_blank" class="security-list-link-jump">
                            个人空间
                            <i class="security-list-jump-icon"></i>
                        </a>
                    </li>
                    <li class="security-list-jump">
                        <a href="/upload" target="_blank" class="security-list-link-jump">
                            创作中心
                            <i class="security-list-jump-icon"></i>
                        </a>
                    </li>
                </ul>
            </div> 
            <div class="security-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import Info from 'components/center/Info.vue'
import UpdateInfo from 'components/center/UpdateInfo.vue'
import HeadIcon from 'components/center/HeadIcon.vue'
import { getToken } from 'api/auth.js'
export default {
    data() {
        return {
            isShow: 'info',
            userInfo: this.UserInfo
        }
    },
    components: {
        TopContainer,
        Info,
        UpdateInfo,
        HeadIcon
    },
    methods: {
        getParam() {
            this.isShow = this.$route.fullPath.split('/')[2]
        },
        to(toPath) {
            this.isShow = toPath
            this.$router.push({ path: '/center/'+toPath })
        }
    },
    watch: {
        '$route': 'getParam'
    },
    mounted() {
        this.getParam()
    }
}
</script>

<style scoped>
.top-banner {
    background: transparent no-repeat center -10px;
    position: relative;
    margin: 0px auto 0;
    background: #00a0d8;
    height: 86px;
    text-align: center;
    margin-bottom: 20px;
}
.security_content {
    overflow: hidden;
    width: 980px;
    height: 100%;
    margin: 10px auto 100px;
    border: 1px solid #e1e2e5;
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    background: #fafafa;
    border-radius: 4px;
}
.security-left {
    float: left;
    width: 150px;
    height: 100%;
    overflow: hidden;
}
.security-title {
    display: block;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #99a2aa;
    cursor: default;
    border-bottom: 1px solid #e1e2e5;
}
.security-ul {
    border-bottom: 1px solid #e1e2e5;
}
.security-left .on {
    background-color: #00a1d7!important;
}
.security-left .on .icon-0 {
    background-position: -87px -15px!important;
}
.security-left .on .icon-3 {
    background-position: -87px -80px!important;
}
.security-left .on .icon-4 {
    background-position: -87px -144px!important;
}
.security-left .on .icon-6 {
    background-position: -87px -272px!important;
}
.security-icon {
    vertical-align: middle;
    display: inline-block;
    width: 18px;
    height: 36px;
    margin-left: 32px;
    background: url('../../assets/images/icons_m_2.png');
}
i {
    font-style: normal;
}
.security-left .on .security-nav-name {
    color: #fff;
}
.security-nav-name {
    margin-left: 12px;
    font-size: 14px;
    color: #222;
}
b {
    font-weight: bold;
}
.security-list:hover {
    background: #e1e4ea;
    cursor: pointer;
}
.security-list {
    width: 150px;
    height: 48px;
    line-height: 48px;
}
.icon-0 {
    background-position: -23px -15px;
}
.icon-3 {
    background-position: -23px -80px;
}
.icon-4 {
    background-position: -23px -144px;
}
.icon-6 {
    background-position: -23px -272px;
}
.security-list-jump {
    width: 150px;
    height: 43px;
    border-bottom: 1px solid #e1e2e5;
    position: relative;
}
.security-list-link-jump:hover {
    background: #e1e4ea;
    cursor: pointer;
}
.security-list-link-jump {
    display: block;
    height: 100%;
    color: #222;
    font-size: 16px;
    text-align: center;
    line-height: 43px;
}
.security-list-jump-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('../../assets/images/icons_m_2.png');
    background-position: -26px -731px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 14px;
}
.security-right {
    float: left;
    width: 829px;
    border-left: 1px solid #ddd;
    background: #fff;
    min-height: 890px!important;
}
.security-left .on .security-nav-name {
    color: #fff;
}
</style>