<template>
	<li class="item-li">
		<div class="v m300">
			<!-- 上部分 -->
			<a class="preview cover-preview" :href="hreflink" target="_blank">
				<!-- item 左上角的奖牌 -->
				<div class="medal" v-show="false"></div>
				<div class="original"></div>
				<!-- 边框 -->
				<div class="border"></div>
				<!-- 背景图片 -->
				<img :src="qiniuAddress+item.picture">
				<!-- 内容预览 -->
				<div class="back">
					<div>	
					</div>
				</div>
				<!-- 预览进度控制 -->
				<div class="fore">
					<span data-loading="false"></span> 
					<div class="bar">
						<div></div>
					</div>
				</div>
				<!-- 视频时间 -->
				<div class="x">
					<b class="x2">{{item.duration}}</b>
				</div>
			</a>
					<!-- 下部分 -->
			<a :href="hreflink" :title="item.video_title" target="_blank">
				<div class="t" :class="collect ? 'active' : ''">{{item.video_title}}</div>
				<div class="i" :class="collect ? 'unshow' : ''">
					<span>
						<i class="b-icon b-icon-v-play"></i>{{item.watches}}
						</span><span>
						<i class="b-icon b-icon-v-dianzan"></i>
						{{item.comments}}
					</span>
				</div>
			</a>
			<!-- 待测试 -->
			<div class="meta pubdate" v-show="collect">
				收藏于： {{item.collection_date}}
				<el-popconfirm
				title="确定取消收藏吗？" v-show="state">
					<span class="icon delete" slot="reference" @click="cancelCollect" v-show="state"></span>
				</el-popconfirm>
			</div>
		</div>
	</li>
</template>

<script>
import { spaceApi } from 'api'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			qiniuAddress: this.Global,
			userInfo: this.UserInfo,
			state: this.collect
		}
	},
	props: {
		item: {
			type: Object
		},
		collect: {
			type: Boolean
		}
	},
	computed: {
		hreflink() {
			return '/video/' + this.item.id
		}
	},
	methods: {
		cancelCollect() {
			spaceApi.cancelCollect({ 'userId': this.userInfo.iD, 'videoId': this.item.id }).then((response) => {
				if (response === '') {
					this.state = false
					this.$emit('listenCancel',this.item.id)
				} else {
					Message.error('错误',response)
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
	.item-li
		float left
		margin 0 20px 20px 0
		.v
			position relative
			width 160px
			height 160px
			font-size 12px
			overflow hidden
			transition all .3s linear
			.x
				visibility hidden
				opacity 0
			.cover-preview
				position relative
				.back
					position absolute
					top 0px
					left 0px
					width 100%
					height 100%
					opacity 0
					z-index 0
				.fore
					position absolute
					top 0px
					left 0px
					width 100%
					height 100%
					opacity 0
					z-index 0
					transition opacity .2s
					background-color rgba(0,0,0,0.2)
					.bar
						margin 5px
						height 2px
						background-color rgba(255,255,255,0.4)
						border-radius 1px
						opacity 0
						transition opacity .2s .3s
						div
							height 2px
							border-radius 1px
				.x
					position absolute
					z-index 4
					top 0px
					left 0px
					bottom 0px
					right 0px
					line-height 20px
					width 100%
					height 100%
					background rgba(0,0,0,0.2)
					overflow hidden
					transition .2s
					border-top-left-radius 4px
					.x2
						position absolute
						right 0
						bottom 0px
						margin 0 5px 0 5px
						font-weight normal
						font-family tahoma,arial,'宋体',sans-serif
						color #fff
				.medal
					opacity 1
					transition opacity .2s
				&:hover
					.medal
						opacity 0
					.fore
						opacity 1
						.bar
							opacity 1
			.preview
				width 160px
				height 100px
				display block
				overflow hidden
				text-align center
				transition .2s all linear
				box-sizing border-box
				z-index 0
				border-radius 4px
				-webkit-mask-image -webkit-radial-gradient(circle, white, black)
				.medal
					position absolute
					left 0
					top 0px
					width 40px
					height 24px
					background url(../../assets/images/icons.png) no-repeat
					z-index 5
					pointer-events none
					background-position -849px -148px
					transition opacity .2x
					opacity 1
				img
					width 100%
					height 100%
					display block
					margin 0 auto
					outline 0
			.t
				margin-bottom 8px
				padding-top 8px
				height 20px
				line-height 20px
				transition all .2s linear
				color #222
				word-wrap break-word
				word-break break-all
				overflow hidden
				text-align left
			.unshow
				display none
			.i
				margin 0
				font-size 12px
				line-height 12px
				span
					display inline-block
					vertical-align top
					color #99a2aa
					width 80px
					white-space nowrap
					overflow hidden
					text-overflow ellipsis
					line-height 12px
					height 14px
					.b-icon
						display inline-block
						width 12px
						height 12px
						vertical-align middle
						background url(../../assets/images/icons.png) no-repeat
						vertical-align top
						margin-right 5px
						&.b-icon-v-play
							background-position -282px -90px
						&.b-icon-v-dianzan
							background-position -473px -665px
			.meta.pubdate
				font-size 12px
				overflow hidden
				text-overflow ellipsis
			.meta
				color #999
				white-space nowrap
				font-size 0
				margin-top 6px
				height 14px
				line-height 14px
				.delete:hover
					background-position -409px -26px
				.delete
					background-position -345px -26px
					cursor pointer
					vertical-align middle
					margin-left 8px
					width 12px
					height 14px
				.icon
					vertical-align middle
					background-repeat no-repeat
				.icon
					display inline-block
					background-image url('../../assets/images/icons1.png')
			&:hover 
				.t
					height 52px
					color #00a1d6
				.t.active
					height 20px
					color #00a1d6
				.x
					opacity 1
					visibility visible
</style>