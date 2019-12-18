<template>
    <div id="navigator" class="n">
        <div class="wrapper">
            <div class="n-inner clearfix">
                <div class="n-tab-links">
                    <a :href="'/space/'+userInfo.iD+'/index'" class="n-btn n-index n-fans n-404 router-link-exact-active router-link-active" :class="active === 'index' ? 'active' : ''">
                        <span class="iconfont icon-ic_home"></span>
                        <span class="n-text">主页</span>
                    </a>
                    <!-- dynamic -->
                    <a href="#" class="n-btn n-dynamic">
                        <span class="iconfont icon-ic_following"></span>
                        <span class="n-text">动态</span>
                    </a>
                    <!-- video -->
                    <a :href="'/space/'+userInfo.iD+'/video/index'" class="n-btn n-video n-audio n-article n-album" :class="active === 'video' ? 'active' : ''">
                        <span class="iconfont icon-ic_video"></span>
                        <span class="n-text">投稿</span>
                        <span class="n-num">0</span>
                    </a>
                    <!-- favlist -->
                    <a :href="'/space/'+userInfo.iD+'/fav'" class="n-btn n-favlist" :class="active === 'favlist' ? 'active' : ''">
                        <span class="iconfont icon-ic_collect"></span>
                        <span class="n-text">收藏</span>
                        <span class="n-num">1</span>
                    </a>
                    <!-- subs -->
                    <a href="#" class="n-btn n-bangumi n-subs n-cinema" :class="active === 'subs' ? 'active' : ''">
                        <span class="iconfont icon-ic_sub"></span>
                        <span class="n-text">订阅</span>
                    </a>
                    <!-- setting -->
                    <a :href="'/space/'+userInfo.iD+'/setting'" class="n-btn n-setting" :class="active === 'setting' ? 'active' : ''">
                        <span class="iconfont icon-ic_setting"></span>
                        <span class="n-text">设置</span>
                    </a>
                </div>
                <div class="clearfix g-search search-container">
                    <input type="text" placeholder="搜索视频">
                    <span class="icon search-btn"></span>
                </div>
                <div class="n-statistics">
                    <a href="#" class="n-data n-gz" title="0">
                        <p class="n-data-k">关注数</p>
                        <p id="n-gz" class="n-data-v space-attention">0</p>
                    </a>
                    <a href="#" class="n-data n-fs" title="0">
                        <p class="n-data-k">粉丝数</p>
                        <p id="n-fs" class="n-data-v space-fans">0</p>
                    </a><!----><!----><!---->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 'index'
        }
    },
    props: {
        userInfo: {
            type: Object
        }
    },
    methods: {
        getParams() {
            this.active = this.$route.fullPath.split('/')[3]
        }
    },
    watch: {
        '$route': 'getParams'
    },
    mounted() {
        this.getParams()
    }
}
</script>

<style scoped>
.n {
    margin-bottom: 10px;
}
.wrapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;
}
.n .n-inner {
    height: 66px;
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 0 0 4px 4px;
    padding: 0 20px;
    font-size: 0;
}
.clearfix {
    display: block;
}
.n .n-tab-links {
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
}
a:hover {
    color: #00a1d6;
}
.n .n-btn {
    display: inline-block;
    font-size: 0;
    line-height: 66px;
    margin-right: 16px;
    position: relative;
}
.n .n-tab-links .icon-ic_home {
    background: url('../../assets/images/home.png') no-repeat
}
.n .n-tab-links .iconfont {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    margin-right: 4px;
    vertical-align: middle;
}
.iconfont {
    /* font-family: iconfont!important; */
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.n .n-num, .n .n-text {
    vertical-align: middle;
}
.n .n-text {
    font-size: 13px;
}
.n .n-tab-links .icon-ic_following {
    background: url('../../assets/images/dynamic.png') no-repeat
}
.n .n-tab-links .icon-ic_video {
    background: url('../../assets/images/video.png') no-repeat
}
.n .n-num {
    margin-left: 2px;
    font-size: 12px;
    color: #99a2aa;
    font-family: Arial;
}
.n .n-tab-links .icon-ic_collect {
    background: url('../../assets/images/collect.png') no-repeat
}
.n .n-tab-links .icon-ic_sub {
    background: url('../../assets/images/like.png') no-repeat
}
.n .n-tab-links .icon-ic_setting {
    background: url('../../assets/images/setting.png') no-repeat
}
.g-search {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 30px;
    vertical-align: middle;
}
.g-search input {
    position: absolute;
    height: 30px;
    width: 100px;
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
.n .n-statistics {
    float: right;
    height: 66px;
}
.n .n-gz:hover p, .n .n-fs:hover p {
    color: #00a1d6;
}
.n .n-data {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: center;
    justify-content: center;
    float: left;
    width: 58px;
    height: 66px;
    padding: 10px 0;
    text-align: center;
    box-sizing: border-box;
}
.n .n-data .n-data-k {
    line-height: 14px;
    font-size: 12px;
    color: #99a2aa;
}
.n .n-data .n-data-v {
    line-height: 16px;
    margin-top: 5px;
    color: #222;
    font-size: 12px;
}
.n .n-btn.active {
    color: #00a1d6;
}
</style>