<template>
    <div class="app">
        <TopContainer></TopContainer>
        <div class="header" style="background-image: url('//i0.hdslb.com/bfs/archive/4f59bf959d51592016e07efe62969c411288826a.png');">
            <div class="header-layer"></div>
            <a class="header-link" target="_blank" href="/" data-loc-id="142" @mouseenter="isShow = !isShow" @mouseout="isShow = !isShow"></a>
            <div class="h-center" @mouseenter="isShow = !isShow" @mouseout="isShow = !isShow">
                <a href="/" class="logo" style="background-image: url('//i0.hdslb.com/bfs/archive/bb2aa0d954bf59d4ee555a8a603fe83888463b6b.png');"></a>
                <div class="banner-title" v-show="isShow">哔哩哔哩 (゜-゜)つロ 干杯~</div>
            </div>
        </div>
        <div class="main-inner">
            <div class="rank-container">
                <div class="rank-body">
                    <div class="rank-tab-wrap">
                        <ul class="rank-tab">
                            <li v-for="item in partitions" :key="item.id" @click="choose(item.id)" :class="actveId === item.id ? 'active' : ''">
                                {{item.partition_name}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="rank-list-head">
                <div class="rank_tips">
                    <i class="b-icon-tip"></i>
                    <span class="tip-txt">统计所有投稿数据的综合得分，每日更新一次</span>
                </div>
            </div>
            <div class="rank-content">
                <ul>
                    <HotItem v-for="(item, index) in rank" :key="item.id" :item="item" :index="index+1"></HotItem>
                </ul>
            </div>
        </div>
        <GoTop></GoTop>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer'
import HotItem from 'components/hot/HotItem'
import GoTop from 'components/nav/GoTop'
import { commonApi, contentrankApi, rankApi } from 'api'
export default {
    data() {
		return {
            isShow: false,
            actveId: 'all',
            partitions: [
            ],
            rank: [
            ]
		}
	},
    components: {
        TopContainer,
        HotItem,
        GoTop
    },
    methods: {
        getPartition() {
            const home = { id: 'all', partition_name: '总排行' }
            commonApi.getPartition().then((response) => {
                const list = response
				this.partitions.push(home)
				for (let index = 0; index < list.length; index++) {
					this.partitions.push(list[index])
				}
            })
        },
        getHot(partitionId) {
            contentrankApi.contentrank({ 'top': 20, 'partitionId': partitionId }).then((response) => {
                this.rank = response
            })
        },
        getAll() {
            rankApi.ranking({ 'top': 20, 'time': 1 }).then((response) => {
                this.rank = response
            })
        },
        choose(id) {
            this.actveId = id
            if (id === 'all') {
                this.getAll()
            } else {
                this.getHot(id)
            }
        }
    },
    mounted() {
        this.getPartition()
        this.getAll()
    }
}
</script>

<style scoped>
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
.main-inner {
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.main-inner .rank-container {
    border: 0;
    margin: 20px 0;
    border-radius: 4px;
}
.rank-tab-wrap {
    background: #edf2f9;
    padding: 0;
    border-radius: 4px;
    clear: both;
    height: 40px;
}
.rank-tab-wrap .rank-tab {
    float: left;
}
.rank-tab-wrap .rank-tab .active {
    color: #00a1d6;
}
.rank-tab-wrap .rank-tab li {
    float: left;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    margin-right: 10px;
}
.rank-list-head .rank_tips {
    padding: 7px 0;
    background-color: #edf2f9;
    border-radius: 4px;
}
.rank-list-head .rank_tips .b-icon-tip {
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px;
    background: url(//static.hdslb.com/upload/img/icons.png) -52px -27px no-repeat;
}
.rank-list-head .rank_tips .tip-txt {
    font-size: 12px;
    vertical-align: middle;
}
.rank-content {
    margin-bottom: 60px;
}
</style>