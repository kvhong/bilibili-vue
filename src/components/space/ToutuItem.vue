<template>
    <li class="item toutu-item" :style="'background-image: url('+qiniuAddress+item.url+');'">
        <div class="toutu-detail">
            <div class="toutu-meta">
                <div class="toutu-title">{{item.title}}</div>
                <div class="toutu-price">{{item.price}}</div>
                <div class="toutu-action">
                    <span class="toutu-btn use" @click="use">使用</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { setToutuToken } from 'api/auth.js'
export default {
    inject: ['reload'],
    data() {
        return {
            qiniuAddress: this.Global
        }
    },
    props: {
        item: {
            type: Object
        },
        userId: {
            type: String
        }
    },
    methods: {
        use() {
            setToutuToken({ 'userId': this.userId, 'url': this.item.url })
            this.reload()
        }
    }
}
</script>

<style scoped>
#space-theme .toutu-item:hover {
    z-index: 3;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
#space-theme .toutu-item {
    border: 3px solid #555;
    border-radius: 12px;
    cursor: pointer;
    float: left;
    width: 310px;
    height: 96px;
    position: relative;
    margin: 0 25px 20px 0;
    background-size: cover;
    background-position: 50%;
}
#space-theme .toutu-item:hover .toutu-detail {
    left: -3px;
    opacity: 1;
}
#space-theme .toutu-detail {
    background-repeat: no-repeat;
    border: 3px solid #555;
    border-radius: 12px;
    opacity: 0;
    transition: opacity .2s ease;
    overflow: hidden;
    position: absolute;
    top: -3px;
    left: -9999px;
    width: 100%;
}
#space-theme .toutu-meta {
    background: #333;
    line-height: 1em;
    margin-top: 93px;
    padding: 10px;
    position: relative;
}
#space-theme .toutu-title {
    color: #fff;
    margin-bottom: 10px;
}
#space-theme .toutu-price {
    color: #ccd0d7;
}
#space-theme .toutu-action {
    position: absolute;
    bottom: 10px;
    right: 10px;
}
#space-theme .toutu-btn.use:hover {
    background: #00b5e5;
}
#space-theme .toutu-btn.use {
    background: #00a1d6;
}
#space-theme .toutu-btn {
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    margin-left: 7px;
    width: 54px;
}
</style>