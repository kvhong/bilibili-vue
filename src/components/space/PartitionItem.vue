<template>
    <li class="contribution-item" :class="active ? 'cur' : ''" @click="click">
        <a class="text">{{item.partition_name}}</a>
        <span class="num">{{item.num}}</span>
    </li>
</template>

<script>
export default {
    data() {
        return {
            active: false
        }
    },
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        click() {
            this.active = !this.active
            this.$emit('listenActive', this.active+';'+this.item.partition_name)
        }
    }
}
</script>

<style scoped>
.contribution-sidenav .contribution-item.cur {
    background-color: #00a1d6;
}
.contribution-sidenav .contribution-item {
    position: relative;
    padding-left: 30px;
    transition: background-color .3s ease;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
}
.contribution-sidenav .contribution-item .text:hover {
    color: #00a1d6
}
.contribution-sidenav .contribution-item.cur .num, .contribution-sidenav .contribution-item.cur .text {
    color: #fff;
}
.contribution-sidenav .text {
    display: inline-block;
    line-height: 44px;
    width: 100px;
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.contribution-sidenav .num {
    display: inline-block;
    width: 32px;
    font-size: 12px;
    color: #99a2aa;
    vertical-align: middle;
    text-align: center;
    font-family: Arial;
}
</style>