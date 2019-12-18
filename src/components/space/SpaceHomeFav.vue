<template>
    <div class="section fav full-rows host">
        <h3 class="section-title">
            <a :href="'/space/'+userInfo.iD+'/fav'" class="t">我的收藏夹</a>
            <span class="count">{{favNum}}</span>
            <a :href="'/space/'+userInfo.iD+'/fav'" class="more">更多</a>
            <span class="private-hint" style="display: none;">
                <span class="icon"></span>
                <span>仅自己可见</span>
            </span>
            <div :class="fav.length !== 0 ? 'sec-empty-hint-host' : 'sec-empty-hint'">
                还没有收藏过视频哦~
            </div>
        </h3>
        <div class="content clearfix">
            <div class="fav-item">
                <BRowItem v-for="item in fav" :item="item" :key="item.id"></BRowItem>
            </div>
        </div>
    </div>
</template>

<script>
import BRowItem from 'components/contentRow/BRowItem'
export default {
    data() {
        return {
            userInfo: this.UserInfo
        }
    },
    props: {
        fav: {
            type: Array
        },
        favNum: {
            type: Number
        }
    },
    components: {
        BRowItem
    }
}
</script>

<style scoped>
.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}
.section-title {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
    padding: 0 0 15px;
    position: relative;
}
.section-title .t {
    display: inline-block;
    vertical-align: middle;
}
a:hover {
    color: #00a1d6;
}
a {
    color: inherit;
    text-decoration: none;
    transition: color .2s ease,background-color .2s ease;
}
.section.empty .content, .section.loading .content, .section.private .content {
    width: 100%;
}
.section.empty .content, .section.empty .count, .section.empty .more, .section.empty .style, .section.loading .quantity, .section.loading .style {
    display: none;
}
.section .count {
    background: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 3px;
    color: #777;
    display: inline-block;
    font-size: 12px;
    line-height: 18px;
    height: 20px;
    margin-left: 11px;
    padding: 0 5px;
    position: relative;
    vertical-align: middle;
}
.sec-empty-hint {
    color: #99a2aa;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 300px;
}
#page-index .video.full-rows .content {
    max-height: 935px;
}
#page-index .video .content {
    max-height: 380px;
    overflow: hidden;
}
#page-index .col-1 .section .more {
    background-position: -310px -405px;
}
#page-index .col-1 .section .more:hover {
    background-position: -438px -405px;
}
.section .more:hover {
    background-position: -438px -405px;
    border-color: #00a1d6;
    color: #00a1d6;
}
.section .more {
    background-position: -310px -405px;
    border: 1px solid #b8c0cc;
    border-radius: 4px;
    color: #6d757a;
    font-size: 12px;
    line-height: 22px;
    transition: border .2s ease;
    padding: 0 19px 0 10px;
    top: 6px;
    right: 0;
}
.section .count:before, .section .more {
    background-image: url('../../assets/images/icons1.png');
    position: absolute;
}
.section .count:before {
    background-position: -215px -340px;
    content: "";
    display: block;
    left: -7px;
    top: -3px;
    height: 22px;
    width: 10px;
}
.private-hint {
    display: inline-block;
    color: #6d757a;
    cursor: default;
    font-size: 12px;
    vertical-align: middle;
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
#page-index .fav-item {
    position: relative;
    float: left;
    margin: 0 20px 28px 0;
}
.sec-empty-hint-host {
    display: none;
}
.sec-empty-hint {
    color: #99a2aa;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 300px;
}
.sec-empty-hint a:hover {
    color: #f25d8e;
}
.sec-empty-hint a {
    color: #00a1d6;
    margin-left: 10px;
}
#page-index .fav.full-rows .content {
    max-height: 900px;
}
#page-index .fav .content {
    max-height: 380px;
    overflow: hidden;
}
</style>