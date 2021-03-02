<template>
  <div class="area_cont">
    <div class="img_back">
      <img @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
    </div>
    <ul class="area_ul">
      <li>
        <span>全部</span>
        <span v-show="nowArea == 0">✔</span>
      </li>
      <li v-for="(v,i) in items" :key='i'>
        <span>{{v.area_name}}</span>
        <span v-show="nowArea == v.area_id">✔</span>
      </li>
    </ul>
  </div>
</template>


<script>
import { Toast, Indicator } from 'mint-ui'
import { resetRem, resumeRem } from '@/util/rem';
import { getAreaTree } from '../../../api/area'


export default {
  data(){
    return{
      items:[],
      nowArea:0,
    }
  },

  created(){
    getAreaTree().then(res => {
      this.items = res.result.area_list
    }).catch(function (error) {
      Toast(error.message)
    })
  },

  mounted(){    
    resetRem();
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {

  },

}
</script>

<style scoped lang='scss'>
.area_cont{
  width: 80vw;
  border: 1px solid red;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  padding: .6rem;
  font-size: 1.64rem;

  .img_back {
    margin:.4rem;
    img{
      width: 1.692rem;
      height: 1.692rem;
    }
  }

  .area_ul{
    margin-top: 2rem;
    li{
      margin: .42rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
