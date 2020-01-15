<template>
    <div class="dialog-wrap">
        <div class="dialog-wrap-box">
            <div class="dialog-contnent">
                <div class="dialog-title">
                    <span class="dialog-title-txt">提示</span> 
                </div> 
                <div class="dialog-content">
                    <div class="dialog-success-content">
                        <i class="el-icon-loading"></i> {{content}}...
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
/* .dialog-title-icon {
    cursor: pointer;
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url('../../assets/images/icons_m_2.png') no-repeat;
    background-position: -23px -1050px
} */
.dialog-content {
    width: 300px;
    height: 270px;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
}
/* .dialog-success-img {
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
} */
</style>