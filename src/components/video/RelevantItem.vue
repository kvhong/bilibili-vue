<template>
    <div class="card-box">
        <div class="pic-box">
            <div class="pic">
                <a :href="'/video/'+item.id" target="_blank" @click="watch">
                    <img :src="item.picture === '' ? qiniuAddress+item.video_url+'?vframe/png/offset/2' : qiniuAddress+item.picture" :alt="item.video_title" width="168" height="95">
                </a>
                <span class="mask-video"></span>
                <span class="duration">{{item.duration}}</span><!-- 视频时间 -->
            </div>
            <div class="watch-later-video van-watchlater">
                <span class="wl-tips" style="display:none;"></span>
            </div>
        </div>
        <div class="info">
            <a :href="'/video/'+item.id" :title="item.video_title" class="title" @click="watch">
                {{item.video_title}}
            </a>
            <div class="count up">
                <a :href="'/ospace/index?id='+item.author_id" target="_blank">{{item.author}}</a>
            </div>
            <div class="count">                          
                {{item.watches}}播放
            </div>
        </div>
    </div>
</template>

<script>
import { commonApi } from 'api'
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
        watch() {
			commonApi.watch(this.item.id)
		}
    }
}
</script>

<style scoped>
.video-page-card .card-box {
    display: -ms-flexbox;
    display: flex;
}
.video-page-card .card-box .pic-box {
    position: relative;
    width: 141px;
    height: 80px;
    border-radius: 2px;
    background: #f4f5f7;
}
.video-page-card .card-box .pic-box .pic {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    width: 141px;
    height: 80px;
}
.video-page-card .card-box .pic-box .pic img {
    width: 141px;
    height: 80px;
}
.video-page-card .card-box .pic-box .mask-video {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    transition: opacity .3s;
    pointer-events: none;
}
.video-page-card .card-box .pic-box .duration {
    opacity: 0;
    position: absolute;
    bottom: 2px;
    left: 6px;
    color: #fff;
    height: 12px;
    line-height: 12px;
    padding: 0 5px 1px 0;
    transition: all .3s;
    z-index: 5;
}
.video-page-card .card-box .pic-box:hover .duration, .video-page-card .card-box .pic-box:hover .mask-video {
    opacity: 1;
}
.video-page-card .card-box .pic-box .watch-later-video {
    transition: opacity .3s;
    opacity: 0;
}
.van-watchlater {
    position: absolute;
    z-index: 20;
    width: 22px;
    height: 22px;
    right: 8px;
    bottom: 8px;
    cursor: pointer;
    background-size: contain;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABT0lEQ…HyYYxBKXU9+p5Grybg4m1Hk9Bar4Ee4JC0JWeixOhprdffE/1yRW/TLMYAAAAASUVORK5CYII=);
}
.van-watchlater .wl-tips {
    position: absolute;
    font-size: 12px;
    color: #fff;
    border-radius: 4px;
    line-height: 18px;
    padding: 4px 8px;
    background-color: #000;
    background: rgba(0,0,0,.8);
    white-space: nowrap;
    top: -30px;
}
.video-page-card .card-box .info {
    margin-left: 10px;
    -ms-flex: 1;
    flex: 1;
    font-size: 0;
}
.video-page-card .card-box .info .title {
    height: 36px;
    line-height: 18px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
}
.video-page-card .card-box .info .title:hover {
    color: #00a1d6
}
.video-page-card .card-box .info .count.up {
    width: 160px;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.video-page-card .card-box .info .count {
    display: inline-block;
    height: 16px;
    width: 100%;
    color: #999;
    font-size: 12px;
}
.video-page-card .card-box .info .count a {
    color: #999;
}
.video-page-card .card-box .info .count {
    display: inline-block;
    height: 16px;
    width: 100%;
    color: #999;
    font-size: 12px;
}
</style>