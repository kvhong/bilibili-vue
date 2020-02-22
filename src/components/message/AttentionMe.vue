<template>
    <div class="space-right-bottom">
        <div class="card" :class="list.length <= 0 ? 'empty' : ''">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <a :href="'/space/'+userInfo.iD+'/follow/fans'" class="item">
                        <div class="user-face">
                            <a :href="'/ospace/index?id='+item.author_id" target="_blank">
                                <img :src="qiniuAddress+item.avatar" width="86" height="86" :alt="item.author" :title="item.author">
                                <span class="avatar-mask"></span>
                            </a>
                        </div>
                        <div class="con">
                            <div class="user">
                                <a :href="'/ospace/index?id='+item.author_id" target="_blank" class="name vip-red-name">{{item.author}}</a>
                                <span>关注了你</span>
                            </div>
                            <div class="info">
                                <span class="time">{{item.created_date}}</span>
                            </div>
                        </div>
                    </a>
                </li>
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
                    v-show="list.length > 0">
        </el-pagination>
    </div>
</template>

<script>
import { messageApi } from 'api'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: this.UserInfo,
            list: [
            ],
            pageNum: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        getData() {
            messageApi.getAttention({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.list = response.list
                this.total = response.total
            })
        },
        handleSizeChange(val) {
            this.pageNum = val
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
.space-right-bottom {
    padding: 10px;
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: calc(100% - 66px);
    overflow: auto;
}
.card {
    padding: 24px 16px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    margin-bottom: 10px;
    border-radius: 4px;
}
.card.empty {
    background-image: url('../../assets/images/nodata02.png');
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #6d757a;
    content: "你还没有投过一个稿件("+"▔□▔)";
    display: block;
    font-size: 14px;
    height: 400px;
    overflow: hidden;
    line-height: 640px;
    text-align: center;
}
.space-right-bottom::-webkit-scrollbar {/*滚动条整体样式*/
    right: 0px;
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 280px;
}
.space-right-bottom::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    height: 101px;
    background-color: #aaa;
    border-radius: 6px;
    position: absolute;
    transition: background-color .2s linear,width .2s ease-in-out;
    -webkit-transition: background-color .2s linear,width .2s ease-in-out;
    width: 6px;
    right: 2px;
}
.space-right-bottom::-webkit-scrollbar-track {/*滚动条里面轨道*/
    display: block;
    background-color: transparent;
    width: 15px;
    right: 0;
    transition: background-color .2s linear,opacity .2s linear;
    -webkit-transition: background-color .2s linear,opacity .2s linear;
    position: absolute;
}
.item {
    cursor: pointer;
    margin-bottom: 15px;
    border: 2px solid rgb(230, 230, 230);
    border-radius: 8px;
    display: flex;
    height: 120px;
}
.item:hover {
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
}
.user-face {
    float: left;
    margin: 16px 0 0 10px;
    position: relative;
    width: 86px;
    height: 86px;
}
a {
    outline: none;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
}
.user-face img {
    position: absolute;
    top: 0;
    left: 0;
    width: 86px;
    height: 86px;
    z-index: 1;
}
.img {
    border: none;
    vertical-align: middle;
}
.user-face .avatar-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(https://a.msstatic.com/huya/main3/widget/search-host-list/avatar_mask_0376f.png);
    z-index: 2;
}
.con {
    position: relative;
    margin-left: 30px;
    padding: 22px 0 14px;
    width: 65%;
}
.user {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    padding-bottom: 4px;
    display: block;
    word-wrap: break-word;
    white-space: nowrap;
}
.user .name {
    color: #6d757a;
}
.user>a {
    vertical-align: middle;
}
.user>span {
    color: #6d757a;
    display: inline-flex;
}
.user .parent-content {
    color: #000;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.vip-red-name {
    color: #fb7299!important;
}
.info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.info>span {
    margin-right: 20px;
}
</style>