
// const serverRoot = `${process.env.NODE_ENV === 'production' ? 'http://118.31.102.1:8100/' : 'http://127.0.0.1:8100/'}`
const serverRoot = 'http://www.clideo.cn:8100/'

// 登录
export const login = '/user-api/login'

// 注销
export const logout = '/user-api/logout'

// 注册
export const register = '/user-api/register/'

// 判断用户名是否存在
export const userNameIsExist = '/user-api/common/userNameIsExist'

// 判断昵称是否存在
export const nickNameIsExist = '/user-api/common/nickNameIsExist'

// 发送短信验证码
export const sendMessage = '/user-api/sendMsg/'

// 轮播图
export const banner = '/home-api/banner/'

// 分页轮播图
export const bannerList = '/home-api/banner/get'

// 搜索
export const search = '/home-api/search/'

// 搜索用户
export const searchUser = '/home-api/search/searchUser'

// 搜索视频
export const searchVideo = '/home-api/search/searchVideo'

// 一天，三天，一周排行榜
export const ranking = '/home-api/home/hotByTime'

// 更新排行榜
export const updateRank = '/home-api/home/updateHot'

// 观看数增加
export const watch = '/home-api/home/watch'

// // 推广
// export const promote = serverRoot + '/promote'

// // 直播
// export const live = serverRoot + '/live'

// 获取分区
export const getPartition = '/home-api/home/getPartition'

// 具体内容
export const content = '/home-api/home/getPartitionAndVideo'

// 获取分区视频
export const videoByPar = '/home-api/home/getVideoByPar'

// 刷新分区视频
export const updateRows = '/home-api/home/updateRows'

// 排行
export const contentrank = '/home-api/home/hotByPar'

// 视频信息
export const videoInfo = '/video-api/video/'

// 获取评论
export const getComment = '/collect-api/comment/get'

// 获取视频标签
export const tag = '/label-api/label/getVideoLabel'

//获取相关推荐
export const relevant = '/video-api/relevant/getRelevant'

// 点赞视频
export const videoPraise = '/user-api/praise/videoPraise'

// 点赞评论
export const commentPraise = '/user-api/praise/commentPraise'

// 点赞状态
export const likeState = '/collect-api/videoCollection/likeState'

// 收藏视频
export const videoCollect = '/user-api/videoCollect/'

// 关注作者
export const attention = '/user-api/attention/'

// 关注列表
export const attentionList = '/collect-api/attention/getAttention'

// 粉丝列表
export const fansList = '/collect-api/attention/getFans'

// 取消关注
export const cancelAttention = '/collect-api/attention/cancel'

// 关注状态(true:已关注,false:未关注)
export const attentionState = '/collect-api/attention/state'

// 评论
export const comment = '/user-api/comment/'

// 用户信息
export const getInfo = '/user-api/common/getInfo'

// 修改用户信息
export const updateInfo = '/user-api/userInfo/updateInfo'

// 修改密码
export const updatePassword = '/user-api/userInfo/updatePassword'

// 修改头像
export const updateIcon = '/user-api/userInfo/updateIcon'

// 修改邮箱
export const updateEmail = '/user-api/userInfo/updateEmail'

// 修改手机
export const updatePhone = '/user-api/userInfo/updatePhone'

// 比较密码
export const comparePassword = '/user-api/common/comparePassword'

// 个人视频
export const spaceVideo = '/personalVideo-api/userVideo/'

// 个人视频数量
export const videoNum = '/personalVideo-api/userVideo/videoNum'

// 最多播放--个人
export const mostPlay = '/personalVideo-api/userVideo/mostPlay'

// 最多收藏
export const mostCollect = '/personalVideo-api/userVideo/mostCollect'

// 审核中视频
export const underReview = '/personalVideo-api/userVideo/noPassVideos'

// 审核视频数量
export const underReviewNum = '/personalVideo-api/userVideo/noPassNum'

// 已删除视频
export const deletedVideo = '/personalVideo-api/userVideo/deletedVideos'

// 已删除数量
export const deletedNum = '/personalVideo-api/userVideo/deletedNum'

// 收藏列表
export const fav = '/collect-api/videoCollection/getCollections'

// 全部收藏列表
export const favTotal = '/collect-api/videoCollection/getAll'

// 收藏数量
export const favNum = '/collect-api/videoCollection/getCollectNum'

// 取消收藏
export const cancelCollect = '/collect-api/videoCollection/cancelCollect'

