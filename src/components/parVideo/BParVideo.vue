<template>
    <div id="app">
        <TopContainer></TopContainer>
        <BHeader></BHeader>
        <div class="content">
            <div class="container-row">
                <BContentRow :category="name" :categoryId="id" :row="row"></BContentRow>
            </div>
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
</template>

<script>
import { contentApi } from 'api'
import BContentRow from 'components/contentRow/BContentRow'
import TopContainer from 'components/common/TopContainer.vue'
import BHeader from 'components/common/BHeader.vue'
export default {
	data() {
		return {
            id: '',
            name: '',
            row: [],
            pageNum: 1,
            pageSize: 20,
            total: 0
		}
    },
    components: {
        TopContainer,
        BHeader,
		BContentRow
	},
    methods: {
        getParams() {
            this.id = this.$route.params.id
            this.name = this.$route.params.name
            this.fetchData()
        },
        fetchData() {
            contentApi.videoByPar({ partitionId: this.id, pageNum: this.pageNum, pageSize: this.pageSize }).then((response) => {
                this.row = response.list
                this.total = response.total
            })
        },
        handleSizeChange(val) {
            this.pageNum = val
            this.fetchData()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.fetchData()
        }
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    },
    mounted() {
        this.getParams()
    }
}
</script>

<style lang="stylus" scoped>
    #app 
        font-family "Microsoft YaHei",Arial,Helvetica,sans-serif
        -webkit-font-smoothing antialiased
        font-size 12px
        margin 0
        padding 0
        background #fff
        color #222
        min-width 990px
        tap-highlight-color transparent
        -webkit-tap-highlight-color transparent
    // .wnd-mask
    //   position fixed
    //   width 100%
    //   height 150%
    //   background-color #000
    //   opacity .5!important
    //   z-index 1000
    //   top 0px
    //   left 0px
    //   transition .2s
        .content
            zoom 1
            .container-row
                margin 0 auto
                zoom 1
                width 980px
                &:after
                    content ''
                    display block
                    visibility hidden
                    height 0
                    clear both
                    font-size 0
</style>