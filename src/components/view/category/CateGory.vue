<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <Banner ref="bannerWrapper"></Banner>
      <div class="contentWrapper">
        <div class="c-content" v-for="(item, index) in male" :key="index">
          <span class="c-title">{{item.title}}</span>
          <BookList :setId="item._id"></BookList>
          <!--{{typeof item._id}}-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Banner, BookList} from '../widget'
  import Bscroll from 'better-scroll'
  export default {
    created() {
      this.$nextTick(() => {
        this.getRankType()
      })
    },
    components: {
      Banner,
      BookList
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.reStart()
      })
    },
    beforeRouteLeave (to, from, next) {
        this.stopDestroy()
//      next(vm => {
//        console.log(123)
//      })
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {
          click: true
        })
      })
    },
    data() {
      return {
        date: {},
        male: [],
        books: []
      }
    },
    methods: {
      stopDestroy() {
        console.log('123')
        this.$refs.bannerWrapper.stopDestroy()
      },
      reStart() {
        this.$refs.bannerWrapper.reStart()
      },
      getRankType() {
        this.axios('/api/ranking/gender')
          .then(res => {
//          console.log(res.data)
            res = res.data
            this.date = res
            this.male = res.male
//            res = res.epub
          })
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .wrapper
    width: 100%
    height: 100%
    padding: 0 10px
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    .contentWrapper
      width: 100%
      height: auto
      font-size: 15px
      .c-content
        padding: 10px
        box-sizing: border-box
        height: 400px
        width: 100%
        /*border: 2px solid rgba(7, 17, 27, 0.3)*/
        .c-title
          display: block
          padding: 10px 0 10px 0
          font-size: 25px
</style>
