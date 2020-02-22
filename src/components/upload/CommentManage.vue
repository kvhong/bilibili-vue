<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
                <el-menu-item index="commentManage">视频评论</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
          <div class="clearfix g-search search-container">
              <input type="text" placeholder="搜索视频" v-model="search">
              <span class="icon search-btn" @click="searchComment"></span>
          </div>
          <CommentList :commentList="comment"></CommentList>
          <el-pagination layout="total, prev, pager, next"
                      background
                      :current-page="pageNum"
                      :page-size="pageSize"
                      @size-change="handleSizeChange"
                      :total="total"
                      @current-change="handleCurrentChange"
                      style="text-align:center;"
                      v-show="comment.length > 0">
          </el-pagination>
        </el-main>
    </el-container>   
</template>

<script>
import CommentList from 'components/upload/CommentList'
import { uploadApi } from 'api'
export default {
    data() {
      return {
        userInfo: this.UserInfo,
        activeIndex: 'commentManage',
        search: '',
        keyWord: '',
        comment: [
        ],
        pageNum: 1,
        pageSize: 5,
        total: 0
      };
    },
    components: {
      CommentList
    },
    watch: {
      '$route': 'getQuery',
      search() {
        if (this.search === '') {
          this.pageNum = 1
          this.keyWord = ''
          this.getData()
        }
      }
    },
    methods: {
      getQuery() {
        let keyWord = this.$route.query.keyWord
        if (keyWord !== undefined) {
          this.search = keyWord
          this.searchComment()
        }
      },
      getData() {
        uploadApi.videoComments({ 'userId': this.userInfo.iD, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
          this.comment = response.list
          this.total = response.total
        })
      },
      searchComment() {
        this.pageNum = 1
        uploadApi.searchComment({ 'userId': this.userInfo.iD, 'keyWord': this.keyWord === '' ? this.search : this.keyWord, 'pageNum': this.pageNum, 'pageSize': this.pageSize }).then((response) => {
          this.comment = response.list
          this.total = response.total
          this.keyWord = this.search
        })
      },
      handleSelect(key, keyPath) {
      },
      handleSizeChange(val) {
          this.pageNum = val
          if (this.keyWord !== '') {
            this.searchComment()
          } else {
            this.getData()
          }
      },
      handleCurrentChange(val) {
          this.pageNum = val
          if (this.keyWord !== '') {
            this.searchComment()
          } else {
            this.getData()
          }
      }
    },
    mounted() {
      this.getData()
      this.getQuery()
    }
}
</script>

<style scoped>
.g-search {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 30px;
    vertical-align: middle;
}
.g-search input {
    position: absolute;
    right: 0;
    height: 30px;
    width: 160px;
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
</style>