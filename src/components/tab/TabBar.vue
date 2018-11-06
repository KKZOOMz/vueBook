<template>
    <div class="tabbar">
      <div class="tab-item" id="0" ref="item" @click="select(0)">
        <router-link to="/bookshelf">
          <i class="icon icon-book"></i>
          <h2 class="title">书架</h2>
        </router-link>
      </div>
      <div class="tab-item" id="1" ref="item" @click="select(1)">
        <router-link to="/category">
          <i class="icon-list icon"></i>
          <h2 class="title">精选</h2>
        </router-link>
      </div>
      <div class="tab-item" id="2" ref="item" @click="select(2)">
        <router-link to="/rankings">
          <i class="icon-category icon"></i>
          <h2 class="title">分类</h2>
        </router-link>
      </div>
      <!--<div class="tab-item" id="3" ref="item" @click="select(3)">-->
        <!--<router-link to="/search">-->
          <!--<i class="icon icon-search"></i>-->
          <!--<h2 class="title">搜索</h2>-->
        <!--</router-link>-->
      <!--</div>-->
    </div>
</template>

<script>

  export default {
    methods: {
      select(val) {
        this.$emit('selects', val)
//        console.log('test', val)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .tabbar
    position: absolute
    bottom: 0
    left: 0
    display: flex
    width: 100%
    height: 8%
    /*border-top: 1px solid #000*/
    .tab-item
      flex: 1
      text-align: center
      height: 50px
      line-height: 50px
      & > a
        display: block
        position: relative
        width: 100%
        height: 100%
        line-height: 50px
        padding: 10px 0
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
        .icon
          position: absolute
          right: 0
          left: 0
          font-size: 16px
          display: inline-block
        .title
          position: absolute
          display: inline-block
          right: 0
          left: 0
</style>
