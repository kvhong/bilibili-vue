<template>
   <div>
       <div class="home-safe">
           <span class="h-reward-icon"></span> 
           <span class="h-reward-info">账号安全</span> 
            <div class="h-content-safe">
                <div class="h-safe-list">
                    <div :class="haveEmail ?  'h-safe-icon position-0' : 'h-safe-icon position-0-no'"></div> 
                    <div class="h-safe-msg">
                        <p class="h-safe-title">我的邮箱</p> 
                        <p class="h-safe-desc">绑定邮箱后也不可使用邮箱登录</p> 
                        <span class="h-safe-btn" v-show="!haveEmail" @click="bind('email')">去绑定</span>
                        <div v-show="haveEmail">
                            <span class="h-safe-nobtn">已绑定</span>
                            <span class="h-safe-a" @click="bind('email')">更改邮箱&gt;</span>
                        </div>
                    </div>
                </div>
                <div class="h-safe-list">
                    <div :class="havePhone ? 'h-safe-icon position-1' : 'h-safe-icon position-1-no'"></div> 
                    <div class="h-safe-msg">
                        <p class="h-safe-title">我的手机</p> 
                        <p class="h-safe-desc">绑定手机后也不可使用手机号登录</p>
                        <span class="h-safe-btn" v-show="!havePhone" @click="bind('phone')">去绑定</span>
                        <div v-show="havePhone">
                            <span class="h-safe-nobtn">已绑定</span> 
                            <span class="h-safe-a" @click="bind('phone')">更改手机&gt;</span>
                        </div>
                    </div>
                </div>
                <div class="h-safe-list">
                    <div class="h-safe-icon position-2"></div> 
                    <div class="h-safe-msg">
                        <p class="h-safe-title">我的密码</p> 
                        <p class="h-safe-desc">定期修改密码，账号更安全</p> 
                        <span class="h-safe-btn" @click="bind('password')">去修改</span>
                    </div>
                </div>
                <div class="h-safe-list">
                    <div class="h-safe-icon position-3-no"></div> 
                    <div class="h-safe-msg">
                        <p class="h-safe-title">实名认证</p> 
                        <p class="h-safe-desc">实名认证成功后，可享受更多服务</p> 
                        <span class="h-safe-nobtn">去认证</span> 
                    </div>
                </div>
            </div>
        </div> 
        <div class="loading-icon-box" style="display: none;">
            <div class="loading-icon"></div>
        </div>
    </div> 
</template>

<script>
import { getToken } from 'api/auth.js'
export default {
    data() {
        return {
            haveEmail: false,
            havePhone: false,
            userInfo: this.UserInfo
        }
    },
    methods: {
        bind(bind) {
            this.$router.push({ 
                path: '/center/accountSecurity/chooseWay',
                query: {
                    bind: bind
                }
            })
        },
        updatePassword() {
            this.$router.push({ path: '/center/accountSecurity/updatePassword' })
        }
    },
    mounted() {
        if (this.UserInfo !== undefined) {
            this.haveEmail = this.UserInfo.email !== '' ? true : false
            this.havePhone = this.UserInfo.phone !== '' ? true : false
        }
    }
}
</script>

<style scoped>
.home-safe {
    padding: 16px 0 34px;
    display: inline-block;
    position: relative;
}
.h-reward-icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('../../assets/images/icons_m_2.png') no-repeat;
    background-position: -145px -146px;
    margin-right: 6px;
    margin-left: 10px;
}
.h-reward-info {
    font-size: 20px;
    color: #222;
    margin-right: 6px;
    vertical-align: top;
}
.h-content-safe {
    width: 100%;
    overflow: hidden;
}
.h-safe-list {
    width: 360px;
    float: left;
    margin: 24px 22px 10px 0;
}
.h-safe-icon {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: url('../../assets/images/icons_m_2.png') no-repeat;
    display: inline-block;
}

.h-safe-msg {
    margin-left: 16px;
    display: inline-block;
    vertical-align: top;
}
.h-safe-title {
    font-size: 16px;
    color: #222;
    margin-bottom: 8px;
}
.h-safe-desc {
    font-size: 12px;
    color: #99a2aa;
    margin-bottom: 8px;
}
.position-0 {
    background-position: -386px -2px;
}
.position-1 {
    background-position: -386px -130px;
}
.position-2 {
    background-position: -386px -258px;
}
.position-3 {
    background-position: -386px -386px;
}
.h-safe-nobtn {
    cursor: default;
    background-color: #e5e9ef;
    color: #abb4c1;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
}
.h-safe-a:hover {
    color: #00b5e5;
    cursor: pointer;
}
.h-safe-a {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    color: #00a1d6;
    margin-left: 10px;
    font-size: 12px;
}
.position-0-no {
    background-position: -258px -2px;
}
.position-1-no {
    background-position: -258px -130px;
}
.position-2-no {
    background-position: -258px -258px;
}
.position-3-no {
    background-position: -257px -386px;
}
.h-safe-btn:hover {
    background-color: #00b5e5;
    color: #fff;
}
.h-safe-btn {
    cursor: pointer;
    background-color: #22a1d6;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
}
.loading-icon-box {
    width: 789px;
    height: 300px;
    position: relative;
}
.loading-icon {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: url('../../assets/images/loadTV.gif') no-repeat;
    background-size: 100% 100%;
}
</style>