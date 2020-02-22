<template>
    <li class="rank-item">
        <div class="num">{{index}}</div>
        <div class="content">
            <div class="img">
                <a :href="'/video/'+item.id" target="_blank" @click="watch">
                    <div class="lazy-img cover">
                        <img :alt="item.video_title" :src="item.picture==='' ? qiniuAddress+item.video_url+'?vframe/png/offset/2' : qiniuAddress+item.picture">
                    </div>
                </a>
            </div>
            <div class="info">
                <a :href="'/video/'+item.id" target="_blank" class="title" @click="watch">{{item.video_title}}</a>
                <div class="detail">
                    <span class="data-box">
                        <i class="b-icon play"></i>
                        {{item.watches}}
                    </span>
                    <span class="data-box">
                        <i class="b-icon dianzan"></i>
						{{item.comments}}
                    </span>
                    <a target="_blank" :href="'/ospace/index?id='+item.author_id">
                        <span class="data-box">
                            <i class="b-icon author"></i>
                            {{item.author}}
                        </span>
                    </a>
                </div>
                <div class="pts">
                    <div>{{item.pts}}</div>
                    综合得分
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { commonApi } from 'api'
export default {
    data() {
        return {
            qiniuAddress: this.Global
        }
    },
    props: {
        item: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    methods: {
        watch() {
			commonApi.watch(this.item.id)
		}
    }
}
</script>

<style scoped>
.rank-item {
    transition: .2s;
    overflow: hidden;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
}
.rank-item:hover {
    box-shadow: 0 2px 5px #ccc;
}
.rank-item .num {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 20px;
    left: 0;
    line-height: 70px;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    color: #b8c0cc;
    font-family: simhei;
}
.rank-item .content {
    padding: 20px 0 0 70px;
    overflow: hidden;
}
.rank-item .content .img {
    position: relative;
    float: left;
}
.rank-item .content .img a {
    display: inline-block;
}
.rank-item .content .img .cover {
    width: 114px;
    height: 70px;
}
.lazy-img {
    height: 100%;
    display: inline-block;
}
.rank-item .content .img .cover img {
    border-radius: 4px;
}
.lazy-img img {
    display: block;
    width: 100%;
    height: 100%;
}
.rank-item .content .info {
    font-size: 12px;
    font-family: "Microsoft YaHei";
    padding-bottom: 20px;
    margin-left: 130px;
    height: 70px;
    position: relative;
}
.rank-item .content .info .title {
    height: 20px;
    line-height: 20px;
    font-weight: 700;
    font-size: 12px;
    color: #222;
}
.rank-item .content .info .detail {
    margin-top: 20px;
    color: #99a2aa;
}
.rank-item .content .info .detail .data-box {
    width: 80px;
    margin-right: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.rank-item .content .info .detail .b-icon.play {
    background-position: -282px -90px;
}
.rank-item .content .info .detail .b-icon {
    width: 12px;
    height: 12px;
    margin: 2px 5px 0 0;
    display: inline-block;
    vertical-align: text-top;
    background: url('../../assets/images/icons.png') no-repeat;
}
.rank-item .content .info .detail .b-icon.dianzan {
    background-position: -473px -665px;
}
.rank-item .content .info .detail a {
    color: #99a2aa;
}
.rank-item .content .info .detail .b-icon.author {
    background-position: -282px -154px;
}
.rank-item .content .info .pts {
    font-size: 12px;
    height: 20px;
    color: #b8c0cc;
    line-height: 20px;
    position: absolute;
    bottom: 40px;
    right: 20px;
    text-align: center;
}
.rank-item .content .info .pts div {
    color: #00a1d6;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 12px;
}

</style>