<template>
	<mt-popup class="selectBox" v-model="currentValue" position="bottom">
    <div class="cont">
      <!-- 头部 -->
      <div class="head">
        {{title}}
      </div>
      <!-- 内容 -->
      <div class="center" v-for="(v,i) in items" :key="i"
        @click="confirm(v)"
        >
        {{v[showName]}}
      </div>
      <!-- 尾部 -->
      <div class="foot" @click="currentValue=false">
        取消
      </div>

    </div>
	</mt-popup>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    // 父组件传过来的 数据内容
    items:{
      default:Array,
    },
    // 标题
    title:{
      default:''
    },
    // 显示的 文字
    showName:{
      default:'name'
    },
  },
  data () {
    return {
      currentValue: false,
    }
  },
  created(){
  },
  methods: {
    onclickMask () {
      this.currentValue = false;
    },
    cancel (values) {
      this.currentValue = false;
      this.$emit('cancelselectBox', values);
    },
    confirm (values) {
      this.currentValue = false;
      this.$emit('getSelectBox', values);
      // console.log(values);
    }
  }
}
</script>

<style lang="scss" scoped>
.selectBox{
  div{
    box-sizing: border-box;
  }
  .cont{
    width: 100%;
    // height: 50vh;
    background: #EFEFEF;
    $height: 40px;
    padding-bottom: 30px;
    div{
      height: $height;
      line-height: $height; 
      background: #FFFFFF;
      text-align: center;
      font-size: 14px;
    }
    .head{
      color: #6F6F6F;
      font-size: 12px;
    }

    .center{
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #161616;
      margin-top: 1px;
    }

    .foot{
      color: #6F6F6F;
      margin-top: 10px;
      font-size: 16px;
    }
    



  }
}
</style>
