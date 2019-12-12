<template>
    <div id="login">
        <TopContainer></TopContainer>
        <TopBanner :title="'登录'"></TopBanner>
        <div class="login-box clearfix">
            <div class="login-left">
                <div data-v-3e357e28="" class="qrcode-login">
                    <div class="qrcode-con">
                        <i class="tv-icon"></i> 
                        <div class="qrcode-box">
                            <div class="qrcode-tips"></div> 
                            <div class="qrcode-img">
                                <canvas width="140" height="140" style="display: none;"></canvas>
                                <img src="data:image/png;base64,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" style="display: block;">
                            </div>
                        </div>
                    </div> 
                    <div class="qrcode-footer">
                    </div>
                </div>
            </div>
            <div data-v-3e357e28="" class="line"></div>
            <div class="login-right">
                <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-form">
                    <el-form-item prop="username">
                        <el-input type="text" placeholder="用户名" v-model="form.username" clearable/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="form.password"/>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input type="text" placeholder="验证码" v-model="form.code" style="width: 50%"/>
                        <el-image :src="codeUrl" v-on:click="refresh"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
                        <el-button type="button" v-on:click="onRegister">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <p class="p">
            登录即代表你同意
            <a target="_blank" href="https://www.bilibili.com/protocal/licence.html">用户协议</a>
            和
            <a target="_blank" href="https://www.bilibili.com/blackboard/privacy-pc.html">隐私政策</a>
        </p>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import TopBanner from 'components/common/TopBanner.vue'
import { loginApi } from 'api'
import { Message } from 'element-ui'
import { setToken } from 'api/auth'
export default {
    data() {
        return {
            codeUrl: 'http://localhost:8200/code/',
            code: '',
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {required: true, message: '用户名不可为空', trigger: 'blur'},
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                code: [
                    {required: true, message: '验证码不可为空', trigger: 'blur'}
                ]
            }
        }
    },
    components: {
        TopContainer,
        TopBanner
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    loginApi.login({ 'username': this.form.username, 'password': this.form.password }).then((response) => {
                        if (response.code === '200') {
                            // 设置cookie
                            setToken(response.userInfo)
                            Message.success(response.message)
                            this.$router.push({path: '/'})
                        } else {
                            Message.error(response.message)
                            this.refresh()
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        onRegister() {
            this.$router.push({path: '/register'});
        },
        refresh() {
            this.codeUrl = this.codeUrl+'?'+Math.random()
        }
    }
}
</script>

<style scoped>
.login-box {
    position: relative;
    width: 980px;
    margin: 0 auto;
}
.login-box .login-left {
    float: left;
    width: 489px;
}
.qrcode-login {
    position: relative;
    width: 480px;
}
.qrcode-login .qrcode-con {
    padding-top: 72px;
}
.qrcode-login .qrcode-con .tv-icon {
    position: absolute;
    width: 70px;
    height: 70px;
    left: 160px;
    top: 10px;
    background: url(//i0.hdslb.com/bfs/static/e6f2388d454c82004905753802e9cfe709d80d08.png) no-repeat;
}
.qrcode-login .qrcode-con .qrcode-box {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    background: #ddd;
    position: relative;
}
.qrcode-login .qrcode-con .qrcode-box .qrcode-tips {
    z-index: 10;
    position: absolute;
    width: 480px;
    height: 192px;
    top: -50px;
    left: 50%;
    margin-left: -240px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/qr-tip.a64967e.png) no-repeat;
    background-size: cover;
    background-color: #fff;
    opacity: 0;
    -webkit-transition: opacity .5s;
    -o-transition: opacity .5s;
    -moz-transition: opacity .5s;
    transition: opacity .5s;
}
.qrcode-login .qrcode-con .qrcode-box .qrcode-img {
    width: 140px;
    height: 140px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/loadTV.99606e2.gif) 50% no-repeat;
}
.qrcode-login .qrcode-footer {
    width: 480px;
    height: 155px;
    background: url(//s1.hdslb.com/bfs/static/passport/static/img/2233login.af9c53d.png) 0 -7px no-repeat;
}
.login-box .line {
    float: left;
    border-right: 1px solid #ddd;
    height: 300px;
    margin-top: 28px;
}
.login-box .login-right {
    float: left;
    width: 490px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.login-form{
    padding-top: 45px;
    width: 90%;
}
.p {
    margin: 24px auto 0;
    padding-left: 50px;
    width: 980px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #99a2aa;
    text-align: center;
    line-height: 16px;
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
</style>