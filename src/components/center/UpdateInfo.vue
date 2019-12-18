<template>
    <div>
        <div class="security-right-title">
            <span class="security-right-title-icon"></span> 
            <span class="security-right-title-text">我的信息</span> <!---->
        </div>
        <div class="user-setting-warp">
            <div>
                <form class="el-form clearfix" mode="[object Object]">
                    <div class="el-form-item user-nick-name">
                        <label class="el-form-item__label">昵称:</label>
                        <div class="el-form-item__content">
                            <div class="el-input"><!----><!---->
                                <input autocomplete="off" placeholder="你的昵称" type="text" rows="2" maxlength="16" validateevent="true" class="el-input__inner" v-model="info.nickName"><!----><!----></div> 
                            </div>
                        </div> 
                        <div class="el-form-item user-nick-rel-name">
                            <label class="el-form-item__label">用户名:</label>
                            <div class="el-form-item__content">
                                <span class="userinfo-username">{{userInfo.user_name}}</span><!---->
                            </div>
                        </div> 
                        <div class="el-form-item user-my-sign">
                            <label class="el-form-item__label">我的签名:</label>
                            <div class="el-form-item__content">
                                <div class="el-textarea">
                                    <textarea placeholder="设置您的签名- ( ゜- ゜)つロ" type="textarea" rows="2" autocomplete="off" validateevent="true" class="el-textarea__inner" v-model="info.profile"></textarea>
                                </div>
                            </div>
                        </div> 
                        <div class="el-form-item user-my-sex">
                            <label class="el-form-item__label">性别:</label>
                            <div class="el-form-item__content">
                                <div class="el-radio-group">
                                    <el-radio-group v-model="info.sex" size="small">
                                        <el-radio-button label="男"></el-radio-button>
                                        <el-radio-button label="女"></el-radio-button>
                                        <el-radio-button label="保密"></el-radio-button>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div> 
                        <div class="el-form-item user-my-date">
                            <label class="el-form-item__label">出生日期:</label>
                            <div class="el-form-item__content">
                                <div class="el-date-editor el-input el-date-editor--date" id="el-date-pick">
                                <el-date-picker
                                    v-model="info.birth"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div> 
                    <div class="el-form-item user-my-btn">
                        <div class="el-form-item__content">
                            <div class="padding-dom"></div> 
                            <div class="user-my-btn-warp">
                                <button type="button" class="el-button el-button--primary" @click="save">
                                <span>保存</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="dialog-wrap" v-show="isShow">
            <div class="dialog-wrap-box">
                <div class="dialog-contnent">
                    <div class="dialog-title">
                        <span class="dialog-title-txt">提示</span> 
                        <span class="dialog-title-icon" @click="close"></span>
                    </div> 
                    <div class="dialog-content">
                        <div class="dialog-success-content">
                            <div class="dialog-success-img"></div> 
                            <p class="dialog-success-explain">已经成功更新你的资料</p> 
                            <div class="dialog-btn-warp">
                                <div class="dialog-btn" @click="confirm">确定</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken, setToken } from 'api/auth.js'
