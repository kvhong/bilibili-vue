<template>
    <div>
        <el-page-header @back="goBack">
        </el-page-header>
        <div class="edit">
            <div>
                <h1 class="title">文件信息</h1>
                <div class="video-info">
                    <i class="el-icon-video-camera" style="font-size: 36px;margin: 10px 0 0 10px;color: #00a1d6"></i>
                    <div class="info">
                        <h2>{{video_url}}</h2>
                    </div>
                </div>
            </div>
            <el-divider></el-divider>
            <div>
                <h1 class="title">基础信息</h1>
                <el-form ref="info" :model="form" :rules="rules">
                    <el-form-item>
                        <div class="container">
                            <h3>视频封面设置</h3>
                            <p>（格式jpeg、png，文件大小≤5MB）</p>
                        </div>
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            :auto-upload="false"
                            accept="image/jpeg,image/png,image/jpg"
                            :on-change="onPictureUploadChange"
                            style="margin: 10px 0 0 10px">
                            <img v-if="imageUrl || form.pic" :src="form.picture !== '' ? qiniuAddress+form.pic : imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <span class="upload-tip">上传封面</span>
                        </el-upload>
                    </el-form-item>
                    <!-- 待测试 -->
                    <el-form-item label="分区" prop="partition">
                        <br>
                        <el-select v-model="form.partition" placeholder="请选择" style="margin: 10px 0 0 10px;">
                            <el-option
                            v-for="item in partitions"
                            :key="item.id"
                            :label="item.partition_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <br>
                        <el-input type="text" v-model.trim="form.title" maxlength="50" placeholder="【类别】+ 标题" show-word-limit style="width: 50%;margin: 10px 0 0 10px;"></el-input>
                    </el-form-item>
                    <el-form-item label="标签   （标签上限为5个）" prop="tags">
                        <br>
                        <el-input
                            class="input-new-tag"
                            v-model.trim="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            style="margin-top: 10px;"
                            :disabled="tagInputDisabled"
                            >
                        </el-input>
                        <br>
                        <el-tag
                            :key="tag"
                            v-for="tag in form.tags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="简介">
                        <br>
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="填写更加全面的信息，让更多人能找到你的视频。"
                            v-model.trim="form.profile"
                            maxlength="250"
                            show-word-limit
                            style="width: 80%;margin: 10px 0 0 10px;">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="margin: 10px 0 0 10px;" @click="submit('info')">更新信息</el-button>
                        <el-button @click="cancel">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <Loading v-show="loading" :content="'上传中'"></Loading>
        <Success v-show="Suc" :content="successContent" v-on:close="sucClose"></Success>
        <Error v-show="Err" :content="errorContent" v-on:close="close"></Error>
    </div>
</template>

