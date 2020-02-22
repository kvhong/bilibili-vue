<template>
    <div class="s-space">
        <el-container>
            <el-aside width="200px">
                <div class="container">
                    <el-col :span="24">
                        <el-menu
                        :default-active="active"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                            <el-menu-item-group title="我的关注">
                                <router-link :to="'/space/'+userInfo.iD+'/follow/attention'">
                                    <el-menu-item index="attention">
                                        <i class="el-icon-star-off"></i>
                                        我的关注
                                    </el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                            <el-menu-item-group title="我的粉丝">
                                <router-link :to="'/space/'+userInfo.iD+'/follow/fans'">
                                    <el-menu-item index="fans">
                                        <i class="el-icon-user"></i>
                                        我的粉丝
                                    </el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-menu>
                    </el-col>
                </div>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            active: ''
        }
    },
    methods: {
        getRouter() {
            let path = this.$route.fullPath
            this.active = path.substring(path.lastIndexOf('/')+1)
        },
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        }
    },
    watch: {
        '$route': 'getRouter'
    },
    mounted() {
        this.getRouter()
    }
}
</script>

<style scoped>
.s-space {
    width: 1100px;
    margin: 0 auto;
    border: 1px solid #eee
}
</style>