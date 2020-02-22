<template>
    <div class="s-space">
        <div>
            <div id="page-video" class="wrapper">
                <div class="col-full clearfix">
                    <div class="contribution-sidenav">
                        <div class="nav-container playlist-container">
                            <div class="contribution-list-container">
                                <el-collapse v-model="activeNames" @change="handleChange">
                                    <el-collapse-item title="分区" name="1">
                                        <PartitionItem v-on:listenActive="getActive" v-for="item in parList" :item="item" :key="item.partition_name" ref="child"></PartitionItem>
                                    </el-collapse-item>
                                    <el-collapse-item title="排序" name="2">
                                        <li class="contribution-item" :class="active === 'newCollect' ? 'cur' : ''" @click="click('newCollect')">
                                            <a class="text">最近收藏</a>
                                        </li>
                                        <li class="contribution-item" :class="active === 'mostPlay' ? 'cur' : ''" @click="click('mostPlay')">
                                            <a class="text">最多播放</a>
                                        </li>
                                        <li class="contribution-item" :class="active === 'newUpload' ? 'cur' : ''" @click="click('newUpload')">
                                            <a class="text">最新投稿</a>
                                        </li>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </div>
                    </div>
                    <div class="main-content">
                        <CollectList :videoList="videoList" v-on:changePage="getData" :total="total"></CollectList>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PartitionItem from 'components/space/PartitionItem'
import CollectList from 'components/space/CollectList'
import { spaceApi, commonApi } from 'api'
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            active: 'newCollect',
            activeNames: [],
            filterList: [],
            totalData: [],
            parList: [
            ],
            videoList: [
            ],
            pageNum: 1,
            pageSize: 10,
            total: 0
        }
    },
    components: {
        PartitionItem,
        CollectList
    },
    methods: {
        getData(val) {
            this.pageNum = val.pageNum
            this.pageSize = val.pageSize
            this.getVideo(this.active)
        },
        getTotal() {
            spaceApi.favTotal(this.userInfo.iD).then((response) => {
                this.totalData = response
            })
        },
        handleChange(val) {
            
        },
        click(val) {
            this.active = val
            this.getVideo(val)
        },
        getPartition() {
            commonApi.getPartition().then((response) => {
                this.parList = response
            })
        },
        getVideo(val) {
            switch (val) {
                case 'newCollect':
                    this.getNewCollect()
                    break;
                case 'mostPlay':
                    this.getMostPlay()
                    break;
                case 'newUpload':
                    this.getNewUpload()
                    break;
            }
        },
        getNewCollect() {
            spaceApi.spaceFav({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.videoList = response.list
                this.total = response.total
            })
        },
        getMostPlay() {
            spaceApi.favMostPlay({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.videoList = response.list
                this.total = response.total
            })
        },
        getNewUpload() {
            spaceApi.newUpload({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.videoList = response.list
                this.total = response.total
            })
        },
        getActive(val) {
            let values = val.split(';')
            if (values[0] === 'true') {
                this.filterList.push(values[1])
            } else {
                this.filterList.splice(this.filterList.indexOf(values[1]), 1);
            }
            this.filter()
        },
        async filter() { 
            if (this.filterList.length === 0) {
                this.getVideo(this.active)
                return
            }
            await this.getTotal()
            this.videoList = []
            this.totalData.forEach(element => {
                if (this.filterList.indexOf(element.partition_name) !== -1) {
                    this.videoList.push(element)
                }
            });
        }
    },
    mounted() {
        this.getTotal()
        this.getPartition()
        this.getVideo(this.active)
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
    overflow: auto;
    position: relative;
    max-height: 420px;
}
.contribution-sidenav .contribution-list-container::-webkit-scrollbar {/*滚动条整体样式*/
    right: 0px;
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 280px;
}
.contribution-sidenav .contribution-list-container::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    height: 101px;
    background-color: #aaa;
    border-radius: 6px;
    position: absolute;
    transition: background-color .2s linear,width .2s ease-in-out;
    -webkit-transition: background-color .2s linear,width .2s ease-in-out;
    width: 6px;
    right: 2px;
}
.contribution-sidenav .contribution-list-container::-webkit-scrollbar-track {/*滚动条里面轨道*/
    display: block;
    background-color: transparent;
    width: 15px;
    right: 0;
    transition: background-color .2s linear,opacity .2s linear;
    -webkit-transition: background-color .2s linear,opacity .2s linear;
    position: absolute;
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
.contribution-sidenav .contribution-item .text:hover {
    color: #00a1d6
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