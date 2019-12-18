<template>
    <div class="container">
        <div>
            <BindHead :bind="bind"></BindHead>
            <div>
                <div class="container-content">
                    <div class="contanier-line">
                        <div class="steps-box">
                            <el-steps :space="200" :active="active" finish-status="success" align-center="">
                                <el-step title="验证身份"></el-step>
                                <el-step :title="bind === 'email' ? '绑定邮箱' : bind === 'phone' ? '绑定手机' : '设置密码'"></el-step>
                                <el-step :title="bind === 'password' ? '设置成功' : '绑定成功'"></el-step>
                            </el-steps>
                        </div>
                    </div>
                    <div class="form-group">
                        <el-form ref="phoneFormOne" :model="phoneFormOne" :rules="phoneRulesOne" v-show="active === 0 && way === 'phone'">
                            <el-form-item prop="phone">
                                <div class="el-input-group__prepend">原手机号</div>
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入内容" class="el-input__inner" v-model="phoneFormOne.phone">
                            </el-form-item>
                            <el-form-item prop="phoneCode">
                                <input type="text" autocomplete="off" placeholder="请输入验证码" class="el-input__inner_1" v-model="phoneFormOne.phoneCode">
                                <el-button plain style="float: right;width: 88px;padding-left: 9px;margin-top: 2px" @click="getPhoneCode">获取验证码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="next" @click="next('phoneFormOne', 'one')">下一步</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form ref="emailFormOne" :model="emailFormOne" :rules="emailRulesOne" v-show="active === 0 && way === 'email'">
                            <el-form-item prop="email">
                                <div class="el-input-group__prepend">绑定邮箱</div>
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入内容" class="el-input__inner" v-model="emailFormOne.email">
                            </el-form-item>
                            <el-form-item prop="emailCode">
                                <input type="text" autocomplete="off" placeholder="请输入验证码" class="el-input__inner_1" v-model="emailFormOne.emailCode">
                                <el-button plain style="float: right;width: 88px;padding-left: 9px;margin-top: 2px" @click="getEmailCode">获取验证码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="next" @click="next('emailFormOne', 'one')">下一步</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form ref="phoneFormTwo" :model="phoneFormTwo" :rules="phoneRulesTwo" v-show="active === 1 && bind === 'phone'">
                            <el-form-item prop="phone">
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入手机号" class="el-input__inner_2" v-model="phoneFormTwo.phone">
                            </el-form-item>
                            <el-form-item prop="phoneCode">
                                <input type="text" autocomplete="off" placeholder="请输入验证码" class="el-input__inner_1" v-model="phoneFormTwo.phoneCode">
                                <el-button plain style="float: right;width: 88px;padding-left: 9px;margin-top: 2px" @click="getPhoneCode">获取验证码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="next" @click="next('phoneFormTwo', 'two')">下一步</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form ref="emailFormTwo" :model="emailFormTwo" :rules="emailRulesTwo" v-show="active === 1 && bind === 'email'">
                            <el-form-item prop="email">
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入邮箱地址" class="el-input__inner_2" v-model="emailFormTwo.email">
                            </el-form-item>
                            <el-form-item prop="emailCode">
                                <input type="text" autocomplete="off" placeholder="请输入验证码" class="el-input__inner_1" v-model="emailFormTwo.emailCode">
                                <el-button plain style="float: right;width: 88px;padding-left: 9px;margin-top: 2px" @click="getEmailCode">获取验证码</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="next" @click="next('emailFormTwo', 'two')">下一步</el-button>
                            </el-form-item>
                        </el-form>
                        <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" v-show="active === 1 && bind === 'password'">
                            <el-form-item prop="nowCode">
                                <div class="el-input-group__prepend">当前密码</div>
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入内容" class="el-input__inner" v-model="passwordForm.nowCode">
                            </el-form-item>
                            <el-form-item prop="newCode">
                                <div class="el-input-group__prepend">新的密码</div>
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入内容" class="el-input__inner" v-model="passwordForm.newCode">
                            </el-form-item>
                            <el-form-item prop="confirmCode">
                                <div class="el-input-group__prepend">确认密码</div>
                                <input type="text" disabled="disabled" autocomplete="off" placeholder="请输入内容" class="el-input__inner" v-model="passwordForm.confirmCode">
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="next" @click="next('passwordForm', 'two')">下一步</el-button>
                            </el-form-item>
                        </el-form>
                        <Success v-show="active === 2" :title="bind === 'phone' ? '手机' : bind === 'email' ? '邮箱' : '密码'"></Success>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Success from 'components/center/Success.vue'
