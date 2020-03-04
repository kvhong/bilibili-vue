<template>
    <div class="container">
        <div class="upload-box">
            <div  class="cropper-modal">
                <div class="overlay"></div> 
                <div class="modal">
                    <div class="modal-head">
                        <div class="head-wrap">
                            <a>
                                <router-link to="/center/headIcon">我的头像</router-link>
                            </a>
                            > 更换头像
                        </div>
                    </div> 
                    <div class="modal-content clearfix">
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            accept="image/png,image/jpg,image/jpeg"
                            :show-file-list="false"
                            :auto-upload="false"
                            :on-change="onUploadChange"
                            :disabled="uploadDisabled">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="border-line"></div> 
                        <div class="img-preview-wrap">
                            <div class="pre-container">
                                <img id="clip_res_img" :src="qiniuAddress+userInfo.picture">
                            </div> 
                            <div class="pre-info">当前头像</div>
                        </div>
                    </div> 
                    <p class="descript" style="font-size: 12px">请选择图片上传：支持JPG、PNG格式，图片需小于2M</p> 
                    <div class="modal-footer">
                        <input type="button" value="更新" :class="disabled ? 'modal-btn btn-confirm disabled' : 'modal-btn btn-confirm'" @click="submitUpload">
                    </div>
                </div>
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
import { centerApi } from 'api'
import { getToken, setToken } from 'api/auth.js'
import { Message } from 'element-ui'
import * as qiniu from 'qiniu-js'
import { genUpToken } from 'api/qiniuToken.js'
export default {
    inject: ['reload'],
    data() {
        return {
            loading: false,
            Suc: false,
            successContent: '',
            Err: false,
            errorContent: '',
            qiniuAddress: this.Global,
            userInfo: this.UserInfo,
            file: '',
            picture: '',
            imageUrl: '',
            disabled: true,
            uploadDisabled: false
        }
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
        submitUpload() {
            if (!this.disabled) {
                this.loading = true
                var uptoken
                var policy = {}
                var bucketName = 'clideo'
                var AK = 'AK'
                var SK = 'SK'
                var deadline = Math.round(new Date().getTime() / 1000) + 3600
                policy.scope = bucketName
                policy.deadline = deadline
                uptoken = genUpToken(AK, SK, policy)
                var file = this.file //Blob 对象，上传的文件
                var key = 'image/picture/'+this.picture
                let config = {
                    useCdnDomain: true,
                    region: qiniu.region.z2
                }
                let putExtra = {
                    fname: this.picture,  //文件原文件名
                    params: {}, //用来放置自定义变量
                    mimeType: null  //用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
                }
                centerApi.updateIcon({ 'id': this.userInfo.iD, 'picture': 'image/picture/'+this.picture }).then((response) => {
                    // 文件上传
                    if (response === '') {
                        var observable = qiniu.upload(file, key, uptoken, putExtra, config)
                        observable.subscribe({
                            next: (result) => {
                            // 主要用来展示进度
                                
                            },
                            error: (errResult) => {
                            // 失败报错信息
                                
                            },
                            complete: (result) => {
                            // 接收成功后返回的信息
                                this.loading = false
                                this.successContent = '更新成功'
                                this.Suc = true
                                this.userInfo.picture = 'image/picture/'+this.picture
                                setToken(this.userInfo)
                                // Message.success('更新成功')
                                this.$router.push({ path: '/center/headIcon'})
                                this.reload()
                            }
                        })
                    } else {
                        this.loading = false
                        this.errorContent = '更新失败'
                        this.Err = true
                        // Message.error('更新失败')
                    }
                }).catch(() => {
                    this.loading = false
                    this.errorContent = '服务器错误'
                    this.Err = true
                })
            } else {
                if (this.picture === '') {
                    Message.error('请选择图片')
                }
            }
        },
        onUploadChange(file) {
            if (!this.uploadDisabled) {
                const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'|| file.raw.type === 'image/jpg');
                const isLt1M = file.size / 1024 / 1024 < 2;

                if (!isIMAGE) {
                    this.$message.error('上传文件只能是图片格式!');
                    return false;
                }
                if (!isLt1M) {
                    this.$message.error('上传文件大小不能超过 2MB!');
                    return false;
                }
                this.imageUrl = URL.createObjectURL(file.raw);
                this.file = file.raw
                this.picture = file.uid + file.name.substring(file.name.lastIndexOf('.'))
                this.disabled = false
                this.timeout()
            } else {
                this.timeout()
                Message.warning('请勿频繁操作，1分钟后再试！')
            }
            
        },
        timeout() {
            this.uploadDisabled = true
            setTimeout(() => {
                this.uploadDisabled = false
            }, 60000)
        }
    }
}
</script>

