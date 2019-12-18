<template>
    <div class="breadcrumb-box">
        <div aria-label="Breadcrumb" role="navigation" class="el-breadcrumb">
            <span class="el-breadcrumb__item" @click="to">
                <span role="link" class="el-breadcrumb__inner is-link">账号安全</span>
                <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            </span>
            <span class="el-breadcrumb__item" aria-current="page">
                <span role="link" class="el-breadcrumb__inner">设置{{bind === 'email' ? '邮箱' : bind === 'phone' ? '手机' : '密码'}}</span>
                <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            </span>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        bind: {
            type: String
        }
    },
    methods: {
        to() {
            this.$router.push({ path: '/center/accountSecurity' })
        }
    }
}
</script>

<style scoped>
.breadcrumb-box {
    padding: 24px 0 0 20px;
}
.el-breadcrumb {
    font-size: 14px;
    line-height: 1;
}
.el-breadcrumb__item {
    float: left;
}
.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: color .2s cubic-bezier(.645,.045,.355,1);
    -moz-transition: color .2s cubic-bezier(.645,.045,.355,1);
    transition: color .2s cubic-bezier(.645,.045,.355,1);
    color: #303133;
}
.el-breadcrumb__inner {
    color: #606266;
}
.el-breadcrumb__separator[class*=icon] {
    margin: 0 6px;
    font-weight: 400;
}
.el-breadcrumb__separator {
    margin: 0 9px;
    font-weight: 700;
    color: #c0c4cc;
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
.el-breadcrumb__item {
    float: left;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
    font-weight: 400;
    color: #606266;
    cursor: text;
}
.el-breadcrumb__item:last-child .el-breadcrumb__separator {
    display: none;
}
</style>