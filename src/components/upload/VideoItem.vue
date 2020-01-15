<template>
    <li class="list-item">
        <a class="pic" :href="'/video/'+item.id" target="_blank">
            <img :src="qiniuAddress+item.picture">
        </a>
        <div class="content">
            <div class="title">
                {{item.video_title}}
            </div>
            <div class="time">
                {{item.created_date}}
            </div>
            <div class="data">
                <span class="data-item" title="观看数">
                    <i class="el-icon-view"></i>
                    {{item.watches}}
                </span>
                <span class="data-item" title="点赞数">
                    <i class="el-icon-thumb"></i>
                    {{item.likes}}
                </span>
                <span class="data-item" title="收藏数">
                    <i class="el-icon-star-off"></i>
                    {{item.collections}}
                </span>
                <span class="data-item" title="评论数">
                    <i class="el-icon-tickets"></i>
                    {{item.comment}}
                </span>
            </div>
        </div>
        <div class="button">
            <div v-show="item.type === 1">
                <el-button type="primary" size="small" @click="to">编辑</el-button>
                <el-popconfirm
				title="确定删除吗？">
                    <el-button slot="reference" size="small" @click="deleteVideo">删除</el-button>
                </el-popconfirm>
                <el-popover
                placement="bottom"
                width="150px"
                trigger="hover">
                    <div class="i-frame-message">
                        <a class="im-list" @click="to">
                            <i class="el-icon-edit"></i>
                            视频编辑
                        </a>
                        <a class="im-list" @click="collect" v-show="!state">
                            <i class="el-icon-star-off"></i>
                            添加收藏
                        </a>
                        <a :href="'/upload/commentManage?keyWord='+item.video_title" target="_blank" class="im-list">
                            <i class="el-icon-tickets"></i>
                            评论管理
                        </a>
                    </div>
                    <i class="el-icon-more" slot="reference"></i>
                </el-popover>
            </div>
            <div v-show="item.type === 0">
                <el-button type="primary" size="small" @click="to">编辑</el-button>
                <el-popconfirm
				title="确定取消吗？">
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-popconfirm>
            </div>
            <div v-show="item.type === 2">
                <el-popover
                placement="top"
                width="150px"
                :content="item.reason"
                trigger="hover">
                    <el-button size="small" slot="reference">查看原因</el-button>
                </el-popover>
                <el-button size="small" @click="toUpload">重新上传</el-button>
            </div>
        </div>
    </li>
</template>

<script>
import { videoApi, spaceApi, uploadApi } from 'api'
import { Message } from 'element-ui'
export default {
    inject: ['reload'],
    data() {
        return {
            userInfo: this.UserInfo,
            qiniuAddress: this.Global,
            state: Boolean
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        to() {
            this.$router.push({
				path: '/upload/videoEdit',
				query: {
                    videoInfo: this.item
                }
			})
        },
        toUpload() {
            this.$router.push({
                path: '/upload/uploadVideo'
            })
        },
        deleteVideo() {
            uploadApi.deleteVideo({ 'videoId': this.item.id, 'userId': this.userInfo.iD }).then((response) => {
                if (response === '') {
                    Message.success('删除成功')
                    this.reload()
                } else {
                    Message.error('错误',response)
                }
            })
        },
        cancel() {
            uploadApi.cancelUpload({ 'videoId': this.item.id, 'userId': this.userInfo.iD, 'reason': '自主取消' }).then((response) => {
                if (response === '') {
                    Message.success('取消成功')
                    this.reload()
                } else {
                    Message.error('错误',response)
                }
            })
        },
        collect() {
            videoApi.videoCollect({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
                if (response === '') {
                    this.state = true
                    Message.success('收藏成功')
                } else {
                    Message.error('错误',response)
                }
            })
        },
        getCollectState() {
			spaceApi.collectState({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
				this.state = response
			})
        }
    },
    mounted() {
        this.getCollectState()
    }
}
</script>

<style scoped>
.list-item {
    display: inline-flex;
    width: 92%;
    height: 150px;
    border: 1px solid rgb(209, 209, 209);
    border-radius: 8px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
}
.pic {
    margin: 15px 20px;
}
.pic img {
    width: 180px;
    height: 120px;
}
.content {
    width: 50%;
    padding: 15px 0;
    position: relative;
}
.content .title {
    margin: 15px 20px 20px 30px;
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    font-family: "Microsoft YaHei";
}
.content .time {
    margin: 30px 0 0 30px;
    font-size: 14px;
    color: #99a2aa;
}
.data {
    margin: 0 0 15px 20px;
    position: absolute;
    bottom: 0;
}
.data-item {
    font-size: 14px;
    color: #99a2aa;
    font-family: "Microsoft YaHei";
    margin: 0 10px;
}
.button {
    margin-left: 10px;
    position: absolute;
    top: 40%;
    right: 4%;
}
.el-icon-more {
    margin-left: 15px;
}
.i-frame-message .im-list {
    position: relative;
    display: block;
    padding: 6px;
    color: black;
    border-bottom: 2px solid #eee;
    padding-left: 14px;
    margin-left: 10px;
}
.i-frame-message .im-list:hover {
    color: #00a1d6;
		background-color: #f4f4f4 !important
}
</style>