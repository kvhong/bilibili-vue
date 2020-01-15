<template>
    <div id="v_upinfo" class="up-info report-wrap-module report-scroll-module" scrollshow="true">
        <div class="u-face">
            <a :href="'/ospace/index?id='+item.id" target="_blank" report-id="head" class="fa">
                <img :src="qiniuAddress+item.picture" width="48" height="48" class="up-face">
            </a>
        </div>
        <div class="u-info">
            <div class="name" style="line-height:20px;height:20px;">
                <a :href="'/ospace/index?id='+item.id" target="_blank" report-id="name" class="username is-vip">
                    {{item.nick_name}}
                </a>
                <!-- <a href="//message.bilibili.com/?spm_id_from=333.788.b_765f7570696e666f.3#whisper/mid252615184" target="_blank" class="message">
                    <i class="van-icon-videodetails_messag"></i>
                    发消息
                </a> -->
            </div>
            <div :title="item.profile" class="desc">
                {{item.profile}}
            </div>
        </div>
        <div class="btn-panel">
            <div class="default-btn follow-btn b-gz not-follow" v-show="!state">
                <span class="has-charge" @click="attention">
                    <i class="van-icon-general_addto_s"></i>
                        关注 
                        <span>
                            {{item.fans}}
                        </span>
                </span>
            </div>
            <div class="default-btn follow-btn b-gz follow" v-show="state">
                <span class="has-charge">
                        已关注 
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { commonApi } from 'api'
import { getToken } from 'api/auth.js'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: this.UserInfo,
            state: Boolean
        }
    },
    props: {
        item: {
            type: Object
        },
        follow: {
            type: Boolean
        }
    },
    watch: {
        follow() {
            this.state = this.follow
        }
    },
    methods: {
        attention() {
            if (this.userInfo === '') {
                alert('请先登录')
            } else {
                commonApi.attention({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                    if (response === '') {
                        this.state = true
                    } else {
                        
                    }
                })
            }
        },
        attentionState() {
            commonApi.attentionState({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                this.state = response
            })
        }
    },
    mounted() {
        this.attentionState()
    }
}
</script>

<style scoped>
.v-wrap .up-info, .v-wrap .video-info {
    margin-top: 30px;
    margin-bottom: 16px;
}
.up-info .u-face {
    float: left;
    width: 48px;
    height: 48px;
    position: relative;
}
.up-info .u-face .fa {
    display: block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f4f5f7;
}
.up-info .u-face .up-face {
    background: #f9f9f9;
}
.up-info .u-info {
    margin-left: 16px;
    float: left;
}
.up-info .u-info .name {
    font-size: 14px;
    color: #00a1d6;
}
.up-info .u-info .name .username {
    font-size: 14px;
    color: #212121;
    font-weight: 500;
    display: inline-block;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
}
.is-vip {
    color: #fb7299!important;
}
.up-info .u-info .name .message {
    margin-left: 12px;
    font-size: 12px;
    color: #505050;
    display: inline-block;
    vertical-align: middle;
}
.up-info .u-info .name .message i {
    color: #999;
    font-size: 16px;
    margin-right: 4px;
    height: 16px;
    width: 16px;
    vertical-align: text-bottom;
}
[class^=van-icon-] {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#v_upinfo .u-info .desc {
    max-width: 360px;
}
.up-info .u-info .desc {
    margin-top: 4px;
    width: 256px;
    font-size: 12px;
    line-height: 16px;
    height: 16px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.up-info .btn-panel {
    clear: both;
    display: -ms-flexbox;
    display: flex;
    margin-left: 63px;
    white-space: nowrap;
}
.up-info .btn-panel .not-follow {
    background: #00a1d6;
    color: #fff;
    width: 156px;
}
.up-info .btn-panel .follow {
    background: #e5e9ef;
    color: #6d757a;
    width: 156px;
}
.up-info .btn-panel .follow-btn {
    transition: .25s;
}
.up-info .btn-panel .default-btn {
    box-sizing: border-box;
    padding: 0;
    line-height: 32px;
    height: 32px;
    border-radius: 2px;
    font-size: 14px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
}
.up-info .btn-panel .not-follow i.van-icon-general_addto_s {
    font-size: 16px;
}
.up-info .btn-panel .not-follow i {
    display: inline-block;
    vertical-align: text-top;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    font-size: 0;
    margin-top: 2px;
}
.up-info .btn-panel .not-follow .van-icon-general_addto_s {
    background: url('../../assets/images/multi.png') no-repeat;
}
[class^=van-icon-] {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>