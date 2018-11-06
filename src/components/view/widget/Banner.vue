<template>
  <div class="banner" ref="banner">
    <ul ref="ul">
      <li ref="lis" v-for="(item, index) in bannerSrc" :key="index">
        <img :src="item">
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        index: 0,
        width: 0,
        bannerSrc: [
          'http://qidian.qpic.cn/qidian_common/349573/490020ce553c685cd2d510510652abc7/0',
          'https://qidian.qpic.cn/qidian_common/349573/ab81bf32f6612e6fa19841a95741e144/0',
          'https://qidian.qpic.cn/qidian_common/349573/21df42c41f38e409cdd59e0b1a059286/0',
          'https://qidian.qpic.cn/qidian_common/349573/a49406951b216e35782593cdc96a5740/0',
          'http://qidian.qpic.cn/qidian_common/349573/490020ce553c685cd2d510510652abc7/0'
        ]
      }
    },
    mounted () {
      clearInterval(this._timeout)
      this._timeout = setInterval(this.sliderStart, 2000)
      this.$refs.ul.addEventListener('transitionend', this.lastPage)
    },
    beforeDestroy () {
      clearInterval(this._timeout)
    },
    methods: {
      stopDestroy() {
        clearInterval(this._timeout)
//        console.log('stop')
      },
      reStart() {
        clearInterval(this._timeout)
        this._timeout = setInterval(this.sliderStart, 2000)
        this.$refs.ul.addEventListener('transitionend', this.lastPage)
      },
      addTranstion () {
        this.$refs.ul.style.transition = 'all .5s linear'
        this.$refs.ul.style.webkitTransition = 'all .5s linear'
      },
      removeTranstion () {
        this.$refs.ul.style.transition = 'none'
        this.$refs.ul.style.webkitTransition = 'none'
      },
      translateX (offsetX) {
        this.$refs.ul.style.transform = `translateX(${offsetX}px)`
        this.$refs.ul.style.webkitTransform = `translateX(${offsetX}px)`
      },
      sliderStart () {
        this.index++
        let width = this.$refs.lis[0].offsetWidth
        let offsetX = -this.index * width
        this.addTranstion()
        this.translateX(offsetX)
      },
      lastPage () {
        if (this.index === this.$refs.lis.length - 1) {
          this.removeTranstion()
          this.translateX(0)
          this.index = 0
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .banner
    margin: 10px auto
    padding: 10px 0
    width: 100%
    height: 155px
    overflow: hidden
    @include border-1px(rgba(7, 17, 27, 0.4))
    ul
      width: 1000%
      transition: all 0.5s linear
      li
        float: left
        width: 10%
        height: 155px
        img
          width: 100%
          height: 100%
</style>
