<template>
    <div>
        <div id="arc_toolbar_report" class="video-toolbar report-wrap-module report-scroll-module" scrollshow="true">
            <div class="ops">
                <span :title="'点赞数'+item.comments" class="like" @click="like">
                    <i class="van-icon-videodetails_like" style="color:;"></i>
                    {{item.comments}}
                </span>
                <span :title="'收藏人数'+item.collections" class="collect" @click="collect">
                    <canvas width="34" height="34" class="ring-progress" style="width:34px;height:34px;left:-3px;top:-3px;"></canvas>
                    <i class="van-icon-videodetails_collec" style="color:;"></i>
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
import { videoApi } from 'api'
export default {
    data() {
        return {
            userInfo: this.UserInfo
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        like() {
            if (this.userInfo === undefined) {
                alert('请先登录')
            } else {
                videoApi.videoPraise({ 'beLikedUserId': this.item.author_id, 'likeUserId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                    console.log(response)
                    if (response === '') {

                    } else {
                        
                    }
                })
            }
        },
        collect() {
            if (this.userInfo === undefined) {
                alert('请先登录')
            } else {
                videoApi.videoCollect({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                    console.log(response)
                    if (response === '') {

                    } else {
                        
                    }
                })
            }
        }
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
    background-position: -719px -2064px;
}
.video-toolbar .ops>span .van-icon-videodetails_collec {
    background: url(../../assets/images/icons.png) no-repeat;
    background-position: -662px -465px;
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