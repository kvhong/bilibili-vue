
const serverRoot = `${process.env.NODE_ENV === 'production' ? 'http://118.31.102.1' : 'http://127.0.0.1'}`

// 登录
export const login = '/api/login'

// 注册
export const register = '/api/register/'

// 判断用户名是否存在
export const userNameIsExist = '/api/common/userNameIsExist'

// 判断昵称是否存在
export const nickNameIsExist = '/api/common/nickNameIsExist'

// 发送短信验证码
export const sendMessage = '/api/sendMsg/'


export const banner = serverRoot + '/banner'

// 一天，三天，一周排行榜
export const ranking = serverRoot + ':8500/home/hotByTime'

// 更新排行榜
export const updateRank = serverRoot + ':8500/home/updateHot'

// 推广
export const promote = serverRoot + '/promote'

// 直播
export const live = serverRoot + '/live'

// 具体内容
export const content = serverRoot + ':8500/home/getPartitionAndVideo'

// 获取分区视频
export const videoByPar = serverRoot + ':8500/home/getVideoByPar'

// 刷新分区视频
export const updateRows = serverRoot + ':8500/home/updateRows'

// 排行
export const contentrank = serverRoot + ':8500/home/hotByPar'

// 视频信息
export const videoInfo = serverRoot + ':8700/video/'

// 获取评论
export const getComment = serverRoot + ':9000/comment/get'

// 获取视频标签
export const tag = serverRoot + ':8900/label/getVideoLabel'

//获取相关推荐
export const relevant = serverRoot + ':8800/relevant/getRelevant'

// 点赞视频
export const videoPraise = '/api/praise/videoPraise'

// 点赞评论
export const commentPraise = '/api/praise/commentPraise'

// 收藏视频
export const videoCollect = '/api/videoCollect/'

// 关注作者
export const attention = '/api/attention/'

// 评论
export const comment = '/api/comment/'

// 修改用户信息
export const updateInfo = '/api/userInfo/updateInfo'

// 修改密码
export const updatePassword = '/api/userInfo/updatePassword'

// 修改头像
export const updateIcon = '/api/userInfo/updateIcon'

// 修改邮箱
export const updateEmail = '/api/userInfo/updateEmail'

// 修改手机
export const updatePhone = '/api/userInfo/updatePhone'

// 比较密码
export const comparePassword = '/api/common/comparePassword'

// 个人视频
export const spaceVideo = serverRoot + ':8300/userVideo/'

// 个人视频数量
export const videoNum = serverRoot + ':8300/userVideo/videoNum'

// 最多播放
export const mostPlay = serverRoot + ':8300/userVideo/mostPlay'

// 最多收藏
export const mostCollect = serverRoot + ':8300/userVideo/mostCollect'

// 审核中视频
export const underReview = serverRoot + ':8300/userVideo/noPassVideos'

// 审核视频数量
export const underReviewNum = serverRoot + ':8300/userVideo/noPassNum'

// 已删除视频
export const deletedVideo = serverRoot + ':8300/userVideo/deletedVideos'

// 已删除数量
export const deletedNum = serverRoot + ':8300/userVideo/deletedNum'

// 收藏列表
export const fav = serverRoot + ':8400/videoCollection/getCollections'

// 收藏数量
export const favNum = serverRoot + ':8400/videoCollection/getCollectNum'

// 取消收藏
export const cancelCollect = serverRoot + ':8400/videoCollection/cancelCollect'