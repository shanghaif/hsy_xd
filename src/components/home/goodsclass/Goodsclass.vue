<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-15 17:18:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-02 14:51:23
-->
<template>
	<div class="category">
		<div id="stadus-bar"></div>
		<home-common-search2></home-common-search2>
		<goodsclass-body ref="mychild" isGoodsClass="true"  @getScrollTop="getScrollTop" :upgrape="upgrape"></goodsclass-body>
	</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import HomeCommonSearch2 from '../common/HomeCommonSearch2';
import GoodsclassBody from './GoodsclassBody'
import { resetRem, resumeRem } from '@/util/rem';
export default {
	name: 'HomeGoodsclass',
	data(){
		return{
      upgrape:this.$route.query.upgrape?true:false,
      
      leftContScrollTop:0,
      rightContScrollTop:0,

		}
	},
  components: {
    HomeCommonSearch2,
    GoodsclassBody
  },
  
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
			( from.name != 'HomeGoodsdetail' )?(
        // 从新加载 数据
        vm.$refs.mychild.firstloading()
			):(
        // 旧版本 缓存数据 滚动条
        vm.$nextTick(()=>{
          vm.$children[1].$refs.leftCont.scrollTop = vm.leftContScrollTop;
          vm.$children[1].$refs.rightCont.scrollTop = vm.rightContScrollTop;
        })
      )
			resetRem();			
		})
	},
  mounted(){
		resetRem();
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {
    // 获取 子组件传过来的 值
    getScrollTop(arr){
      [ this.leftContScrollTop, this.rightContScrollTop ] = arr;
    },
},

}
</script>

<style scoped lang='scss'>

</style>
