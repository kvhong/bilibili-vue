<template>
    <div id="footer">
    <div class="container auto-width">
      <div class="footer-top clearfix">
        <div class="footer-nav fl">
          <div class="item">
            <h4>合作</h4>
            <p>
              <a href="#">关于我们</a>
              <a href="#">联系我们</a>
              <br>
              <a href="#">CL招聘</a>
            </p>
          </div>
          <span class="line"></span>
          <div class="item">
            <h4>官方</h4>
            <p>
              <a href="#">新浪微博</a>
              <a href="#">官方网店</a>
              <br>
              <a href="#">微信公众号<img src="../../assets/images/footer-arcode.jpg" class="footer-orcode" alt="#"></a>
            </p>
          </div>
          <span class="line"></span>
          <div class="item">
            <h4>下载</h4>
            <p>
              <a href="#" class="mg-0">移动客户端</a>
              <span class="new">new</span>
              <br>
              <a href="#">CL表情包</a>
            </p>
          </div>
          <span class="line"></span>
          <div class="item">
            <h4>友情链接</h4>
            <p>
              <a href="#">斗鱼直播</a>
              <a href="#">虎牙直播</a>
              <br>
              <a href="#">CL大逃杀</a>
            </p>
          </div>
          <span class="line"></span>
          <div class="item">
            <h4>反馈</h4>
            <p>
              <a href="#">意见反馈</a>
              <a href="#">举报</a>
              <a href="#">帮助中心</a>
              <br>
              <a href="#">免责声明</a>
              <a href="#">用户协议</a>
            </p>
          </div>
        </div>
        <div class="footer-img fr">
          <img src="../../assets/images/footer-logo.gif" alt="#">
        </div>
      </div>
      <div class="footer-middle clearfix">
        <div class="item">
          <a href="http://report.12377.cn:13225/toreportinputNormal_anis.do" target="_blank"><i class="icon icon-1"></i>中国互联网违法和不良信息举报中心</a>
          <a href="#"><i class="icon icon-2"></i>网络文化经营单位</a>
        </div>
        <div class="item">
          <a href="http://www.beian.miit.gov.cn/" target="_blank">粤ICP备19150144号</a>
        </div>
      </div>
      <div class="footer-bottom">
        <img src="../../assets/images/logo-gray.png" alt="#">
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#footer {
    background-color: #ececec;
    padding: 2px 0;
    /* padding-top: 2px; */
}
.auto-width {
    width: 1160px;
    margin: 0 auto;
}
.footer-top {
    margin-bottom: 28px;
}
.clearfix {
    zoom: 1;
}
.fl {
    float: left;
}

.fr {
    float: right;
}
.footer-img img {
    width: 80px;
    height: 80px;
}
.footer-nav .item {
    font-size: 12px;
    float: left;
}
.footer-nav .item .new {
    display: inline-block;
    width: 28px;
    height: 12px;
    line-height: 10px;
    margin-top: 8px;
    text-align: center;
    color: #fff;
    background-color: #fd4c5d;
    border-radius: 6px;
}
.footer-nav .item h4 {
    line-height: 28px;
    color: #999;
}
.footer-nav .item a {
    position: relative;
    float: left;
    margin-right: 24px;
    line-height: 28px;
}
.footer-nav .item img {
    display: none;
    position: absolute;
    left: 0;
    top: -140px;
    width: 140px;
    height: 140px;
}
.footer-nav .item a:hover img {
    display: block;
}
.footer-nav .line {
    float: left;
    width: 1px;
    height: 86px;
    margin: 0 46px 0 22px;
    background-color: #e5e5e5;
}
.footer-middle, .footer-middle a {
    color: #999;
}
.footer-middle .item {
    float: left;
    margin-top: 30px;
    margin-right: 90px;
    font-size: 12px;
}
.footer-middle .item a, .footer-middle .item span {
    line-height: 24px;
}
.footer-middle, .footer-middle a {
    display: block;
    color: #999;
}
.footer-middle .item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background: url(../../assets/images/footer-link.png) no-repeat;
}
.footer-middle .item .icon-2 {
    background-position: -16px 0;
}
.footer-middle .item a, .footer-middle .item span {
    line-height: 24px;
}
.footer-bottom {
    padding-top: 20px;
    text-align: center;
}
.footer-bottom img {
    padding: 40px 0 20px 0;
    width: 140px;
    height: 40px;
}
a:hover {
    color: #00a1d6;
}
</style>