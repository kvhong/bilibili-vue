<template>
    <div>
        <div id="v_tag" class="s_tag report-wrap-module report-scroll-module" scrollshow="true">
            <ul class="tag-area clearfix">
                <li class="tag" v-for="item in tag" :key="item.id">
                    <a href="#" target="_blank">{{item.label}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tag: {
            type: Array
        }
    }
}
</script>

<style scoped>
.v-wrap .s_tag {
    position: relative;
    clear: both;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e9ef;
}
.v-wrap .s_tag, .v-wrap .video-desc {
    margin-top: 16px;
}
.clearfix {
    zoom: 1;
}
ol, ul {
    list-style: none;
    outline: none;
}
.s_tag .tag-area>li, .s_tag .tag-area>li>a {
    position: relative;
    height: 22px;
    transition: all .3s;
}
.s_tag .tag-area>li {
    float: left;
    margin: 0 10px 8px 0;
    background: #f4f4f4;
    border-radius: 100px;
    padding: 0 12px;
    font-size: 12px;
    border: 1px solid #f4f4f4;
}
.s_tag .tag-area>li>a {
    display: inline-block;
    color: #505050;
    line-height: 22px;
    vertical-align: middle;
    z-index: 10;
}
.s_tag .tag-area>li>a:hover {
    color: #00a1d6;
}
.s_tag .tag-area>li, .s_tag .tag-area>li>a {
    position: relative;
    height: 22px;
    transition: all .3s;
}
</style>