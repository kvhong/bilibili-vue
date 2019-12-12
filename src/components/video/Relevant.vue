<template>
    <div id="reco_list" class="recommend-list report-wrap-module report-scroll-module" scrollshow="true">
        <div class="rec-title">                        
            相关推荐
        </div>
        <div class="rec-list">
            <div class="video-page-card">
                <RelevantItem v-for="item in relevant" :key="item.id" :item="item"></RelevantItem>
            </div>
        </div>
        <div class="rec-footer" style="display:;">展开</div>
    </div>
</template>

<script>
import RelevantItem from 'components/video/RelevantItem.vue'
export default {
    components: {
        RelevantItem
    },
    props: {
        relevant: {
            type: Array
        }
    }
}
</script>

<style scoped>
.recommend-list .rec-title {
    margin-top: 80px;
    font-size: 16px;
    color: #222;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 6px;
}
.video-page-card {
    padding: 6px 0;
}

.recommend-list .rec-footer {
    height: 42px;
    background: #f4f5f7;
    color: #6d7579;
    margin-top: 10px;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
}
</style>