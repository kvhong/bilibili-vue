<template>
    <div>
        <div class="title">
            <h1>全部粉丝</h1>
        </div>
        <el-divider></el-divider>
        <div class="content" :class="fans.length === 0 ? 'empty' : ''">
            <ul>
                <OItem v-for="item in fans" :item="item" :key="item.id"></OItem>
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
import OItem from 'components/ospace/OItem'
import { spaceApi } from 'api'
export default {
    data() {
        return {
            userId: '',
            fans: [
            ],
            pageNum: 1,
            pageSize: 5,
            total: 0
        }
    },
    components: {
        OItem
    },
    methods: {
        getQuery() {
            this.userId = this.$route.query.id
            this.getData()
        },
        getData() {
            spaceApi.fansList({ 'userId': this.userId, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
                this.fans = response.list
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
    watch: {
        '$route': 'getQuery'
    },
    mounted() {
        this.getQuery()
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