<template>
    <div class="user-card-m" :class="videoInfo ? 'video' : 'space'">
        <div>
            <div class="bg" :style="'background-image: url('+qiniuAddress+item.toutu+');'"></div>
            <a :href="'/ospace/index?id='+item.id" target="_blank" class="face">
                <img :src="qiniuAddress+item.picture" width="50" height="50">
            </a>
            <div class="info">
                <p class="user">
                    <a target="_blank" :href="'/ospace/index?id='+item.id" class="name is-vip">{{item.nick_name}}</a>
                </p>
                <p class="social">
                    <a :href="'/ospace/follow/attention?id='+item.id" target="_blank">
                        关注: 
                        <span class="like">{{item.attention}}</span>
                    </a>
                    <a :href="'/ospace/follow/fans?id='+item.id" target="_blank">
                        粉丝: 
                        <span class="fans">{{item.fans}}</span>
                    </a>
                </p>
                <p class="sign">{{item.profile}}</p>
            </div>
            <div class="btn-box">
                <a class="like" v-show="!follow">
                    <span class="default-text" @click="attention" :disabled="disabled">+关注</span>
                </a>
                <a class="liked" v-show="follow">
                    <span class="default-text">已关注</span>
                </a>
            </div>
        </div>
        <iframe frameborder="0" class="layout"></iframe>
    </div>
</template>

<script>
import { commonApi } from 'api'
import { getToken } from 'api/auth.js'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: this.UserInfo,
            follow: this.att ? true : this.state,
            state: Boolean,
            disabled: false
        }
    },
    props: {
        item: {
            type: Object
        },
        videoInfo: {
            type: Boolean
        },
        att: {
            type: Boolean
        }
    },
    watch: {
        att() {
            this.follow = this.att
        }
    },
    methods: {
        attention() {
            if (!this.disabled) {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    commonApi.attention({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                        if (response === '') {
                            this.state = true
                            this.timeout()
                            Message.success('关注成功')
                            this.$emit('listenAtt', true)
                        } else {
                            Message.error('关注失败')
                        }
                    })
                }
            } else {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    this.timeout()
                    Message.warning('请勿频繁操作，10秒后再试！')
                }
            }
        },
        attentionState() {
            commonApi.attentionState({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                this.state = response
            })
        },
        timeout() {
            this.disabled = true
            setTimeout(() => {
                this.disabled = false
            }, 10000)
        }
    },
    mounted() {
        if (!this.att) {
            this.attentionState()
        }
    }
}
</script>

<style scoped>
.user-card-m {
    font-size: 12px;
    position: absolute;
    z-index: 10099;
    padding: 15px 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,.16);
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    width: 335px;
    background: #fff;
    transition: all .3s;
}
.user-card-m.video {
    left: 707.5px;
    top: 148px;
}
.user-card-m.space {
    left: -10px;
    top: -40px
}
.user-card-m .bg {
    position: absolute;
    width: 375px;
    height: 120px;
    top: 0;
    left: 0;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
}
.user-card-m .face {
    left: 20px;
    top: 100px;
    position: absolute;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #fff;
}
.user-card-m .face img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.user-card-m .info {
    padding: 105px 0 19px 65px;
}
.user-card-m .info .user {
    font-size: 14px;
    font-weight: 700;
    margin: 12px 0;
}
.user-card-m .info p {
    margin: 0;
    color: #222;
}
.user-card-m p {
    margin: 0;
}
.user-card-m .info .user .name.is-vip {
    color: #fb7299;
}
.user-card-m .info .user .name {
    color: #222;
}
.user-card-m a {
    text-decoration: none;
}
.is-vip {
    color: #fb7299!important;
}
.user-card-m a {
    text-decoration: none;
}
.user-card-m .info p {
    margin: 0;
    color: #222;
}
.user-card-m p {
    margin: 0;
}
.user-card-m .info .social a:hover {
    color: #00a1d6;
}
.user-card-m .info .social a {
    color: #222;
}
.user-card-m a {
    text-decoration: none;
}
.user-card-m .info .like {
    margin-right: 20px;
}
.user-card-m .info .social a {
    color: #222;
}
.user-card-m .info .sign {
    line-height: 18px;
    margin-top: 11px;
    color: #99a2aa;
    word-break: break-all;
    word-wrap: break-word;
}
.user-card-m .info p {
    margin: 0;
    color: #222;
}
.user-card-m .btn-box {
    padding: 0 0 0 65px;
}
.user-card-m .btn-box .like {
    color: #fff;
    font-weight: 400;
    border-color: #00a1d6;
    background-color: #00a1d6;
}
.user-card-m .btn-box .liked {
    color: #6d757a;
    cursor: text;
    font-weight: 400;
    background-color: #e5e9ef;
}
.user-card-m .btn-box a {
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    width: 80px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #ccd0d7;
    margin-right: 20px;
    border-radius: 3px;
    color: #6d757a;
    transition: all .3s;
    background-color: #e5e9ef;
}
.user-card-m .btn-box .message {
    background-color: #fff;
}
.user-card-m .btn-box a {
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    width: 80px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #ccd0d7;
    margin-right: 20px;
    border-radius: 3px;
    color: #6d757a;
    transition: all .3s;
    background-color: #e5e9ef;
}
.user-card-m .layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    z-index: -1;
    outline: none;
}
</style>