import BindHead from 'components/center/BindHead.vue'
import { getToken } from 'api/auth.js'
import { commonApi, centerApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        const checkPhoneCode = (rule, value, callback) => {
            if (this.PCode === '') {
                return callback(new Error('请获取短信验证码'))
            } else {
                if (Number(value) === this.PCode) {
                    callback()
                } else {
                    return callback(new Error('短信验证码错误'))
                }
            }
        }
        const checkEmailCode = (rule, value, callback) => {
            if (this.ECode === '') {
                return callback(new Error('请获取短信验证码'))
            } else {
                if (Number(value) === this.ECode) {
                    callback()
                } else {
                    return callback(new Error('短信验证码错误'))
                }
            }
        }
        const validateNowCode = (rule, value, callback) => {
            commonApi.comparePassword({ 'id': this.userInfo.iD, 'password': value }).then((response) => {
                if (response) {
                    callback()
                } else {
                    callback(new Error('当前密码错误'))
                }
            })
        }
        const validateSome = (rule, value, callback) => {
            if (value === this.passwordForm.newCode) {
                if (value === this.passwordForm.nowCode) {
                    callback(new Error('新密码不能跟当前密码一致'))
                } else {
                    callback()
                }
            } else {
                callback(new Error('密码不一致'))
            }
        }
        return {
            active: 0,
            way: '',
            bind: '',
            userInfo: this.UserInfo,
            PCode: '',
            ECode: '',
            phoneFormOne: {
                phone: '',
                realPhone: '',
                phoneCode: ''
            },
            emailFormOne: {
                email: '',
                realEmail: '',
                emailCode: ''
            },
            phoneFormTwo: {
                phone: '',
                phoneCode: ''
            },
            emailFormTwo: {
                email: '',
                emailCode: ''
            },
            passwordForm: {
                nowCode: '',
                newCode: '',
                confirmCode: ''
            },
            phoneRulesOne: {
                phoneCode: [
                    { required: true, message: '验证码不可为空', trigger: 'blur' },
                    { validator: checkPhoneCode, trigger: 'blur' }
                ]
            },
            emailRulesOne: {
                emailCode: [
                    { required: true, message: '验证码不可为空', trigger: 'blur' },
                    { validator: checkEmailCode, trigger: 'blur' }
                ]
            },
            phoneRulesTwo: {
                phone: [
                    { required: true, message: '手机号不可为空', trigger: 'blur' }
                ],
                phoneCode: [
                    { required: true, message: '验证码不可为空', trigger: 'blur' },
                    { validator: checkPhoneCode, trigger: 'blur' }
                ]
            },
            emailRulesTwo: {
                email: [
                    { required: true, message: '邮箱不可为空', trigger: 'blur' }
                ],
                emailCode: [
                    { required: true, message: '验证码不可为空', trigger: 'blur' },
                    { validator: checkEmailCode, trigger: 'blur' }
                ]
            },
            passwordRules: {
                nowCode: [
                    {required: true, message: '当前密码不可为空', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    { required: true, trigger: 'blur', validator: validateNowCode }
                ],
                newCode: [
                    {required: true, message: '新的密码不可为空', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                confirmCode: [
                    {required: true, message: '请确认密码', trigger: 'blur'},
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
                    { required: true, trigger: 'blur', validator: validateSome }
                ]
            }
        }
    },
    components: {
        Success,
        BindHead
    },
    methods: {
        getParams() {
            this.way = this.$route.query.way,
            this.bind = this.$route.query.bind
        },
        next(formName, now) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (now === 'one') {
                        this.active++
                        this.PCode = ''
                        this.ECode = ''
                    } else if (now === 'two') {
                        if (formName === 'phoneFormTwo') {
                            centerApi.updatePhone({ 'id': this.userInfo.iD, 'phone': this.phoneFormTwo.phone }).then((response) => {
                                if (response === '') {
                                    this.active++
                                } else {
                                    Message.error('更新失败')
                                }
                            })
                        } else if (fromName === 'emailFormTwo') {
                            centerApi.updateEmail({ 'id': this.userInfo.iD, 'email': this.emailFormTwo.email }).then((response) => {
                                if (response === '') {
                                    this.active++
                                } else {
                                    Message.error('更新失败')
                                }
                            })
                        } else if (fromName === 'passwordForm') {
                            centerApi.updatePassword({ 'id': this.userInfo.iD, 'oldPassword': this.passwordForm.nowCode, 'newPassword': this.passwordForm.newCode, 'confirmCode': this.passwordForm.confirmCode }).then((response) => {
                                if (response === '') {
                                    this.active++
                                } else {
                                    Message.error('更新失败')
                                }
                            })
                        }
                    }
                } else {
                    return false;
                }
            })
            
        },
        getPhoneCode() {
            commonApi.sendMessage({ phone: this.phoneForm.realPhone }).then((response) => {
                Message.success('短信已经发送')
                this.phoneCode = response
            })
        },
        getEmailCode() {

        }
    },
    watch: {
        '$route': 'getParams'
    },
    mounted() {
        if (this.UserInfo !== undefined) {
            const phone = this.UserInfo.phone
            const email = this.UserInfo.email
            this.phoneFormOne.realPhone = phone
            this.emailFormOne.realEmail = email
            this.phoneFormOne.phone = phone.substring(0,3)+'****'+phone.substring(8)
            this.emailFormOne.email = email.substring(0,3)+'****'+email.substring(email.indexOf('@'))
        }
        this.getParams()
    }
}
</script>

