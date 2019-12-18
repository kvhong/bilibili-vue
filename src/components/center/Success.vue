<template>
    <div style="text-align: center">
        <h3 class="result-title">
            设置{{title}}成功！
        </h3>
        <img src="../../assets/images/success.png" alt="" class="result-img">
        <el-button type="primary" @click="to">返回安全中心</el-button>
    </div>
</template>

<script>
import { removeToken } from 'api/auth.js'
export default {
    props: {
        title: {
            type: String
        }
    },
    methods: {
        to() {
            if (title === '密码') {
                removeToken()
            }
            this.$router.push({ path: '/center/accountSecurity' })
        }
    }
}
</script>

<style scoped>
.result-title {
    font-size: 24px;
    color: #222;
    margin: 0 auto 20px;
    text-align: center;
}
.result-img {
    display: block;
    margin: 0 auto 30px;
}
.result-button {
    display: block;
    width: 160px;
    height: 40px;
    font-size: 14px;
}
</style>