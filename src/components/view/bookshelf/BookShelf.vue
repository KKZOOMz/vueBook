<template>
  <div class="bookshelf" ref="bookshelf">
    <div class="b-content">
      <div v-if="bookList.length > 0 ? false : true" class="beforeAdd" @click="turnToAdd">
        <i class="icon-book icon"></i>
        <span>追书</span>
      </div>
      <div class="list" @click="readBook(item)" v-for="(item, indexs) in bookList" :key="indexs">
        <div class="b-cover">
          <img :src="item.cover" width="80" ref="pic"/>
        </div>
        <div class="b-text">
          <span class="b-title">{{item.title}}</span>
          <span class="b-author">{{item.author}}</span>
          <span class="b-lastC">{{item.lastChapter}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      book: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        bookList: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getBookList()
      })
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.bookshelf, {
          click: true
        })
      })
    },
    methods: {
      turnToAdd() {
          this.$router.push('/category')
      },
      readBook(book) {
        this.$router.push({
          name: 'readview',
          params: {
            bookInfo: book
          }
        })
      },
      quChong(book) {
        return Array.from(new Set(book))
      },
      getBookList() {
        this.bookList = this.quChong(this.book)
        this.bookList = this.quChong(this.bookList)
//        this.bookList = this.book.reduceRight((item, next) => {
//          books[next.title] ? '' : books[next.title] = true && item.push(next)
//          return item
//        }, [])
        console.log(this.bookList)
      }
    },
    components: {}
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .bookshelf
    width: 100%
    height: 100%
    padding: 0 20px
    box-sizing: border-box
    .beforeAdd
      width: 100%
      height: 100px
      margin-top: 200px
      text-align: center
      .icon
        width: 80px
        height: 80px
        font-size: 80px
        margin: 100px auto
      & > span
        vertical-align: top
        line-height: 80px
        font-size: 20px
    .b-content
      margin-top: 10px
      width: 100%
      height: auto
      overflow: hidden
      .list
        display: flex
        height: 120px
        width: 100%
        @include border-1px(rgba(7, 17, 27, 0.4))
        .b-cover
          display: inline-block
          flex: 0 0 80px
          width: 80px
          height: 100%
          overflow: hidden
        .b-text
          margin: 10px
          display: inline-block
          flex: 1
          & > span
            display: inline-block
            width: 100%
            font-size: 14px
          .b-title
            flex: 1
            font-size: 20px
            margin-bottom: 10px
          .b-author
            margin-bottom: 20px
          .b-lastC
            font-size: 16px
</style>
