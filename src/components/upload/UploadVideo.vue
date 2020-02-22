<template>
    <el-container>
        <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
                <el-menu-item index="uploadVideo">视频投稿</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <div style="height: 400px;overflow: auto">
                <div class="upload" v-show="!editShow">
                    <el-upload
                        id="uploadvideo"
                        drag
                        action=""
                        accept="video/mp4"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="onUploadChange">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">
                            <el-tooltip class="item" effect="light" placement="top-end">
                                <div slot="content">严禁发布违反国家相关法律的视频<br/>如有违法者，立即封禁账号，情节严重者将提交举报至相关机构处理</div>
                                <el-link style="font-size: 12px;margin-right: 10px;">禁止发布的视频内容</el-link>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" placement="top-end">
                                <div slot="content">上传的文件大小上限为2G<br/>视频内容时长最大3小时</div>
                                <el-link style="font-size: 12px;margin-right: 10px;">视频大小</el-link>
                            </el-tooltip>
                            <el-tooltip class="item" effect="light" placement="top-end">
                                <div slot="content">推荐上传的格式为mp4<br/>(由于未实现视频转码，暂时不支持其他视频格式)</div>
                                <el-link style="font-size: 12px;margin-right: 10px;">视频格式</el-link>
                            </el-tooltip>
                        </div>
                    </el-upload>
                    <el-divider></el-divider>
                </div>
                <div class="edit" v-show="editShow">
                    <div>
                        <h1 class="title">文件信息</h1>
                        <div class="video-info">
                            <i class="el-icon-video-camera" style="font-size: 36px;margin: 10px 0 0 10px;color: #00a1d6"></i>
                            <div class="info">
                                <h2>{{videoFile.name}}</h2>
                                <div class="size">
                                    <h3>时长</h3>
                                    <span id="duration"></span>
                                </div>
                                <div class="size">
                                    <h3>文件大小</h3>
                                    <span>{{(videoFile.size/1024/1024).toFixed(2)}}MB</span>
                                </div>
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
                                <div style="display: flex">
                                    <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :auto-upload="false"
                                        accept="image/jpeg,image/png,image/jpg"
                                        :on-change="onPictureUploadChange"
                                        style="margin: 10px 0 0 10px;width: 260px;border: 1px dashed #99a2aa;border-radius: 4px;">
                                        <img v-if="imageUrl !== ''" :src="imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        <span class="upload-tip">上传封面</span>
                                    </el-upload>
                                    <div class="pic-list" style="display: none" id="pic-list">
                                        <div class="cover-v2-selector-deg"></div>
                                        <div>
                                            <p class="cover-v2-selector-title">以下为推荐封面。</p>
                                        </div>
                                        <div class="cover-v2-selector-items">
                                            <div class="selector-item" @click="selectPicture">
                                                <img src="" alt="ai_cover" class="select-ai-covers" id="select-ai-covers">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="分区" prop="partition">
                                <br>
                                <el-select v-model="form.partition" placeholder="请选择" @change="changePar" style="margin: 10px 0 0 10px;">
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
                                <el-button type="primary" style="margin: 10px 0 0 10px;" @click="submit('info')" :disabled="disabled">投稿</el-button>
                                <el-button @click="cancel">返回</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <Loading v-show="loading" :content="'上传中'"></Loading>
            <Success v-show="Suc" :content="successContent" v-on:close="sucClose"></Success>
            <Error v-show="Err" :content="errorContent" v-on:close="close"></Error>
        </el-main>
    </el-container>
</template>

