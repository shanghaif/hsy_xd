<template>
    <div class="container">
        <label class="title">{{title}}</label>
        <label class="subtitle discount" v-if="discount">-￥{{subtitle}}</label>
        <label class="subtitle" v-else>￥{{subtitle}}</label>
    </div>
</template>

<script>
export default {
  props: {
    title: {
    },
    subtitle: {
    },
      discount:{default:false},
  }
}
</script>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
    }
    .title {
        width: 8rem;
        font-size: 0.7rem;
        color: #333;
        margin-left: 0.85rem;
    }
    .subtitle {
        flex: 1;
        margin-left: 1rem;
        margin-right: 0.75rem;
        color: $primaryColor;
        font-size: 0.75rem;
        text-align: right;
    }
    .subtitle.discount{color:#333}
</style>
