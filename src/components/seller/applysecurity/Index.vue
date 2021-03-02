<template>
  <div class="ChefSetting">
    <!-- 头部 -->
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">店铺申请</span>
			<div class="header-right"></div>
		</div>

    <!-- <index-manage-item v-on:onclick="goUpGrade" :iconfont="iconUpGrade" 
					:title=''></index-manage-item> -->
    
		<!-- 主题内容 -->
		<div class="cont">
			<ul>
				<li @click="goUpGrade()">
					<div>{{!seller.supply_chain?"申请供应链":(seller.supply_chain == 1?"供应链（申请中）":"供应链")}}</div>
					<img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
				</li>
				<li v-if="sabrand_id == 0 || sabrand_id == null" @click="fun_goModule()">
					<div>{{security}}</div>
					<img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
				</li>
				<li @click="goCold()">
					<div>{{cold !=1?"申请冷链经营":"冷链经营"}}</div>
					<img class="img-back" src="@/assets/image/brand/h5_right.png" alt="" />
				</li>
			</ul>
      <!-- <button @click="submit">提交申请</button> -->
      <dne-drop-down showName="unitname" :items="items" @pickOneDropDown="pickOneDropDown" ref="ondorp"></dne-drop-down>
		</div>

  </div>
</template>

<script>
import { Toast, MessageBox  } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import { getSellerInfo, getUpGrade, getApplySabrand, submitApplySabrand, getApplySabrandShen, applyCold } from '../../../api/seller';
import { mapState, mapMutations } from 'vuex';
import OneDropDown from'../../OneDropDown.vue';
export default {
  data(){
    return{
      security:'申请食安类别',   // 食安 显示 文字
      sabrand_id:this.$route.params.sabrand_id,  // 食安 id 
      cold:this.$route.params.cold,  // 食安 id 
      params:{},    //  食安 类型  对象
      items:[
        { name: "农产批发-济南康师傅食品发展有限公司", id: "1"},
      ],    //  食安 下拉列表

      store_info:{},  // 商家 详情

      status : 0,  //  食安申请状态 1申请中   2申请通过  
    }
  },

  components:{
    'dne-drop-down':OneDropDown
  },

	computed: {
		...mapState({
			isOnline: state => state.seller.isOnline,
			seller: state => state.seller.info
    }),
  },

  created(){
    this.loading();
  },

  mounted() {		
		resetRem();
  },
  beforeDestroy(){
    resumeRem();
  },
  
  methods:{
    ...mapMutations({
      sellerEditUpGrade:'sellerEditUpGrade'
    }),

    // 申请 冷链经营
    goCold(){
      if( this.cold!=1){
        applyCold().then(res=>{
          Toast(res.message);
          this.cold = 1;
        }).catch(err=>{
          Toast(err.message);
        })
      }else{
        Toast("您已申请成功！");
      }
    },

    // 初始化 加载 数据
    loading(){        
      // 获取 商家 详情 
      getSellerInfo().then(response => {
        if (response && response.result) {
          this.store_info = response.result.store_info;
          this.sellerEditUpGrade(response.result.seller_info.supply_chain);
        }
      }).catch(function(error) {
        Toast(error.message);
      });

      // 查看 当前商家 申请状态
      getApplySabrandShen().then(res=>{
        if( res.result ){
          this.status = res.result.status;
          this.status == '1'? this.security = res.result.unitname+'（审核中）':this.status == '2'? this.security = res.result.unitname:'';
        }else{
          this.security = '申请食安类别';
        }
      }).catch(err=>{
        Toast(err.message);
      })

      // 获取食安 下拉列表
      getApplySabrand().then(res=>{
        this.items = res.result;
      }).catch(err=>{
        Toast(err.message);
      })
    },

		// 申请 成为供应链
		goUpGrade(){
			// null未申请     1已申请   // 10  申请成功
			if( !this.store_info.supply_chain || this.store_info.supply_chain==0 ){
				getUpGrade().then(res=>{
					Toast(res.message);
					this.store_info.supply_chain = 1;
					this.sellerEditUpGrade(1);
				}).catch(err=>{
					Toast(err.message);
				})
			}else if( this.store_info.supply_chain == 1 ){
				Toast('您已提交申请，请等待审核！');
			}else{
				Toast('您已成为供应链商家，快来发布一个商品吧');
			}
		},

    // 申请 食安
    fun_goModule(){
      // 根据 审核 状态 判断 是否显示 内容
      this.status == 0? this.$refs.ondorp.currentValue = true:( this.status == '1'?Toast("审核中，请稍后！"):Toast("您已申请成功！"))
    },
    
    // 接收 参数
    pickOneDropDown(v){
      var obj = v[0];
      this.params = obj;
      MessageBox.confirm('申请加入 '+obj.unitname+'？').then(action => {
        this.submit();
      });
    },

    // 提交申请
    submit(){
      submitApplySabrand(
        {
          sabrand_id : this.params.id,  //食安id
          unit_type : this.params.unit_type,        //类型
          sabrand_store_id : this.params.store_id,     // 被申请的商家
        }
      ).then(res=>{
        Toast(res.message);
        this.status = 1;
        this.security = '审核中';
      }).catch(err=>{
        Toast(err.message);
      })
    },
		
  },

}
</script>

<style lang="scss" scoped>
.ChefSetting{	
  // 头部  
	.header-wrap {
		padding: 1rem 1.43rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		img {
			// position: absolute;
			// left: 1.78rem;
			// top: 50%;
			width: 1.74rem;
			height: 1.74rem;
			// transform: translate(0, -50%);
		}
		.header-title {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 1.39rem;
			font-weight: 400;
			color: rgba(22, 22, 22, 1);
		}
	}

  // 主体内容   
  .cont {
    padding: 1rem 1.43rem;
    overflow: scroll;
    li {      
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 1.5rem;
      margin-bottom: 1.2rem;
      background: #ffffff;
      color: #fff;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      height: 11vw;
      line-height: 2.5;
      padding: 0 4vw;
      &:nth-child(1) {
        background: #626771 linear-gradient(139deg, #66aeff 0%, #1369fa 100%);
      }
      &:nth-child(2) {
        background: #f4f5f7 linear-gradient(109deg, #8f94fb 0%, #6167d7 55%, #4e54c8 99%);
      }
      &:nth-child(3) {
        background: #f4f5f7 linear-gradient(109deg, #1369fa 0%, #8f94fb 99%);
      }
      div {
        height: 100%;
        width: 78vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 4vw;
        height: 4vw;
        margin-top: 3.5vw;
      }
    }

    button{
      box-sizing: border-box;
      background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
      box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
      border-radius: 40px;
      color: #fff;
      width: 92%;
      position: fixed;
      /* margin: 3rem auto; */
      bottom: 4%;
      padding: 1rem 0;
      left: 4%;
      z-index: 1;
    }
  }
}
</style>