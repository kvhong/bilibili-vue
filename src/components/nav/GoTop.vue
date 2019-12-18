<template>
	<div class="nav-side" ref="navSide">
		<div class="n-i gotop" >
			<div class="s-line"></div>
			<div class="btn_gotop" @click="scrollToTop(800)"></div>
		</div>
	</div>
</template>

<script>
import scrollMixin from './smooth-scroll.js'
export default {
	mixins: [scrollMixin]
}
</script>

<style lang="stylus" scoped>
	.nav-side
		position fixed
		width 60px
		text-align center
		top 240px
		left auto
		right 0px
		z-index 1000
			.n-i
				cursor pointer
		.gotop
			cursor pointer
			border 0
			position relative
			z-index 50
			.s-line
				border-left 1px solid #ddd
				border-right 1px solid #ddd
				height 9px
				width 30px
				margin 0 auto
			.btn_gotop
				height 48px
				background #f6f9fa url(../../assets/images/icons.png) -648px -72px no-repeat
				border 1px solid #e5e9ef
				overflow hidden
				border-radius 4px
</style>