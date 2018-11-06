<template>
  <div class="b-content">
    <div class="list" v-if="flag" @click="turn(items._id)" v-for="(items, indexs) in books" :key="indexs">
      <!--<span>{{items.title}}</span>-->
      <!--<span>{{items.cover}}</span>-->
      <!--<span>{{items._id}}</span>-->
      <div class="b-cover">
        <img :src="pic[indexs]" width="80" ref="pic"/>
      </div>
      <div class="b-text">
        <span class="b-title">{{items.title}}</span>
        <span class="b-author">{{items.author}}</span>
        <span class="b-shortInfo">{{items.shortIntro}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      setId: {
        type: String,
        required: true
      }
    },
    created() {
//      console.log(this.setId)
//      for (let j = 0; j < 3; j++){
//        this.showBooks[j] = this.books[j]
//      }
//      console.log(this.books)
      this.getRankDetail(this.setId)
    },
    mounted() {
//      console.log(this.books)
    },
    data() {
      return {
        books: [],
        pic: [],
        flag: false,
        cover: ''
      }
    },
    computed: {},
    methods: {
      turn(id) {
        this.$router.push({name: 'bookDetail', params: {bookId: id}})
      },
      getRankDetail(id) {
        this.axios('/api/ranking/' + id)
          .then(res => {
            if (res.data.ok === true) {
              res = res.data.ranking.books
//            console.log(res)
//            this.detail = res.raking
//            console.log(this.detail)
//              for (let i = 0; i < 3; i++) {
//                vm.$set(this.books, i, res[i])
//                vm.$set(this.pic, i, decodeURIComponent(this.books[i].cover).substring(7))
//              }
              for (let i = 0; i < 3; i++) {
                this.books.push(res[i])
//                this.$set(this.book[i], cover, decodeURIComponent(this.books[i].cover).substring(7))
                this.pic.push(decodeURIComponent(this.books[i].cover).substring(7))
                this.flag = true
//                console.log(this.pic)
              }
            }
          })
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .b-content
    margin-top: 10px
    width: 100%
    height: 360px
    overflow: hidden
    .list
      display: flex
      height: 120px
      width: 100%
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
          margin-bottom: 10px
        .b-shortInfo
          display: inline-block
          height: 40px
          font-size: 16px
          line-height: 20px
          white-space: pre-line
          text-overflow: ellipsis
          overflow: hidden
  /*span
    display: inline-block
    width: 100%
    height: 100%*/
</style>
