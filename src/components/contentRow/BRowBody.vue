<template>
	<div class="b-body">
		<ul class="vidbox v-list">
			<BRowItem v-for="item in row" :key="item.id" :item="item" v-if="isRouterAlive" :collect="false"></BRowItem>
		</ul>
	</div>
</template>

<script>
import BRowItem from 'components/contentRow/BRowItem'
export default {
	data() {
		return {
			isRouterAlive: true
		}
	},
	props: {
		row: {
			type: Array
		}
	},
	watch: {
		row() {
			this.reload()
		}
	},
	components: {
		BRowItem
	},
	// provide() {
	// 	return {
	// 		reload: this.reload
	// 	}
	// },
	methods: {
		reload() {
			this.isRouterAlive = false
			this.$nextTick(function() {
				this.isRouterAlive = true
			})
		}
	},
}
</script>

<style lang="stylus" scoped>
	.b-body
		margin-right -20px
		clear both
		.v-list
			width 100%
			height 316px
			overflow hidden
			padding-top 20px
</style>