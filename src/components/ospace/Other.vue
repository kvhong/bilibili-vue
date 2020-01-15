<template>
    <div>
        <TopContainer></TopContainer>
        <div id="app" class="owner">
            <div class="h">
                <div class="wrapper">
                    <div class="h-forbid" style="display: none;">
                        <div class="f-wrap">
                            <i class="f-icon"></i>
                            <span class="f-txt">该账号封禁中</span>
                        </div>
                    </div>
                    <div class="h-inner" :style="'background-image: url('+qiniuAddress+userInfo.toutu+');'">
                        <div class="h-gradient"></div>
                        <div class="h-user">
                            <div class="h-info clearfix">
                                <div class="h-avatar">
                                    <img :src="qiniuAddress+userInfo.picture" id="h-avatar">
                                </div>
                                <div class="h-basic">
                                    <div>
                                        <span id="h-name">{{userInfo.nick_name}}</span>
                                        <span id="h-gender" :class="userInfo.sex === '男' ? 'icon gender male' : userInfo.sex === '女' ? 'icon gender female' : 'icon gender'"></span>
                                    </div>
                                    <div class="h-basic-spacing">
                                        <h4 title="" class="h-sign">{{userInfo.profile}}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ONavigator :userInfo="userInfo"></ONavigator>
            <el-dialog
                title="个人信息举报"
                :visible.sync="centerDialogVisible"
                width="21%">
                <div style="text-align: center;height: 90px">
                    <p class="report-popup-tip" style="line-height: 18px;font-size: 12px;color: #99a2aa;text-align: left;padding: 0 0 20px 15px">举报内容（可多选）</p>
                    <el-checkbox-group v-model="checkList" style="padding-left: 15px">
                        <el-checkbox label="头像违规" style="float: left;padding-bottom: 20px"></el-checkbox>
                        <el-checkbox label="昵称违规" style="float: left;padding-bottom: 20px"></el-checkbox>
                        <el-checkbox label="签名违规" style="float: left;padding-bottom: 20px"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import ONavigator from 'components/ospace/ONavigator.vue'
import { spaceApi } from 'api'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userId: '',
            userInfo: '',
            centerDialogVisible: false,
            checkList: [],
        }
    },
    components: {
        TopContainer,
        ONavigator
    },
    watch: {
        '$route': 'getQuery'
    },
    methods: {
        getQuery() {
            this.userId = this.$route.query.id
            this.getInfo()
        },
        getInfo() {
            spaceApi.getInfo(this.userId).then((response) => {
                this.userInfo = response
            })
        }
    },
    mounted() {
        this.getQuery()
    }
}
</script>

