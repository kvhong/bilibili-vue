<template>
    <div>
        <TopContainer></TopContainer>
        <div class="home">
            <el-form>
                <el-form-item>
                    <div class="home-logo"></div>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="搜索你想要的内容" v-model.trim="keyWord" class="input-with-select">
                        <el-button slot="append" @click="search">搜索</el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="home-suggest">
                <div class="hot-search">
                    <div class="title">
                        <i class="title-icon hot"></i>
                        热门搜索
                        <span class="subtitle">Daily Hot</span>
                    </div>
                </div>
                <div class="history">
                    <div class="title">
                        <i class="title-icon time"></i>
                        搜索历史
                        <span class="delete-history" @click="clear">
                            <i class="icon-garbage"></i>
                            清空
                        </span>
                        <span class="subtitle">History</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer'
export default {
    data() {
        return {
            keyWord: ''
        }
    },
    components: {
        TopContainer
    },
    methods: {
        search() {
            if (this.keyWord === '') {
                return
            } else {
                this.$router.push({
                    path: '/search/index',
                    query: {
                        keyWord: this.keyWord
                    }
                })
            }
        },
        clear() {
            
        }
    }
}
</script>

<style scoped>
.home {
    width: 980px;
    margin: 0 auto;
    height: auto;
}
.home .home-logo {
    text-align: center;
    margin: 40px auto 20px;
    width: 284px;
    height: 68px;
    background: transparent url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_index_logo_v2.4.png) no-repeat 50%;
}
.input-with-select {
    width: 632px;
    margin-left: 174px;
}
.home .home-suggest {
    width: 980px;
    height: 463px;
    padding-top: 81px;
    margin-top: -5px;
    margin-bottom: 45px;
    background: transparent url(//s1.hdslb.com/bfs/static/jinkela/search/asserts/search_2233_bg.png) no-repeat top;
}
.home .home-suggest .hot-search {
    float: left;
    width: 390px;
    height: 340px;
    padding: 20px 10px 20px 20px;
    margin-right: 10px;
    margin-left: 155px;
    border: 1px solid #ddd;
}
.home .home-suggest .history {
    float: left;
    width: 175px;
    height: 340px;
    padding: 20px;
    border: 1px solid #ddd;
}
.home .home-suggest .title {
    position: relative;
    font-size: 18px;
    margin-left: 23px;
}
.home .home-suggest .title .title-icon.hot {
    background-position: -1px -1px;
}
.home .home-suggest .title .title-icon {
    position: absolute;
    display: inline-block;
    right: 100%;
    width: 34px;
    height: 28px;
    background: url('../../assets/images/search_title_icon.png') no-repeat;
}
.home .home-suggest .title .subtitle {
    font-size: 12px;
    color: #aaa;
    display: block;
    margin-bottom: 20px;
}
.home .home-suggest .title .title-icon.time {
    background-position: -1px -38px;
}
.home .home-suggest .title .delete-history:hover {
    color: #00a1d6;
}
.home .home-suggest .title .delete-history {
    font-size: 12px;
    color: #aaa;
    margin-left: 22px;
    cursor: pointer;
    vertical-align: middle;
}
.home .home-suggest .title .delete-history:hover .icon-garbage {
    background-position: -10px -150px;
}
.home .home-suggest .title .delete-history .icon-garbage {
    background: transparent url('../../assets/images/search_icon.png') no-repeat 0 -150px;
    width: 10px;
    height: 12px;
    margin-bottom: 3px;
    margin-right: 2px;
    vertical-align: middle;
    display: inline-block;
}
</style>