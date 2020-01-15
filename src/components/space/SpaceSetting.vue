<template>
    <div class="s-space">
        <div>
            <div id="page-setting" class="wrapper clearfix">
                <div class="col-full">
                    <div id="setting-privacy" class="section">
                        <h3 class="section-title">隐私设置</h3>
                        <div name="fav_video" class="setting-privacy-item">
                            <span class="setting-privacy-name">我的收藏</span>
                            <el-switch
                                v-model="collectSwitch"
                                active-text="公开"
                                inactive-text="隐藏"
                                @change="switchChange('collect')">
                            </el-switch>
                        </div>
                        <div name="user_info" class="setting-privacy-item">
                            <span class="setting-privacy-name">个人资料</span>
                            <el-switch
                                v-model="infoSwitch"
                                active-text="公开"
                                inactive-text="隐藏"
                                @change="switchChange('info')">
                            </el-switch>
                        </div>
                    </div>
                    <div id="setting-tags" class="section">
                        <h3 class="section-title">
                            我的个人标签
                            <span class="setting-tags-count"></span>
                        </h3>
                        <div class="setting-tags content">
                            <div class="setting-tag-list">
                                <el-tag
                                    :key="item"
                                    v-for="item in tags"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(item)"
                                    style="margin-right: 10px">
                                    {{item}}
                                </el-tag>
                            </div>
                            <div class="setting-add-tag">
                                <el-input type="text" maxlength="10" class="length-check" size="small" v-model.trim="tag"></el-input>
                                <span id="setting-new-tag-btn" @click="add">新增</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { spaceApi } from 'api'
import { Message } from 'element-ui'
import { setToken } from 'api/auth.js'
export default {
    data() {
        return {
            userInfo: this.UserInfo,
            collectSwitch: this.UserInfo.collect_state === 0 ? true : false,
            infoSwitch: this.UserInfo.info_state === 0 ? true : false,
            tag: '',
            tags: [
                
            ]
        }
    },
    methods: {
        getTags() {
            spaceApi.userTags(this.userInfo.iD).then((response) => {
                this.tags = response
            })
        },
        switchChange(val) {
            switch (val) {
                case 'collect':
                    let collectState = this.collectSwitch === true ? 0 : 1
                    spaceApi.updateState({ 'id': this.userInfo.iD, 'collectState': collectState }).then((response) => {
                        if (response === '') {
                            this.userInfo.collect_state = collectState
                            setToken(this.userInfo)
                        } else {
                            Message.error(response)
                        }
                    })
                    break;
                case 'info':
                    let infoState = this.infoSwitch === true ? 0 : 1
                    spaceApi.updateState({ 'id': this.userInfo.iD, 'infoState': infoState }).then((response) => {
                        if (response === '') {
                            this.userInfo.info_state = infoState
                            setToken(this.userInfo)
                        } else {
                            Message.error(response)
                        }
                    })
                    break;
            }
        },
        add() {
            this.tags.push(this.tag)
            this.tag = ''
            spaceApi.updateUserTag({ 'userId': this.userInfo.iD, 'labelId': this.tags }).then((response) => {
                if (response === '') {
                    Message.success('添加成功')
                } else {
                    Message.error('添加失败',response)
                }
            })
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1)
            spaceApi.updateUserTag({ 'userId': this.userInfo.iD, 'labelId': this.tags }).then((response) => {
                if (response === '') {
                    Message.success('删除成功')
                } else {
                    Message.error('删除失败',response)
                }
            })
        }
    }
}
</script>

<style scoped>
.clearfix {
    display: block;
}
.wrapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;
}
.col-full {
    background: #fff;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 4px;
    padding: 20px;
}
.section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;
}
.section-title {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    line-height: 33px;
    padding: 0 0 15px;
    position: relative;
}
#page-setting .setting-privacy-item {
    margin: 15px 0;
}
#page-setting .setting-privacy-item .setting-privacy-name {
    display: inline-block;
    width: 138px;
    font-size: 14px;
    color: #222;
}
.section:last-child {
    border-bottom: none;
    margin-bottom: 10px;
}
#page-setting .setting-tags-count {
    color: #aaa;
    font-size: 14px;
    margin-left: 10px;
}
#page-setting .setting-add-tag, #page-setting .setting-tag-list {
    display: inline-block;
}
#page-setting .length-check {
    width: 120px;
}
#page-setting #setting-new-tag-btn {
    font-size: 12px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
    padding: 0 15px;
    margin-left: -10px;
    transition: all .3s ease;
    color: #00a1d6;
    background: linear-gradient(#fff,#f7f9fa);
    border: 1px solid #ccd0d7;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

</style>