<style scoped>
.container {
    float: left;
    width: 829px;
    border-left: 1px solid #ddd;
    min-height: 850px;
    background: #fff;
}
.container .upload-box {
    position: relative;
}
.cropper-modal .modal {
    width: 830px;
    text-align: center;
}
.modal-head {
    position: relative;
    text-align: center;
    padding: 0 20px;
    border-bottom: 1px solid #e5e9ef;
}
.head-wrap {
    position: relative;
    font-size: 14px;
    color: #222;
    height: 50px;
    line-height: 50px;
    text-align: left;
}
.modal-head a {
    color: #6d757a;
}
.modal-content {
    padding: 80px 20px 56px;
    display: inline-block;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
.img-clip-wrap {
    float: left;
    position: relative;
    margin-right: 40px;
}
.container-bg {
    width: 180px;
    height: 180px;
    background-color: #000;
    border-radius: 4px;
    border: 1px solid #e5e9ef;
}
.img-container {
    position: relative;
    height: 0;
    margin: auto;
}
.img-container img {
    position: relative;
    width: 100%;
    height: 100%;
}
.img-container .shadow-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 1;
}
.crop-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    cursor: crosshair;
}
.shadow-box, .shadow-img {
    position: absolute;
    top: 0;
    left: 0;
}
.shadow-box {
    overflow: hidden;
    z-index: 1;
}
.shadow-img {
    position: absolute;
    top: 0;
    left: 0;
}
.crop-box {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    cursor: move;
    border: 1px solid #fff;
    z-index: 2;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.point-lt {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
}
.drag-point {
    display: inline-block;
    width: 10px;
    height: 10px;
    border: 1px solid #fff;
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.point-lb {
    left: -10px;
    bottom: -10px;
    cursor: sw-resize;
}
.point-rt {
    right: -10px;
    top: -10px;
    cursor: ne-resize;
}
.point-rb {
    right: -10px;
    bottom: -10px;
    cursor: se-resize;
}
.first-change-lb {
    cursor: pointer;
    background: #f1f2f5;
    width: 180px;
    height: 180px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #e5e9ef;
    border-radius: 4px;
    -webkit-transition: all .6s ease;
    transition: all .6s ease;
}
.first-change-lb i {
    margin: 52px auto 0;
    width: 54px;
    height: 46px;
    display: block;
    background: url('../../assets/images/icons_m_2.png');
    background-position: -101px -1065px;
}
.first-change-lb span {
    display: block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #6d757a;
    line-height: 20px;
    margin-top: 10px;
    padding: 0 12px;
    letter-spacing: 0;
}
.reset-img {
    position: absolute;
    bottom: -28px;
    left: 50%;
    -webkit-transform: translate(-50%);
    transform: translate(-50%);
}
.reset-img label {
    font-size: 12px;
    color: #6d757a;
    cursor: pointer;
}
.reset-img label i {
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: bottom;
    background-image: url('../../assets/images/icons_m_2.png');
    background-position: -23px -1303px;
    cursor: pointer;
}
#file_input {
    display: none;
}
.border-line {
    height: 182px;
    width: 1px;
    background: #e5e9ef;
    float: left;
}
.img-preview-wrap {
    margin-left: 40px;
    margin-top: 30px;
    float: left;
}
.pre-container {
    width: 96px;
    height: 96px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #e6eaf0;
    background-size: cover;
}
.pre-container img {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
.pre-info {
    margin-top: 20px;
    font-size: 12px;
    color: #99a2aa;
}
.descript {
    line-height: 16px;
    color: #99a2aa;
}
.modal-footer {
    text-align: center;
    margin-top: 40px;
}
.btn-confirm.disabled {
    background: #f4f5f7;
    border-color: #f4f5f7;
    color: #ccd0d7;
    cursor: auto;
}
.btn-confirm {
    border: 1px solid #00a1d6;
    color: #fff;
    background-color: #00a1d6;
}
.modal-btn {
    display: inline-block;
    width: 140px;
    height: 40px;
    font-size: 14px;
    line-height: 32px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
}
</style>