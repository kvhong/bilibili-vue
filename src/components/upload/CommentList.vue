<template>
    <div>
        <h3 class="title-message">(点击视频信息即可显示评论区)</h3>
        <div id="submit-video" class="section video" :class="commentList.length === 0 ? 'empty' : ''">
            <div id="video-list-style" class="cube">
                <div id="submit-video-list" class="content">
                    <ul class="clearfix cube-list">
                        <CommentListItem v-for="item in commentList" :key="item.id" :item="item"></CommentListItem>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentListItem from 'components/upload/CommentListItem'
export default {
    props: {
        commentList: {
            type: Array
        }
    },
    components: {
        CommentListItem
    }
}
</script>

<style scoped>
.title-message {
    font-size: 12px;
    color: #6d757a;
}
#submit-video.empty {
    width: 100%;
}
.col-full .section.empty, .col-full .section.private {
    width: 100%!important;
}
.section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}
.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}
#submit-video .content {
    min-height: 340px;
    margin-bottom: 20px;
}
.section.empty .content, .section.loading .content, .section.private .content {
    width: 100%;
}
.section.empty .content, .section.empty .count, .section.empty .more, .section.empty .style, .section.loading .quantity, .section.loading .style {
    /* display: none; */
    background-image: url('../../assets/images/nodata02.png');
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #6d757a;
    content: "你还没有投过一个稿件("+"▔□▔)";
    display: block;
    font-size: 14px;
    height: 450px;
    overflow: hidden;
    line-height: 640px;
    text-align: center;
}
.section.empty.video:after {
    color: #6d757a;
    content: "你还没有投过一个稿件("+"▔□▔)";
    display: block;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    margin-top: -160px;
}
.cube-list {
    width: 900px;
    margin-top: 20px;
}
</style>