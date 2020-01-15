<template>
    <div id="register">
        <TopContainer></TopContainer>
        <TopBanner :title="'注册'"></TopBanner>
        <div class="register-container">
            <el-form ref="registerForm" :model="form" :rules="rules" class="register-form">
                <el-form-item prop="username">
                    <el-input type="text" placeholder="用户名" v-model.trim="form.username" clearable/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model.trim="form.password"/>
                </el-form-item>
                <el-form-item prop="sure">
                    <el-input type="password" placeholder="确认密码" v-model.trim="form.sure"/>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-select v-model="form.country" style="float: left;width: 30%">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input type="text" placeholder="手机号" v-model.number="form.phone" style="width: 70%;float: right"/>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input type="text" placeholder="短信验证码" v-model.trim="form.code" style="width: 80%"/>
                    <el-button type="primary" v-on:click="getMessage" style="float: right">点击获取</el-button>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input type="email" placeholder="邮箱" v-model.trim="form.email"/>
                </el-form-item>
                <el-form-item>
                    <label class="register-agree" style="font-size: 8px;display: block;cursor: pointer;">
                        <label class="check-box checkbox-bwxr">
                            <input name="agree" type="checkbox" v-on:change="change">
                        </label>
                        我已同意
                        <a target="_blank" style="color: #00a1d6" href="https://www.bilibili.com/protocal/licence.html">《哔哩哔哩弹幕网用户使用协议》</a>
                        和
                        <a target="_blank" style="color: #00a1d6" href="https://www.bilibili.com/blackboard/privacy-pc.html">《哔哩哔哩隐私政策》</a>
                    </label>
                    <el-button type="primary" v-on:click="onSubmit('registerForm')" :disabled="disabled" style="width: 20%">注册</el-button>
                    <a v-on:click="toLogin" style="color: #00a1d6;float: right;font-size: 8px;display: block;cursor: pointer;">已有账号，直接登录></a>
                </el-form-item>
            </el-form>
        </div>
        <Loading v-show="loading" :content="'注册中'"></Loading>
        <Success v-show="Suc" :content="successContent" v-on:close="sucClose"></Success>
        <Error v-show="Err" :content="errorContent" v-on:close="close"></Error>
    </div>
</template>

<script>
import TopContainer from 'components/common/TopContainer.vue'
import TopBanner from 'components/common/TopBanner.vue'
import Loading from 'components/dialog/Loading'
import Success from 'components/dialog/Success'
import Error from 'components/dialog/Error'
import { commonApi, registerApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        const validatePass = (rule, value, callback) => {
            const userNameReg = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/
            if (userNameReg.test(value)) {
                commonApi.userNameIsExist(value).then(res => {
                    if (res) {
                        callback(new Error('用户名已存在'))
                    } else {
                        callback()
                    }
                })
            } else {
                callback(new Error('用户名只能包含字母，数字，下划线'))
            }
        }
        const validateSome = (rule, value, callback) => {
            if (value === this.form.password) {
                callback()
            } else {
                callback(new Error('密码不一致'))
            }
        }
        const checkPhone = (rule, value, callback) => {
            if (this.reg.test(value)) {
                callback()
            } else {
                return callback(new Error('请输入正确的手机号'))
            }
        }
        const checkPhoneCode = (rule, value, callback) => {
            if (this.phoneCode === '') {
                return callback(new Error('请获取短信验证码'))
            } else {
                if (Number(value) === this.phoneCode) {
                    callback()
                } else {
                    return callback(new Error('短信验证码错误'))
                }
            }
        }
        return {
            loading: false,
            Suc: false,
            successContent: '',
            Err: false,
            errorContent: '',
            reg: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))\d{8}$/,
            disabled: true,
            phoneCode: '',
            options: [{
                value: '中国大陆',
                label: '中国大陆'
            }],
            form: {
                username: '',
                password: '',
                sure: '',
                country: '中国大陆',
                phone: '',
                code: '',
                email: ''
            },
            rules: {
                username: [
                    {required: true, message: '用户名不可为空', trigger: 'blur'},
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                    { required: true, trigger: 'blur', validator: validatePass }
                ],
                password: [
                    {required: true, message: '密码不可为空', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                sure: [
                    {required: true, message: '请确认密码', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    { required: true, trigger: 'blur', validator: validateSome }
                ],
                phone: [
                    {required: true, message: '手机号不可为空', trigger: 'blur'},
                    { min: 11, max: 11, message: '长度必须是 11 个字符', trigger: 'blur' },
                    { validator: checkPhone, trigger: ['blur', 'change'] }
                ],
                code: [
                    {required: true, message: '验证码不可为空', trigger: 'blur'},
                    { validator: checkPhoneCode, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不可为空', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    components: {
        TopContainer,
        TopBanner,
        Loading,
        Success,
        Error
    },
    methods: {
        sucClose() {
            this.Suc = false
        },
        close() {
            this.Err = false
        },
        change() {
            this.disabled = !this.disabled
        },
        getMessage() {
            if (this.form.phone === '') {
                Message.error('请输入手机号')
            } else {
                if (this.reg.test(this.form.phone)) {
                    commonApi.sendMessage({ phone: this.form.phone }).then((response) => {
                        Message.success('短信已经发送')
                        this.phoneCode = response
                    })
                } else {
                    Message.error('手机号格式错误')
                }
            }
        },
        toLogin() {
            this.$router.push({ path: '/login' })
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    registerApi.register({ 
                        'user_name': this.form.username,
                        'user_password': this.form.password,
                        'sure': this.form.sure,
                        'phone': this.form.phone,
                        'email': this.form.email
                        }).then((response) => {
                            this.loading = false
                            this.successContent = '注册成功'
                            this.Suc = true
                            // Message.success('注册成功')
                            this.$router.push({ path: '/login' })
                    }).catch(() => {
                        this.loading = false
                        this.errorContent = '服务器错误'
                        this.Err = true
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.register-container {
    width: 980px;
    margin: 0 auto;
    padding: 60px 0;
}
.register-form {
    width: 500px;
    margin: 0 auto;
    font-size: 12px;
    position: relative;
}
</style>