<style scoped>
.h {
    position: relative;
    z-index: 10;
}
.wrapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;
}
.h .h-forbid {
    height: 42px;
    margin-bottom: 10px;
    background-color: #e5e9ef;
    border-radius: 4px;
}
.h .h-forbid .f-wrap {
    width: 203px;
    margin: 0 auto;
}
.h .h-forbid .f-wrap .f-icon {
    background-image: url('../../assets/images/icons1.png');
    background-position: -664px -458px;
    display: inline-block;
    width: 80px;
    height: 42px;
    margin-right: 20px;
}
.h .h-forbid .f-wrap .f-txt {
    font-size: 14px;
    color: #222;
    line-height: 42px;
    display: inline-block;
    vertical-align: top;
}
.h .h-inner {
    background-position: 50%;
    background-size: cover;
    transition: background-image .2s ease,background-size 1s ease;
    padding-top: 116px;
    position: relative;
    height: 85px
}
.h .h-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 84px;
    background-image: url('../../assets/images/background.png');
    background-repeat: repeat-x;
}
.h .h-user {
    position: relative;
    z-index: 1;
}
.h .h-info {
    margin-left: 20px;
    padding-bottom: 16px;
}
.clearfix {
    display: block;
}
.h .h-avatar:hover .avatar-cover {
    opacity: 1;
}
.h .h-avatar .avatar-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    background: rgba(0,0,0,.6);
    font-size: 12px;
    color: #fff;
    line-height: 64px;
    text-align: center;
    opacity: 0;
    border-radius: 50%;
    transition: opacity .2s;
}
.h .h-avatar {
    position: relative;
    float: left;
    width: 64px;
    height: 64px;
    border: 2px solid hsla(0,0%,100%,.4);
    border-radius: 52px;
}
.h #h-avatar {
    width: 64px;
    height: 64px;
    background: #fff;
    border-radius: 48px;
}
.h .h-avatar .avatar-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    background: rgba(0,0,0,.6);
    font-size: 12px;
    color: #fff;
    line-height: 64px;
    text-align: center;
    opacity: 0;
    border-radius: 50%;
    transition: opacity .2s;
}
.h .h-basic {
    float: left;
    color: #fff;
    font-size: 0;
    margin: 10px 0 0 20px;
}
.h #h-name {
    display: inline-block;
    margin-right: 5px;
    font-weight: 700;
    line-height: 18px;
    font-size: 18px;
    vertical-align: middle;
}
.h .gender.male {
    display: inline-block;
    background-position: -212px -472px;
}
.h .gender.female {
    display: inline-block;
    background-position: -211px -404px;
}
.h .gender {
    display: none;
    width: 21px;
    height: 18px;
    margin-right: 5px;
    vertical-align: middle;
    background-position: -212px -922px;
}
.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
}
#browser-version-tip #close-browser-tip, .icon {
    display: inline-block;
    background-image: url('../../assets/images/icons1.png');
}
.h .h-basic .h-basic-spacing {
    margin-top: 8px;
}
.h .h-sign {
    color: #d6dee4;
    font-size: 12px;
    line-height: 26px;
    height: 26px;
    width: 740px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.h #h-sign:hover {
    background: hsla(0,0%,100%,.2);
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.5);
}
.h #h-sign {
    background: transparent;
    border-radius: 4px;
    border: none;
    box-shadow: none;
    color: #d6dee4;
    font-size: 12px;
    font-family: Microsoft Yahei;
    line-height: 26px;
    height: 26px;
    margin-left: -5px;
    padding: 0 5px;
    position: relative;
    top: -1px;
    width: 730px;
}
input[type=text] {
    line-height: 28px;
    height: 28px;
    padding: 0 10px;
    transition: all .3s ease;
    vertical-align: top;
    border: 1px solid #ccd0d7;
    border-radius: 0;
}
.h .space-theme-trigger:hover {
    background-position: -522px 0
}
.h .space-theme-trigger {
    background-image: url('../../assets/images/theme-trigger-new.png');
    background-position: 0 0;
    border-radius: 0 4px 0 0;
    cursor: pointer;
    width: 58px;
    height: 49px;
    transition: opacity .2s ease;
    position: absolute;
    top: 0;
    right: 0;
}

#space-theme.theme-show {
    bottom: 0;
}
#space-theme {
    transition: bottom .4s ease;
    position: fixed;
    left: 0;
    bottom: -600px;
    width: 100%;
    z-index: 1000;
    background: rgba(0,0,0,.8);
    color: #fff;
}
#space-theme .theme-topright {
    margin-top: 10px;
}
#space-theme .theme-close {
    background-position: -527px -271px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    margin-right: -10px;
}
.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
}
#browser-version-tip #close-browser-tip, .icon {
    display: inline-block;
    background-image: url('../../assets/images/icons1.png');
}
#space-theme .theme-panel {
    background: #111;
    padding: 25px 0 15px;
    position: relative;
}
#space-theme .theme-list[name=toutu] {
    padding-left: 45px;
}
#space-theme .theme-list {
    position: relative;
    height: 280px;
    overflow: auto;
}
.ps {
    overflow: auto;
    overflow-anchor: none;
    -ms-overflow-style: none;
    touch-action: auto;
    -ms-touch-action: auto;
}
#space-theme .theme-list::-webkit-scrollbar {/*滚动条整体样式*/
    right: 0px;
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 280px;
}
#space-theme .theme-list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    height: 101px;
    background-color: #aaa;
    border-radius: 6px;
    position: absolute;
    transition: background-color .2s linear,width .2s ease-in-out;
    -webkit-transition: background-color .2s linear,width .2s ease-in-out;
    width: 6px;
    right: 2px;
}
#space-theme .theme-list::-webkit-scrollbar-track {/*滚动条里面轨道*/
    display: block;
    background-color: transparent;
    width: 15px;
    right: 0;
    transition: background-color .2s linear,opacity .2s linear;
    -webkit-transition: background-color .2s linear,opacity .2s linear;
    position: absolute;
}
#space-theme .theme-list-inner {
    padding-bottom: 40px;
}
</style>