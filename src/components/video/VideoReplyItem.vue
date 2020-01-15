<template>
    <div class="reply-item reply-wrap" :id="item.id" :name="item.id">
        <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="reply-face" style="top: 0px;">
            <img :src="qiniuAddress+item.picture" alt="">
        </a>
        <div class="reply-con">
            <div class="user">
                <a :href="'/ospace/index?id='+item.author_id" target="_blank" data-usercard-mid="104852578" class="name ">{{item.author}}</a>
                <span class="author-type" v-show="item.author_id === authorId">作者</span>
                <span class="text-con">{{item.comment_content}}</span>
            </div>
        </div>
        <div class="info">
            <span class="time">{{item.created_date}}</span>
            <span class="like" @click="like" :disabled="likeState">
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
        <Comment :item="item" :commentType="'2'" v-show="isShow"></Comment>
    </div>
</template>

<script>
import { videoApi } from 'api'
import { getToken } from 'api/auth.js'
import Comment from 'components/video/Comment.vue'
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
    components: {
        Comment
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
    mounted() {
        this.getLikeState()
    }
}
</script>

<style scoped>
.reply-item {
    padding: 10px 0;
}
.reply-item .reply-face {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
}
.reply-item .reply-face img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.reply-item .reply-con {
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
.list-item .user .author-type {
    font-size: 12px;
    color: white;
    background-color: #adadad
}
.reply-item .reply-con .user .name {
    position: relative;
    top: -1px;
}
.reply-item .reply-con .user>a {
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