<script>
import Loading from 'components/dialog/Loading'
import Success from 'components/dialog/Success'
import Error from 'components/dialog/Error'
import { uploadApi, commonApi, videoApi } from 'api'
import { Message } from 'element-ui'
import * as qiniu from 'qiniu-js'
import { genUpToken } from 'api/qiniuToken.js'
export default {
    data() {
        const validateTags = (rule, value, callback) => {
            if (this.form.tags.length > 5) {
                callback(new Error('标签上限为5个'))
            } else {
                callback()
            }
        }
      return {
        loading: false,
        Suc: false,
        successContent: '',
        Err: false,
        errorContent: '',
        rules: {
            partition: [
                {required: true, message: '分区不可为空', trigger: 'blur'}
            ],
            title: [
                {required: true, message: '标题不可为空', trigger: 'blur'}
            ],
            tags: [
                {required: true, message: '标签不可为空', trigger: 'blur'},
                {required: true, trigger: 'blur', validator: validateTags}
            ]
        },
        qiniuAddress: this.Global,
        userInfo: this.UserInfo,
        videoInfo: Object,
        pictureFile: Object,
        imageUrl: '',
        video_url: '',
        form: {
            id: '',
            pic: '',
            partition: '',
            title: '',
            tags: [],
            profile: ''
        },
        partitions: [
        ],
        tagInputDisabled: false,
        inputValue: ''
      };
    },
    components: {
        Loading,
        Success,
        Error
    },
    watch: {
        '$route': 'getQuery'
    },
    methods: {
        sucClose() {
            this.Suc = false
        },
        close() {
            this.Err = false
        },
        getQuery() {
            this.videoInfo = this.$route.query.videoInfo
            if (this.videoInfo instanceof Object) {
                this.video_url = this.videoInfo.video_title+this.videoInfo.video_url.substring(this.videoInfo.video_url.lastIndexOf('.'))
                this.form.id = this.videoInfo.id
                this.form.pic = this.videoInfo.picture
                this.form.partition = this.videoInfo.partition_id
                this.form.title = this.videoInfo.video_title
                this.form.profile = this.videoInfo.profile
                this.form.tags = videoApi.tag(this.videoInfo.id)
            } else {
                this.$router.push({
                    path: '/upload/videoManage'
                })
            }
        },
        goBack() {
            this.$router.back(-1)
        },
        getPartition() {
            commonApi.getPartition().then((response) => {
				this.partitions = response
			})
        },
        onPictureUploadChange(file) {
            const isJPG = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'|| file.raw.type === 'image/jpg');
            const isLt2M = file.size / 1024 / 1024 <= 5;

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG,PNG 格式!');
                return false;
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return false;
            }
            this.imageUrl = URL.createObjectURL(file.raw);
            this.pictureFile = file.raw
            this.form.pic = 'image/videoPic/'+file.uid + file.name.substring(file.name.lastIndexOf('.'))
        },
        handleClose(tag) {
            this.form.tags.splice(this.form.tags.indexOf(tag), 1);
            if (this.form.tags.length < 5) {
                this.tagInputDisabled = false
            }
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (this.form.tags.indexOf(inputValue) !== -1) {
                return
            }
            if (inputValue) {
                this.form.tags.push(inputValue);
            }
            this.inputValue = '';
            if (this.form.tags.length >= 5) {
                this.tagInputDisabled = true
            }
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 弹出框提示正在上传，上传完成后结束
                    this.loading = true
                    var uptoken
                    var policy = {}
                    var bucketName = 'clideo'
                    var AK = 'qHZmqay_XNi5EezMzE6b4VpcAp4x2RG1gm-6xmBK'
                    var SK = '0Y2B5IgtX1BQQYnxV-TO3gnJsx-668-KM1yHRbiB'
                    var deadline = Math.round(new Date().getTime() / 1000) + 3600
                    policy.scope = bucketName
                    policy.deadline = deadline
                    uptoken = genUpToken(AK, SK, policy)
                    var videoKey = 'video/'+this.url
                    var pictureFile = this.pictureFile
                    var pictureKey = this.form.pic
                    let config = {
                        useCdnDomain: true,
                        region: qiniu.region.z2
                    }
                    let picturePutExtra = {
                        fname: this.form.pic,  //文件原文件名
                        params: {}, //用来放置自定义变量
                        mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                    }
                    var pictureComplete = false;
                    uploadApi.updateVideo({ 'id': this.videoInfo.id, 'title': this.form.title, 'describe': this.form.profile, 'authorId':  this.userInfo.iD, 'partitionId': this.form.partition, 'picture': this.form.pic, 'label': this.form.tags }).then((response) => {
                        if (response === '') {
                            var pictureObservable = qiniu.upload(pictureFile, pictureKey, uptoken, picturePutExtra, config)
                            pictureObservable.subscribe({
                                next: (result) => {
                                // 主要用来展示进度
                                    console.log(result)
                                },
                                error: (errResult) => {
                                // 失败报错信息
                                    console.log(errResult)
                                },
                                complete: (result) => {
                                // 接收成功后返回的信息
                                    console.log(result)
                                    pictureComplete = true
                                }
                            })
                            this.loading = false
                            if (pictureComplete){
                                this.successContent = '上传成功'
                                this.Suc = true
                                // Message.success('上传成功')
                            } else {
                                uploadApi.deleteVideo({ 'videoId': this.videoInfo.id, 'userId': this.userInfo.iD }).then((response) => {
                                    if (response === '') {
                                        this.errorContent = '上传失败'
                                        this.Err = true
                                        // Message.error('上传失败')
                                    } else {
                                        Message.error('错误',response)
                                    }
                                })
                            }
                        } else {
                            Message.error('上传失败',response)
                        }
                    })
                } else {
                    return false
                }
            })
        },
        cancel() {
            this.file = ''
            this.form = {
                pic: '',
                partition: '',
                title: '',
                tags: [],
                profile: ''
            }
            this.goBack()
        }
    },
    mounted() {
        this.getQuery()
        this.getPartition()
    }
}
</script>

<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
    margin: 20px 0;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.upload-tip {
    position: absolute;
    left: 10px;
    bottom: 0;
    font-size: 12px;
    color: #fff;
    text-align: center;
    width: 60px;
    line-height: 22px;
    border-radius: 4px 0 4px 0;
    background: #999;
}
.container {
    display: inline-flex;
    align-items: center;
}
p {
    font-size: 12px;
    color: #6d757a;
    line-height: 21px;
    margin-left: 6px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.input-new-tag {
    width: 200px;
    margin-left: 10px;
    vertical-align: bottom;
}
.video-info {
    display: inline-flex;
    align-items: center;
}
.info {
    margin-left: 20px;
}
.info h2 {
    font-size: 18px;
    font-weight: bold;
    font-family: "Microsoft YaHei";
}
.size {
    margin: 15px 0 0 5px;
    display: inline-flex;
    align-items: center;
}
.size h3 {
    font-size: 14px;
}
.size span {
    margin-left: 10px;
    font-size: 12px;
}
</style>