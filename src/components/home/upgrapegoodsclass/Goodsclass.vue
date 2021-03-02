<template>
	<div class="category">
		<div id="stadus-bar"></div>
		<home-common-search-upgrape ></home-common-search-upgrape>
		<goodsclass-body :upgrape="upgrape"></goodsclass-body>
	</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex'
import HomeCommonSearchUpgrape from '../common/HomeCommonSearchUpgrape';
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
    HomeCommonSearchUpgrape,
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
