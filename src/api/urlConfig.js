
// const serverRoot = `${process.env.NODE_ENV === 'production' ? 'http://118.31.102.1:8100/' : 'http://127.0.0.1:8100/'}`
const serverRoot = 'http://www.clideo.cn:8100/'

// 登录
export const login = '/userInfo-server/login'

// 注销
export const logout = '/userInfo-server/logout'

// 注册
export const register = '/userInfo-server/register/'

// 判断用户名是否存在
export const userNameIsExist = '/userInfo-server/common/userNameIsExist/'

// 判断昵称是否存在
export const nickNameIsExist = '/userInfo-server/common/nickNameIsExist/'

// 手机号是否存在
export const phoneIsExist = '/userInfo-server/common/phoneIsExist/'

// 邮箱是否存在
export const emailIsExist = '/userInfo-server/common/emailIsExist/'

// 发送短信验证码
export const sendMessage = '/userInfo-server/sendMsg/'

// 发送邮件验证码
export const sendEmail = '/userInfo-server/sendEmail/'

// 点赞视频
export const videoPraise = '/userInfo-server/praise/videoPraise'

// 点赞评论
export const commentPraise = '/userInfo-server/praise/commentPraise'

// 收藏视频
export const videoCollect = '/userInfo-server/videoCollect/'

// 关注作者
export const attention = '/userInfo-server/attention/'

// 评论
export const comment = '/userInfo-server/comment/'

// 用户信息
export const getInfo = '/userInfo-server/common/getInfo/'

// 修改用户信息
export const updateInfo = '/userInfo-server/userInfo/updateInfo'

// 修改密码
export const updatePassword = '/userInfo-server/userInfo/updatePassword'

// 修改头像
export const updateIcon = '/userInfo-server/userInfo/updateIcon'

// 修改邮箱
export const updateEmail = '/userInfo-server/userInfo/updateEmail'

// 修改手机
export const updatePhone = '/userInfo-server/userInfo/updatePhone'

// 比较密码
export const comparePassword = '/userInfo-server/common/comparePassword'

// 修改头图
export const updateToutu = '/userInfo-server/userInfo/updateToutu'

// 修改展示状态
export const updateState = '/userInfo-server/userInfo/updateState'

// 取消关注
export const cancelAttention = '/userInfo-server/attention/cancel'

// 取消收藏
export const cancelCollect = '/userInfo-server/videoCollect/cancelCollect'

// 修改评论状态
export const changeState = '/userInfo-server/comment/changeState/'




// 个人视频
export const spaceVideo = '/personalVideo-server/userVideo/'

// 个人视频数量
export const videoNum = '/personalVideo-server/userVideo/videoNum/'

// 最多播放--个人
export const mostPlay = '/personalVideo-server/userVideo/mostPlay'

// 最多收藏
export const mostCollect = '/personalVideo-server/userVideo/mostCollect'

// 审核中视频
export const underReview = '/personalVideo-server/userVideo/noPassVideos'

// 审核视频数量
export const underReviewNum = '/personalVideo-server/userVideo/noPassNum/'

// 已删除视频
export const deletedVideo = '/personalVideo-server/userVideo/deletedVideos'

// 已删除数量
export const deletedNum = '/personalVideo-server/userVideo/deletedNum/'

// 上传视频
export const uploadVideo = '/personalVideo-server/userVideo/uploadVideo'

// 更新视频
export const updateVideo = '/personalVideo-server/userVideo/updateVideo'

// 视频管理列表
export const videoManage = '/personalVideo-server/userVideo/videoManage'

// 删除视频
export const deleteVideo = '/personalVideo-server/userVideo/deleteVideo'

// 取消上传
export const cancelUpload = '/personalVideo-server/userVideo/cancelUpload'



// 获取评论
export const getComment = '/collect-server/comment/get'

// 点赞状态
export const likeState = '/collect-server/videoCollection/likeState'

// 关注列表
export const attentionList = '/collect-server/attention/getAttention'

// 粉丝列表
export const fansList = '/collect-server/attention/getFans'

// 关注状态(true:已关注,false:未关注)
export const attentionState = '/collect-server/attention/state'

// 收藏列表
export const fav = '/collect-server/videoCollection/getCollections'

// 全部收藏列表
export const favTotal = '/collect-server/videoCollection/getAll/'

// 收藏数量
export const favNum = '/collect-server/videoCollection/getCollectNum/'

// 收藏状态
export const collectState = '/collect-server/videoCollection/collectState'

// 最多播放--收藏
export const favMostPlay = '/collect-server/videoCollection/favMostPlay'

// 最新上传
export const newUpload = '/collect-server/videoCollection/newUpload'

// 获取视频评论区
export const videoComments = '/collect-server/comment/getVideoComments'

// 搜索视频评论
export const searchComment = '/collect-server/comment/searchComment'




// 轮播图
export const banner = '/home-server/banner/'

// 分页轮播图
export const bannerList = '/home-server/banner/get'

// 搜索
export const search = '/home-server/search/'

// 搜索用户
export const searchUser = '/home-server/search/searchUser'

// 搜索视频
export const searchVideo = '/home-server/search/searchVideo'

// 一天，三天，一周排行榜
export const ranking = '/home-server/home/hotByTime/'

// 更新排行榜
export const updateRank = '/home-server/home/updateHot'

// 观看数增加
export const watch = '/home-server/home/watch/'

// // 推广
// export const promote = serverRoot + '/promote'

// // 直播
// export const live = serverRoot + '/live'

// 获取分区
export const getPartition = '/home-server/home/getPartition'

// 具体内容
export const content = '/home-server/home/getPartitionAndVideo/8'

// 获取分区视频
export const videoByPar = '/home-server/home/getVideoByPar'

// 刷新分区视频
export const updateRows = '/home-server/home/updateRows/'

// 排行
export const contentrank = '/home-server/home/hotByPar/'

// 点赞消息
export const getLike = '/home-server/message/getLike'

// 回复消息
export const getReply = '/home-server/message/getReply'

// 关注消息
export const getAttention = '/home-server/message/getAttention'

// 系统通知
export const getNotice = '/home-server/notice/get'




// 视频信息
export const videoInfo = '/videoInfo-server/video/'

//获取相关推荐
export const relevant = '/videoInfo-server/relevant/getRelevant'




// 获取视频标签
export const tag = '/label-server/label/getVideoLabel/'

// 获取用户标签
export const userTags = '/label-server/label/getUserLabel/'

// 更新标签
export const updateUserTag = '/label-server/label/updateUserLabel'










