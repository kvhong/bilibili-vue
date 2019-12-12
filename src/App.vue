<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from 'components/common/Foot.vue'
export default {
  name: 'app',
  components: {
      Foot
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  mounted() {
    this.$store.dispatch('getContentRows')
    this.timer1 = setInterval(this.updateRank, 24*60*60*1000)
		this.timer3 = setInterval(this.updateRank3, 3*24*60*60*1000)
    this.timer7 = setInterval(this.updateRank7, 7*24*60*60*1000)
  },
  beforeDestroy() {
    clearInterval(this.timer1);
    clearInterval(this.timer3);
    clearInterval(this.timer7);
  },
  data() {
    return {
      showMask: false,
      timer1: '',
      timer3: '',
      timer7: '',
      isRouterAlive: true
    }
  },
  methods: {
    isShowMask() {
      this.showMask = !this.showMask
    },
		updateRank() {
			updateRankApi.updateRank('1').then((response) => {
        console.log(response)
      })
		},
		updateRank3() {
      updateRankApi.updateRank('3').then((response) => {
        console.log(response)
      })
		},
		updateRank7() {
      updateRankApi.updateRank('7').then((response) => {
        console.log(response)
      })
    },
    reload() {
      this.isRouterAlive = false
			this.$nextTick(function() {
				this.isRouterAlive = true
			})
    }
  }
}
</script>
