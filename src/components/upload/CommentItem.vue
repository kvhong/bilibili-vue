<template>
    <div>
        <div class="user-face">
            <a :href="'/ospace/index?id='+item.author_id" target="_blank">
                <img :src="qiniuAddress+item.picture" :alt="item.author">
            </a>
        </div>
        <div class="con">
            <div class="user">
                <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="name vip-red-name">{{item.author}}</a>
            </div>
            <p class="text">{{item.comment_content}}</p>
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
                trigger="hover"
                class="popover">
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
            <div class="reply-box" :class="item.child.length <= 0 ? 'empty' : showMore ? 'show' : ''">
                <div class="nodata" v-show="item.child.length <= 0">
                    <span>暂无回复</span>
                </div>
                <ReplyItem v-for="item in item.child" :key="item.id" :item="item"></ReplyItem>
            </div>
            <div v-show="item.child.length > 0 && item.child.length > 2 && !showMore" class="show-more">
                <span>共{{item.child.length}}个回复,</span>
                <a @click="showMore = !showMore">
                    <span>点击查看</span>
                </a>
            </div>
            <div v-show="item.child.length > 0 && showMore" class="show-more">
                <a @click="showMore = !showMore">
                    <span>点击收起</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import ReplyItem from 'components/upload/ReplyItem'
import { uploadApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            showMore: false,
            qiniuAddress: this.Global
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    components: {
        ReplyItem
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
.user-face {
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
.user-face img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.img {
    border: none;
    vertical-align: middle;
}
.con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    border-top: 1px solid #e5e9ef;
}
.user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
}
.user .name {
    color: #6d757a;
}
.user>a {
    vertical-align: middle;
}
.vip-red-name {
    color: #fb7299!important;
}
.info {
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
.popover {
    position: absolute;
    right: 0;
}
.more {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin: auto;
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
.reply-box {
    background-color: #e9eaeb;
    height: 150px;
    overflow: hidden;
}
.reply-box.show {
    height: auto;
}
.reply-box.empty {
    height: auto;
}
.show-more {
    font-size: 12px;
}
.nodata {
    font-size: 12px;
    margin: 20px;
}
</style>