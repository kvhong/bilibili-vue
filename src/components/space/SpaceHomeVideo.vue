<template>
    <div class="section video full-rows host">
        <h3 class="section-title">
            <a :href="'/space/'+userInfo.iD+'/video/index'" class="t">我的视频</a>
            <span class="count">{{videoNum}}</span>
            <div :class="video.length !== 0 ? 'sec-empty-hint-host' : 'sec-empty-hint'">
                还没有上传过视频哦~
                <a href="#" target="_blank">
                    立即上传
                </a>
            </div>
        </h3>
        <div class="content clearfix">
            <div class="video-item">
                <ul class="list-list">
                    <BRowItem v-for="item in video" :item="item" :key="item.id"></BRowItem>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BRowItem from 'components/contentRow/BRowItem'
export default {
    data() {
        return {
            userInfo: this.UserInfo
        }
    },
    props: {
        video: {
            type: Array
        },
        videoNum: {
            type: Number
        }
    },
    components: {
        BRowItem
    }
}
</script>

<style scoped>
.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}
.section-title {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
    padding: 0 0 15px;
    position: relative;
}
.section-title .t {
    display: inline-block;
    vertical-align: middle;
}
a:hover {
    color: #00a1d6;
}
a {
    color: inherit;
    text-decoration: none;
    transition: color .2s ease,background-color .2s ease;
}
.section.empty .content, .section.loading .content, .section.private .content {
    width: 100%;
}
.section.empty .content, .section.empty .count, .section.empty .more, .section.empty .style, .section.loading .quantity, .section.loading .style {
    display: none;
}
.section .count {
    background: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 3px;
    color: #777;
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    height: 20px;
    margin-left: 11px;
    padding: 0 5px;
    position: relative;
    vertical-align: middle;
}
.sec-empty-hint-host {
    display: none;
}
.sec-empty-hint {
    color: #99a2aa;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 300px;
}
.sec-empty-hint a:hover {
    color: #f25d8e;
}
.sec-empty-hint a {
    color: #00a1d6;
    margin-left: 10px;
}
#page-index .video.full-rows .content {
    max-height: 900px;
}
#page-index .video .content {
    max-height: 380px;
    overflow: hidden;
}
#page-index .col-1 .section .more {
    background-position: -310px -405px;
}
.section .more {
    background-position: -310px -405px;
    border: 1px solid #b8c0cc;
    border-radius: 4px;
    color: #6d757a;
    font-size: 12px;
    line-height: 22px;
    transition: border .2s ease;
    padding: 0 19px 0 10px;
    top: 6px;
    right: 0;
}
.section .count:before, .section .more {
    background-image: url('../../assets/images/icons1.png');
    position: absolute;
}
.section .count:before {
    background-position: -215px -340px;
    content: "";
    display: block;
    left: -7px;
    top: -3px;
    height: 22px;
    width: 10px;
}
#page-index .video-item {
    position: relative;
    float: left;
    margin: 0 20px 28px 0;
}
</style>