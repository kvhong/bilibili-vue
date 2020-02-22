<template>
    <div class="list-item reply-wrap" scrollshow="true" :id="item.id" :name="item.id">
        <div class="user-face">
            <a :href="'/ospace/index?id='+item.author_id" target="_blank">
                <img :src="qiniuAddress+item.picture" alt="">
            </a>
        </div>
        <div class="con">
            <div class="user">
                <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="name vip-red-name">{{item.author}}</a>
                <span class="author-type" v-show="item.author_id === authorId">作者</span>
            </div>
            <p class="text">{{item.comment_content}}</p>
            <div class="info">
                <span class="time">{{item.created_date}}</span>
                <span class="like" @click="like" :disbaled="likeState">
                    <i></i>
                    <span>{{item.comments}}</span>
                </span>
                <span class="reply btn-hover btn-highlight" @click="isShow = !isShow">回复</span>
                <div class="operation">
                    <div class="spot"></div>
                    <div class="opera-list" style="display: none;">
                        <ul>
                            <li class="report">举报</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Comment :item="item" :commentType="'1'" v-show="isShow"></Comment>
            <div class="reply-box">
                <VideoReplyItem v-for="item in item.child" :key="item.id" :item="item" :videoId="videoId" :authorId="authorId"></VideoReplyItem>
            </div>
        </div>
    </div>
</template>

<script>
import VideoReplyItem from 'components/video/VideoReplyItem.vue'
import Comment from 'components/video/Comment.vue'
import { getToken } from 'api/auth.js'
import { videoApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: this.UserInfo,
            isShow: false,
            likeState: Boolean
        }
    },
    components: {
        VideoReplyItem,
        Comment
    },
    props: {
        item: {
            type: Object
        },
        videoId: {
            type: String
        },
        authorId: {
            type: String
        }
    },
    methods: {
        like() {
            if (!this.likeState) {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    videoApi.commentPraise({ 'beLikedUserId': this.item.author_id, 'likeUserId': this.userInfo.iD, 'videoId': this.videoId, 'commentId': this.item.id }).then((response) => {
                        if (response === '') {
                            this.likeState = true
                            this.item.comments = this.item.comments + 1
                            Message.success('点赞成功')
                        } else {
                            Message.error('错误',response)
                        }
                    })
                }
            }
        },
        getLikeState() {
            videoApi.likeState({ 'beLikedUserId': this.item.author_id, 'likeUserId': this.userInfo.iD, 'videoId': this.videoId, 'commentId': this.item.id }).then((response) => {
                this.likeState = response
            })
        }
    },
    watch: {
        item() {
            this.getLikeState()
        }
    },
    mounted() {
        this.getLikeState()
    }
}
</script>

<style scoped>
.list-item .user-face {
    float: left;
    margin: 24px 0 0 5px;
    position: relative;
}
a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.list-item .user-face img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.img {
    border: none;
    vertical-align: middle;
}
.list-item .con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    border-top: 1px solid #e5e9ef;
}
.list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.list-item .user .author-type {
    font-size: 12px;
    color: white;
    background-color: #adadad
}
.list-item .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
}
p {
    margin: 0;
    padding: 0;
}
.list-item .user .name {
    color: #6d757a;
}
.list-item .user>a {
    vertical-align: middle;
}
.vip-red-name {
    color: #fb7299!important;
}
.list-item .info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.list-item .info>span {
    margin-right: 20px;
}
.list-item .info .like {
    cursor: pointer;
}
.list-item .info .like i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -153px -25px;
}
.list-item .info .like:hover i {
    background-position: -218px -25px;
}
.list-item .info .btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
}
.list-item .info .operation {
    position: relative;
    width: 18px;
    float: right;
    margin-top: 5px;
    margin-right: 0;
}
.list-item .info .operation .spot {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -151px -280px;
}
.list-item .info .operation .opera-list {
    display: none;
    position: absolute;
    width: 100px;
    right: 0;
    top: 20px;
    z-index: 10;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    border-radius: 4px;
    color: #222;
    font-size: 14px;
    padding: 10px 0;
    z-index: 999;
}
li, ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
.list-item .info .operation .opera-list li {
    padding: 0 15px;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    transition: all .3s;
}
.list-item .reply-box .reply-item {
    padding: 10px 0;
}
.list-item .reply-box .reply-item .reply-face {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
}
.list-item .reply-box .reply-item .reply-face img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.list-item .reply-box .reply-item .reply-con {
    display: inline-block;
    width: calc(100% - 34px);
}
.list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.list-item .reply-box .reply-item .reply-con .user .name {
    position: relative;
    top: -1px;
}
.list-item .reply-box .reply-item .reply-con .user>a {
    position: relative;
    top: -2px;
}
.list-item .info .btn-hover:hover {
    color: #00a1d6;
    background: #e5e9ef;
}
.list-item .user .name {
    color: #6d757a;
}
.list-item .user>a {
    vertical-align: middle;
}
.list-item .user .text-con {
    padding-left: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
}
.list-item .info .operation .opera-list li:hover {
    background: #e5e9ef;
    color: #00a1d6;
}
</style>