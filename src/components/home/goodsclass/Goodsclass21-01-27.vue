<template>
	<div class="category">
		<div id="stadus-bar"></div>
		<home-common-search2></home-common-search2>
		<goodsclass-body :upgrape="upgrape"></goodsclass-body>
	</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import HomeCommonSearch from '../common/HomeCommonSearch'
import HomeCommonSearch2 from '../common/HomeCommonSearch2';
import GoodsclassBody from './GoodsclassBody'
import { resetRem, resumeRem } from '@/util/rem';
export default {
	name: 'HomeGoodsclass',
	data(){
		return{
			upgrape:this.$route.query.upgrape?true:false,
		}
	},
  components: {
    HomeCommonSearch2,
    GoodsclassBody
  },
  computed: {
    ...mapState({
      token: state => state.member.token,
	tsids:state =>state.member.tsids,
	tcids:state =>state.member.tcids,
	area_info:state =>state.member.tarea_info,
  area_id:state =>state.member.tarea_id,
  mclass:state =>state.member.mclass,
    })

  },
  mounted(){
    // if( window.plus){      
    //   plus.navigator.setStatusBarBackground('#FFFFFF');
    //   plus.navigator.setStatusBarStyle('dark');
    // }
		resetRem();
    this.gclass()
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {
    ...mapMutations({
       membertuans: 'memberTuans'
    }),
    gclass(){
    this. membertuans({tid:0,tsids:this.tsids,tcids:this.tcids,tarea_info:this.area_info,tarea_id:this.area_id,mclass:this.mclass})
    }
},

}
</script>

<style scoped lang='scss'>

</style>
