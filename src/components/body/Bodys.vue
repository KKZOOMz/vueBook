<template>
  <div class="bdys">
    <books-header :selected="selected"></books-header>
    <div class="b-view">
      <keep-alive>
        <router-view :book="book"></router-view>
      </keep-alive>
    </div>
    <tab-bar @selects="selects"></tab-bar>
  </div>
</template>

<script>
  import BooksHeader from '../../components/header/BooksHeader.vue'
  import TabBar from '../../components/tab/TabBar.vue'
  export default {
    components: {
      BooksHeader,
      TabBar
    },
    props: {
      book: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selected: {
          name: '书架',
          id: 0
        }
      }
    },
    created() {
    },
    methods: {
      selects(val) {
        this.selected.id = val
        console.log(this.selected.id)
        switch (val) {
          case 0:
            this.selected.name = '书架'
            break
          case 1:
            this.selected.name = '精选'
            break
          case 2:
            this.selected.name = '分类'
            break
          case 3:
            this.selected.name = ''
            break
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../public/scss/mixin'
  .bdys
    height: 100%
    width: 100%
    .b-view
      position: absolute
      top: 40px
      bottom: 60px
      height: 86%
      width: 100%
      overflow: hidden
      @include border-1px(rgba(7, 17, 27, 0.4))
</style>
