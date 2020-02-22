<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" router>
                <el-menu-item index="videoManage">视频管理</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
          <div class="main">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
              <el-tab-pane name="all">
                <span slot="label" class="tab-item">全部视频</span>
                <VideoList :videoList="allSearchList.length > 0 ? searchList : allVideo.list"></VideoList>
              </el-tab-pane>
              <el-tab-pane name="underReview">
                <span slot="label" class="tab-item">审核中</span>
                <VideoList :videoList="underReviewVideo.list"></VideoList>
              </el-tab-pane>
              <el-tab-pane name="passed">
                <span slot="label" class="tab-item">已通过</span>
                <VideoList :videoList="passedVideo.list"></VideoList>
              </el-tab-pane>
              <el-tab-pane name="noPass">
                <span slot="label" class="tab-item">未通过</span>
                <VideoList :videoList="noPassVideo.list"></VideoList>
              </el-tab-pane>
            </el-tabs>
            <div class="search">
              <el-input placeholder="请输入内容" v-model.trim="search" size="small" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" size="mini" class="button" @click="filter"></el-button>
              </el-input>
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
                      v-show="allSearchList.lenght > 0 || (activeName === 'all' && allVideo.list.length >0) || (activeName === 'underReview' && underReviewVideo.list.length >0) || (activeName === 'passed' && passedVideo.list.length >0) || (activeName === 'noPass' && noPassVideo.list.length >0)">
          </el-pagination>
        </el-main>
    </el-container>
</template>

<script>
import VideoList from 'components/upload/VideoList'
import { uploadApi } from 'api'
import { Message } from 'element-ui';
export default {
    data() {
      return {
        userInfo: this.UserInfo,
        activeIndex: 'videoManage',
        activeName: 'all',
        search: '',
        allSearchList: [],
        searchList: [],
        allVideo: {
          list: [
          ],
          total: 0
        },
        underReviewVideo: {
          list: [],
          total: 0
        },
        passedVideo: {
          list: [],
          total: 0
        },
        noPassVideo: {
          list: [],
          total: 0
        },
        pageNum: 1,
        pageSize: 5,
        total: 0,
      };
    },
    components: {
      VideoList
    },
    watch: {
      search() {
        if (this.search === '') {
          this.allSearchList = []
          this.searchList = []
        }
      }
    },
    methods: {
      getData() {
        switch (this.activeName) {
          case 'all':
            this.getAll()
            break;
          case 'underReview':
            this.getUnderReview()
            break;
          case 'passed':
            this.getPassed()
            break;
          case 'noPass':
            this.getNoPass()
            break;
        }
      },
      getAll() {
        uploadApi.videoManage({ 'userId': this.userInfo.iD, 'state': 'all', 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
          this.allVideo = response
          this.total = this.allVideo.total
        })
      },
      getUnderReview() {
        uploadApi.videoManage({ 'userId': this.userInfo.iD, 'state': 'underReview', 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
          this.underReviewVideo = response
          this.total = this.underReviewVideo.total
        })
      },
      getPassed() {
        uploadApi.videoManage({ 'userId': this.userInfo.iD, 'state': 'passed', 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
          this.passedVideo = response
          this.total = this.passedVideo.total
        })
      },
      getNoPass() {
        uploadApi.videoManage({ 'userId': this.userInfo.iD, 'state': 'noPass', 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
          this.noPassVideo = response
          this.total = this.noPassVideo.total
        })
      },
      handleSelect(key, keyPath) {
      },
      async handleClick(tab, event) {
        await this.getData()
        this.pageNum = 1
        switch (tab.name) {
          case 'all':
            this.total = this.allVideo.total
            break;
          case 'underReview':
            this.total = this.underReviewVideo.total
            break;
          case 'passed':
            this.total = this.passedVideo.total
            break;
          case 'noPass':
            this.total = this.noPassVideo.total
            break;
        }
      },
      handleSizeChange(val) {
          this.pageNum = val
          if (this.allSearchList.length <= 0) {
            this.getData()
          } else {
            let start = (this.pageNum-1)*this.pageSize
            let end = start + this.pageSize
            this.searchList = this.allSearchList.slice(start,end)
          }
      },
      handleCurrentChange(val) {
          this.pageNum = val
          if (this.allSearchList.length <= 0) {
            this.getData()
          } else {
            let start = (this.pageNum-1)*this.pageSize
            let end = start + this.pageSize
            this.searchList = this.allSearchList.slice(start,end)
          }
      },
      filter() {
        this.allSearchList = []
        this.searchList = []
        this.activeName = 'all'
        this.pageNum = 1
        this.allVideo.list.forEach(element => {
          if (element.video_title.indexOf(this.search) !== -1) {
            this.allSearchList.push(element)
          }
        });
        if (this.allSearchList.length <= 0) {
          Message.warning('未搜索到相关视频')
        } else {
          let start = (this.pageNum-1)*this.pageSize
          let end = start + this.pageSize
          this.searchList = this.allSearchList.slice(start,end)
          this.total = this.allSearchList.length
        }
      }
    },
    mounted() {
      this.getData()
    }
}
</script>

<style scoped>
.main {
  display: flex;
}
.tabs {
  margin-left: 20px;
  width: 80%;
}
.tab-item {
  font-size: 12px;
}
.search {
  width: 160px;
  margin-top: 8px;
}
</style>