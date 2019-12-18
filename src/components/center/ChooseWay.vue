<template>
    <div>
        <BindHead :bind="bind"></BindHead>
        <div>
            <div>
                <div>
                    <h3 class="select-header">选择验证方式</h3>
                    <div class="select-main">
                        <ul class="select-list">
                            <li>
                                <span class="select-icon icon-phone"></span>
                                <div class="select-info">
                                    <p>通过手机验证</p>
                                    <span>如果你的绑定手机可用，则可通过绑定的手机发送验证码修改</span>
                                </div>
                                <a class="select-btn" @click="to('phone')">立即验证</a>
                            </li>
                            <li>
                                <span class="select-icon icon-mail"></span>
                                <div class="select-info">
                                    <p>通过邮箱验证</p>
                                    <span>如果你的账号绑定邮箱，则可通过向绑定邮箱发送验证码修改</span>
                                </div>
                                <a class="select-btn" @click="to('email')">立即验证</a>
                            </li>
                            <li>
                                <span class="select-icon icon-unknow"></span>
                                <div class="select-info">
                                    <p>以上方式都不能用</p>
                                    <span>如果您的原手机号，邮箱已经无法使用，请联系我们</span>
                                </div>
                                <div class="contact-email" style="bottom: 68px; right: 50px;">
                                    请联系
                                    <a target="_blank" href="#">(暂时没有人可以联系)</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BindHead from 'components/center/BindHead.vue'
export default {
    data() {
        return {
            bind: ''
        }
    },
    components: {
        BindHead
    },
    methods: {
        getParams() {
            this.bind = this.$route.query.bind
        },
        to(way) {
            this.$router.push({ 
                path: '/center/accountSecurity/bind',
                query: {
                    way: way,
                    bind: this.bind
                }
            })
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
.select-header {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #222;
    margin: 20px 0 30px;
}
.select-list>li, .select-main {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.select-main {
    width: 100%;
    border: 1px solid #e1e2e5;
    -webkit-box-shadow: 0 2px 4px rgba(0,0,0,.14);
    box-shadow: 0 2px 4px rgba(0,0,0,.14);
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding-left: 40px;
}
.select-list>li {
    width: 100%;
    height: 150px;
    padding: 40px 50px 0 0;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
}
.select-list>li .select-icon {
    display: inline-block;
    width: 72px;
    height: 72px;
}
.icon-phone {
    background: url('../../assets/images/iconsaccount.png') -284px -92px no-repeat;
}
.icon-answer, .icon-mail, .icon-phone, .icon-unknow {
    display: inline-block;
    width: 72px;
    height: 72px;
}
.select-list>li .select-info {
    display: inline-block;
    height: 72px;
    vertical-align: top;
    margin-left: 20px;
}
.select-list>li .select-info p {
    font-size: 18px;
    color: #222;
    margin: 8px 0 12px;
}
.select-list>li .select-info span {
    font-size: 12px;
    color: #6d757a;
}
.select-list>li .select-btn {
    display: block;
    width: 126px;
    height: 44px;
    color: #fff;
    line-height: 44px;
    margin-top: 14px;
    background-color: #00a1d6;
    font-size: 14px;
    text-align: center;
    -moz-border-radius: 4px;
    border-radius: 4px;
    float: right;
}
.icon-mail {
    background: url('../../assets/images/iconsaccount.png') -412px -92px no-repeat;
}
.icon-unknow {
    background: url('../../assets/images/iconsaccount.png') -540px -92px no-repeat;
}
.select-list>li .contact-email {
    position: absolute;
    font-size: 12px;
}
a {
    color: #00a1d6;
    text-decoration: none;
    font-size: 12px;
}
</style>