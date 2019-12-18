<template>
    <div class="secuity-right-home">
        <div>
            <div class="index-info">
                <span class="hide"></span> 
                <div class="home-head">
                    <img :src="qiniuAddress+userInfo.picture"> 
                    <a href="#" target="_blank" class="gotoSpace">个人空间</a>
                </div> 
                <div class="home-right">
                    <div class="home-top-msg">
                        <span class="home-top-msg-name">{{userInfo.nick_name}}</span> <!----> 
                    </div> 
                    <div class="home-top-level">
                        <span class="home-top-level-all">
                            <span class="home-to-update" @click="to">修改资料</span> 
                            <a href="#" class="home-to-space">
                                个人空间
                                <i class="m-arrow"></i>
                            </a>
                        </span>
                    </div> 
                </div> 
            </div>
            <Security></Security>
            <div class="loading-icon-box" style="display: none;">
                <div class="loading-icon"></div>
            </div>
        </div>  
    </div>
</template>

<script>
import { getToken } from 'api/auth.js'
import Security from 'components/center/Security.vue'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: this.UserInfo
        }
    },
    components: {
        Security
    },
    methods: {
        to() {
            this.$router.push({ path: '/center/updateInfo' })
        }
    }
}
</script>

<style scoped>
.secuity-right-home {
    padding: 50px 20px 0;
    width: 789px;
}
.index-info {
    border-bottom: 1px solid #e5e9ef;
    padding-bottom: 40px;
    position: relative;
}
.hide {
    display: none;
}
.home-head {
    display: inline-block;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
}
.home-head img {
    width: 100%;
    height: 100%;
}
img {
    border: 0;
}
.home-head:hover .gotoSpace {
    display: block;
}
.gotoSpace {
    position: absolute;
    text-align: center;
    width: 64px;
    height: 64px;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.66);
    font-size: 12px;
    color: #fff;
    border-radius: 64px;
    line-height: 64px;
    cursor: pointer;
    display: none;
}
.home-right {
    display: inline-block;
    margin-left: 16px;
    width: 684px;
}
.home-top-msg-name {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    color: #222;
    margin-right: 8px;
    cursor: default;
}
.home-top-level {
    position: relative;
}
.home-top-level-all {
    display: inline-block;
    width: 684px;
    margin-top: 10px;
}
.home-to-space {
    right: 0;
    padding-right: 10px;
}
.m-arrow {
    position: absolute;
    background: url('../../assets/images/icons_m_2.png') -26px -726px no-repeat;
    width: 18px;
    height: 22px;
    top: 2px;
    right: 0;
}
.loading-icon-box {
    width: 789px;
    height: 150px;
    position: relative;
}
.loading-icon {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: url('../../assets/images/loadTV.gif') no-repeat;
    background-size: 100% 100%;
}
.home-to-update:hover {
    border: 1px solid #00a1d6;
    color: #00a1d6;
}
.home-to-update {
    position: absolute;
    top: 8px;
    width: 70px;
    height: 22px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ced3db;
    color: #6d757a;
    text-align: center;
    cursor: pointer;
    line-height: 24px;
}
.home-to-update {
    right: 90px;
    line-height: 20px;
    font-size: 12px;
}
.home-to-space:hover, .home-to-update:hover {
    border: 1px solid #00a1d6;
    color: #00a1d6;
}
.home-to-space {
    right: 0;
    padding-right: 10px;
}
.home-to-space, .home-to-update {
    position: absolute;
    top: 8px;
    width: 70px;
    height: 22px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ced3db;
    color: #6d757a;
    text-align: center;
    cursor: pointer;
    line-height: 24px;
    font-size: 12px;
}
</style>