// 收藏状态
export const collectState = '/collect-api/videoCollection/collectState'

// 最多播放--收藏
export const favMostPlay = '/collect-api/videoCollection/favMostPlay'

// 最新上传
export const newUpload = '/collect-api/videoCollection/newUpload'

// 获取用户标签
export const userTags = '/label-api/label/getUserLabel'

// 更新标签
export const updateUserTag = '/label-api/label/updateUserLabel'

// 修改头图
export const updateToutu = '/user-api/userInfo/updateToutu'

// 修改展示状态
export const updateState = '/user-api/userInfo/updateState'

// 上传视频
export const uploadVideo = '/personalVideo-api/userVideo/uploadVideo'

// 更新视频
export const updateVideo = '/personalVideo-api/userVideo/updateVideo'

// 获取视频评论区
export const videoComments = '/collect-api/comment/getVideoComments'

// 修改评论状态
export const changeState = '/collect-api/comment/changeState'

// 搜索视频评论
export const searchComment = '/collect-api/comment/searchComment'

// 视频管理列表
export const videoManage = '/personalVideo-api/userVideo/videoManage'

// 删除视频
export const deleteVideo = '/personalVideo-api/userVideo/deleteVideo'

// 取消上传
export const cancelUpload = '/personalVideo-api/userVideo/cancelUpload'

// 点赞消息
export const getLike = '/home-api/message/getLike'

// 回复消息
export const getReply = '/home-api/message/getReply'

// 关注消息
export const getAttention = '/home-api/message/getAttention'

// 系统通知
export const getNotice = '/home-api/notice/get'

// // 登录
// export const login = serverRoot + 'userInfo-server/login'

// // 注销
// export const logout = serverRoot + 'userInfo-server/logout'

// // 注册
// export const register = serverRoot + 'userInfo-server/register/'

// // 判断用户名是否存在
// export const userNameIsExist = serverRoot + 'userInfo-server/common/userNameIsExist'

// // 判断昵称是否存在
// export const nickNameIsExist = serverRoot + 'userInfo-server/common/nickNameIsExist'

// // 发送短信验证码
// export const sendMessage = serverRoot + 'userInfo-server/sendMsg/'

// // 轮播图
// export const banner = serverRoot + 'home-server/banner/'

// // 分页轮播图
// export const bannerList = serverRoot + 'home-server/banner/get'

// // 搜索
// export const search = serverRoot + 'home-server/search/'

// // 搜索用户
// export const searchUser = serverRoot + 'home-server/search/searchUser'

// // 搜索视频
// export const searchVideo = serverRoot + 'home-server/search/searchVideo'

// // 一天，三天，一周排行榜
// export const ranking = serverRoot + 'home-server/home/hotByTime'

// // 更新排行榜
// export const updateRank = serverRoot + 'home-server/home/updateHot'

// // 观看数增加
// export const watch = serverRoot + 'home-server/home/watch'

// // // 推广
// // export const promote = serverRoot + '/promote'

// // // 直播
// // export const live = serverRoot + '/live'

// // 获取分区
// export const getPartition = serverRoot + 'home-server/home/getPartition'

// // 具体内容
// export const content = serverRoot + 'home-server/home/getPartitionAndVideo'

// // 获取分区视频
// export const videoByPar = serverRoot + 'home-server/home/getVideoByPar'

// // 刷新分区视频
// export const updateRows = serverRoot + 'home-server/home/updateRows'

// // 排行
// export const contentrank = serverRoot + 'home-server/home/hotByPar'

// // 视频信息
// export const videoInfo = serverRoot + 'videoInfo-server/video/'

// // 获取评论
// export const getComment = serverRoot + 'collect-server/comment/get'

// // 获取视频标签
// export const tag = serverRoot + 'label-server/label/getVideoLabel'

// //获取相关推荐
// export const relevant = serverRoot + 'videoInfo-server/relevant/getRelevant'

// // 点赞视频
// export const videoPraise = serverRoot + 'userInfo-server/praise/videoPraise'

// // 点赞评论
// export const commentPraise = serverRoot + 'userInfo-server/praise/commentPraise'

// // 点赞状态
// export const likeState = serverRoot + 'collect-server/videoCollection/likeState'

// // 收藏视频
// export const videoCollect = serverRoot + 'userInfo-server/videoCollect/'

// // 关注作者
// export const attention = serverRoot + 'userInfo-server/attention/'

// // 关注列表
// export const attentionList = serverRoot + 'collect-server/attention/getAttention'

