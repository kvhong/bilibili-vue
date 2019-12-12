<template>
    <div>
        <div id="comment" class="comment-m report-wrap-module report-scroll-module" scrollshow="true">
            <div class="common">
                <div class="b-head">
                    <span class="b-head-t results">{{total}}</span>
                    <span class="b-head-t">评论</span>
                </div>
                <div class="comment" style="position: relative;">
                    <div class="bb-comment">
                        <div class="reply-notice"></div>
                        <div class="comment-header clearfix">
                            <el-pagination layout="total, prev, pager, next"
                                            background
                                            :current-page="pageNum"
                                            :page-size="pageSize"
                                            @size-change="handleSizeChange"
                                            :total="total"
                                            @current-change="handleCurrentChange"
                                            class="header-page paging-box">
                            </el-pagination>
                        </div>
                        <div class="comment-send">
                            <div class="user-face">
                                <img class="user-head" :src="userInfo === undefined ? userInfoPicture : qiniuAddress+userInfo.picture">
                            </div>
                            <div class="textarea-container">
                                <i class="ipt-arrow"></i>
                                <el-form>
                                    <el-form-item>
                                        <textarea cols="80" name="msg" rows="5" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" class="ipt-txt"></textarea>
                                        <button type="primary" class="comment-submit" v-on:click="toComment">发表评论</button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="comment-emoji">
                                <i class="face"></i>
                                <span class="text">表情</span>
                            </div>
                        </div>
                        <div class="comment-list">
                            <VideoCommentItem v-for="item in comment" :key="item.id" :item="item"></VideoCommentItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from 'api/auth.js'
import VideoCommentItem from 'components/video/VideoCommentItem.vue'
import { videoApi } from 'api'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: getToken(),
            userInfoPicture: '../../assets/images/noface.gif',
            comment: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            form: {

            }
        }
    },
    components: {
        VideoCommentItem
    },
    props: {
        videoId: {
            type: String
        }
    },
    methods: {
        getComment() {
            videoApi.getComment({ 'videoId': this.videoId, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.comment = response.list
                this.total = response.total
            })
        },
        handleSizeChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.getComment()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.getComment()
        },
        toComment() {
            videoApi.comment({}).then((response) => {
                console.log(response)
            })
        }
    },
    mounted() {
        this.getComment()
    }
}
</script>

