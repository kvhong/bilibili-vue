<template>
  <div class="top_container">
    <div class="z_top b-header-blur b-header-blur-black">
      <div class="b-header-mask-wrp">
        <div class="b-header-mask-bg"></div>
        <div class="b-header-mask"></div>
      </div>
      <div class="z_header">
        <div class="z_top_nav">
          <ul>
            <li class="home">
              <a class="i-link" href="/">
                <span>主站</span>
              </a>
            </li>
            <li class="hbili">
              <a class="i-link" href="//h.bilibili.com/" title="画友">画友</a>
            </li>
            <li class="b-gc" hasframe="true">
              <a class="i-link" href="//game.bilibili.com/" title="游戏中心">游戏中心</a>
            </li>
            <li class="live" hasframe="true">
              <a class="i-link" target="_blank" href="//live.bilibili.com/" title="直播">直播</a>
            </li>
            <li class="b-zb">
              <a class="i-link" target="_blank" href="//zb.bilibili.com/" title="周边">周边</a>
            </li>
            <li class="planet">
              <a class="i-link" target="_blank" href="//planet2017.bilibili.com/" title="拜年祭2017">拜年祭
              <em class="new"></em>
              </a>
            </li>
            <li></li>
          </ul>
        </div>
        <div class="uns_box">
          <ul class="menu">
            <li id="i_menu_login_reg" guest="yes" class="u-i" style="display: list-item" v-if="userInfo === null">
              <!-- href="/login" -->
              <a id="i_menu_login_btn" class="i-link login" @click="toLogin">
                <span>登录</span>
              </a>
              <i class="s-line"></i>
              <a id="i_menu_register_btn" class="i-link reg" @click="toRegister">
                <span>注册</span>
              </a>
            </li>
            <li class="nav-item profile-info" v-if="userInfo !== null" @mouseenter="show" @mouseleave="show">
              <a :href="'/space/'+userInfo.iD+'/index'" target="_blank" class="t">
                <div :class="face">
                  <img :src="qiniuAddress+userInfo.picture" class="face"/>
                  <img class="pendant">
                </div>
              </a>
              <div class="profile-m dd-bubble slide-fade-leave slide-fade-leave-active" v-show="isShow">
                <div class="header-u-info">
                  <div class="header-uname">
                    <b class="">{{userInfo.nick_name}}</b><!---->
                  </div>
                </div>
                <div class="member-menu">
                  <ul class="clearfix">
                    <li>
                      <a href="/center/info" target="_blank" class="account">
                      <i class="bili-icon b-icon-p-account"></i>
                      个人中心
                      </a>
                    </li>
                    <li>
                      <a href="/upload" target="_blank" class="member">
                      <i class="bili-icon b-icon-p-member"></i>
                      投稿管理
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="member-bottom">
                  <a v-on:click="logout" class="logout">退出</a>
                </div>
              </div>
            </li>
            <li id="i_menu_login_reg" guest="yes" class="u-i" style="display: list-item" v-if="userInfo !== null">
              <a id="i_menu_message_btn" class="i-link message" href="/message" target="_blank" @mouseenter="isMessageShow = !isMessageShow" @mouseleave="isMessageShow = !isMessageShow">
                <span>
                  消息
                </span>
                <div class="i-frame-message" v-show="isMessageShow">
                  <div href="/message/#/reply" target="_blank" class="im-list">
                    回复我的
                  </div>
                  <div href="/message/#/at" target="_blank" class="im-list">
                    @我的
                  </div>
                  <div href="/message/#/love" target="_blank" class="im-list">
                    收到的赞
                  </div>
                  <div href="/message/#/system" target="_blank" class="im-list">
                    系统通知
                  </div>
                  <div href="/message/#/whisper" target="_blank" class="im-list">
                    我的消息
                  </div>
                </div>
              </a>
              <i class="s-line"></i>
              <a id="i_menu_history_btn" class="i-link history" href="/history" target="_blank" @mouseenter="isHistoryShow = !isHistoryShow" @mouseleave="isHistoryShow = !isHistoryShow">
                <span>历史</span>
                <div class="history-record-m mini-wnd-nav history-wnd dd-bubble" v-show="isHistoryShow">
                  <!----><!---->
                  <ul class="list history"><!----><!---->
                    <div>
                      <li class="no-data">没有数据哦，多看点视频吧</li>
                    </div>
                    <!-- <div>
                      <li class="timeline">
                        <span class="date">今日</span>
                      </li>
                      <li>
                        <a href="//www.bilibili.com/video/av78537651" target="_blank" title="【魂学研习者】18：黑魂的世界" class="clearfix">
                          <div class="link">【魂学研习者】18：黑魂的世界</div>
                            <div>
                              <div class="state">
                              <span class="progress">1%</span>
                              <i class="device pc"></i>
                            </div>
                          </div>
                        </a>
                      </li>
                    </div> -->
                  </ul>
                  <div>
                    <a href="/history" target="_blank" class="read-more">
                      查看更多
                      <i class="b-icon b-icon-arrow-r"></i>
                    </a>
                  </div>
                </div>
              </a>
            </li>
            <li class="u-i b-post" @mouseenter="isShowPostMenu = !isShowPostMenu" @mouseleave="isShowPostMenu = !isShowPostMenu">
              <a class="i-link" href="/upload" target="_blank" >投稿</a>
              <PostMaterial v-show="isShowPostMenu"></PostMaterial>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostMaterial from './PostMaterial.vue'
