<template>
    <div>
        <div class="main">
            <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
              <el-tab-pane name="all">
                <span slot="label" class="tab-item">全部</span>
                <AppealList :appealList="allAppeal.list"></AppealList>
              </el-tab-pane>
              <el-tab-pane name="doing">
                <span slot="label" class="tab-item">进行中</span>
                <AppealList :appealList="doingAppeal.list"></AppealList>
              </el-tab-pane>
              <el-tab-pane name="done">
                <span slot="label" class="tab-item">已完成</span>
                <AppealList :appealList="doneAppeal.list"></AppealList>
              </el-tab-pane>
            </el-tabs>
          </div>
          <el-pagination layout="total, prev, pager, next"
                      background
                      :current-page="pageNum"
                      :page-size="pageSize"
                      @size-change="handleSizeChange"
                      :total="total"
                      @current-change="handleCurrentChange"
                      style="text-align:center;"
                      v-show="(activeName === 'all' && allAppeal.list.length >0) || (activeName === 'doing' && doingAppeal.list.length >0) || (activeName === 'done' && doneAppeal.list.length >0)">
          </el-pagination>
    </div>
</template>

<script>
import AppealList from 'components/upload/AppealList'
export default {
    data() {
        return {
            activeName: 'all',
            allAppeal: {
              list: [],
              total: 0
            },
            doingAppeal: {
              list: [],
              total: 0
            },
            doneAppeal: {
              list: [],
              total: 0
            },
            pageNum: 1,
            pageSize: 5,
            total: 0
        }
    },
    components: {
      AppealList
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab.name);
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
</style>