<style scoped>
.container {
    width: 805px;
    margin: 0 auto;
}
.container-content {
    padding: 24px 0 0 20px;
}
.container-line {
    padding-top: 24px;
}
.steps-box {
    text-align: center;
    /* margin-left: -150px; */
    margin-left: 85px
}
.form-group {
    width: 330px;
    margin: 0 auto;
    padding: 60px 0;
}
.el-input-group__prepend {
    float: left;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding: 0 14px;
    white-space: nowrap;
    width: 52px;
    text-align: center;
    border-right: 0;
    -moz-border-radius-topright: 0;
    border-top-right-radius: 0;
    -moz-border-radius-bottomright: 0;
    border-bottom-right-radius: 0;
}
.el-input__inner {
    float: right;
    width: 249px;
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
    -moz-border-radius-topleft: 0;
    border-top-left-radius: 0;
    -moz-border-radius-bottomleft: 0;
    border-bottom-left-radius: 0;
    vertical-align: middle;
    display: table-cell;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 42px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -moz-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.el-input__inner_1 {
    width: 240px;
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    -moz-border-radius-topleft: 0;
    border-top-left-radius: 0;
    -moz-border-radius-bottomleft: 0;
    border-bottom-left-radius: 0;
    vertical-align: middle;
    display: table-cell;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -moz-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.next{
    width: 100%;
}
.el-input__inner_2 {
    width: 100%;
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    -moz-border-radius-topleft: 0;
    border-top-left-radius: 0;
    -moz-border-radius-bottomleft: 0;
    border-bottom-left-radius: 0;
    vertical-align: middle;
    display: table-cell;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -moz-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
</style>