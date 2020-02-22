<template>
    <li>
        <el-popover
        placement="bottom"
        width="600"
        trigger="click">
            <div class="comment-content" :class="item.commentList.length <= 0 ? 'empty' : ''">
                <a :href="'/video/'+item.videoInfo.id" target="_blank" class="to" @click="watch">
                    <span>去评论</span>
                </a>
                <div class="nodata" v-show="item.commentList.length <= 0">
                    <span>暂无评论</span>
                </div>
                <CommentItem v-for="item in item.commentList" :item="item" :key="item.id"></CommentItem>
            </div>
            <div class="video-info" slot="reference">
                <div class="title">
                    {{item.videoInfo.video_title}}
                </div>
                <div class="describe">
                    {{item.videoInfo.describe}}
                </div>
                <div class="data">
                    <span class="data-item" title="观看数">
                        <i class="el-icon-view"></i>
                        {{item.videoInfo.watches}}
                    </span>
                    <span class="data-item" title="点赞数">
                        <i class="el-icon-thumb"></i>
                        {{item.videoInfo.likes}}
                    </span>
                    <span class="data-item" title="收藏数">
                        <i class="el-icon-star-off"></i>
                        {{item.videoInfo.collections}}
                    </span>
                    <span class="data-item" title="评论数">
                        <i class="el-icon-tickets"></i>
                        {{item.videoInfo.comment}}
                    </span>
                </div>
            </div>
        </el-popover>
    </li>
</template>

<script>
import CommentItem from 'components/upload/CommentItem'
import { commonApi } from 'api'
export default {
    props: {
        item: {
            type: Object
        }
    },
    components: {
        CommentItem
    },
    methods: {
        watch() {
			commonApi.watch(this.item.videoInfo.id)
		}
    }
}
</script>

<style scoped>
.video-info {
    height: 120px;
    border: 2px solid rgb(209, 209, 209);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: relative;
    margin-bottom: 20px;
}
.video-info .title {
    margin: 15px 20px 20px 30px;
    font-size: 20px;
    font-weight: bold;
    word-wrap: break-word;
    font-family: "Microsoft YaHei";
}
.video-info .describe {
    margin: 0 0 15px 20px;
    font-size: 14px;
    color: #99a2aa;
    position: absolute;
    bottom: 0;
    width: 70%;
    height: 40px;
    word-wrap: break-word;
    overflow: hidden;
}
.video-info .data {
    margin: 0 0 15px 20px;
    position: absolute;
    bottom: 0;
    right: 20px;
}
.video-info .data-item {
    font-size: 14px;
    color: #99a2aa;
    font-family: "Microsoft YaHei";
    margin: 0 10px;
}
.comment-content {
    height: 400px;
    overflow: auto;
}
.comment-content.empty {
    height: auto;
}
.nodata {
    margin: 20px;
}
.to {
    margin: 10px;
}
.to:hover {
    color: #00a1d6;
}
</style>