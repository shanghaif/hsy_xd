<template>
    <div class="container">
    <div class="common-header-wrap">
        <mt-header title="摄像头管理" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
    </div>
        <div >
	<mt-field label="Appkey:" v-model="sxt.appkey"></mt-field>
	<mt-field label="Token:" v-model="sxt.token"></mt-field>
	<mt-field label="Scret:" v-model="sxt.scret"></mt-field>
	<el-button  type="success"    @click="addcam" round>添加</el-button>
	<el-button  type="danger"    @click="save" round>保存</el-button>
                <div v-for="(val,i) in sxt.cams" :key="i">
                  <mt-field label="序列号:"  v-model="val.s"></mt-field>
	<mt-field label="位置:"       v-model="val.n"></mt-field>
	<el-button type="primary" icon="el-icon-delete" @click="del(i)"  ></el-button>
	</div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { getStoreJoinin, uploadInfoFile, saveStoreJoinin2 } from '../../../api/seller'
export default {
  name: 'cammer',

  data () {
    return {
	sxt:{
		appkey:'',
		token:'',
		scret:'',
		cams:[{s:'',n:''}],
	},
	ps:{},
    }
  },
 computed: {
    ...mapState({
      storeJoinin: state => state.member.storeJoinin
    }),
  },
  created: function () {
   getStoreJoinin().then(res => {
     var store_joinin = res.result.store_joinin
     var s=store_joinin.camer
this.ps=store_joinin
if(s!=''){
s=s.replace(/&quot;/g,"\"")
this.sxt=JSON.parse(s)
}
    })
  },

  methods: {
    ...mapMutations({
      memberPoint: 'memberPoint',
      sellerJoininSave: 'sellerJoininSave'
    }),
	addcam(){
    let jsn={s:'',n:''}
    if( !this.sxt.cams){
      this.sxt.cams = [];
    }
		this.sxt.cams.push(jsn)
	},
	save(){
		var s=JSON.stringify(this.sxt)
    this.ps.camer=s
    console.log(this.ps.camer);
     		 saveStoreJoinin2(this.ps).then(res=>{
            if(res.code == 10000){
              Toast("保存成功");
            }else{
              Toast(res.message);
            }
          })
	},
	del(i){
		this.sxt.cams.splice(i,1)
	}
  }
}
</script>

<style scoped>

/deep/.mint-cell-text {width: 65px;}
</style>
