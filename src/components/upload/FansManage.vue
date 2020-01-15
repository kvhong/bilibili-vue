<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
                <el-menu-item index="fansManage">粉丝概括</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            
        </el-main>
    </el-container>  
</template>

<script>
export default {
    data() {
      return {
        activeIndex: 'fansManage'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>

</style>