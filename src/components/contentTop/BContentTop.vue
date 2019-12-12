<template>
	<div class="top-list-wrapper">
		<ul class="top-list" clearfix>
			<BContentTopItem v-for="item in ranklist" :key="item.id" :contentTop="item"></BContentTopItem>
		</ul>
		<div class="prev" @click="preVideo">{{ this.pre = this.now === 3 ? '昨日' : this.now === 1 ? '一周' : '三日'}}</div>
    <div class="next" @click="nextVideo">{{ this.next = this.now === 3 ? '一周' : this.now === 1 ? '三日' : '昨天'}}</div>
	</div>
</template>

<script>
import BContentTopItem from 'components/contentTop/BContentTopItem'
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			now: 3, //1：昨天 3：三天内 7：一周
			pre: '',
			next: '',
			ranklist: []
		}
	},
	computed: {
		...mapGetters([
			'requesting',
			'error',
			'ranklist1',
			'ranklist3',
			'ranklist7'
		])
	},
	mounted() {
		this.$store.dispatch('ranklist')
	},
	watch: {
		ranklist3() {
			this.ranklist = this.ranklist3
		}
	},
	components: {
		BContentTopItem
	},
	methods: {
		preVideo() {
			this.now = this.now === 3 ? this.now = 1 : this.now === 1 ? this.now = 7 : this.now = 3
			this.setRanklist()
		},
		nextVideo() {
			this.now = this.now === 3 ? this.now = 7 : this.now === 1 ? this.now = 3 : this.now = 1
			this.setRanklist()
		},
		setRanklist() {
			if (this.now === 3) {
				this.ranklist = this.ranklist3
			} else if (this.now === 1) {
				this.ranklist = this.ranklist1
			} else {
				this.ranklist = this.ranklist7
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.top-list-wrapper
		position relative
		height 240px
		overflow hidden
		margin-left 20px
		.top-list
			margin-right -20px
		.prev, .next
			display none
			position absolute
			background-color rgba(0,0,0,0.6)
			background-image url(http://static.hdslb.com/images/v3images/icons2.png)
			background-repeat no-repeat
			width 20px
			top 50%
			margin-top -30px
			cursor pointer
			font-size 12px
			color #fff
			z-index 99
			text-align center
			line-height 16px
			user-select none
		.prev
			left 0px
			border-radius 0 2px 2px 0
			background-position 6px -1211px
			padding 13px 5px 13px 10px
		.next
			right 0px
			border-radius 2px 0 0 2px
			background-position 25px -1262px
			padding 13px 10px 13px 5px
		&:hover .prev, &:hover .next
			display block
		.prev:hover, .next:hover
			background-color rgba(0,0,0,0.8)
</style>