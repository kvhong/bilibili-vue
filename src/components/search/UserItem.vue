<template>
    <li class="list-item">
        <a target="_blank" :href="'/ospace/index?id='+item.id" :title="item.nick_name" class="new-clickstat">
            <div class="avatar">
                <img :src="qiniuAddress+item.picture" width="86" height="86" :alt="item.nick_name" :title="item.nick_name">
                <span class="avatar-mask"></span>
            </div>
            <div class="nick" v-html="item.result_nick_name">
                {{item.result_nick_name}}
            </div>
            <div class="profile">{{item.profile}}</div>
        </a>
    </li>
</template>

<script>
export default {
    data() {
        return {
            qiniuAddress: this.Global
        }
    },
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style scoped>
.list-item {
    margin-right: 47px;
}
.list-item {
    float: left;
    width: 163px;
    height: 170px;
    margin: 0 40px 26px;
    border: 1px solid #f5f5f5;
    background: #fefefe;
    border-radius: 6px;
}
.list-item a {
    display: block;
    position: relative;
    padding-top: 20px;
    width: 100%;
    height: 100%;
}
.list-item .avatar {
    position: relative;
    width: 86px;
    height: 86px;
    margin: 0 auto;
}
.list-item a div {
    cursor: pointer;
}
.list-item .avatar img {
    position: absolute;
    top: 0;
    left: 0;
    width: 86px;
    height: 86px;
    z-index: 1;
}
.list-item .avatar .avatar-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(https://a.msstatic.com/huya/main3/widget/search-host-list/avatar_mask_0376f.png);
    z-index: 2;
}
.list-item .nick {
    height: 14px;
    margin: 5px 0;
    font-size: 14px;
    line-height: 14px;
    word-break: break-all;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}
.list-item .nick .type-keyword {
    color: #00a1d6;
    font-style: normal;
}
.list-item .profile {
    height: 12px;
    margin: 5px 0;
    font-size: 12px;
    line-height: 12px;
    color: #999;
    text-align: center;
}
</style>