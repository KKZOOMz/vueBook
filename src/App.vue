<template>
  <div id="app">
    <keep-alive>
      <router-view
        @setBookList="setBookList"
        :book="book2"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Bodys from './components/body/Bodys.vue'
  export default {
    name: 'App',
    data() {
      return {
        book1: {},
        book2: [],
        hash: {}
      }
    },
    components: {
      Bodys
    },
    methods: {
      setBookList(bookList) {
        this.book1 = bookList
        if (!bookList.addedBook) {
          this.$set(bookList, 'addedBook', false)
        }
        if (this.book2.length > 0 && this.book2.indexOf(this.book1) > 0) {
          for (let i in this.book2) {
            if (this.book2[i].title === this.book1.title && this.book[i].addedBook === false) {
              this.$set(this.book1, 'addedBook', true)
              this.book2.push(this.book1)
            } else {
              return 0
            }
          }
        } else {
          this.$set(this.book1, 'addedBook', true)
          this.book2.push(this.book1)
        }
      }
//      saveReadChapter(newBookInfo) {
//        for (let item in this.book2) {
//          if (item.title === newBookInfo.title) {
//            this.$set(item, 'lastRead', newBookInfo.lastRead)
//          }
//        }
//      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  #app
    height: 100%
    width: 100%
</style>
