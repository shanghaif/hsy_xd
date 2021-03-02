<template>
	<div class="container">
		<div class="tuanclass_h">
      <head-title :title="tlname" :titleRight="titleRight" titleRightColor="#E63116"></head-title>
			<!-- <mt-header :title="tlname" class="common-header"><mt-button slot="left" icon="back" @click="goBack"></mt-button></mt-header> -->
		</div>
    <!-- <div  v-if="type==2" class="ui-form-area">
      <div class="ui-form-control register-form-select" @change="csel">   
        <select class="ui-form-input" v-model='tid'>	
          <option value='999'>选择社区团</option> 
          <option v-for='(item,index) of c' :key='index' :value='item.member_id' >{{ item.tuan}}</option> 
        </select>
      </div> 
    </div> -->

    <region-picker2 ref="picker"  :valm="Area_id?Area_id:37010201" v-on:onConfirm="onPickerConfirm"></region-picker2>
    <tuanclass-body v-if="tuan_show" ref="tuan"></tuanclass-body>
    <div class="tuan_style" v-if="!tuan_show">请选择团购地区</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast, Indicator } from 'mint-ui'
import RegionPicker2 from '../../../components/RegionPicker2'
import { tuanlist ,tuangc} from '../../../api/homesearch'
import TuanclassBody from './TuanclassBody'
import { cartType } from "../../../api/homecart";
import { resetRem, resumeRem } from '@/util/rem';