import { getToken, removeToken } from 'api/auth.js'
export default {
  inject: ['reload'],
  data() {
    return {
      qiniuAddress: this.Global,
      isShow: false,
      isShowPostMenu: false,
      isMessageShow: false,
      isHistoryShow: false,
      userInfo: this.UserInfo,
      face: 'i-face'
    }
  },
  components: {
    PostMaterial
  },
  methods: {
    showPostMenu() {
      this.isShowPostMenu = !this.isShowPostMenu
    },
    show() {
      this.isShow = !this.isShow
      if (this.isShow === true) {
        this.face = 'b-face'
      } else {
        this.face = 'i-face'
      }
    },
    toLogin() {
      this.$router.push({ path: '/login' })
    },
    toRegister() {
      this.$router.push({ path: '/register' })
    },
    logout() {
      removeToken()
      this.$router.push({ path: '/' })
      this.reload()
    }
  }
}
</script>

<style lang="stylus">
  .top_container
    color #222
    position relative
    z-index 10000
    .z_top
      background-color transparent
      height 42px
      background #fff
      box-shadow rgba(0, 0, 0, 0.1) 0 1px 2px
      top 0px
      left 0px
      width 100%
      position relative
      z-index 10000
      font-family "Microsoft YaHei",Arial,Helvetica,sans-serifsans-serif
      color #222
      .i-link
        padding 0 14px
        transition .15s background-color
        font-size 13px
      a
        color #222
    .b-header-blur
      background-color transparent
      .b-header-mask-wrp
        position absolute
        top 0px
        left 0px
        width 100%
        height 100%
        overflow hidden
        background-color #fff
        .b-header-mask-bg
          position absolute
          height 62px
          padding 0 20px
          top -10px
          left -20px
          width 100%
          filter blur(5px)
          z-index 50
          background-position center 0!important
          background-repeat no-repeat
          background-image: url('//i0.hdslb.com/bfs/archive/4f59bf959d51592016e07efe62969c411288826a.png')
        .b-header-mask
          position absolute
          top 0px
          left 0px
          width 100%
          height 100%
          z-index 100
          background-color rgba(0, 0, 0, 0.4)
      .z_header
        display block
        margin 0 auto
        position relative
        text-align left
        z-index 10000
        width 980px
        zoom 1
        &:after
          content ''
          display block
          visibility hidden
          height 0
          clear both
          font-size 0
        .z_top_nav
          float left
          height 42px
          font-size 12px
          li
            .new
              position absolute
              right -8px
              color #f25d8e
              top 13px
              background url(../../assets/images/icons.png) no-repeat
              width 22px
              height 10px
              background-position -851px -412px
            a.i-link
              font-size 12px
          ul
            zoom 1
            &:after
              content ''
              display block
              visibility hidden
              height 0
              clear both
              font-size 0
            li
              float left
              text-align center
              line-height 42px
              position relative
              list-style-stype: none
              a.i-link
                height 100%
                display block
                color #fff
              &.home
                margin-left -10px
                background-image url(../../assets/images/icons.png)
                background-repeat no-repeat
                background-position -845px -74px
                .i-link
                  width 50px
                  height 42px
                  padding 0 0 0 20px
              &.hbili
                position relative
              &.live
                position relative
        .uns_box
          float right
          font-size 12px
          ul
            .nav-item
              margin-top 5px
              padding-right 22px
              float left
              text-align center
              line-height 42px
              height 42px
              position relative
              background-color hsla(0,0%,100%,0)
              white-space nowrap
              .t
                white-space nowrap
                color #222
                height 100%
                display block
                padding 0 7px
                .i-face
                  position absolute
                  z-index 20
                  width 32px
                  height 32px
                  left 8px
                  top 0
                  transition .3s
                  .face
                    border 0 solid #fff
                    width 100%
                    height 100%
                    border-radius 50%
                .b-face
                  position absolute
                  z-index 20
                  width 64px
                  height 64px
                  left -8px
                  top 15px
                  transition .3s
                  .face
                    border 0 solid #fff
                    width 100%
                    height 100%
                    border-radius 50%
              .profile-m
                position absolute
                z-index 1
                left 50%
                margin-left -125px
                width 260px
                padding 50px 0 0
                top 38px
                background #fff
                box-shadow 0 2px 4px rgba(0,0,0,.16)
                border-radius 0 0 4px 4px
                line-height normal
                .header-uname
                  padding-bottom 15px
                  b
                    display block
                    margin-bottom 8px
                .member-menu
                  height 40px
                  border-top 1px solid #e5e9ef
                  padding 10px 20px 40px
                  ul
                    width 240px
                    clear both
                    zoom 1
                    li
                      float left
                      width 100px
                      margin-right 20px
                      position relative
                      .bili-icon
                        width 16px
                        height 16px
                        margin-right 10px
                        vertical-align top
                        display inline-block
                        background url(../../assets/images/icons.png) no-repeat
                        &.b-icon-p-account
                          background-position -473px -407px
                        &.b-icon-p-member
                          background-position -473px -855px
                    a:hover
                      color #00a1d6
                .member-bottom
                  position absolute
                  bottom 0
                  left 0
                  width 100%
                  height 30px
                  line-height 30px
                  background-color #f4f5f7
                  border-radius 0 0 4px 4px
                  .logout:hover
                    color #00a1d6
                  .logout
                    float right
                    padding-right 20px
                    color #222
            &.menu
              float left
              position relative
            li
              list-style-type none
              &.u-i
                float left
                text-align center
                height 42px
                line-height 42px
                position relative
                a.i-link
                  display block
                  color #222
                &#i_menu_login_reg
                  padding 0 10px
                  .i-link
                    display inline-block
                    padding 0 20px
                    color #fff
                  .i-link:hover
                      background-color #888888
                    .i-frame-message
                      left calc(50% - 86px)
                      position absolute
                      z-index 1
                      left 50%
                      margin-left -72px
                      width 72px
                      top 40px
                      background #fff
                      .im-list
                        position relative
                        color black
                      .im-list:hover
                        color #00a1d6
                    .dd-bubble
                      position absolute
                      z-index 1
                    .history-wnd
                      width 400px
                      left auto
                      right -58px
                    .mini-wnd-nav
                      position absolute
                      left 0
                      top 42px
                      background-color #fff
                      width 320px
                      box-shadow 0 2px 4px rgba(0,0,0,.16)
                      border 1px solid #e5e9ef
                      border-radius 0 0 4px 4px
                      z-index 200
                      .list
                        padding-top 10px
                      ul
                        list-style none
                      .mini-wnd-nav .list.history li.no-data
                        border none
                        padding 0
                      .mini-wnd-nav .list li.no-data
                        text-align center
                        color #aaa
                      .mini-wnd-nav .list.history li
                        clear both
                        position relative
                        padding-left 38px
                      .mini-wnd-nav .list li
                        height 28px
                        line-height 28px
                        text-align left
                        font-size 12px
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
                        padding 0 12px 0 22px
                        position relative
                      .read-more
                        display block
                        margin 4px 12px 12px
                        background-color #e5e9ef
                        text-align center
                        border 1px solid #e0e6ed
                        height 22px
                        line-height 22px
                        color #222
                        border-radius 4px
                      .mini-wnd-nav a
                        color #222
                        transition color .2s
                        .b-icon.b-icon-arrow-r
                          background-position -478px -218px
                          width 6px
                          height 12px
                          margin -2px 0 0 5px
                        .b-icon
                          display inline-block
                          vertical-align middle
                          width 12px
                          height 12px
                          background url(//static.hdslb.com/images/base/icons.png) no-repeat
                  .s-line
                    display inline-block
                    border-left 1px solid #fff
                    height 12px
                    margin-top 16px
                    vertical-align top
                &.b-post
                  margin-right 0px
                  a.i-link
                    margin 0px
                    padding 0px
                    width 58px
                    position relative
                    z-index 100
                    background url(../../assets/images/b-post.png) center center no-repeat
                    height 48px
                    border-radius 0 0 5px 5px
                    color #fff!important
                    font-size 14px
</style>
