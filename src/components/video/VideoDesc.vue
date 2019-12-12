<template>
    <div>
        <div id="v_desc" class="video-desc report-wrap-module report-scroll-module" scrollshow="true">
            <div :class="open === false ? 'info' : 'info open'">
                {{item.video_describe}}
            </div>
            <div report-id="abstract_spread" class="btn" @click="showMore">
                <span>{{btn}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false,
            btn: '展开更多'
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        showMore() {
            this.open = !this.open
            if (this.open) {
                this.btn = '收起'
            } else {
                this.btn = '展开更多'
            }
        }
    }
}
</script>

<style scoped>
.v-wrap .video-desc {
    margin-top: 16px;
}
.video-desc {
    position: relative;
}
.video-desc .info {
    white-space: pre-line;
    transition: all .3s;
    font-size: 12px;
    color: #212121;
    letter-spacing: 0;
    line-height: 18px;
    height: 63px;
    width: 573px;
    overflow: hidden;
}
.video-desc .btn {
    margin-top: 12px;
    font-size: 12px;
    line-height: 18px;
}
.video-desc .btn span {
    cursor: pointer;
    color: #505050;
}
.video-desc .btn span:hover {
    color: #00a1d6
}
.video-desc .info.open {
    height: auto;
}
</style>