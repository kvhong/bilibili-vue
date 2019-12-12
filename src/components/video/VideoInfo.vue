<template>
    <div>  
        <div id="viewbox_report" class="video-info report-wrap-module report-scroll-module" scrollshow="true">
            <h1 :title="item.video_title" class="video-title">
                <span class="tit tr-fix">{{item.video_title}}</span>
            </h1>
            <div class="video-data">
                <span class="a-crumbs">
                    <a target="_blank" :href="'/par/'+item.partition_name+'/'+item.partition_id">{{item.partition_name}}</a>
                    <i class="van-icon-general_enter_s"></i>
                </span>
                <span>{{item.created_date}}</span>
            </div>
            <div class="video-data">
                <span :title="'总播放数'+item.watches" class="view">{{item.watches}}播放</span>
                <span class="copyright">
                    <i class="van-icon-info_prohibit"></i>
                    未经作者授权，禁止转载
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style scoped>
.v-wrap .video-info {
    margin-top: 30px;
    margin-bottom: 16px;
}
.video-info .video-title {
    font-size: 18px;
    font-weight: 500;
    color: #212121;
    line-height: 26px;
    height: 26px;
    padding-left: 10px;
    margin-bottom: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.video-info .video-title .tr-fix {
    margin-left: -.5em;
}
.video-info .video-title .tit {
    vertical-align: middle;
}
.video-info .video-data {
    margin-top: 11px;
    font-size: 12px;
    height: 16px;
    color: #999;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.video-info .video-data .a-crumbs {
    margin-right: 16px;
}
.video-info .video-data span {
    display: inline-block;
    height: 16px;
}
.video-info .video-data .a-crumbs a {
    color: #999;
}
.video-info .video-data .a-crumbs a:hover {
    color: #00a1d6
}
[class^=van-icon-] {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.video-info .video-data .copyright {
    margin-left: 16px;
    display: inline-block;
    font-size: 12px;
    line-height: 15px;
}
.video-info .video-data .copyright i {
    font-size: 16px;
    margin-top: -5px;
    margin-right: 2px;
    color: #fd676f;
    width: 16px;
    height: 22px;
    vertical-align: top;
}
.video-info .video-data .copyright .van-icon-info_prohibit {
    background: url(../../assets/images/icons.png) no-repeat;
    background-position: -662px -792px;
}
[class^=van-icon-] {
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>