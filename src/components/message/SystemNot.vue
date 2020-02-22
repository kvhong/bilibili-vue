<template>
    <div class="space-right-bottom">
        <div class="card" :class="list.length <= 0 ? 'empty' : ''">
            <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
                <el-collapse-item v-for="item in list" :key="item.id" :name="item.id">
                    <template slot="title">
                        <div class="con">
                            <p class="text">{{item.notice_content}}</p>
                            <div class="info">
                                <span>{{item.created_by}}</span>
                                <span class="time">{{item.created_date}}</span>
                            </div>
                        </div>
                    </template>
                    <div class="content">
                        <span style="padding: 10px;">{{item.notice_content}}</span>
                    </div>
                </el-collapse-item>
            </el-collapse>
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
            activeNames: [],
            list: [
            ],
            pageNum: 1,
            pageSize: 10,
            total: 0
        }
    },
    methods: {
        getData() {
            messageApi.getNotice({ 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.list = response.list
                this.total = response.total
            })
        },
        handleChange(val) {
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
.collapse {
    border: 2px solid #eee;
}
.collapse:hover {
    border: 2px solid rgb(230, 230, 230);
    border-radius: 8px;
}
.con {
    position: relative;
    margin-left: 30px;
    padding: 22px 0 14px;
    width: 65%;
}
.text {
    color: black;
    line-height: 20px;
    padding: 2px 0;
    font-size: 14px;
    text-shadow: none;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info {
    color: #99a2aa;
    line-height: 26px;
    font-size: 12px;
}
.info>span {
    margin-right: 20px;
}
.content {
    margin: 20px;
    height: auto;
    background-color: #d8d9da;
    word-wrap: break-word;
    word-break: break-all;
}
</style>