// // 粉丝列表
// export const fansList = serverRoot + 'collect-server/attention/getFans'

// // 取消关注
// export const cancelAttention = serverRoot + 'collect-server/attention/cancel'

// // 关注状态(true:已关注,false:未关注)
// export const attentionState = serverRoot + 'collect-server/attention/state'

// // 评论
// export const comment = serverRoot + 'userInfo-server/comment/'

// // 用户信息
// export const getInfo = serverRoot + 'userInfo-server/common/getInfo'

// // 修改用户信息
// export const updateInfo = serverRoot + 'userInfo-server/userInfo/updateInfo'

// // 修改密码
// export const updatePassword = serverRoot + 'userInfo-server/userInfo/updatePassword'

// // 修改头像
// export const updateIcon = serverRoot + 'userInfo-server/userInfo/updateIcon'

// // 修改邮箱
// export const updateEmail = serverRoot + 'userInfo-server/userInfo/updateEmail'

// // 修改手机
// export const updatePhone = serverRoot + 'userInfo-server/userInfo/updatePhone'

// // 比较密码
// export const comparePassword = serverRoot + 'userInfo-server/common/comparePassword'

// // 个人视频
// export const spaceVideo = serverRoot + 'personalVideo-server/userVideo/'

// // 个人视频数量
// export const videoNum = serverRoot + 'personalVideo-server/userVideo/videoNum'

// // 最多播放--个人
// export const mostPlay = serverRoot + 'personalVideo-server/userVideo/mostPlay'

// // 最多收藏
// export const mostCollect = serverRoot + 'personalVideo-server/userVideo/mostCollect'

// // 审核中视频
// export const underReview = serverRoot + 'personalVideo-server/userVideo/noPassVideos'

// // 审核视频数量
// export const underReviewNum = serverRoot + 'personalVideo-server/userVideo/noPassNum'

// // 已删除视频
// export const deletedVideo = serverRoot + 'personalVideo-server/userVideo/deletedVideos'

// // 已删除数量
// export const deletedNum = serverRoot + 'personalVideo-server/userVideo/deletedNum'

// // 收藏列表
// export const fav = serverRoot + 'collect-server/videoCollection/getCollections'

// // 全部收藏列表
// export const favTotal = serverRoot + 'collect-server/videoCollection/getAll'

// // 收藏数量
// export const favNum = serverRoot + 'collect-server/videoCollection/getCollectNum'

// // 取消收藏
// export const cancelCollect = serverRoot + 'collect-server/videoCollection/cancelCollect'

// // 收藏状态
// export const collectState = serverRoot + 'collect-server/videoCollection/collectState'

// // 最多播放--收藏
// export const favMostPlay = serverRoot + 'collect-server/videoCollection/favMostPlay'

// // 最新上传
// export const newUpload = serverRoot + 'collect-server/videoCollection/newUpload'

// // 获取用户标签
// export const userTags = serverRoot + 'label-server/label/getUserLabel'

// // 更新标签
// export const updateUserTag = serverRoot + 'label-server/label/updateUserLabel'

// // 修改头图
// export const updateToutu = serverRoot + 'userInfo-server/userInfo/updateToutu'

// // 修改展示状态
// export const updateState = serverRoot + 'userInfo-server/userInfo/updateState'

// // 上传视频
// export const uploadVideo = serverRoot + 'personalVideo-server/userVideo/uploadVideo'

// // 更新视频
// export const updateVideo = serverRoot + 'personalVideo-server/userVideo/updateVideo'

// // 获取视频评论区
// export const videoComments = serverRoot + 'collect-server/comment/getVideoComments'

// // 修改评论状态
// export const changeState = serverRoot + 'collect-server/comment/changeState'

// // 搜索视频评论
// export const searchComment = serverRoot + 'collect-server/comment/searchComment'

// // 视频管理列表
// export const videoManage = serverRoot + 'personalVideo-server/userVideo/videoManage'

// // 删除视频
// export const deleteVideo = serverRoot + 'personalVideo-server/userVideo/deleteVideo'

// // 取消上传
// export const cancelUpload = serverRoot + 'personalVideo-server/userVideo/cancelUpload'

// // 点赞消息
// export const getLike = serverRoot + 'home-server/message/getLike'

// // 回复消息
// export const getReply = serverRoot + 'home-server/message/getReply'

// // 关注消息
// export const getAttention = serverRoot + 'home-server/message/getAttention'

// // 系统通知
// export const getNotice = serverRoot + 'home-server/notice/get'