<script>
import Loading from 'components/dialog/Loading'
import Success from 'components/dialog/Success'
import Error from 'components/dialog/Error'
import { uploadApi, commonApi } from 'api'
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
        disabled: false,
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
        userInfo: this.UserInfo,
        activeIndex: 'uploadVideo',
        videoFile: Object,
        pictureFile: Object,
        url: '',
        imageUrl: '',
        editShow: false,
        form: {
            pic: '',
            partition: '',
            title: '',
            tags: [],
            profile: '',
            duration: ''
        },
        partitions: [],
        tagInputDisabled: false,
        inputValue: ''
      };
    },
    components: {
        Loading,
        Success,
        Error
    },
    methods: {
        sucClose() {
            this.Suc = false
        },
        close() {
            this.Err = false
        },
        getPartition() {
            commonApi.getPartition().then((response) => {
				this.partitions = response
			})
        },
        handleSelect(key, keyPath) {
        },
        onUploadChange(file) {
            const isIMAGE = file.raw.type === 'video/mp4'
            const isLt1M = file.size / 1024 / 1024 / 1024 <= 2;

            if (!isIMAGE) {
                this.$message.error('上传文件只能是MP4格式!');
                return false;
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 2GB!');
                return false;
            }
            this.videoFile = file.raw
            let vurl = URL.createObjectURL(file.raw)
            var audioElement = new Audio(vurl)
            audioElement.addEventListener('loadedmetadata',function(){
                let playTime = audioElement.duration; //playTime就是当前视频长度
                var hour = Math.floor (playTime / 3600);
                var other = playTime % 3600;
                var minute = Math.floor (other / 60);
                var second = (other % 60).toFixed (0);
                if (hour < 10) {
                    hour = '0'+hour
                }
                if (minute < 10) {
                    minute = '0'+minute
                }
                if (second < 10) {
                    second = '0'+second
                }
                document.getElementById('duration').innerHTML = hour + ':' + minute + ':' + second
            })
            this.$nextTick(() => {
                let video = document.createElement("video");
                let source = document.createElement("source");
                source.src = vurl
                source.type = "video/mp4";
                video.appendChild(source);
                video.addEventListener("loadeddata", function() {
                    var canvas = document.createElement("canvas");
                    canvas.width = "320";
                    canvas.height = "320";
                    canvas
                        .getContext("2d")
                        .drawImage(video, 0, 0, canvas.width, canvas.width);
                    let imgsrc = canvas.toDataURL("image/png");
                    document.getElementById('pic-list').style.display = ''
                    document.getElementById('select-ai-covers').src = imgsrc
                })
            })
            
            this.url = file.uid + file.name.substring(file.name.lastIndexOf('.'))
            this.form.title = file.name.substring(0,file.name.lastIndexOf('.'))
            this.editShow = true
        },
        selectPicture() {
            this.imageUrl = document.getElementById('select-ai-covers').src
            this.pictureFile = this.dataURLtoFile(this.imageUrl,'image/png')
            this.form.pic = Number(Math.random()*Math.pow(10,13)).toFixed(0)+'.png'
            document.getElementById('pic-list').style.display = 'none'
        },
        dataURLtoFile(dataURI, type) {
            let binary = atob(dataURI.split(',')[1]);
            let array = [];
            for(let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type:type });
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
            this.form.pic = file.uid + file.name.substring(file.name.lastIndexOf('.'))
            document.getElementById('pic-list').style.display = ''
        },
        handleChange(value) {
        },
        changePar(value) {
            var par
            this.partitions.forEach(element => {
                if (element.id === value) {
                    par = element.partition_name
                    return
                }
            });
            var title = this.form.title
            this.form.title = '【'+par+'】' + title.substring(title.indexOf('】')+1)
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
                    if (!this.disabled) {
                        // 弹出框提示正在上传，上传完成后结束
                        this.loading = true
                        this.form.duration = document.getElementById('duration').innerHTML
                        var uptoken
                        var policy = {}
                        var bucketName = 'clideo'
                        var AK = 'qHZmqay_XNi5EezMzE6b4VpcAp4x2RG1gm-6xmBK'
                        var SK = '0Y2B5IgtX1BQQYnxV-TO3gnJsx-668-KM1yHRbiB'
                        var deadline = Math.round(new Date().getTime() / 1000) + 3600
                        policy.scope = bucketName
                        policy.deadline = deadline
                        uptoken = genUpToken(AK, SK, policy)
                        var videoFile = this.videoFile //Blob 对象，上传的文件
                        var videoKey = 'video/'+this.url
                        var pictureFile = this.pictureFile
                        var pictureKey
                        let picturePutExtra
                        if (this.form.pic !== '') {
                            pictureKey = 'image/videoPic/'+this.form.pic
                            picturePutExtra = {
                                fname: this.form.pic,  //文件原文件名
                                params: {}, //用来放置自定义变量
                                mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                            }
                        }
                        let config = {
                            useCdnDomain: true,
                            region: qiniu.region.z2
                        }
                        let videoPutExtra = {
                            fname: this.url,  //文件原文件名
                            params: {}, //用来放置自定义变量
                            mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                        }
                        var videoComplete = false;
                        var pictureComplete = false;
                        uploadApi.uploadVideo({ 'title': this.form.title, 'describe': this.form.profile, 'authorId':  this.userInfo.iD, 'url': 'video/'+this.url, 'partitionId': this.form.partition, 'picture': this.form.pic === '' ? '' : 'image/videoPic/'+this.form.pic, 'label': this.form.tags, 'duration': this.form.duration }).then((response) => {
                            if (response === '') {
                                var videoObservable = qiniu.upload(videoFile, videoKey, uptoken, videoPutExtra, config)
                                var pictureObservable
                                if (this.form.pic !== '') {
                                    pictureObservable = qiniu.upload(pictureFile, pictureKey, uptoken, picturePutExtra, config)
                                }
                                videoObservable.subscribe({
                                    next: (result) => {
                                    // 主要用来展示进度
                                        // console.log(result)
                                    },
                                    error: (errResult) => {
                                    // 失败报错信息
                                        // console.log(errResult)
                                    },
                                    complete: (result) => {
                                    // 接收成功后返回的信息
                                        // console.log(result)
                                        videoComplete = true
                                        if (this.form.pic !== '') {
                                            pictureObservable.subscribe({
                                                next: (result) => {
                                                // 主要用来展示进度
                                                    // console.log(result)
                                                },
                                                error: (errResult) => {
                                                // 失败报错信息
                                                    // console.log(errResult)
                                                },
                                                complete: (result) => {
                                                // 接收成功后返回的信息
                                                    // console.log(result)
                                                    pictureComplete = true
                                                    this.loading = false
                                                    if (videoComplete&&pictureComplete){
                                                        this.successContent = '上传成功'
                                                        this.Suc = true
                                                        this.timeout()
                                                        // Message.success('上传成功')
                                                        this.cancel()
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
                                                }
                                            })
                                        } else {
                                            this.loading = false
                                            if (videoComplete){
                                                this.successContent = '上传成功'
                                                this.Suc = true
                                                // Message.success('上传成功')
                                                this.timeout()
                                                this.cancel()
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
                                        }
                                        
                                    }
                                })
                            } else {
                                Message.error('上传失败',response)
                            }
                        }).catch(() => {
                            this.loading = false
                            this.errorContent = '服务器错误'
                            this.Err = true
                        })
                    } else {
                        this.timeout()
                        Message.warning('请勿频繁操作，5分钟后再试！')
                    }
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
            this.editShow = false
            this.imageUrl = ''
        },
        timeout() {
            this.disabled = true
            setTimeout(() => {
                this.disabled = false
            }, 300000)
        }
    },
    mounted() {
        this.getPartition()
    }
}
</script>

<style scoped>
.upload {
    text-align: center;
    margin: 20px 0 20px 0;
}
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
    width: 260px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 260px;
    height: 178px;
    display: block;
}
.pic-list {
    border: 1px solid #ccd0d7;
    border-radius: 4px;
    padding: 11px 10px;
    width: 160px;
    position: relative;
    height: 120px;
    margin: 20px 0 0 60px;
}
.pic-list .cover-v2-selector-deg {
    position: absolute;
    background-color: #fff;
    width: 15px;
    height: 15px;
    top: 55px;
    left: -8px;
    border-left: 1px solid #ccd0d7;
    border-bottom: 1px solid #ccd0d7;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 10;
}
.pic-list .cover-v2-selector-title {
    padding-left: 15px;
    color: #99a2aa;
}
.pic-list .cover-v2-selector-items {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: space-around;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.pic-list .cover-v2-selector-items .selector-item {
    margin-top: 12px;
    width: 120px;
    height: 75px;
    background: #f4f5f7;
    border-radius: 4px;
    line-height: 75px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.pic-list .cover-v2-selector-items .selector-item img.select-ai-covers {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 10;
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