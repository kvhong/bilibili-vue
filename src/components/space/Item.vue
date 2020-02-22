<template>
    <li class="list-item">
        <el-popover
        placement="right"
        width="150"
        trigger="hover">
            <AuthorInfoTool v-on:listenAtt="changeAtt" :item="item.info" :videoInfo="false" :att="follow"></AuthorInfoTool>
            <a class="img" slot="reference" :href="'/ospace/index?id='+item.id" target="_blank">
                <img :src="qiniuAddress+item.picture">
            </a>
        </el-popover>
        <div class="content">
            <a class="title">
                <span>{{item.nick_name}}</span>
            </a>
            <p>{{item.profile}}</p>
            <div class="action">
                <el-popover
                placement="bottom"
                width="150"
                trigger="hover">
                    <div class="i-frame-message">
                        <a class="im-list" @click="cancelFollow" :disabled="cancelDisabled">
                            取消关注
                        </a>
                    </div>
                    <div class="follow" slot="reference" v-show="follow">
                        <span>已关注</span>
                        <i class="el-icon-arrow-down"></i>
                    </div>
                </el-popover>
                <div class="no-follow" v-show="!follow" @click="toFollow" :disabled="followDisabled">
                    <span>+ 关注</span>
                </div>
                <el-popover
                placement="bottom"
                width="150"
                trigger="hover">
                    <div class="i-frame-message">
                        <a class="im-list">
                            发消息
                        </a>
                    </div>
                    <div class="more" slot="reference"></div>
                </el-popover>
            </div>
        </div>
    </li>
</template>

<script>
import AuthorInfoTool from 'components/video/AuthorInfoTool'
import { commonApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            qiniuAddress: this.Global,
            follow: this.att ? true : this.state,
            isShow: false,
            state: Boolean,
            cancelDisabled: false,
            followDisabled: false
        }
    },
    props: {
        item: {
            type: Object
        },
        att: {
            type: Boolean
        }
    },
    components: {
        AuthorInfoTool
    },
    methods: {
        changeAtt(val) {
            this.follow = val
        },
        attentionState() {
            commonApi.attentionState({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                this.state = response
            })
        },
        cancelFollow() {
            if (!this.cancelDisabled) {
                commonApi.cancelAttention({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                    if (response === '') {
                        this.follow = false
                        this.cancelTimeout()
                        Message.success('取消关注成功')
                    } else {
                        Message.error('取消关注失败')
                    }
                })
            } else {
                this.cancelTimeout()
                Message.warning('请勿频繁操作，10秒后再试！')
            }
        },
        toFollow() {
            if (!this.followDisabled) {
                commonApi.attention({ 'userId': this.userInfo.iD, 'attentionUserId': this.item.id }).then((response) => {
                    if (response === '') {
                        this.follow = true
                        this.followTimeout()
                        Message.success('关注成功')
                    } else {
                        Message.error('关注失败')
                    }
                })
            } else {
                this.followTimeout()
                Message.warning('请勿频繁操作，10秒后再试！')
            }
        },
        cancelTimeout() {
            this.cancelDisabled = true
            setTimeout(() => {
                this.cancelDisabled = false
            }, 10000)
        },
        followTimeout() {
            this.followDisabled = true
            setTimeout(() => {
                this.followDisabled = false
            }, 10000)
        }
    },
    mounted() {
        if (!this.att) {
            this.attentionState()
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