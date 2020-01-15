<template>
    <div class="dialog-wrap" @click="close">
        <div class="dialog-wrap-box">
            <div class="dialog-contnent">
                <div class="dialog-title">
                    <span class="dialog-title-txt">错误</span> 
                </div> 
                <div class="dialog-content">
                    <div class="dialog-success-content">
                        <i class="el-icon-error" style="font-size: 20px; color: red;"></i>
                        <p class="dialog-success-explain">{{content}}</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
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
    width: 300px;
    height: 100px;
    background: #fff;
    -webkit-box-shadow: 0 3px 26px rgba(0,0,0,.9);
    box-shadow: 0 3px 26px rgba(0,0,0,.9);
    border-radius: 4px;
    -webkit-animation: dialog-warp .3s;
    animation: dialog-warp .3s;
}
.dialog-title {
    width: 280px;
    height: 40px;
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
    padding-left: 20px;
}
.dialog-title-txt {
    font-size: 16px;
    color: #222;
}
.dialog-content {
    width: 360px;
    height: 270px;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
}
.dialog-success-content {
    display: inline-flex;
}
.dialog-success-explain {
    margin-left: 15px;
}
</style>