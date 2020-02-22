<template>
    <div class="comment-send">
        <div class="user-face">
            <img class="user-head" :src="userInfo !== '' ? qiniuAddress+userInfo.picture : qiniuAddress+userInfoPicture">
        </div>
        <div class="textarea-container">
            <i class="ipt-arrow"></i>
            <el-form ref="sendForm" :model="form" :rules="rules">
                <el-form-item prop="content">
                    <textarea cols="80" name="msg" rows="5" :placeholder="commentType === '2' ? '回复 @'+item.author+':' : placeholder" v-model="form.content" class="ipt-txt"></textarea>
                    <button type="primary" class="comment-submit" :disabled="disabled" v-on:click="toComment">发表评论</button>
                </el-form-item>
            </el-form>
        </div>
        <div class="comment-emoji">
            <i class="face"></i>
            <span class="text">表情</span>
        </div>
    </div>
</template>

<script>
import { getToken } from 'api/auth.js'
import { videoApi } from 'api'
import { Message } from 'element-ui'
export default {
    data() {
        return {
            placeholder: '请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。',
            disabled: getToken() === undefined ? true : false,
            qiniuAddress: this.Global,
            userInfo: this.UserInfo,
            userInfoPicture: 'noface.gif',
            form: {
                content: ''
            },
            rules: {
                content: [
                    {required: true, message: '内容不可为空', trigger: 'blur'}
                ]
            }
        }
    },
    props: {
        item: {
            type: Object
        },
        commentType: {
            type: String
        },
        send: {
            type: Object
        }
    },
    methods: {
        toComment() {
            if (!this.disabled) {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    videoApi.comment({ 
                        'videoId': this.item.id,
                        'commentContent': this.form.content,
                        'authorId': this.userInfo.iD,
                        'sendId': this.item.author_id,
                        'type': this.commentType
                    }).then((response) => {
                        if (response === '') {
                            this.timeout()
                            Message.success('评论成功')
                        } else {
                            Message.error('评论失败')
                        }
                    })
                }
            } else {
                if (this.userInfo === '') {
                    alert('请先登录')
                } else {
                    this.timeout()
                    Message.warning('请勿频繁操作，10秒后在试！')
                }
            }
        },
        timeout() {
            this.disabled = true
            setTimeout(() => {
                this.disabled = false
            }, 10000)
        }
    }
}
</script>

<style scoped>
.bb-comment .comment-send, .comment-bilibili-fold .comment-send {
    margin: 10px 0;
}
.bb-comment .comment-send .user-face, .comment-bilibili-fold .comment-send .user-face {
    float: left;
    margin: 24px 0 0 5px;
    position: relative;
}
.bb-comment .comment-send .user-face .user-head, .comment-bilibili-fold .comment-send .user-face .user-head {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}
.bb-comment img, .comment-bilibili-fold img {
    border: none;
    vertical-align: middle;
}
.bb-comment .comment-send .textarea-container, .comment-bilibili-fold .comment-send .textarea-container {
    position: relative;
    margin-left: 85px;
    margin-right: 80px;
}
.bb-comment .comment-send .textarea-container .ipt-arrow, .comment-bilibili-fold .comment-send .textarea-container .ipt-arrow {
    position: absolute;
    left: -12px;
    top: 22px;
    background: url(../../assets/images/icons-comment.png) -395px -340px no-repeat;
    width: 13px;
    height: 20px;
    display: inline-block;
    z-index: 2;
}
.bb-comment .comment-send .textarea-container textarea, .comment-bilibili-fold .comment-send .textarea-container textarea {
    font-size: 12px;
    display: inline-block;
    box-sizing: border-box;
    background-color: #f4f5f7;
    border: 1px solid #e5e9ef;
    overflow: auto;
    border-radius: 4px;
    color: #555;
    width: 100%!important;
    height: 65px;
    transition: 0s;
    padding: 5px 10px;
    line-height: normal;
}
.bb-comment textarea, .comment-bilibili-fold textarea {
    outline: none;
    resize: none;
}
.bb-comment .comment-send .comment-submit, .comment-bilibili-fold .comment-send .comment-submit {
    margin-top: 15px;
    width: 70px;
    height: 64px;
    position: absolute;
    right: -80px;
    top: 0;
    padding: 4px 15px;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    min-width: 60px;
    vertical-align: top;
    cursor: pointer;
    background-color: #00a1d6;
    border: 1px solid #00a1d6;
    transition: .1s;
    user-select: none;
    outline: none;
}
.bb-comment .comment-send .comment-submit:hover, .comment-bilibili-fold .comment-send .comment-submit:hover {
    background-color: #00b5e5;
    border-color: #00b5e5;
}
.bb-comment button, .comment-bilibili-fold button {
    box-sizing: border-box;
}
.bb-comment .comment-send .comment-emoji, .comment-bilibili-fold .comment-send .comment-emoji {
    padding: 0;
    width: 66px;
    height: 24px;
    color: #99a2aa;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    position: relative;
    z-index: 101;
    font-size: 12px;
    text-align: center;
    line-height: 23px;
    margin-left: 86px;
    margin-top: -100px;
    cursor: pointer;
    display: inline-block;
}
.bb-comment .comment-send .comment-emoji:hover {
    color: #6d757a
}
.bb-comment .comment-send .comment-emoji .face, .comment-bilibili-fold .comment-send .comment-emoji .face {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    width: 16px;
    height: 16px;
    margin-right: 5px;
    background: url(../../assets/images/icons-comment.png) no-repeat -408px -24px;
}
.bb-comment .comment-send .comment-emoji:hover .face, .comment-bilibili-fold .comment-send .comment-emoji.open .face, .comment-bilibili-fold .comment-send .comment-emoji:hover .face {
    background-position: -472px -24px;
}
.bb-comment .comment-send .comment-emoji .text, .comment-bilibili-fold .comment-send .comment-emoji .text {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 12px!important;
}
</style>