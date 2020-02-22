<template>
    <li class="game-live-item">
        <a :href="'/video/'+item.id" class="video-info new-clickstat" target="_blank">
            <img class="pic" :src="item.picture === '' ? qiniuAddress+item.video_url+'?vframe/png/offset/2' : qiniuAddress+item.picture" :alt="item.video_title" :title="item.video_title">
            <div class="item-mask"></div>
            <i class="btn-link__hover_i"></i>
        </a>
        <a :href="'/video/'+item.id" class="title new-clickstat" :title="item.video_title" target="_blank">{{item.video_title}}</a>
        <span class="txt">
            <span class="avatar fl">
                <img :src="qiniuAddress+item.avatar" :alt="item.author" :title="item.author">
                <i class="nick" :title="item.author">{{item.author}}</i>
            </span>
            <span class="num"><i class="num-icon"></i><i class="js-num">{{item.watches}}</i></span>
        </span>
    </li>
</template>

<script>
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
    }
}
</script>

<style scoped>
.game-live-item {
    width: 240px;
    margin-right: 13px;
    margin-bottom: 20px;
}
.game-live-item:hover {
    box-shadow: 2px 2px 10px #ddd;
}
.game-live-item {
    float: left;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 20px 30px 0;
    padding-bottom: 10px;
    font-size: 12px;
    background: #fff;
    border-radius: 6px;
    backface-visibility: hidden;
}
.game-live-item .video-info {
    height: 135px;
}
.game-live-item .video-info {
    display: block;
    overflow: hidden;
    position: relative;
    width: 100%;
}
.game-live-item a {
    transition: color .2s ease-out;
    text-decoration: none;
}
.game-live-item .video-info .pic {
    overflow: hidden;
    position: relative;
    max-width: none;
    width: 100%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.game-live-item .video-info .item-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all .3s ease-out;
    opacity: 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    filter: alpha(opacity=0);
}
.game-live-item:hover .item-mask {
    opacity: .5;
    background: #000;
    filter: alpha(opacity=50);
}
.game-live-item:hover .video-info .btn-link__hover_i {
    opacity: 1;
    filter: alpha(opacity=100);
    transform: scale(1);
}
.game-live-item .video-info .btn-link__hover_i {
    opacity: 0;
    filter: alpha(opacity=0);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
    background: url(https://a.msstatic.com/huya/main3/widget/game-live-item/img/play-icon_fbf7f.png) no-repeat;
    transform: scale(2);
    backface-visibility: hidden;
    transition: all .25s ease-out;
}
.game-live-item .title {
    display: block;
    overflow: hidden;
    height: 20px;
    margin-top: 8px;
    padding: 0 23px 0 8px;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    line-height: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    color: #333;
    -o-text-overflow: ellipsis;
}
.game-live-item .title:hover {
    text-decoration: none;
    color: #00a1d6;
}
.game-live-item .txt {
    display: block;
    position: relative;
    height: 23px;
    padding: 5px 0 0 5px;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    line-height: 24px;
    color: #999;
}
.game-live-item .avatar {
    overflow: hidden;
    position: absolute;
    left: 7px;
    width: 100%;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
}
.game-live-item .avatar img {
    float: left;
    width: 24px;
    height: 24px;
    border-radius: 50%;
}
.game-live-item .avatar .nick {
    float: left;
    width: 68%;
    margin-left: 5px;
    font-style: normal;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}
.game-live-item .txt .num {
    float: right;
    position: relative;
    padding: 0 8px 0 20px;
    font-size: 12px;
    background: #fff;
}
.game-live-item .txt .num .js-num {
    font-style: normal;
}
.game-live-item .txt .num .num-icon {
    width: 14px;
    height: 14px;
    background: url(https://a.msstatic.com/huya/main3/widget/search-video-list/midea_icon_8b2b7.png) no-repeat;
}
.game-live-item .txt .num .num-icon {
    display: inline-block;
    width: 16px;
    height: 12px;
    margin: 0 4px 0 2px;
    vertical-align: -2px;
    background: url(https://a.msstatic.com/huya/main3/widget/game-live-item/img/people_icon_54347.png);
}

</style>