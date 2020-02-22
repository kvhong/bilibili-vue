<template>
    <div>
        <div class="title">
            <h1>我的关注</h1>
            <div class="button">
                <p>批量操作</p>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="content" :class="attention.length === 0 ? 'empty' : ''">
            <ul>
                <Item v-for="item in attention" :item="item" :key="item.id" :att="true"></Item>
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
                    v-show="attention.length > 0">
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
            attention: [
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
            spaceApi.attentionList({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.attention = response.list
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
.title {
    width: 100%;
    display: inline-flex;
}
.title h1 {
    width: 160px;
    font-size: 22px;
}
.title .button {
    margin-left: 72%;
    margin-top: 5px;
}
.title .button p {
    font-size: 14px;
    cursor: pointer;
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