<style scoped>
.v-wrap #comment {
    margin-top: 20px;
    z-index: 0;
    position: relative;
}
.comment-m .b-head {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px;
}
.comment-m .b-head .results {
    margin-right: 10px;
}
.bb-comment, .comment-bilibili-fold {
    font-family: Microsoft YaHei,Arial,Helvetica,sans-serif;
    font-size: 0;
    zoom: 1;
    min-height: 100px;
    background: #fff;
}
.bb-comment .reply-notice, .comment-bilibili-fold .reply-notice {
    margin-bottom: 10px;
}
.bb-comment *, .comment-bilibili-fold * {
    box-sizing: content-box;
}
.bb-comment .comment-header, .comment-bilibili-fold .comment-header {
    margin: 0 0 24px;
    border-bottom: 1px solid #e5e9ef;
}
.bb-comment .clearfix, .comment-bilibili-fold .clearfix {
    zoom: 1;
}
.bb-comment *, .comment-bilibili-fold * {
    box-sizing: content-box;
}
.bb-comment .comment-header .header-page, .comment-bilibili-fold .comment-header .header-page {
    float: right;
    line-height: 36px;
}
.paging-box {
    font-size: 12px;
}
.bb-comment .comment-send, .comment-bilibili-fold .comment-send {
    margin: 10px 0;
}
.bb-comment .comment-send .user-face, .comment-bilibili-fold .comment-send .user-face {
    float: left;
    margin: 24px 0 0 5px;
    position: relative;
}
.bb-comment .comment-send .user-face .user-head, .comment-bilibili-fold .comment-send .user-face .user-head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.bb-comment img, .comment-bilibili-fold img {
    border: none;
    vertical-align: middle;
}
.bb-comment .comment-send .textarea-container, .comment-bilibili-fold .comment-send .textarea-container {
    position: relative;
    margin-left: 85px;
    margin-right: 80px;
}
.bb-comment .comment-send .textarea-container .ipt-arrow, .comment-bilibili-fold .comment-send .textarea-container .ipt-arrow {
    position: absolute;
    left: -12px;
    top: 22px;
    background: url(../../assets/images/icons-comment.png) -395px -340px no-repeat;
    width: 13px;
    height: 20px;
    display: inline-block;
    z-index: 2;
}
.bb-comment .comment-send .textarea-container textarea, .comment-bilibili-fold .comment-send .textarea-container textarea {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #f4f5f7;
    border: 1px solid #e5e9ef;
    overflow: auto;
    border-radius: 4px;
    color: #555;
    width: 100%!important;
    height: 65px;
    transition: 0s;
    padding: 5px 10px;
    line-height: normal;
}
.bb-comment textarea, .comment-bilibili-fold textarea {
    outline: none;
    resize: none;
}
.bb-comment .comment-send .comment-submit, .comment-bilibili-fold .comment-send .comment-submit {
    margin-top: 15px;
    width: 70px;
    height: 64px;
    position: absolute;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: .1s;
    user-select: none;
    outline: none;
}
.bb-comment .comment-send .comment-submit:hover, .comment-bilibili-fold .comment-send .comment-submit:hover {
    background-color: #00b5e5;
    border-color: #00b5e5;
}
.bb-comment button, .comment-bilibili-fold button {
    box-sizing: border-box;
}
.bb-comment .comment-send .comment-emoji, .comment-bilibili-fold .comment-send .comment-emoji {
    padding: 0;
    width: 66px;
    height: 24px;
    color: #99a2aa;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    position: relative;
    z-index: 101;
    font-size: 12px;
    text-align: center;
    line-height: 23px;
    margin-left: 86px;
    margin-top: -100px;
    cursor: pointer;
    display: inline-block;
}
.bb-comment .comment-send .comment-emoji:hover {
    color: #6d757a
}
.bb-comment .comment-send .comment-emoji .face, .comment-bilibili-fold .comment-send .comment-emoji .face {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url(../../assets/images/icons-comment.png) no-repeat -408px -24px;
}
.bb-comment .comment-send .comment-emoji:hover .face, .comment-bilibili-fold .comment-send .comment-emoji.open .face, .comment-bilibili-fold .comment-send .comment-emoji:hover .face {
    background-position: -472px -24px;
}
.bb-comment .comment-send .comment-emoji .text, .comment-bilibili-fold .comment-send .comment-emoji .text {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 12px!important;
}
.bb-comment .comment-list, .comment-bilibili-fold .comment-list {
    padding-top: 20px;
}
.bb-comment .comment-list .list-item .user-face, .comment-bilibili-fold .comment-list .list-item .user-face {
    float: left;
    margin: 24px 0 0 5px;
    position: relative;
}
.bb-comment a, .comment-bilibili-fold a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.bb-comment .comment-list .list-item .user-face img, .comment-bilibili-fold .comment-list .list-item .user-face img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.bb-comment img, .comment-bilibili-fold img {
    border: none;
    vertical-align: middle;
}
.bb-comment .comment-list .list-item .con, .comment-bilibili-fold .comment-list .list-item .con {
    position: relative;
    margin-left: 85px;
    padding: 22px 0 14px;
    border-top: 1px solid #e5e9ef;
}
.bb-comment .comment-list .list-item .user, .comment-bilibili-fold .comment-list .list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.bb-comment .comment-list .list-item .text, .comment-bilibili-fold .comment-list .list-item .text {
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-word;
}
.bb-comment p, .comment-bilibili-fold p {
    margin: 0;
    padding: 0;
}
.bb-comment .comment-list .list-item .user .name, .comment-bilibili-fold .comment-list .list-item .user .name {
    color: #6d757a;
}
.bb-comment .comment-list .list-item .user>a, .comment-bilibili-fold .comment-list .list-item .user>a {
    vertical-align: middle;
}
.bb-comment .vip-red-name, .comment-bilibili-fold .vip-red-name {
    color: #fb7299!important;
}
.bb-comment a, .comment-bilibili-fold a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.bb-comment p, .comment-bilibili-fold p {
    margin: 0;
    padding: 0;
}
.bb-comment .comment-list .list-item .info, .comment-bilibili-fold .comment-list .list-item .info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.bb-comment .comment-list .list-item .info>span, .comment-bilibili-fold .comment-list .list-item .info>span {
    margin-right: 20px;
}
.bb-comment .comment-list .list-item .info .like, .comment-bilibili-fold .comment-list .list-item .info .like {
    cursor: pointer;
}
.bb-comment .comment-list .list-item .info .like i, .comment-bilibili-fold .comment-list .list-item .info .like i {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    margin-right: 5px;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -153px -25px;
}
.bb-comment .comment-list .list-item .info .like:hover i, .comment-bilibili-fold .comment-list .list-item .info .like:hover i {
    background-position: -218px -25px;
}
.bb-comment .comment-list .list-item .info .btn-hover, .comment-bilibili-fold .comment-list .list-item .info .btn-hover {
    padding: 0 5px;
    border-radius: 4px;
    margin-right: 15px;
    cursor: pointer;
    display: inline-block;
}
.bb-comment .comment-list .list-item .info .operation, .comment-bilibili-fold .comment-list .list-item .info .operation {
    position: relative;
    width: 18px;
    float: right;
    margin-top: 5px;
    margin-right: 0;
}
.bb-comment .comment-list .list-item .info .operation .spot, .comment-bilibili-fold .comment-list .list-item .info .operation .spot {
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: url(../../assets/images/icons-comment.png) no-repeat;
    background-position: -151px -280px;
}
.bb-comment .comment-list .list-item .info .operation .opera-list, .comment-bilibili-fold .comment-list .list-item .info .operation .opera-list {
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
.bb-comment li, .bb-comment ul, .comment-bilibili-fold li, .comment-bilibili-fold ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
.bb-comment .comment-list .list-item .info .operation .opera-list li, .comment-bilibili-fold .comment-list .list-item .info .operation .opera-list li {
    padding: 0 15px;
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    transition: all .3s;
}
.bb-comment li, .bb-comment ul, .comment-bilibili-fold li, .comment-bilibili-fold ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
.bb-comment .comment-list .list-item .reply-box .reply-item, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item {
    padding: 10px 0;
}
.bb-comment .comment-list .list-item .reply-box .reply-item .reply-face, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-face {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    vertical-align: top;
}
.bb-comment a, .comment-bilibili-fold a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.bb-comment .comment-list .list-item .reply-box .reply-item .reply-face img, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-face img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.bb-comment img, .comment-bilibili-fold img {
    border: none;
    vertical-align: middle;
}
.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con {
    display: inline-block;
    width: calc(100% - 34px);
}
.bb-comment .comment-list .list-item .user, .comment-bilibili-fold .comment-list .list-item .user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user .name, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user .name {
    position: relative;
    top: -1px;
}
.bb-comment .comment-list .list-item .reply-box .reply-item .reply-con .user>a, .comment-bilibili-fold .comment-list .list-item .reply-box .reply-item .reply-con .user>a {
    position: relative;
    top: -2px;
}
.bb-comment .comment-list .list-item .info .btn-hover:hover, .comment-bilibili-fold .comment-list .list-item .info .btn-hover:hover {
    color: #00a1d6;
    background: #e5e9ef;
}
.bb-comment .comment-list .list-item .user .name, .comment-bilibili-fold .comment-list .list-item .user .name {
    color: #6d757a;
}
.bb-comment .comment-list .list-item .user>a, .comment-bilibili-fold .comment-list .list-item .user>a {
    vertical-align: middle;
}
.bb-comment a, .comment-bilibili-fold a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.bb-comment .comment-list .list-item .user .text-con, .comment-bilibili-fold .comment-list .list-item .user .text-con {
    padding-left: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
}
.bb-comment .comment-list .list-item .info .operation .opera-list li:hover, .comment-bilibili-fold .comment-list .list-item .info .operation .opera-list li:hover {
    background: #e5e9ef;
    color: #00a1d6;
}
</style>