import { commonApi, centerApi } from 'api'
import { Message } from 'element-ui'
export default {
    inject: ['reload'],
    data() {
        return {
            userInfo: this.UserInfo,
            isShow: false,
            info: {
                nickName: '',
                profile: '',
                sex: '',
                birth: ''
            }
        }
    },
    methods: {
        save() {
            commonApi.nickNameIsExist(this.info.nickName).then((response) => {
                if (response) {
                    Message.error('昵称已存在')
                } else {
                    centerApi.updateInfo({ 'id': this.userInfo.iD, 'nickName': this.info.nickName, 'profile': this.info.profile, 'sex': this.info.sex === '保密' ? '' : this.info.sex, 'birth': this.info.birth }).then((response) => {
                        if (response === '') {
                            this.isShow = true
                            this.userInfo.nick_name = this.info.nickName
                            this.userInfo.profile = this.info.profile
                            this.userInfo.sex = this.info.sex
                            this.userInfo.birth = this.info.birth
                            setToken(this.userInfo)
                        } else {
                            Message.error('更新失败')
                        }
                    })
                }
            })
        },
        confirm() {
            this.isShow = false
            this.reload()
        },
        close() {
            this.isShow = false
        }
    },
    mounted() {
        if (this.UserInfo !== undefined) {
            this.info.nickName = this.UserInfo.nick_name
            this.info.profile = this.UserInfo.profile
            this.info.sex = this.UserInfo.sex === '' ? '保密' : this.UserInfo.sex
            this.info.birth = this.UserInfo.birth
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
.user-setting-warp {
    padding: 20px 20px 0;
    position: relative;
}
.el-form-item {
    margin-bottom: 22px;
}
.el-form-item__label {
    width: 95px;
    text-align: right;
    margin-right: 20px;
    float: left;
    line-height: 30px;
    padding: 0;
}
.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #48576a;
    line-height: 1;
    padding: 11px 12px 11px 0;
    box-sizing: border-box;
}
label {
    cursor: default;
}
.el-form-item__content {
    line-height: 30px;
}
.el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
}
.user-nick-name .el-input, .user-nick-name .el-input__inner {
    float: left;
    width: 225px;
    height: 30px;
    margin-right: 40px;
}
.el-input {
    position: relative;
    font-size: 14px;
}
.el-input, .el-input__inner {
    width: 100%;
    display: inline-block;
}
.el-input__inner {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.el-input__inner:hover {
    border-color: #8391a5;
}
.userinfo-username {
    font-size: 14px;
    color: #898989;
}
.user-my-sign .el-textarea, .user-my-sign .el-textarea .el-textarea__inner {
    float: left;
    width: 618px;
    height: 88px;
    resize: none;
}
.el-textarea {
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
}
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 7px;
    line-height: 1.5;
    width: 100%;
    color: #1f2d3d;
    background-color: #fff;
    background-image: none;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.el-textarea__inner:hover {
    border-color: #8391a5;
}
.el-button, .el-textarea__inner {
    font-size: 14px;
    box-sizing: border-box;
}
input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-size: 100%;
}
.user-local, .user-my-aim, .user-my-btn, .user-my-date, .user-my-love, .user-my-sex, .user-my-sign, .user-nick-name, .user-nick-rel-name {
    float: left;
    width: 789px;
}
.el-radio-group {
    display: inline-block;
    font-size: 0;
}
.el-radio-button__inner, .el-radio-group, .el-radio__input {
    line-height: 1;
    vertical-align: middle;
}
.el-radio-button, .el-radio-button__inner {
    position: relative;
    display: inline-block;
}
.el-radio-button__orig-radio {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    left: -999px;
}
.el-radio-button:first-child .el-radio-button__inner {
    border-left: 1px solid #bfcbd9;
    border-radius: 4px 0 0 4px;
    box-shadow: none!important;
}
.user-my-sex .el-radio-button__inner {
    margin-right: 20px;
    padding: 5px 8px;
    border: 1px solid #bfcbd9;
    border-radius: 5px!important;
    background: #f4f4f4;
    color: #717171;
}
.el-radio-button__inner {
    white-space: nowrap;
    background: #fff;
    border: 1px solid #bfcbd9;
    border-left: 0;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 0;
}
.el-radio-button__orig-radio {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
    left: -999px;
}
.user-setting-warp .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #22a1d6!important;
    border-color: #22a1d6!important;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    box-shadow: -1px 0 0 0 #20a0ff;
}
.el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0 4px 4px 0;
}
.el-date-editor.el-input {
    width: 193px;
}
.el-input__icon {
    position: absolute;
    width: 35px;
    height: 100%;
    right: 0;
    top: 0;
    text-align: center;
    color: #bfcbd9;
    transition: all .3s;
}
[class*=" el-icon-"], [class^=el-icon-] {
    font-family: element-icons!important;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.user-my-date .el-input__inner {
    height: 30px;
    color: #b7b7b7;
}
.user-setting-warp .padding-dom {
    width: 789px;
    height: 39px;
    border-bottom: 1px solid #e5e9ef;
    margin-bottom: 40px;
}
.user-my-btn-warp {
    float: left;
    width: 789px;
    height: 36px;
    position: relative;
}
.user-my-btn .el-button--primary {
    width: 110px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: #00a1d6!important;
}
.el-button--primary {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
}
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    padding: 10px 15px;
    border-radius: 4px;
}
.el-button, .el-checkbox-button__inner {
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: 0;
    text-align: center;
}
.dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,.6);
    z-index: 1000;
}
.dialog-wrap-box {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 1000;
}
.dialog-contnent {
    width: 400px;
    height: 335px;
    background: #fff;
    -webkit-box-shadow: 0 3px 26px rgba(0,0,0,.9);
    box-shadow: 0 3px 26px rgba(0,0,0,.9);
    border-radius: 4px;
    -webkit-animation: dialog-warp .3s;
    animation: dialog-warp .3s;
}
.dialog-title {
    width: 360px;
    height: 50px;
    border-bottom: 1px solid #e5e9ef;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 20px;
}
.dialog-title-txt {
    font-size: 16px;
    color: #222;
}
.dialog-title-icon {
    cursor: pointer;
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('../../assets/images/icons_m_2.png') no-repeat;
    background-position: -23px -1050px
}
.dialog-content {
    width: 360px;
    height: 270px;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
}
.dialog-success-img {
    width: 118px;
    height: 124px;
    margin: 0 auto;
    background: url('../../assets/images/success.png') no-repeat;
}
.dialog-success-explain {
    margin-top: 32px;
    text-align: center;
    font-size: 14px;
    color: #212121;
}
.user-my-btn .el-button--primary {
    width: 110px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background: #00a1d6!important;
}
.el-button--primary {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
}
.dialog-btn {
    width: 120px;
    height: 32px;
    background: #00a1d6;
    border-radius: 4px;
    color: #fff;
    margin: 0 auto;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    margin-top: 32px;
    cursor: pointer;
}
.user-my-btn .el-button--primary:hover {
    background-color: #00b5e5!important;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #4db3ff;
    border-color: #4db3ff;
    color: #fff;
}
</style>