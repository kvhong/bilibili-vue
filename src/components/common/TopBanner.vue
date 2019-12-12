<template>
    <div>
        <div class="top-banner">
            <img src="//i0.hdslb.com/bfs/archive/4f59bf959d51592016e07efe62969c411288826a.png" style="height: 86px;width: 100%"/>
        </div>
        <div data-v-3e357e28="" class="title-line">
            <span class="tit" style="font-size: 38px;">{{title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        }
    }
}
</script>

<style scoped>
.top-banner {
    background: transparent no-repeat center -10px;
    position:relative;
    margin:0px auto 0;
    background: #00a0d8;
    height: 86px;
    text-align: center;
    margin-bottom: 20px;
}
.title-line {
    width: 980px;
    height: 28px;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 28px;
    text-align: center;
}
.title-line .tit {
    height: 56px;
    line-height: 56px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 40px;
    background: #fff;
    text-align: center;
}
</style>