import HeadTitle from '../../HeadTitle';
export default {
  components: {
    RegionPicker2,
    TuanclassBody,
    HeadTitle
  },
  data () {
    return {
      popMap: false,
      // area_info: '菏泽市 曹县 曹城镇',
      // area_id: 37172101,
      c:[],
      tclass:[],
      tid:'',
      tlname:'社区团购',
      tlnames:[
        '',
        '零售市场',
        '社区团购',
        '批发市场',
        ' ',
        '集采市场'
      ],
      type:2,
      tuan_show:true,//显示商品列表点击

      titleRight: null,  // 右侧 点击按钮
    }
  },
  computed: {
    ...mapState({
      token: state => state.member.token,
      tid1:state =>state.member.tid,
      tsids:state =>state.member.tsids,
      tcids:state =>state.member.tcids,
      area_info:state =>state.member.tarea_info,
      area_id:state =>state.member.tarea_id,
      Area_id:state =>state.member.area_id,//用户收货地址
      Area_info:state =>state.member.area_info,//用户收货地址
      mclass:state => state.member.mclass,
      exid:state => state.member.exid,
      extuan:state => state.member.extuan,
  		INFO:state =>state.member.info,//用户信息
    }),
    getSumitTitle () {
      let isFromCheckout = this.$route.query.isFromCheckout
      if (isFromCheckout) {
        return '保存并使用'
      } else {
        return '保存'
      }
    },
  },
  mounted(){
    resetRem();
  },
  created: function () {
    this.tid = this.tid1;
    if( this.tid == 0 ){
      this.tid = '999';
    }
    this.type = this.$route.query.type;
    if( this.mclass ){
      if( 0<this.mclass && this.mclass<3 ){//非批发集采
        this.type = this.mclass;
      }else if( this.mclass == 5 ){  // 集采
        this.type = 5;
      }else{   //  普通 商家
        this.type = this.mclass;
      }
      this.tlname = this.tlnames[this.type]
      this.gclass()
      if( this.type == 1 || this.type == 2 ){
        this.titleRight = "更改地址"
      }    
    }else if( this.mclass == 0 ){
      this.titleRight = "去登录";
      this.tlname = '全部商品';
    }
  },
	beforeDestroy: function() {
		resumeRem();
	},
  methods: {
    ...mapMutations({
       membertuans: 'memberTuans',
       memberSetTarea:"memberSetTarea",
       memberSaveTuan:"memberSaveTuan",//修改社区团
      memberSaveArea_id:"memberSaveArea_id",      //保存收货地址
      // saveHomecartMarket:"saveHomecartMarket",//社区团
      saveHomecartCartType: 'saveHomecartCartType',//购物车商品类型
      memberEx:"memberEx",
    }),

    // 去更改 收货地址
    fun_right(){
      if( this.mclass != 0){
        this.$router.push({ 'name': 'MemberAddressList' })
      }else{
				this.$router.push({ name: 'HomeMemberLogin' });
      }
    },

    test () {
      tuangc(this.tuanid, this.token).then(res => {console.log(res)})
    },
    csel(){
      // this.memberSaveTuan(this.tid);
      // console.log(this.c,arguments);
      for(var i =0;i<this.c.length;i++){
        if(this.c[i].member_id == this.tid){
          this.memberSaveTuan(this.c[i].tuan);          
        }
      }
      // console.log("更改",this.tid);
      tuangc(this.tid, this.token).then(res => {
        if(this.tid =="0"){
          this.tuan_show = false;
        }else{
          this.tuan_show = true;          
        }
        // console.log(res);
        var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
        var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
        // console.log('长度',sa1.length)
        // this.tcids=sa
        // this.tsids=sa1
        // this.$refs.tuan.tcids=sa
        this.membertuans({tid:this.tid,tsids:sa1,tcids:sa,tarea_info:this.area_info,tarea_id:this.area_id,mclass:2})
      //	this.$forceUpdate()
      // console.log(this.tsids)
      })
    },
    gclass(){
      
      this.memberEx([this.Area_id,null]);
      // console.log('type',this.type);
      if(this.type!=2){
        let n =	this.type*(-1)
        // if(this.type == 5){
        //   n = -5;
        // }
        tuangc(n, this.token).then(res => {
        // console.log(res);
          var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
          var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
        // console.log('初始化长度',sa1.length);
          // this.tcids=sa
          // this.tsids=sa1
          // this.$refs.tuan.tcids=sa
          // console.log(this.type);
          this.membertuans({tid:0,tsids:sa1,tcids:sa,tarea_info:this.area_info,tarea_id:this.area_id,mclass:this.type})
          this.$forceUpdate()
          // console.log(this.tcids)
        })
        this.tuan_show = true;
      }else{
        tuangc(2, this.token).then(res => {
          // console.log(res);
          var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
          var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
          // console.log('初始化长度',sa1.length);
          // this.tcids=sa
          // this.tsids=sa1
          // this.$refs.tuan.tcids=sa
          this.membertuans({tid:0,tsids:sa1,tcids:sa,tarea_info:this.area_info,tarea_id:this.area_id,mclass:this.type})
          this.$forceUpdate()
          // console.log(this.tcids)
        })
        this.tuan_show = true;

        tuanlist(this.Area_id, this.token).then(res => {
          this.c=res.result;
          // console.log('ccc',this.c);
          // console.log(this.tid);
          if( this.tid == ("0" ||"999" ) ){
            this.memberSaveTuan(null);  
            this.tuan_show = false;
          }else{
            for(var item of this.c){
              if(item.member_id == this.tid){
                this.memberSaveTuan(item.tuan);  
              }
            }
            this.tuan_show = true;
          }
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },


    submit () {

    },
    onRegion (picker, values) {
      return false;
      if(this.mclass <3 && this.mclass !=0){
      	cartType(this.INFO.member_id).then(cart=>{
          // console.log(cart.result);
					if(cart.result){
						this.saveHomecartCartType([cart.result.cart_type,cart.result.cart_area_id])//保存购物车商品类型  商品地址
					}else{						
						this.saveHomecartCartType([null,null])
            this.$refs.picker.currentValue = true     
					}
					// if(this.mclass<3 && cart.result!=null && cart.result.cart_area_id && cart.result.cart_area_id !=this.exid){
					// 	Toast('请先去购物车清空商品');
					// 	return false;
					// }
          // if(this.mclass <3 && this.exid != this.area_id){//如果 普通会员 并且 当前地址 和默认收获地址 不一致
          //   Toast('此商品不在默认收获地址配送范围内，请设置默认收获地址');
          //   return false;		
          // }
        });
      }else{
        this.$refs.picker.currentValue = true        
      }
    },
    onPickerConfirm (values) {
      // console.log(values);
      // this.area_info = this.getRegionStr(values);
      // this.area_id = values[2].area_id;
      // console.log([values[2].area_id,this.getRegionStr(values)]);
      this.memberSaveArea_id([this.Area_id,this.getRegionStr(values)]);
      this.memberEx([values[2].area_id,null]);
      this.memberSetTarea([this.getRegionStr(values),values[2].area_id]);
      tuanlist(this.area_id, this.token).then(res => {
        this.c=res.result
        // console.log(this.c)
      })
    },
    getRegionStr (values) {
      let title = ''
      for (let i = 0; i < values.length; i++) {
        const element = values[i]
        if (i !== 0) {
          title = title + ' ' + element.area_name
        } else {
          title = title + element.area_name
        }
      }
      return title
    },

  }
}
</script>

<style lang="scss" scoped>
.tuanclass_h{
  background: #fbfbfb;
}
.tuan_style {
 margin-top: 8rem;
 text-align: center;
}
.right-arrow {
 transform: rotate(-90deg);
 color: #ddd;
 font-size: 0.6rem;
 display: inline-block;
}
.input-wrap {
 position: relative;
 i {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 2.4rem;
  display: block;
  width: 2rem;
  text-align: center;
  font-size: 1rem;
 }
}

.ui-form-control {
 padding: 0.6em 0.5em 0.6em;
 border-radius: 0.1em;
 background-color: RGBA(246, 246, 246, 1);
}
.register-form-select {
 position: relative;
 z-index: 1;
}
.ui-form-input {
 width: 100%;
 background-color: transparent;
}
.ui-form-input,
.ui-form-input:focus {
 outline: none;
 border: none;
 color: #2c333a;
 // font-size: 0.6em;
 font-size: 1.1rem;
}
.ui-form-area {
 margin-top: 2rem;
 margin-bottom: 0.5em;
 width: 50%;
 display: inline-block;
}
.common-header {
 height: 4rem!important;
 line-height: 4rem!important;
 /deep/ .mint-header-title {
  font-size: 1.4rem!important;
 }
}
</style>