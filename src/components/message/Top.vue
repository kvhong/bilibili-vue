<template>
    <div class="space-right-top">
        <div class="title">
            <div>
                <span>{{title}}</span>
            </div>
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
.space-right-top {
    padding: 10px 10px 0;
    z-index: 11;
}
.space-right-top .title {
    height: 42px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
    -ms-flex-negative: 0;
    flex-shrink: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 15px;
    color: #666;
    border-radius: 4px;
}
</style>