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
                <div v-for="(val,i) in sxt.cams" :key="k">
                  <mt-field label="序列号:"  v-model="val.s"></mt-field>
	<mt-field label="位置:"       v-model="val.n"></mt-field>
	<el-button type="primary" icon="el-icon-delete" @click="del(i)"  ></el-button>
	</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getStoreJoinin, uploadInfoFile, saveStoreJoinin2 } from '../../../api/seller'
export default {
  name: 'cammer',

  data () {
    return {
	sxt:{
		appkey:'2222222',
		token:'2222222',
		scret:'token',
		cams:[{s:'2222',n:'ddddd'},{s:'2222',n:'ddddd'}],
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
s=s.replace(/&quot;/g,"\"")
//alert(s)
    // this.sellerJoininSave({ storeJoinin: store_joinin })
this.ps=store_joinin
   this.sxt=JSON.parse(s)
//alert(JSON.stringify(this.ps))
    })
  },

  methods: {
    ...mapMutations({
      memberPoint: 'memberPoint',
      sellerJoininSave: 'sellerJoininSave'
    }),
	addcam(){
		let jsn={s:'',n:''}
		this.sxt.cams.push(jsn)
	},
	save(){
		var s=JSON.stringify(this.sxt)
		//alert(s)
		this.ps.camer=s
		//alert(JSON.stringify(this.ps))
     		 saveStoreJoinin2(this.ps)
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
