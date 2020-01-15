<template>
    <div>
        <TopContainer></TopContainer>
        <div id="app">
            <div class="v-wrap" style="width: 988px; padding: 0px;">
                <div class="l-con" style="width: 638px;">
                    <VideoInfo :item="videoInfo"></VideoInfo>
                    <div id="playerWrap" class="player-wrap" style="height: auto;" name="playerWrap">
                        <video controls preload="auto" width="100%" id="videoPlayer" :src="qiniuAddress+videoInfo.video_url">
                        </video>
                    </div>
                    <VideoToolbar :item="videoInfo"></VideoToolbar>
                    <VideoDesc :item="videoInfo"></VideoDesc>
                    <VideoTag :tag="tag.labels"></VideoTag>
                    <VideoComment :videoInfo="videoInfo" :videoId="id" id="comment" name="comment"></VideoComment>
                </div>
                <div class="r-con">
                    <div @mouseenter="isShow = !isShow" @mouseleave="isShow = !isShow">
                        <AuthorInfo :item="videoInfo.author" :follow="follow"></AuthorInfo>
                        <AuthorInfoTool v-on:listenAtt="changeAtt" v-show="isShow" :item="videoInfo.author" :videoInfo="true" :att="false"></AuthorInfoTool>
                    </div>
                    <Relevant :relevant="relevant"></Relevant>
                </div>
                <GoTop></GoTop>
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
import GoTop from 'components/nav/GoTop.vue'
import { videoApi, commonApi } from 'api'
export default {
    data() {
		return {
            qiniuAddress: this.Global,
            relevant: [],
            id: '',
            videoInfo: {},
            tag: {},
            isShow: false,
            follow: false
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
        Relevant,
        GoTop
    },
    methods: {
        changeAtt(val) {
            this.follow = val
        },
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
                console.log(document.getElementById('videoPlayer').duration)
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
        },
        watch() {
			commonApi.watch(this.id).then((response) => {
				if (response !== '') {
					Message.error('错误',response)
				}
			})
		}
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
        this.watch()
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
.relative {
    position: relative;
}
</style>