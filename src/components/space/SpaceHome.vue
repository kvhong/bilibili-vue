<template>
    <div class="s-space" :class="video.length === 0 && fav.length === 0 ? 'all-empty' : video.length !== 0 && fav.length !== 0 ? '' : 'empty'">
        <div>
            <div id="page-index" class="wrapper clearfix">
                <div class="col-1">
                    <SpaceHomeVideo :video="video" :videoNum="videoNum"></SpaceHomeVideo>
                    <SpaceHomeFav :fav="fav" :favNum="favNum"></SpaceHomeFav>
                </div>
                <div class="col-2">
                    <ToVideo></ToVideo>
                    <User></User>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SpaceHomeVideo from 'components/space/SpaceHomeVideo.vue'
import SpaceHomeFav from 'components/space/SpaceHomeFav.vue'
import ToVideo from 'components/space/ToVideo.vue'
import User from 'components/space/User.vue'
import { spaceApi } from 'api'
export default {
    components: {
        SpaceHomeVideo,
        SpaceHomeFav,
        ToVideo,
        User
    },
    data() {
        return {
            userInfo: this.UserInfo,
            video: [],
            fav: [],
            videoNum: 0,
            favNum: 0
        }
    },
    methods: {
        getVideo() {
            spaceApi.spaceVideo({ 'userId': this.userInfo.iD, 'pageNum': 1, 'pageSize': 3 }).then((response) => {
                this.video = response.list
            })
            spaceApi.videoNum(this.userInfo.iD).then((response) => {
                this.videoNum = response
            })
        },
        getFav() {
            spaceApi.spaceFav({ 'userId': this.userInfo.iD, 'pageNum': 1, 'pageSize': 3 }).then((response) => {
                this.fav = response.list
            })
            spaceApi.favNum(this.userInfo.iD).then((response) => {
                this.favNum = response
            })
        }
    },
    mounted() {
        this.getVideo()
        this.getFav()
    }
}
</script>

<style scoped>
.s-space.all-empty {
    min-height: 300px;
}
.s-space {
    min-height: 600px;
}
.s-space.empty {
    min-height: 400px;
}
.clearfix {
    display: block;
}
.wrapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;
}
#page-index .col-1 {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    float: left;
    padding: 15px 20px;
    width: 700px;
}
#page-index .col-2 {
    float: right;
    width: 350px;
}
</style>