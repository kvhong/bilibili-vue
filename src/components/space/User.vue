<template>
    <div class="section user">
        <div class="section-title" style="display: none;">
            <div class="private-hint">
                <span class="icon"></span>
                <span>仅自己可见</span>
            </div>
        </div>
        <div class="info">
            <div class="content">
                <div class="meta">
                    <div class="row">
                        <div class="item uid">
                            <span class="icon"></span>
                            <span class="text">{{userInfo.iD}}</span>
                        </div>
                        <div class="item birthday">
                            <span class="icon"></span>
                            <a href="/center/updateInfo" target="_blank" class="text">
                                {{userInfo.birth.substring(5)}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: this.UserInfo
        }
    }
}
</script>

<style scoped>
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
.section-title {
    border-bottom: 1px solid #e5e9ef;
    font-size: 14px;
    font-weight: 700;
    padding: 0;
    margin: -15px 0 10px;
    height: 45px;
    line-height: 45px;
}
.section-title {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
    padding: 0 0 15px;
    position: relative;
}
.private-hint {
    display: inline-block;
    color: #6d757a;
    cursor: default;
    font-size: 12px;
    vertical-align: middle;
}
section .private-hint .icon {
    width: 21px;
    margin: 0;
    background-position: -214px -724px;
}
.private-hint .icon {
    background-position: -203px -724px;
    margin: 0 0 0 15px;
}
.section-title .icon {
    width: 33px;
    height: 33px;
    vertical-align: middle;
    margin-right: 10px;
}
.icon {
    vertical-align: middle;
    background-repeat: no-repeat;
}
#browser-version-tip #close-browser-tip, .icon {
    display: inline-block;
    background-image: url('../../assets/images/icons1.png');
}
.user .info .meta {
    color: #6d757a;
    line-height: 28px;
}
.user .info .meta .row:first-child {
    border-top: none;
}
.user .info .meta .row {
    height: 82px;
    line-height: 44px;
    border-top: 1px solid #f0f0f0;
    white-space: nowrap;
}
.user .info .meta .item {
    line-height: 44px;
    width: 49%;
}
.user .info .uid .icon {
    background-position: -209px -145px;
}
.user .info .meta .icon {
    width: 30px;
    height: 28px;
    vertical-align: middle;
}
.user .info .uid .icon {
    background-position: -209px -145px;
}
.user .info .meta span {
    display: inline-block;
}
.user .info .birthday .icon {
    background-position: -209px -274px;
}
a:hover {
    color: #00a1d6;
}
.text {
    font-size: 12px;
}
</style>