<template>
    <div id="app">
        <TopContainer></TopContainer>
        <div class="header" style="background-image: url('//i0.hdslb.com/bfs/archive/4f59bf959d51592016e07efe62969c411288826a.png');">
            <div class="header-layer"></div>
            <a class="header-link" target="_blank" href="/" data-loc-id="142" @mouseenter="isShow = !isShow" @mouseout="isShow = !isShow"></a>
            <div class="h-center" @mouseenter="isShow = !isShow" @mouseout="isShow = !isShow">
                <a href="/" class="logo" style="background-image: url('//i0.hdslb.com/bfs/archive/bb2aa0d954bf59d4ee555a8a603fe83888463b6b.png');"></a>
                <div class="banner-title" v-show="isShow">哔哩哔哩 (゜-゜)つロ 干杯~</div>
                <search class="msearch"></search>
            </div>
        </div>
        <div class="topic-main">
            <div class="title">
                <div class="topic-title">
                    <span class="b-topic-i"></span>
                    <span class="b-topic-t">专题列表</span>
                </div>
                <div class="act-list">
                    <ul>
                        <Item v-for="item in list" :key="item.id" :item="item"></Item>
                    </ul>
                    <el-pagination layout="total, prev, pager, next"
                                background
                                :current-page="pageNum"
                                :page-size="pageSize"
                                @size-change="handleSizeChange"
                                :total="total"
                                @current-change="handleCurrentChange"
                                style="text-align:center;">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import BHeader from 'components/common/BHeader.vue'
import Item from 'components/banner/Item'
import { bannerApi } from 'api'
export default {
    data() {
        return {
            list: [],
            pageNum: 1,
            pageSize: 10,
            total: 0
        }
    },
    components: {
        TopContainer,
        BHeader,
        Item
    },
    methods: {
        getData() {
            bannerApi.bannerList({ 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.list = response.list
                this.total = response.total
            })
        },
        handleSizeChange(val) {
            this.pageNum = VRDisplay
            this.getData()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getData()
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>
#app {
    font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 12px;
    margin: 0;
    padding: 0;
    background: #fff;
    color: #222;
    min-width: 990px;
    tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
}
.header {
    background: transparent no-repeat center -10px;
    position: relative;
    margin: -42px auto 0;
}
.header .header-layer {
    height: 170px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
}
.header .header-link {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 170px;
    z-index: 10;
}
.header .h-center {
    width: 960px;
    margin: 0 auto;
    position: relative;
    height: 170px;
    transition: .2s height;
}
.header .h-center .logo {
    position: absolute;
    width: 220px;
    height: 105px;
    left: 24px;
    top: 55px;
    background: transparent no-repeat left center;
    z-index: 100;
}
.header .h-center .banner-title {
    position: absolute;
    top: 114px;
    left: 255px;
    line-height: 20px;
    padding: 6px 10px;
    background-color: rgba(0, 0, 0, 0.68);
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    max-width: 350px;
    transition: .2s;
}
.topic-main {
    width: 980px;
}
.topic-main {
    margin: 0 auto;
    padding: 20px 0 0;
    position: relative;
}
.topic-main .topic-title {
    padding-bottom: 20px;
}
.topic-main .topic-title .b-topic-i {
    width: 25px;
    height: 25px;
    background: url('../../assets/images/icons.png') -83px -1365px no-repeat;
    display: inline-block;
    vertical-align: middle;
    border-radius: 0;
    margin-right: 10px;
}
.topic-main .topic-title .b-topic-t {
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    line-height: 14px;
    color: #222;
}
.topic-main .act-list {
    overflow: hidden;
}
</style>