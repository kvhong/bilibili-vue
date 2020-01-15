<template>
    <div class="page">
        <div class="row page-head clearfix">
            <div class="breadcrumb">
                <p class="item cur">{{mainTitle}}</p>
            </div>
            <div class="v-filter-line clearfix">
                <div class="item style">
                    <span data-style="cube" class="icon cube" :class="listStyle === 'cube' ? 'active' : ''" @click="changeStyle('cube')"></span>
                    <span data-style="list" class="icon list" :class="listStyle === 'list' ? 'active' : ''" @click="changeStyle('list')"></span>
                </div>
            </div>
        </div>
        <p class="v-search-result" style="display: none;">
            共找到关于“
            <span class="v-search-kw"></span>”的
            <em class="v-search-count">0</em> 
            个视频
        </p>
        <div id="submit-video-type-filter" style="display: none;">
            <a class="active">
                全部
                <span class="count">0</span>
            </a>
        </div>
        <div id="submit-video" class="section video" :class="videoList.length === 0 ? 'empty' : ''">
            <div id="video-list-style" class="cube">
                <div id="submit-video-list" class="content">
                    <ul class="list-list" :class="listStyle === 'list' ? '' : 'unshow'">

                    </ul>
                    <ul class="clearfix cube-list" :class="listStyle === 'cube' ? '' : 'unshow'">
                        <BRowItem v-for="item in videoList" :key="item.id" :item="item" :collect="false"></BRowItem>
                    </ul>
                </div>
                <el-pagination layout="total, prev, pager, next"
                            background
                            :current-page="pageNum"
                            :page-size="pageSize"
                            @size-change="handleSizeChange"
                            :total="total"
                            @current-change="handleCurrentChange"
                            style="text-align:center;"
                            :class="videoList.length === 0 ? 'pagination-empty' : ''">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import BRowItem from 'components/contentRow/BRowItem'
import { spaceApi } from 'api'
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            videoList: [],
            mainTitle: '已删除',
            listStyle: 'cube',
            pageNum: 1,
            pageSize: 10,
            total: 3
        }
    },
    components: {
        BRowItem
    },
    methods: {
        getVideo() {
            spaceApi.deletedVideo({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.videoList = response.list
                this.total = response.total
            })
        },
        changeStyle(val) {
            this.listStyle = val
        },
        handleSizeChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.getVideo()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.getVideo()
        }
    },
    mounted() {
        this.getVideo()
    }
}
</script>

<style scoped>
.page {
    min-height: 180px;
}
.page-head {
    position: relative;
}
.breadcrumb {
    line-height: 24px;
    font-size: 0;
    vertical-align: middle;
}
.breadcrumb .item.cur {
    color: #222;
}
.breadcrumb .item {
    display: inline-block;
    font-size: 18px;
    color: #6d757a;
    vertical-align: middle;
}
.page-head .v-filter-line {
    position: absolute;
    top: 0;
    right: 0;
}
#page-video .be-tab {
    float: left;
}
#page-video .be-tab.unshow {
    display: none;
}
.be-tab, .be-tab-item {
    position: relative;
}
.be-tab-item.is-active {
    color: #00a1d6;
}
.be-tab-item {
    float: left;
    font-size: 12px;
    margin-right: 20px;
    line-height: 28px;
    vertical-align: top;
    cursor: pointer;
}
.be-tab-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background: #ff3c3c;
    opacity: 0;
    cursor: pointer;
}
.be-tab-cursor, .be-tab-cursor:after {
    position: absolute;
    bottom: 0;
    height: 0;
    width: 0;
}
.be-tab-cursor {
    left: 0;
    border-bottom: 1px solid #00a1d6;
    transform: translateX(0);
    transition: width .2s ease,transform .2s ease;
}
.page-head .v-filter-line .style {
    margin-top: 6px;
}
.page-head .v-filter-line .item {
    float: left;
    margin-left: 30px;
}
.page-head .v-filter-line .style .cube.active, .page-head .v-filter-line .style .cube:hover {
    background-position: -469px -151px;
}
.page-head .v-filter-line .style .cube {
    background-position: -342px -151px;
    margin-right: 15px;
}
.page-head .v-filter-line .style .icon {
    cursor: pointer;
    display: block;
    float: left;
    width: 18px;
    height: 18px;
}
.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
}
#browser-version-tip #close-browser-tip, .icon {
    display: inline-block;
    background-image: url('../../assets/images/icons1.png');
}
.page-head .v-filter-line .style .list.active, .page-head .v-filter-line .style .list:hover {
    background-position: -469px -217px;
}
.page-head .v-filter-line .style .list {
    background-position: -342px -217px;
}
.v-search-result {
    color: #6d757a;
    margin: 9px 0 -6px;
}
.v-search-kw {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.v-search-count {
    color: #f25d8e;
    font-weight: 700;
}
#page-video #submit-video-type-filter {
    background: #edf2f9;
    border-radius: 4px;
    line-height: 36px;
    margin: 18px 0 10px;
    padding: 0 20px;
}
#page-video #submit-video-type-filter a.active {
    color: #00a1d6;
}
#page-video #submit-video-type-filter a {
    display: inline-block;
    margin-right: 30px;
    cursor: pointer;
}
#page-video #submit-video-type-filter a .count {
    color: #aaa;
    margin-left: 8px;
}
#page-video #submit-video.empty {
    width: 100%;
}
.col-full .section.empty, .col-full .section.private {
    width: 100%!important;
}
.section:last-child {
    border-bottom: none;
    margin-bottom: 0;
}
.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}
#page-video #submit-video .content {
    min-height: 340px;
    margin-bottom: 20px;
}
.section.empty .content, .section.loading .content, .section.private .content {
    width: 100%;
}
.section.empty .content, .section.empty .count, .section.empty .more, .section.empty .style, .section.loading .quantity, .section.loading .style {
    /* display: none; */
    background-image: url('../../assets/images/nodata02.png');
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #6d757a;
    content: "空间主人还没有投过视频哦~~";
    display: block;
    font-size: 14px;
    height: 450px;
    overflow: hidden;
    line-height: 640px;
    text-align: center;
}
.section.empty.video:after {
    color: #6d757a;
    content: "空间主人还没有投过视频哦~~";
    display: block;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    margin-top: -160px;
}
#page-video .cube-list {
    width: 900px;
    margin-top: 20px;
}
#page-video .list-list {
    width: 900px;
    margin-top: 20px;
}
#page-video .cube-list.unshow {
    display: none;
}
#page-video .list-list.unshow {
    display: none;
}
.pagination-empty {
    display: none;
}
</style>