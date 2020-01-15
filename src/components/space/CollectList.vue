<template>
    <div class="page">
        <div class="row page-head clearfix">
            <div>
                <div class="filter-item do-batch">
                    <span class="text">批量操作</span>
                </div>
                <div class="clearfix g-search search-container">
                    <input type="text" placeholder="搜索视频">
                    <span class="icon search-btn"></span>
                </div>
            </div>
        </div>
        <div id="submit-video" class="section video" :class="videoList.length === 0 ? 'empty' : ''">
            <div id="video-list-style" class="cube">
                <div id="submit-video-list" class="content">
                    <ul class="clearfix cube-list">
                        <BRowItem v-for="item in videoList" :key="item.id" :item="item" :collect="true" v-on:listenCancel="cancel"></BRowItem>
                    </ul>
                </div>
            </div>
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
</template>

<script>
import BRowItem from 'components/contentRow/BRowItem'
export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 10
        }
    },
    props: {
        videoList: {
            type: Array
        },
        total: {
            type: Number
        }
    },
    components: {
        BRowItem
    },
    methods: {
        cancel(val) {
            let i
            for (let index = 0; index < this.videoList.length; index++) {
                if (this.videoList[index].id === val) {
                    i = index
                    return
                }
            }
            this.videoList.splice(i,1)
        },
        handleSizeChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
        },
        handleCurrentChange(val) {
            this.pageNum = val
            console.log(this.pageNum)
            this.$emit('changePage', { 'pageNum': this.pageNum, 'pageSize': this.pageSize })
        }
    }
}
</script>

<style scoped>
.page {
    min-height: 180px;
}
.page-head {
    margin-top: -5px;
    width: 100%;
    height: 40px;
    position: relative;
}
.page-head .filter-item {
    display: inline-block;
    line-height: 30px;
    margin-left: 650px;
    font-size: 12px;
    color: #222;
}
.page-head .filter-item .text:hover {
    color: #00a1b6
}
.page-head .filter-item .text {
    display: block;
    cursor: pointer;
    vertical-align: middle;
}
.g-search {
    display: inline-block;
    width: 100px;
    height: 30px;
    vertical-align: middle;
}
.g-search input {
    position: absolute;
    height: 30px;
    width: 150px;
    padding: 0 29px 0 10px;
    line-height: 30px;
    color: #222;
    font-size: 12px;
    border: 1px solid #ccd0d7;
    border-radius: 15px;
    box-shadow: none;
    box-sizing: border-box;
}
.g-search .search-btn {
    position: absolute;
    padding-left: 26px;
    right: 8px;
    top: 0;
    width: 18px;
    height: 30px;
    background-position: -1111px -81px;
    cursor: pointer;
}
.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
}
#browser-version-tip #close-browser-tip, .icon {
    display: inline-block;
    background-image: url('../../assets/images/icons1.png');
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
    content: "空间主人还没有收藏过视频哦~~";
    display: block;
    font-size: 14px;
    height: 450px;
    overflow: hidden;
    line-height: 640px;
    text-align: center;
}
.section.empty.video:after {
    color: #6d757a;
    content: "空间主人还没有收藏过视频哦~~";
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
#page-video .cube-list.unshow {
    display: none;
}
.pagination-empty {
    display: none;
}
</style>