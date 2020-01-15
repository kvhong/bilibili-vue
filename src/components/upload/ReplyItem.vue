<template>
    <div class="reply-item reply-wrap" >
        <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="reply-face" style="top: 0px;">
            <img :src="qiniuAddress+item.picture" alt="">
        </a>
        <div class="reply-con">
            <div class="user">
                <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="name ">{{item.author}}</a>
                <span class="text-con">{{item.comment_content}}</span>
            </div>
        </div>
        <div class="info">
            <span class="time">{{item.created_date}}</span>
            <span class="like">
                <i></i>
                <span>{{item.likes}}</span>
            </span>
            <span v-show="item.forbidden === 1">
                <i class="el-icon-error" style="color: red"></i>
                <span>已隐藏</span>
            </span>
            <el-popover
            placement="bottom"
            width="150"
            trigger="hover">
                <div class="i-frame-message">
                    <a class="im-list">
                        举报评论
                    </a>
                    <a class="im-list">
                        <span v-show="item.forbidden === 0" @click="changeState(1)">隐藏评论</span>
                        <span v-show="item.forbidden === 1" @click="changeState(0)">显示评论</span>
                    </a>
                </div>
                <div class="more" slot="reference"></div>
            </el-popover>
        </div>
    </div>
</template>

<script>
import { uploadApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            qiniuAddress: this.Global
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        changeState(val) {
            uploadApi.changeState({ 'commentId': item.id, 'state': val }).then((response) => {
                if (response === '') {
                    this.item.forbidden = val
                    Message.success(val === 0 ? '显示成功' : '隐藏成功')
                } else {
                    Message.error('错误',response)
                }
            })
        }
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
    vertical-align: middle;
}
.reply-item .reply-con {
    display: inline-block;
    width: calc(100% - 42px);
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
.reply-item .reply-con .user .name {
    position: relative;
    top: -1px;
    color: #fb7299;
}
.reply-item .reply-con .user>a {
    position: relative;
    top: -2px;
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
.reply-item .info {
    margin-left: 42px;
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.info>span {
    margin-right: 20px;
}
.info .like i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -153px -25px;
}
.more {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 13px;
    height: 16px;
    text-align: center;
    margin: 4px 0 0 4px;
    background: url('../../assets/images/more.png') no-repeat
}
.i-frame-message .im-list {
    position: relative;
    display: block;
    padding: 6px;
    color: black;
    padding-left: 14px;
}
.i-frame-message .im-list:hover {
    color: #00a1d6;
	background-color: #f4f4f4 !important
}
</style>