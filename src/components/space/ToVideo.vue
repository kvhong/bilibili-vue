<template>
    <div class="section i-m">
        <div class="i-m-r1">
            <a href="/upload/home" target="_blank" class="i-m-title">
                <span class="icon-i-title"></span>
                <span class="icon-m-ra"></span>
            </a>
        </div>
        <div class="i-m-r2 clearfix">
            <a href="/upload/uploadVideo" target="_blank" class="i-m-btn i-m-upload">
                <span class="i-m-u-icon icon"></span>
                <span class="i-m-text">视频投稿</span>
            </a>
            <a href="/upload/videoManage" target="_blank" class="i-m-btn i-m-v">
                <span class="i-m-v-icon icon"></span>
                <span class="i-m-text">内容管理</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.section.i-m {
    padding-top: 15px;
}
.section {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 15px 20px 18px;
    margin-bottom: 10px;
}
.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}
.i-m-r1 {
    text-align: center;
    padding: 0 10px 13px;
}
.i-m-title {
    display: inline-block;
}
.i-m-title .icon-i-title {
    display: block;
    width: 120px;
    height: 34px;
    background: url('../../assets/images/icon_createCenters.png') no-repeat;
    background-size: 100% 100%;
    float: left;
}
.icon-m-ra {
    display: block;
    width: 28px;
    height: 28px;
    background: url('../../assets/images/to.png') no-repeat;
    background-size: 100% 100%;
    float: right;
    position: relative;
    top: 6px;
}
.i-m-r2 {
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    padding: 7px 0;
    height: 24px;
}
.clearfix {
    display: block;
}
a:hover {
    color: #00a1d6;
}
.i-m-upload {
    border-right: 1px solid #e5e9ef;
}
.i-m-btn {
    color: #6d757a;
    float: left;
    text-align: center;
    width: 152px;
    line-height: 20px;
}
.i-m-upload:hover .i-m-u-icon {
    background-position: -1175px -151px;
}
.i-m-u-icon {
    background-position: -1111px -151px;
    width: 18px;
    height: 18px;
    margin-right: 6px;
}
.i-m-text, .i-m-u-icon {
    vertical-align: middle;
    font-size: 12px;
}
.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
}
#browser-version-tip #close-browser-tip, .icon {
    display: inline-block;
    background-image: url('../../assets/images/icons1.png');
}
.i-m-v:hover .i-m-v-icon {
    background-position: -1175px -215px;
}
.i-m-v-icon {
    background-position: -1111px -215px;
    width: 18px;
    height: 19px;
    margin-right: 6px;
    vertical-align: middle;
}

</style>