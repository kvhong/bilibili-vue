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
                            <el-menu-item-group title="全部关注">
                                <router-link :to="'/ospace/follow/attention?id='+userId">
                                    <el-menu-item index="attention">
                                        <i class="el-icon-star-off"></i>
                                        全部关注
                                    </el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                            <el-menu-item-group title="全部粉丝">
                                <router-link :to="'/ospace/follow/fans?id='+userId">
                                    <el-menu-item index="fans">
                                        <i class="el-icon-user"></i>
                                        全部粉丝
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
            userId: '',
            active: ''
        }
    },
    methods: {
        getRouter() {
            let path = this.$route.fullPath
            this.active = path.substring(path.lastIndexOf('/')+1,path.lastIndexOf('?'))
            this.userId = this.$route.query.id
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
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