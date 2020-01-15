<template>
    <div>
        <TopContainer></TopContainer>
        <div class="home">
            <div class="head">
                <el-form class="search-container">
                    <el-form-item>
                        <div class="logo"></div>
                        <el-input placeholder="搜索你想要的内容" v-model.trim="keyWord" class="input-with-select">
                            <el-button slot="append" @click="search">搜索</el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="search-header">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
                    <el-tab-pane name="all">
                        <span slot="label" class="tab-item">综合</span>
                        <div class="find-result">找到 <em>{{searchWord}}</em> 相关内容共<em>{{total}}</em>个</div>
                        <div class="main-content">
                            <div class="main-box">
                                <div class="box-hd">
                                    <h3 class="title">相关用户</h3>
                                    <el-link class="search-more" @click="to('user')">查看全部 &gt;</el-link>
                                </div>
                                <div class="box-bd">
                                    <ul class="list">
                                        <UserItem v-for="item in userList.list" :key="item.id" :item="item"></UserItem>
                                    </ul>
                                </div>
                            </div>
                            <div class="main-box">
                                <div class="box-hd">
                                    <h3 class="title">相关视频</h3>
                                    <el-link class="search-more" @click="to('video')">查看全部 &gt;</el-link>
                                </div>
                                <div class="box-bd">
                                    <ul class="video-list">
                                        <VideoItem v-for="item in byUserName.list" :key="item.id" :item="item"></VideoItem>
                                        <VideoItem v-for="item in byVideoInfo.list" :key="item.id" :item="item"></VideoItem>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="video">
                        <span slot="label" class="tab-item">视频</span>
                        <div class="find-result">找到 <em>{{searchWord}}</em> 相关内容共<em>{{videoTotal}}</em>个</div>
                        <div class="main-content">
                            <div class="main-box">
                                <div class="box-bd">
                                    <ul class="video-list">
                                        <VideoItem v-for="item in byUserName.list" :key="item.id" :item="item"></VideoItem>
                                        <VideoItem v-for="item in byVideoInfo.list" :key="item.id" :item="item"></VideoItem>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="user">
                        <span slot="label" class="tab-item">用户</span>
                        <div class="find-result">找到 <em>{{searchWord}}</em> 相关内容共<em>{{userTotal}}</em>个</div>
                        <div class="main-content">
                            <div class="main-box">
                                <div class="box-bd">
                                    <ul class="list">
                                        <UserItem v-for="item in userList.list" :key="item.id" :item="item"></UserItem>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <el-pagination layout="total, prev, pager, next"
                            background
                            :current-page="pageNum"
                            :page-size="activeName === 'user' ? 8 : 16"
                            @size-change="handleSizeChange"
                            :total="activeName === 'user' ? userTotal : videoTotal"
                            @current-change="handleCurrentChange"
                            style="text-align:center;"
                            v-show="(activeName === 'user' && userList.list.length > 0) || (activeName === 'video' && (byUserName.list.length > 0 || byVideoInfo.list.length > 0))">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer'
import UserItem from 'components/search/UserItem'
import VideoItem from 'components/search/VideoItem'
import { homeApi } from 'api'
export default {
    data() {
        return {
            keyWord: '',
            searchWord: '',
            activeName: 'all',
            pageNum: 1,
            pageSize: 8,
            total: 0,
            userTotal: 0,
            videoTotal: 0,
            userList: {
                list:[
                ]
            },
            byUserName: {
                list: [
                ]
            },
            byVideoInfo: {
                list: [
                ]
            },
        }
    },
    components: {
        TopContainer,
        UserItem,
        VideoItem
    },
    watch: {
        '$route': 'getQuery'
    },
    methods: {
        getQuery() {
            this.keyWord = this.$route.query.keyWord
            this.searchWord = this.keyWord
            this.getAllData()
        },
        search() {
            this.$router.push({
                path: '/search/index',
                query: {
                    keyWord: this.keyWord
                }
            })
        },
        handleClick(tab, event) {
            this.pageNum = 1
            this.getData()
        },
        getData() {
            switch (this.activeName) {
                case 'all':
                    this.getAllData()
                    break;
                case 'user':
                    this.getUserData()
                    break;
                case 'video':
                    this.getVideoData()
                    break;
            }
        },
        getAllData() {
            homeApi.search({ 'keyWord': this.keyWord, 'pageNum': this.pageNum, 'pageSize': 4 }).then((response) => {
                this.userList = response.User
                this.byUserName = response.byUserName
                this.byVideoInfo = response.byVideoInfo
                this.userTotal = this.userList.total
                this.videoTotal = this.byUserName.total + this.byVideoInfo.total
                this.total = this.userTotal + this.videoTotal
            })
        },
        getUserData() {
            homeApi.searchUser({ 'keyWord': this.keyWord, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.userList = response
                this.userTotal = this.userList.total
            })
        },
        getVideoData() {
            homeApi.searchVideo({ 'keyWord': this.keyWord, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.byUserName = response.byUserName
                this.byVideoInfo = response.byVideoInfo
                this.videoTotal = this.byUserName.total + this.byVideoInfo.total
            })
        },
        to(val) {
            this.activeName = val
            this.pageNum = 1
            this.getData()
        },
        handleSizeChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.getData()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.getData()
        }
    },
    mounted() {
        this.getQuery()
    }
}
</script>

<style scoped>
.home {
    width: 1040px;
    margin: 0 auto;
    height: auto;
}
.home .head {
    padding: 40px 0 40px 0;
}
.home .head .search-container {
    height: 44px;
    margin: 0 auto;
    position: relative;
    width: 587px;
}
.home .logo {
    background-image: url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/sprite-690be8a6ea.png);
    background-position: -261px -72px;
    width: 131px;
    height: 35px;
    float: left;
    margin-top: 7px;
}
.input-with-select {
    width: 430px;
    float: left;
    margin-left: 26px;
}
.tabs {
  margin-left: 20px;
}
.tab-item {
  font-size: 16px;
}
.find-result {
    margin: 0 0 35px;
    color: #666;
    font-size: 14px;
}
.find-result em {
    color: #00a1d6;
    padding: 0 3px;
    font-weight: 700;
    font-family: "Microsoft YaHei";
    font-style: normal;
}
.main-content {
    margin-bottom: 60px;
}
.main-content .main-box {
    margin-bottom: 20px;
    border-bottom: 2px solid rgb(221, 221, 221);
}
.main-content .main-box .box-hd {
    height: 25px;
    margin-bottom: 15px;
    line-height: 25px;
}
.main-content .main-box .box-hd .title {
    float: left;
    padding-bottom: 5px;
    font-size: 24px;
    color: #666;
}
.main-content .main-box .box-hd .search-more {
    float: right;
    margin-top: 5px;
    font-size: 12px;
    color: #666;
}
.list {
    overflow: hidden;
    position: relative;
    max-height: 195px;
    margin: 0 -50px 5px 0;
}
.video-list {
    overflow: hidden;
    max-height: 430px;
    margin: 0 -20px 30px 0;
}
</style>