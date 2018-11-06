<template>
  <div class="shuye">
    <div class="readHead">
      <div @click="back" class="backBtn">返回  </div>
    </div>
    <div class="readWrapper" ref="readWrapper">
      <div class="content">
        <h1 v-if="flag">{{title}}</h1>
        <article v-html="txt" v-if="flag"></article>
        <span class="bookName" v-if="!flag">{{this.$route.params.bookInfo.title}}</span>
        <div @click='readNext' class="readBtn">阅读下一张</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getInfo()
      })
    },
    data() {
      return {
        realBookId: '',
        flag: false,
        chapters: [],
        bookInfo: {},
        index: 0,
        title: '',
        txt: '',
        preBookInfo: {
          id: '',
          lastC: 0
        },

        prevBookId: '',
        lastBookChapters: []
      }
    },
    computed: {},
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.readWrapper, {
          click: true
        })
      })
    },
    methods: {
      unique(arr) {
        const res = new Map()
        return arr.filter((arr) => !res.has(arr.phone) && res.set(arr.phone, 1))
      },
      getIndex() {
        if (window.localStorage.getItem('prevBook')) {
          let prevBook = JSON.parse(window.localStorage.getItem('prevBook'))
          console.log(prevBook)
          for (let i in prevBook) {
//            console.log(typeof i, 'i')
//            console.log(prevBook[i])
            console.log(prevBook)
            if (prevBook[i].id === this.bookInfo._id) {
              this.index = prevBook[i].lastC
//              this.readNext()
//              console.log(this.index)
            } else {
              this.flag = false
              this.index = 0
            }
          }
//        else
//          if (i.id !== this.$route.params.bookId && this.$route.params.bookId !== this.prevBookId) {
//            this.flag = false
//            this.index = 0
//          }
        }
      },
      saveLastChapter(index) {
        this.prevBookId = this.bookInfo._id
        this.$set(this.preBookInfo, 'id', this.bookInfo._id)
        this.$set(this.preBookInfo, 'lastC', index)
//        this.bookInfo.lastRead = index
//        this.$emit('saveReadChapter', this.bookInfo)
      },
      back() {
//        this.saveLastChapter(this.index)
//        let prevBook = JSON.parse(window.localStorage.getItem('prevBook'))
//        this.lastBookChapters.push(prevBook, this.preBookInfo)
//        this.lastBookChapters = this.unique(this.lastBookChapters)
//        this.flag = false
//        console.log(this.lastBookChapters)
//        window.localStorage.setItem('prevBook', JSON.stringify(this.lastBookChapters))
//        let pres = []
//        pres.push(prevBook)
//        console.log(pres)
        this.$router.go(-1)
      },
      readNext() {
        this.index++
        this.getContent(this.index)
        this.$nextTick(() => {
          this.scroll.scrollTo(0, 0)
        })
      },
      getContent(index) {
        if (this.$route.params.bookInfo) {
          this.axios.get('/chapterapi/' + this.chapters[index].link)
            .then(res => {
//              console.log(res)
              if (res.status === 200) {
                res = res.data.chapter
//              console.log(res)
                this.title = res.title
                this.txt = res.cpContent.replace(/\n/g, '<br>')
                this.flag = true
//              this.index = this.bookInfo.lastRead
                console.log(this.index)
//              this.$set(this.$route.params.bookInfo.lastRead)
//              this.saveLastChapter(this.index)
//              console.log(this.index)
//              console.log(this.index)
              }
            })
        }
      },
      getInfo() {
        this.bookInfo = this.$route.params.bookInfo
//        console.log(this.bookInfo)
        if (this.bookInfo._id) {
          this.axios.get('/api/btoc?view=summary&book=' + this.bookInfo._id)
            .then(res => {
              if (res.status === 200) {
                console.log(res)
                res = res.data[0]
//                console.log(res)
//                this.flag = false
                this.realBookId = res._id
//                console.log(this.realBookId)
                if (this.realBookId) {
                  this.axios.get('/api/atoc/' + this.realBookId + '?view=chapters')
                    .then(res => {
//                      console.log(res)
                      if (res.status === 200) {
                        res = res.data
                        this.chapters = res.chapters
//                        console.log(this.chapters)
                        this.getContent(0)
                      }
                    })
                }
              }
            })
//          console.log(window.localStorage.getItem('prevBook'))
//          if (window.localStorage.getItem('prevBook')) {
//            let prevBook = JSON.parse(window.localStorage.getItem('prevBook'))
//            for (let i in prevBook) {
//              if (i.id === this.bookInfo._id) {
//                this.index = i.lastC
//                this.readNext()
//                console.log(this.index)
//              } else {
//                this.flag = false
//                this.index = 0
//              }
//              } else if (i.id !== this.$route.params.bookId && this.$route.params.bookId !== this.prevBookId) {
//                this.flag = false
//                this.index = 0
//              }
//            }
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .shuye
    height: 100%
    width: 100%
    background: #ffff00
    .readHead
      height: 40px
      width: 100%
      .backBtn
        width: 80px
        height: 100%
        float: left
    .readWrapper
      width: 100%
      height: 100%
      .content
        height: auto
        width: 100%
        background: #ffff00
        article
          text-indent: 25px
          font-size: 1.5rem
          line-height: 1.7rem
          padding: 20px 20px
          word-break: break-all
        .bookName
          display: block
          text-align: center
          font-size: 40px
          margin: 200px auto
        .readBtn
          width: 200px
          height: 40px
          line-height: 40px
          padding: 20px 0
          margin: -10px auto
          border-radius: 10px
          background: #ff0000
          text-align: center
</style>
