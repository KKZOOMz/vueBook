<template>
  <div v-if="flag" class="d-Detail">
    <div class="d-header">
      <span @click="back" class="d-back-btn icon-arrow_lift">返回</span>
      <span class="d-head-title">{{bookInfo.title}}</span>
    </div>
    <!--&lt;!&ndash;{{this.$route.params.bookId}}&ndash;&gt;-->
    <!--&lt;!&ndash;{{this.bookId}}&ndash;&gt;-->
    <!--{{bookInfo.title}}-->
    <!--{{bookInfo.title}}-->
    <div class="d-head-content">
      <div class="d-title">
        <div class="b-cover">
          <img :src="bookInfo.cover" width="94">
        </div>
        <div class="b-text">
          <span class="d-book-title">{{bookInfo.title}}</span>
          <span class="d-book-author">{{bookInfo.author}}</span>
          <span class="d-book-cate">{{bookInfo.majorCate}} / {{bookInfo.minorCate}}</span>
          <span class="d-book-wordCount">{{(bookInfo.wordCount / 10000).toFixed(2)}}万字</span>
          <span>{{bookInfo.lastChapter}}</span>
        </div>
      </div>
      <div class="b-btn">
        <span class="b-btn1" @click="addBook(bookInfo)">加入书架</span>
        <span class="b-btn2" @click="readBook()">点击阅读</span>
      </div>
    </div>
    <div class="d-book-detailInfo">
      <span class="d-book-detail-text">{{bookInfo.longIntro}}</span>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        flag: false,
        bookInfo: {},
        lastBookInfo: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getInfo()
      })
    },
    methods: {
      readBook() {
        this.lastBookInfo = this.bookInfo
        this.$router.push({
          name: 'readview',
          params: {
            bookInfo: this.bookInfo
          }
        })
      },
      addBook(info) {
        this.$emit('setBookList', info)
      },
      back() {
        this.$router.go(-1)
      },
      getInfo() {
        if (this.$route.params.bookId) {
          this.axios.get('/api/book/' + this.$route.params.bookId)
            .then(res => {
              //              res = res.data
//              console.log(res)
//              console.log(res.status)
              if (res.status === 200) {
                res = res.data
                this.flag = true
//                this.flag2 = false
                this.bookInfo = res
//                this.cover = decodeURIComponent(this.bookInfo.cover).substring(7)
                this.bookInfo.cover = decodeURIComponent(this.bookInfo.cover).substring(7)
//                console.log(this.bookInfo)
//                console.log(this.bookInfo.cover)
//                this.$set(this.bookInfo, 'lastRead', 0)
//                this.$emit('saveReadChapter', this.bookInfo)
              }
//
//              this.bookInfo = res
            })
        } else {
          this.bookInfo = this.lastBookInfo
        }
//        console.log(this.bookInfo)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../../../public/scss/mixin"
  .d-Detail
    width: 100%
    height: 100%
    padding: 0 18px
    box-sizing: border-box
    .d-header
      margin: 0 auto
      height: 50px
      width: 100%
      line-height: 50px
      padding: 10px 0
      .d-back-btn
        display: inline-block
        height: 30px
      .d-head-title
        display: inline-block
        margin-left: 10px
        height: 30px
    .d-head-content
      margin-top: 20px
      width: 100%
      height: 220px
      @include border-1px(rgba(7, 17, 27, 0.4))
      .d-title
        display: flex
        width: 100%
        height: 160px
        .b-cover
          flex: 0 0 94px
          width: 94px
        .b-text
          flex: 1
          margin-left: 10px
          height: 136px
          .d-book-title
            display: block
            margin-bottom: 10px
            font-size: 18px
            font-weight: 700
          .d-book-author
            display: block
            margin-bottom: 10px
          .d-book-cate
            display: block
            margin-bottom: 10px
          .d-book-wordCount
            display: block
            margin-bottom: 10px
      .b-btn
        display: flex
        box-sizing: border-box
        margin-bottom: 10px
        width: 100%
        height: 40px
        text-align: center
        line-height: 40px
        border: 1px solid rgba(7, 17, 27, 0.4)
        .b-btn1
          flex: 1
        .b-btn2
          flex: 1
          background: #ff5030
          color: #ffffff
    .d-book-detailInfo
      width: 100%
      min-height: 100px
      padding: 20px 0
      @include border-1px(rgba(7, 17, 27, 0.4))
      .d-book-detail-text
        font-size: 16px
        line-height: 30px
</style>
