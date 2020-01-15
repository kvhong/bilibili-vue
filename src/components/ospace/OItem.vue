<template>
    <li class="list-item">
        <a class="img" slot="reference" :href="'/ospace/index?id='+item.id" target="_blank">
            <img :src="qiniuAddress+item.picture">
        </a>
        <div class="content">
            <a class="title">
                <span>{{item.nick_name}}</span>
            </a>
            <p>{{item.profile}}</p>
        </div>
    </li>
</template>

<script>
export default {
    data() {
        return {
            qiniuAddress: this.Global,
            follow: this.att ? true : this.state
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
    width: 100%;
    border-bottom: 1px solid #eee;
    display: inline-flex;
    padding: 20px 0;
    position: relative;
    line-height: 1;
}
.img {
    border-radius: 48px;

}
.img img {
    border-radius: 60px;
    width: 60px;
    height: 60px;
}
.content {
    width: 80%;
    padding: 0 200px 0 0;
    position: relative;
    margin-left: 30px;
    margin-top: 10px;
}
.content .title {
    font-size: 16px;
    line-height: 1;
    display: inline-block;
    font-size: 18px;
    margin-bottom: 10px;
}
.content .title span {
    color: #fb7299;
}
.content p {
    line-height: 14px;
    font-size: 12px;
    color: #6d757a;
}
.content .action {
    display: flex;
    width: 102px;
    position: absolute;
    right: 0;
    top: 9px;
}
.content .action .follow {
    background-color: #e5e9ef;
    position: relative;
    border-radius: 4px;
    font-size: 12px;
    color: #6d757a;
    padding: 5px 10px;
    line-height: 16px;
    border: 0;
}
.content .action .no-follow {
    border: 1px solid darkorange;
    position: relative;
    border-radius: 4px;
    font-size: 12px;
    color: darkorange;
    padding: 5px 10px;
    line-height: 16px;
    cursor: pointer;
}
.content .action .more {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin: auto;
    text-align: center;
    margin: 4px 0 0 4px;
    background: url('../../assets/images/more.png') no-repeat
}
.i-frame-message .im-list {
    position: relative;
    display: block;
    padding: 6px;
    color: black;
    padding-left: 14px;
}
.i-frame-message .im-list:hover {
    color: #00a1d6;
	background-color: #f4f4f4 !important
}
</style>