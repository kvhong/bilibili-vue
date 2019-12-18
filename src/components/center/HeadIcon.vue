<template>
    <div>
        <div class="security-right-title">
            <span class="security-right-title-icon"></span> 
            <span class="security-right-title-text">我的头像</span> <!---->
        </div>
        <div class="security-right-bottom">
            <div class="face-tool">
                <div class="tool-container">
                    <router-link to="/center/headIcon/upload"><a>
                        <div class="tool-change-face">
                            <span>更换头像</span>
                        </div>
                    </a></router-link>
                    <div class="tool-face-box">
                        <div class="tool-face-box">
                            <img alt="" class="tool-user-face" :src="qiniuAddress+userInfo.picture"> <!---->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken } from 'api/auth.js'
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            userInfo: this.UserInfo
        }
    } 
}
</script>

<style scoped>
.security-right-title {
    height: 50px;
    padding-left: 30px;
    border-bottom: 1px solid #ddd;
}
.security-right-title-icon {
    float: left;
    width: 4px;
    height: 16px;
    margin-top: 18px;
    background-color: #00a1d6;
    border-radius: 4px;
}
.security-right-title-text {
    float: left;
    margin: 15px 0 0 5px;
    color: #00a1d6;
    font-size: 14px;
    cursor: default;
}
.security-right-bottom {
    padding: 0 20px;
}
.face-tool {
    padding: 20px 0;
}
.tool-container {
    width: 200px;
    height: 200px;
    border: 1px solid #e5e9ef;
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
}
.tool-change-face, .tool-uninstall-pendant {
    width: 54px;
    height: 54px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 50%;
}
.tool-change-face {
    background: #00a1d6;
    border: 1px solid #00a1d6;
    position: absolute;
    left: -27px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
.tool-change-face span, .tool-uninstall-pendant span {
    width: 2em;
    font-size: 14px;
    line-height: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.tool-change-face span {
    color: #fff;
}
.tool-face-box {
    width: 168px;
    height: 168px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.tool-face-box {
    width: 168px;
    height: 168px;
    position: relative;
}
.tool-face-box {
    width: 168px;
    height: 168px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.tool-user-face {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
img {
    border: 0;
}
</style>