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
                        <Comment :item="videoInfo" :commentType="'0'"></Comment>
                        <div class="comment-list">
                            <VideoCommentItem v-for="item in comment" :key="item.id" :item="item" :videoId="videoId" :authorId="videoInfo.author_id"></VideoCommentItem>
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
import Comment from 'components/video/Comment.vue'
import { videoApi } from 'api'
export default {
    data() {
        return {
            // qiniuAddress: this.Global,
            // userInfo: getToken(),
            // userInfoPicture: '../../assets/images/noface.gif',
            comment: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            
        }
    },
    components: {
        VideoCommentItem,
        Comment
    },
    props: {
        videoId: {
            type: String
        },
        videoInfo: {
            type: Object
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
            this.getComment()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getComment()
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