<template>
    <div>
        <div class="title">
            <h1>我的粉丝</h1>
        </div>
        <el-divider></el-divider>
        <div class="content" :class="fans.length === 0 ? 'empty' : ''">
            <ul>
                <Item v-for="item in fans" :item="item" :key="item.id" :att="false"></Item>
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
                    v-show="fans.length > 0">
        </el-pagination>
    </div>
</template>

<script>
import Item from 'components/space/Item'
import { spaceApi } from 'api'
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            fans: [
            ],
            pageNum: 1,
            pageSize: 5,
            total: 0
        }
    },
    components: {
        Item
    },
    methods: {
        getData() {
            spaceApi.fansList({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.fans = response.list
                this.total = response.total
            })
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
        this.getData()
    }
}
</script>

<style scoped>
.title {
    width: 100%;
    display: inline-flex;
}
.title h1 {
    width: 160px;
    font-size: 22px;
}
.content.empty {
    background-image: url('../../assets/images/nodata02.png');
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: #6d757a;
    content: "你还没有投过一个稿件("+"▔□▔)";
    display: block;
    font-size: 14px;
    height: 450px;
    overflow: hidden;
    line-height: 640px;
    text-align: center;
}
.content.empty::after {
    color: #6d757a;
    content: "你还没有投过一个稿件("+"▔□▔)";
    display: block;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    margin-top: -160px;
}
</style>