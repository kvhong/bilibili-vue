<template>
    <div class="reply-item reply-wrap" :id="item.id" :name="item.id">
        <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="reply-face" style="top: 0px;">
            <img :src="qiniuAddress+item.picture" alt="">
        </a>
        <div class="reply-con">
            <div class="user">
                <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="name ">{{item.author}}</a>
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
.reply-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.reply-item .user .author-type {
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
.reply-item .info .btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
}
.reply-item .info .btn-hover:hover {
    color: #00a1d6;
    background: #e5e9ef;
}
.reply-item .user .name {
    color: #6d757a;
}
.reply-item .user>a {
    vertical-align: middle;
}
.reply-item .user .text-con {
    padding-left: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
}
.reply-item .info .operation .opera-list li {
    padding: 0 15px;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    transition: all .3s;
}
.reply-item .info .operation .opera-list li:hover {
    background: #e5e9ef;
    color: #00a1d6;
}
.reply-item .info .operation {
    padding: 0;
    border-radius: 0;
    margin-right: 0;
    display: block;
    position: relative;
    width: 18px;
    float: right;
    margin-top: 5px;
    margin-right: 0;
}
.reply-item .info .operation .spot {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -151px -280px;
}
.reply-item .info .operation .opera-list {
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
.reply-item .info {
    margin-left: 34px;
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.reply-item .info>span {
    margin-right: 20px;
}
.reply-item .info .like {
    cursor: pointer;
}
.reply-item .info .like i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -153px -25px;
}
.reply-item .info .like:hover i {
    background-position: -218px -25px;
}
</style>