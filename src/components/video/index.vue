<template>
    <div>
        <TopContainer></TopContainer>
        <div id="app">
            <div class="v-wrap" style="width: 988px; padding: 0px;">
                <div class="l-con" style="width: 638px;">
                    <VideoInfo :item="videoInfo"></VideoInfo>
                    <div id="playerWrap" class="player-wrap" style="height: auto;">
                        <div id="bofqi" style="width: 638px; height: 493px; position: static;">
                            <div class="player" style="width:100%;height:100%;">
                                <div id="bilibiliPlayer" class="bilibili-player relative bilibili-player-no-cursor" data-login="true">
                                    <div class="bilibili-player-area video-state-pause video-control-show video-state-blackside">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <VideoToolbar :item="videoInfo"></VideoToolbar>
                    <VideoDesc :item="videoInfo"></VideoDesc>
                    <VideoTag :tag="tag.labels"></VideoTag>
                    <VideoComment :videoId="id"></VideoComment>
                </div>
                <div class="r-con" @mouseenter="isShow = !isShow" @mouseleave="isShow = !isShow">
                    <AuthorInfo :item="videoInfo.author"></AuthorInfo>
                    <Relevant :relevant="relevant"></Relevant>
                    <AuthorInfoTool v-show="isShow" :item="videoInfo.author"></AuthorInfoTool>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import VideoInfo from 'components/video/VideoInfo.vue'
import VideoToolbar from 'components/video/VideoToolbar.vue'
import VideoDesc from 'components/video/VideoDesc.vue'
import VideoTag from 'components/video/VideoTag.vue'
import VideoComment from 'components/video/VideoComment.vue'
import AuthorInfoTool from 'components/video/AuthorInfoTool.vue'
import AuthorInfo from 'components/video/AuthorInfo.vue'
import Relevant from 'components/video/Relevant.vue'

import { videoApi } from 'api'
export default {
    data() {
		return {
            relevant: [],
            id: '',
            videoInfo: {},
            tag: {},
            isShow: false
		}
    },
    components: {
        TopContainer,
        VideoInfo,
        VideoToolbar,
        VideoDesc,
        VideoTag,
        VideoComment,
        AuthorInfoTool,
        AuthorInfo,
        Relevant
    },
    methods: {
        getParams() {
            this.id = this.$route.params.id
            this.fetchData()
        },
        fetchData() {
            this.getVideoInfo()
            this.getTag()
            this.getRelevant()
        },
        getVideoInfo() {
            videoApi.videoInfo(this.id).then((response) => {
                this.videoInfo = response
            })
        },
        getTag() {
            videoApi.tag(this.id).then((response) => {
                this.tag = response
            })
        },
        getRelevant() {
            videoApi.relevant({ 'limit': '5', 'labels': this.tag.labels }).then((response) => {
                this.relevant = response
            })
        }
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
        this.getParams()
    }
}
</script>

<style scoped>
.v-wrap {
    max-width: 1660px;
    min-width: 988px;
    margin: 20px auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.v-wrap .r-con {
    width: 320px;
    -ms-flex: none;
    flex: none;
    margin-left: 30px;
}
#bofqi {
    z-index: 10;
}
#bofqi .player {
    height: 100%;
}
#bofqi .player {
    height: 100%;
}
.relative {
    position: relative;
}
.relative {
    position: relative;
}
.bilibili-player {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 auto;
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: left;
    -webkit-box-shadow: 0 0 8px #e5e9ef;
    box-shadow: 0 0 8px #e5e9ef;
    white-space: nowrap;
    zoom: 1;
}
.bilibili-player {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif;
    line-height: 1;
}
.bilibili-player .bilibili-player-area {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    pointer-events: auto;
}
</style>