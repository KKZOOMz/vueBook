<template>
  <div class="header">
    <span class="title">{{selected.name}}</span>
  </div>
</template>

<script>

  export default {
    props: ['selected']
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .header
    position: absolute
    top: 0
    left: 0
    margin: 0 auto
    width: 100%
    height: 40px
    background: #3F4AFE
    text-align: center
    .title
      display: inline-block
      line-height: 40px
      height: 40px
      font-size: 20px
      color: #fff
</style>
