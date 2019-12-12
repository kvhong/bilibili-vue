<template>
    <div class="reply-item reply-wrap" >
        <a href="#" target="_blank" class="reply-face" style="top: 0px;">
            <img :src="qiniuAddress+item.picture" alt="">
        </a>
        <div class="reply-con">
            <div class="user">
                <a href="#" target="_blank" data-usercard-mid="104852578" class="name ">{{item.author}}</a>
                <span class="text-con">{{item.comment_content}}</span>
            </div>
        </div>
        <div class="info">
            <span class="time">{{item.created_date}}</span>
            <span class="like" @click="like">
                <i></i>
                <span>{{item.comments}}</span>
            </span>
            <span class="reply btn-hover btn-highlight">回复</span>
            <div class="operation">
                <div class="spot"></div>
                <div class="opera-list" style="display: none;">
                    <ul>
                        <li class="report">举报</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { videoApi } from 'api'
import { getToken } from 'api/auth.js'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: getToken()
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

            } else {
                videoApi.commentPraise({}).then((response) => {
                    console.log(response)
                })
            }
        },
        comment() {
            
        }
    }
}
</script>

<style scoped>
.reply-item, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item {
    padding: 10px 0;
}
.reply-item .reply-face, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-face {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
}
.reply-item .reply-face img, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-face img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.reply-item .reply-con, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con {
    display: inline-block;
    width: calc(100% - 34px);
}
.list-item .user, .comment-bilibili-fold .comment-list .list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.reply-item .reply-con .user .name, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user .name {
    position: relative;
    top: -1px;
}
.reply-item .reply-con .user>a, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user>a {
    position: relative;
    top: -2px;
}
.list-item .info .btn-hover:hover, .comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover {
    color: #00a1d6;
    background: #e5e9ef;
}
.list-item .user .name, .comment-bilibili-fold .comment-list .list-item .user .name {
    color: #6d757a;
}
.list-item .user>a, .comment-bilibili-fold .comment-list .list-item .user>a {
    vertical-align: middle;
}
.list-item .user .text-con, .comment-bilibili-fold .comment-list .list-item .user .text-con {
    padding-left: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
}
.list-item .info .operation .opera-list li:hover, .comment-bilibili-fold .comment-list .list-item .info .operation .opera-list li:hover {
    background: #e5e9ef;
    color: #00a1d6;
}
</style>