<template>
    <div class="body">
        <TopContainer></TopContainer>
        <div class="container">
            <div id="link-message-container" class="space-left">
                <span class="title">
                    <i class="el-icon-s-promotion"></i>
                    消息中心
                </span>
                <el-tabs tab-position="left" v-model="activeName" style="height: auto;" :stretch="true" @tab-click="to">
                    <el-tab-pane label="回复我的" name="getBack"></el-tab-pane>
                    <el-tab-pane label="关注我的" name="attentionMe"></el-tab-pane>
                    <el-tab-pane label="收到的赞" name="likes"></el-tab-pane>
                    <el-tab-pane label="系统通知" name="systemNot"></el-tab-pane>
                    <el-tab-pane label="我的消息" name="myMessage"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="space-right">
                <Top :title="activeLabel"></Top>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer'
import Top from 'components/message/Top'
export default {
    data() {
        return {
            activeLabel: '回复我的',
            activeName: 'getBack'
        }
    },
    components: {
        TopContainer,
        Top
    },
    watch: {
        '$route': 'getRouter'
    },
    methods: {
        getRouter() {
            let path = this.$route.fullPath
            this.activeName = path.substring(path.lastIndexOf('/')+1)
        },
        to(val) {
            this.activeLabel = val.label
            this.activeName = val.name
            this.$router.push({
                path: '/message/'+this.activeName
            })
        }
    },
    mounted() {
        this.getRouter()
    }
}
</script>

<style scoped>
.body {
    background: url(//s2.hdslb.com/bfs/static/blive/blfe-message-web/static/img/infocenterbg.a1a0d152.jpg) top/cover no-repeat fixed;
    font-size: 12px;
    line-height: 12px;
    color: #666;
    padding: 0;
    margin: 0;
}
.container {
    width: 980px;
    margin: 0 auto;
    padding: 10px 0 60px 0;
    height: 560px;
    max-width: 1143px;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    -webkit-box-align: stretch;
    align-items: stretch;
}
.space-left {
    width: 94px;
    background-color: rgba(255,255,255,0.8);
}
.space-left .title {
    font-size: 16px;
    height: 62px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    color: #333;
}
.space-right {
    width: 880px;
    margin-left: 6px;
    background-color: rgba(255,255,255,0.8);
}
</style>