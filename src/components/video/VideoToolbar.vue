<template>
    <div>
        <div id="arc_toolbar_report" class="video-toolbar report-wrap-module report-scroll-module" scrollshow="true">
            <div class="ops">
                <!-- 待测试 -->
                <span :title="'点赞数'+item.comments" class="like" @click="like" :disabled="likeState">
                    <i class="van-icon-videodetails_like" :class="likeState ? 'active' : ''"></i>
                    {{item.comments}}
                </span>
                <span :title="'收藏人数'+item.collections" class="collect" @click="collect">
                    <canvas width="34" height="34" class="ring-progress" style="width:34px;height:34px;left:-3px;top:-3px;"></canvas>
                    <i class="van-icon-videodetails_collect" :class="state ? 'active' : ''"></i>
                    {{item.collections}}
                </span>
                <!-- <span title="分享" class="share">
                    <i class="van-icon-videodetails_share"></i>
                    1721
                </span> -->
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from 'api/auth.js'
import { spaceApi, videoApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            state: Boolean,
            likeState: Boolean
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        like() {
            if (!this.likeState) {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    videoApi.videoPraise({ 'beLikedUserId': this.item.author_id, 'likeUserId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                        if (response === '') {
                            this.likeState = true
                            Message.success('点赞成功')
                        } else {
                            Message.error('错误',response)
                        }
                    })
                }
            } else {
                return
            }
        },
        collect() {
            if (!this.state) {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    videoApi.videoCollect({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                        if (response === '') {
                            this.state = true
                            Message.success('收藏成功')
                        } else {
                            Message.error('错误',response)
                        }
                    })
                }
            } else {
                spaceApi.cancelCollect({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                    if (response === '') {
                        this.state = false
                    } else {
                        Message.error('错误',response)
                    }
                })
            }
        },
        getCollectState() {
			spaceApi.collectState({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
				this.state = response
			})
        },
        getLikeState() {
            videoApi.likeState({ 'beLikedUserId': this.item.author_id, 'likeUserId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                this.likeState = response
            })
        }
    },
    mounted() {
        this.getCollectState()
        this.getLikeState()
    }
}
</script>

<style scoped>
.v-wrap .video-toolbar {
    position: relative;
    margin-top: 16px;
}
.video-toolbar {
    line-height: 30px;
    height: 28px;
    font-size: 14px;
    color: #505050;
    border-bottom: 1px solid #e5e9f0;
    padding-bottom: 12px;
}
.video-toolbar .ops {
    float: left;
    height: 24px;
    -ms-user-select: none;
    user-select: none;
}
.video-toolbar .ops>span {
    width: 92px;
    margin-right: 8px;
    cursor: pointer;
    transition: all .3s;
    display: inline-block;
    white-space: nowrap;
    color: #505050;
    position: relative;
}
.video-toolbar .ops>span i {
    font-size: 28px;
    vertical-align: top;
    margin-right: 6px;
    width: 28px;
    height: 28px;
    color: #757575;
}
.video-toolbar .ops>span .van-icon-videodetails_like {
    background: url(../../assets/images/icons.png) no-repeat;
    background-position: -658px -2064px;
}
.video-toolbar .ops>span .van-icon-videodetails_collect {
    background: url(../../assets/images/icons.png) no-repeat;
    background-position: -658px -402px;
}
.video-toolbar .ops>span .van-icon-videodetails_like.active {
    pointer-events: none;
    background-position: -722px -2064px;
}
.video-toolbar .ops>span .van-icon-videodetails_collect.active {
     background-position: -724px -402px;
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
.ring-progress {
    position: absolute;
}
</style>