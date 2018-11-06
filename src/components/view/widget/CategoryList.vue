<template>
  <div class="cate">
    <!--<div v-for="(items, indexs) in classMap" :key="indexs">-->
    <!--<span></span>-->
    <!--&lt;!&ndash;<div v-for="(item, index) in items.content" :key="index">-->
    <!--<span>{{item.name}}</span>-->
    <!--<span>{{item.bookCount}}</span>-->
    <!--</div>&ndash;&gt;-->
    <!--</div>-->
    <div class="menuWrapper">
      <ul class="menu">
        <li v-for="(item, i) in classCate" :key="i" class="menuList">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="detailWrapper" ref="detailWrapper">
      <div>
        <div class="detail" v-for="(items, indexs) in classMap" :key="indexs">
          <div class="content-box" v-for="(item, index) in items" :key="index">
            <div class="content">
              <span>{{item.name}}</span>
              <span>{{item.bookCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      classMap: {
        required: true,
        type: Array
      },
      classCate: {
        required: true,
        type: Array
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.detailWrapper, {
            click: true
        })
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import '../../../public/scss/mixin'
  .cate
    width: 100%
    height: 100%
    display: flex
    .menuWrapper
      flex: 0 0 80px
      width: 80px
      padding: 0 12px
      .menu
        width: 100%
        height: 40px
        line-height: 40px
        text-align: center
        .menuList
          @include border-1px(rgba(7, 17, 27, 0.5))
    .detailWrapper
      flex: 1
      .detail
        display: flex
        width: 100%
        flex-wrap: wrap
        margin-bottom: 30px
        padding: 20px 12px
        .content-box
          display: table
          flex: 0 0 80px
          width: 80px
          height: 40px
          .content
            display: table-cell
            text-align: center
            padding: 20px 12px
            margin-bottom: 40px
            & > span
              display: block
              width: 100%
</style>
