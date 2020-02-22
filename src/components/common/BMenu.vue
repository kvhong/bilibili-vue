<template>
	<div class="menu">
		<div class="menu-wrapper">
			<ul class="nav-menu">
				<BMenuItem  v-for="i in classify" v-bind:key="i.id" :item="i"></BMenuItem>
			</ul>
			<div class="menu-r">
				<a target="_blank" href="/search/index?keyWord=后来的我们" title="后来的我们" class="random-p">
					<div class="random-p-movie">
						<img src="//i2.hdslb.com/bfs/active/84f323e3a77a6eafee656f832847603751f3857d.gif" alt="后来的我们">
					</div>
				</a>
				<a id="mobile_p" class="mobile-p" href="" target="_blank" @mouseover="showMobileLink=true" @mouseout="showMobileLink=false">
					<transition name="fade">
						<div class="mobile-p-box" v-show="showMobileLink">
							<div class="mobile-p-qrcode">
							</div>
						</div>					
					</transition>

				</a>
			</div>
		</div>
	</div>
</template>

<script>
import BMenuItem from 'components/common/BMenuItem'
import { commonApi } from 'api'
export default {
	data() {
		return {
			showMobileLink: false,
			classify: []
		}
	},
	methods: {
		getPar(){
			const home = { id: 'home', partition_name: '首页', home: true }
			const sequare = { id: 'sequare', partition_name: '广场', sequare: true }
			const live = { id: 'live', partition_name: '直播', live: true }
			commonApi.getPartition().then((response) => {
				const list = response
				this.classify.push(home)
				for (let index = 0; index < list.length; index++) {
					this.classify.push(list[index])
				}
				this.classify.push(sequare)
				this.classify.push(live)
			})
		}
	},
	created() {
		this.getPar()
	},
	components: {
		BMenuItem
	}
}
</script>

<style lang="stylus" scoped>
	.menu
		width 100%
		background #fff
		.menu-wrapper
			position relative
			width 980px
			margin 0 auto
			padding 6px 0
			z-index 100
			.nav-menu
				zoom 1
				display inline-block
				vertical-align top
				height 50px
			.menu-r
				position absolute
				right 0px
				top 0px
				height 50px
				padding 6px 0
				.random-p
					width 80px
					height 44px
					margin 3px 12px
					display inline-block
					vertical-align top
					overflow hidden
					img
						display block
						max-width 100%
						height 100%
						margin 0 auto
				.mobile-p
					display inline-block
					vertical-align top
					margin 3px 0
					width 58px
					height 44px
					background url(../../assets/images/app-link.png) center center no-repeat
					position relative
					overflow visible
					.mobile-p-box
						position absolute
						overflow hidden
						top 44px
						width 259px
						height 174px
						right -20px
						background url(../../assets/images/app-box.png) center center no-repeat
						transition .2s
						transition-property opacity
						&.fade-enter-active, &.fade-leave
							opacity 1
						&.fade-enter, &.fade-leave-active
							opacity 0
						.mobile-p-qrcode
							position absolute
							top 30px
							width 100px
							height 100px
							left 80px
							background url(../../assets/images/app-qrcode.png) center center no-repeat
</style>