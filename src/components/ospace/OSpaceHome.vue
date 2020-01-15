<template>
    <div class="s-space" :class="video.length === 0 && fav.length === 0 ? 'all-empty' : video.length !== 0 && fav.length !== 0 ? '' : 'empty'">
        <div>
            <div id="page-index" class="wrapper clearfix">
                <div class="col-1">
                    <OSpaceHomeVideo :userId="userId" :video="video" :videoNum="videoNum"></OSpaceHomeVideo>
                    <OSpaceHomeFav :userId="userId" :fav="fav" :favNum="favNum" v-show="userInfo.collect_state === 0"></OSpaceHomeFav>
                </div>
                <div class="col-2">
                    <OUser :userInfo="userInfo"></OUser>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OSpaceHomeVideo from 'components/ospace/OSpaceHomeVideo.vue'
import OSpaceHomeFav from 'components/ospace/OSpaceHomeFav.vue'
import OUser from 'components/ospace/OUser.vue'
import { spaceApi } from 'api'
export default {
    components: {
        OSpaceHomeVideo,
        OSpaceHomeFav,
        OUser
    },
    data() {
        return {
            userId: '',
            userInfo: '',
            video: [],
            fav: [],
            videoNum: 0,
            favNum: 0
        }
    },
    watch: {
        '$route': 'getQuery'
    },
    methods: {
        getQuery() {
            this.userId = this.$route.query.id
            this.getInfo()
            this.getVideo()
            this.getFav()
        },
        getInfo() {
            spaceApi.getInfo(this.userId).then((response) => {
                this.userInfo = response
            })
        },
        getVideo() {
            spaceApi.spaceVideo({ 'userId': this.userInfo.id, 'pageNum': 1, 'pageSize': 3 }).then((response) => {
                this.video = response.list
            })
            spaceApi.videoNum(this.userInfo.id).then((response) => {
                this.videoNum = response
            })
        },
        getFav() {
            spaceApi.spaceFav({ 'userId': this.userInfo.id, 'pageNum': 1, 'pageSize': 3 }).then((response) => {
                this.fav = response.list
            })
            spaceApi.favNum(this.userInfo.id).then((response) => {
                this.favNum = response
            })
        }
    },
    mounted() {
        this.getQuery()
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