<template>
    <li class="item">
        <a href="#" target="_blank">
            <img :src="qiniuAddress+item.picture" alt="" class="picture">
        </a>
        <h2>
            <a href="#" target="_blank">
                {{item.name}}
            </a>
        </h2>
        <div class="act-info">{{item.info}}</div>
        <div class="found-time">{{item.created_date}}</div>
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
.item {
    background: #fff;
    border-bottom: 1px solid #e5e9ef;
    padding: 0 0 20px;
    margin: 20px 0 0;
    overflow: hidden;
    position: relative;
}
.picture {
    float: left;
    margin-right: 12px;
    width: 125px;
    height: 160px;
    border-radius: 4px;
}
.item h2 {
    overflow: hidden;
    margin: 0;
    line-height: 20px;
    padding-bottom: 20px;
}
.item h2 a {
    color: #222;
}
.item .act-info {
    color: #6d757a;
    line-height: 20px;
    height: 40px;
    margin-bottom: 14px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
}
.item .found-time {
    color: #b8c0cc;
    font-size: 13px;
}
</style>