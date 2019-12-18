<template>
    <div class="s-space">
        <div>
            <div id="page-video" class="wrapper">
                <div class="col-full clearfix">
                    <div class="contribution-sidenav">
                        <div class="nav-container playlist-container">
                            <div class="contribution-list-container">
                                <ul class="contribution-list">
                                    <li class="contribution-item" :class="active === 'index' ? 'cur' : ''">
                                        <a :href="'/space/'+userInfo.iD+'/video/index'" class="text">视频</a>
                                        <span class="num">{{videoTotal}}</span>
                                    </li>
                                    <li class="contribution-item" :class="active === 'underReview' ? 'cur' : ''">
                                        <a :href="'/space/'+userInfo.iD+'/video/underReview'" class="text">审核中</a>
                                        <span class="num">{{underReviewTotal}}</span>
                                    </li>
                                    <li class="contribution-item" :class="active === 'deletedVideo' ? 'cur' : ''">
                                        <a :href="'/space/'+userInfo.iD+'/video/deletedVideo'" class="text">已删除</a>
                                        <span class="num">{{deletedTotal}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="main-content">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            active: 'index',
            videoTotal: 0,
            underReviewTotal: 0,
            deletedTotal: 0
        }
    },
    methods: {
        getParams() {
            this.active = this.$route.fullPath.split('/')[4]
        },
        getTotal() {
            spaceApi.videoNum(this.userInfo.iD).then((response) => {
                this.videoTotal = response
            })
            spaceApi.underReviewNum(this.userInfo.iD).then((response) => {
                this.videoTotal = response
            })
            spaceApi.deletedNum(this.userInfo.iD).then((response) => {
                this.videoTotal = response
            })
        }
    },
    watch: {
        '$route': 'getParams'
    },
    mounted() {
        this.getParams()
    }
}
</script>

<style scoped>
.wrapper {
    width: 1100px;
    min-height: 500px;
    margin: 0 auto;
    position: relative;
}
#page-video .col-full {
    padding: 0;
}
.col-full {
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 4px;
    padding: 20px;
}
.clearfix {
    display: block;
}
.contribution-sidenav {
    position: relative;
    float: left;
    width: 180px;
    margin-right: -1px;
    font-size: 14px;
    color: #222;
    border-right: 1px solid #eee;
    box-sizing: border-box;
}
.contribution-sidenav .contribution-list-container {
    position: relative;
    max-height: 420px;
    margin: 10px 0 20px;
    overflow: hidden;
}
.contribution-sidenav .contribution-item.cur {
    background-color: #00a1d6;
}
.contribution-sidenav .contribution-item {
    position: relative;
    padding-left: 30px;
    transition: background-color .3s ease;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
}
.contribution-sidenav .contribution-item.cur .num, .contribution-sidenav .contribution-item.cur .text {
    color: #fff;
}
.contribution-sidenav .text {
    display: inline-block;
    line-height: 44px;
    width: 100px;
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.contribution-sidenav .num {
    display: inline-block;
    width: 32px;
    font-size: 12px;
    color: #99a2aa;
    vertical-align: middle;
    text-align: center;
    font-family: Arial;
}
.contribution-sidenav~.main-content {
    float: left;
    width: 921px;
    padding: 20px;
    min-height: 180px;
    box-sizing: border-box;
    border-left: 1px solid #eee;
}
</style>