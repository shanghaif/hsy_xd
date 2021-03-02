<template>
<div class="container camm hsy_main">
  <!-- <div class="common-header-wrap">
    <mt-header title="摄像头管理" class="common-header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
  </div> -->
  <!-- 头部  -->
  
	<div class="header-wrap">
		<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
		<span class="header-title">摄像头管理</span>
		<div class="header-right">
		</div>
	</div>

  <!-- 主题内容 -->
  <div class="cont">
    <!-- 海康萤石 -->
    <mt-cell title="海康摄像头"></mt-cell>
    <mt-field label="Appkey：" v-model="sxt.appkey" disableClear></mt-field>
    <mt-field label="Token：" v-model="sxt.token" disableClear></mt-field>
    <mt-field label="Scret：" v-model="sxt.scret" disableClear></mt-field>
    <!-- <br> -->
    <!-- 大华乐橙 -->
    <mt-cell title="大华摄像头"></mt-cell>
    <mt-field label="APP ID：" v-model="sxt.app_id" disableClear></mt-field>
    <mt-field label="APP Scret：" v-model="sxt.app_scret" disableClear></mt-field>
    <!-- 添加保存按钮 -->
    <div class="btn_cont" @click="addcam" >
      <p>        
        <i>+</i>
        添加
      </p>
    </div>
  </div>
  <div class="cont camm_data">
    <!-- <el-button  type="success"    @click="addcam" round>添加</el-button>
    <el-button  type="danger"    @click="save" round>保存</el-button> -->
    <!-- 序列号 位置名称 -->
    <div class="margin_2" v-for="(val,i) in sxt.cams" :key="i">
      <mt-field label="序列号：" v-model="val.s" placeholder="请输入" ></mt-field>
      <mt-field label="位置："   v-model="val.n" placeholder="请输入" ></mt-field>

      <a data-v-37b47d6f="" class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">品牌：</span>
          </div>
          <div class="mint-cell-value">
            <!-- <input type="text" class="mint-field-core"> -->            
            <select
              v-model="val.t"
              name="品牌"
              :class="{sel_color:val.t=='0'}"
              class="mint-field-core"
              style="background: transparent;">
              <option value="0">请选择</option>
              <option value="1">海康</option>
              <option value="2">大华</option>
            </select>
            <div class="mint-field-clear" style="display: none;">
              <i class="mintui mintui-field-error"></i>
            </div>
            <span class="mint-field-state is-default">
              <i class="mintui mintui-field-default"></i>
            </span>
            <div class="mint-field-other"></div>
          </div>
        </div>
        <div class="mint-cell-right">
        </div>
      </a>

      <mt-field label="通道："   v-model="val.aisle" placeholder="请输入" ></mt-field>

      <div class="btn_cont" @click="del(i)" >
        <p>
          <i class="el-icon-delete"></i>
          删除
        </p>
      </div>
      <!-- <el-button type="primary" icon="el-icon-delete" @click="del(i)"  ></el-button> -->
    </div>

    
    <!-- 提交按钮 -->
    <mt-button
      @click="save"
      class="btn_new"
      size="large"
      >保存
    </mt-button>  
  </div>
</div>
</template>

<script>
import $ from 'jquery';
import '@/assets/style/hsy-mint.scss';
import { resetRem, resumeRem } from '@/util/rem';
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { getStoreJoinin, uploadInfoFile, saveStoreJoinin2, getLcData, upToken, getSeller1Token, openLcApi } from '../../../api/seller'
export default {
  name: 'cammer',

  data () {
    return {
      sxt:{
        appkey: '',
        token: '',
        scret: '',
        cams: [{s:'',n:''}],
        app_id: "",   // 大华app_id
        app_scret: "",// 大华app_scret
        app_token: "",// 大华token  走接口获取

        expireTime:"0",
        app_expireTime:"0",
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
      var s = store_joinin.camer
      this.ps = store_joinin
      if( s!='' ){
        s = s.replace(/&quot;/g,"\"")
        this.sxt = JSON.parse(s);
      }
    })
  },

  mounted(){
    resetRem();
  },

	beforeDestroy() {
		resumeRem();
  },
  
  methods: {
    ...mapMutations({
      memberPoint: 'memberPoint',
      sellerJoininSave: 'sellerJoininSave'
    }),

    // 点击添加按钮 
    addcam(){
      let jsn={s:'',n:'',type:1,t:'1',aisle:"1"}
      if( !this.sxt.cams){
        this.sxt.cams = [];
      }
      (this.sxt.cams.length<20)?this.sxt.cams.unshift(jsn):Toast("达到摄像头数量上限");
    },

    // 点击保存按钮
    save(){
      // 如果有空的值 
      if( !this.sxt.appkey ){
        this.sxt.appkey = '0';
      }
      if( !this.sxt.token ){
        this.sxt.token = '0';
      }
      if( !this.sxt.scret ){
        this.sxt.scret = '0';
      }
      if( !this.sxt.app_id ){
        this.sxt.app_id = '0';
      }
      if( !this.sxt.app_scret ){
        this.sxt.app_scret = '0';
      }
      // 如果是 用户自己的大华设备
      if( this.sxt.app_id != '0' && this.sxt.app_scret != '0' && this.sxt.app_id != '1' && this.sxt.app_scret != '1'  ){
        getLcData(this.sxt.app_id,this.sxt.app_scret).then(res=>{
          if( res.code == 10000 ){
            this.sxt.app_token = res.result;
            this.saveStore();
          }
        }).catch(err=>{
          Toast("检查大华摄像头参数");
        })
      }else{
        this.saveStore();
      }
    },

    // 保存函数
    saveStore(){
      this.sxt.expireTime = '0';
      this.sxt.app_expireTime = '0';
      var s = JSON.stringify(this.sxt);
      this.ps.camer = s;				
      let that = this;
      
      let cams = '';// 海康 开通序列号
      let dahuaArr = [];  // 大华开通账号
			for (let i = 0; i < this.sxt.cams.length; i++) {
        // 如果是 海康的 设备
				if (this.sxt.cams[i].t == '1') {
          // 有值则取值 否则 填1
					var aisle = this.sxt.cams[i].aisle || 1;
					cams = cams + this.sxt.cams[i]['s'] + ':'+aisle+',';
				}else if (this.sxt.cams[i].t == '2') {
          dahuaArr.push(this.sxt.cams[i]);
        }
      }

      saveStoreJoinin2(that.ps).then(res=>{
        if(res.code == 10000){
          // 如果有 海康的设备
          if( cams != '' ){
            // 开通 海康设备 直播
            function openHK(accessToken){
              $.ajax({
                type: 'POST',
                url: 'https://open.ys7.com/api/lapp/live/video/open',
                data: {
                  accessToken: accessToken,// 1 at.3r2to1h44bbpjf7uch1ru5nw31qh0jn1-2h6sewsem7-1tlttng-bbcypwbyt
                  source: cams
                },
                dataType: 'json',
                success: function(data) {
                  Toast("保存成功");
                },
                error: function(e) {
                  console.log(e);
                }
              })
            }
            // 获取 真实 token
            (that.sxt.token == '1')?(
              getSeller1Token().then(res=>{
                openHK(res.result.token)
              }).catch(err=>{
                Toast(err.message);
              })
            ):(
              openHK(that.sxt.token)
            );

          }
          if(dahuaArr.length!=0 && this.sxt.app_id !=1 &&this.sxt.app_id !=0 && this.sxt.app_scret !=1 &&this.sxt.app_scret !=0 ){
            // // 如果 有大华设备 开通摄像头直播
            for(var obj of dahuaArr ){
              openLcApi(
                this.sxt.app_token, obj.s, '0', this.sxt.app_id, this.sxt.app_scret
              ).then(res=>{
                console.log(res);
              }).catch(err=>{
                console.log(err);
              })
            }
            Toast("保存成功");
          }else if(this.sxt.app_id == 1 && this.sxt.app_scret == 1 ){
            getSeller1Token().then(res=>{ 
              var dahua = res.result; 
              for(var obj of dahuaArr ){
                openLcApi(
                  dahua.app_token, obj.s, '0', dahua.app_id, dahua.app_scret
                ).then(res=>{
                  console.log(res);
                }).catch(err=>{
                  console.log(err);
                })
              }
              Toast("保存成功");
            }).catch(err=>{
              Toast(err.message);
            })
            Toast("保存成功");
          }
        }
      }).catch(err=>{
        console.log(err);
      })
    },

    // 删除 按钮
    del(i){
      this.sxt.cams.splice(i,1)
    }
  }
}
</script>


<style lang="scss" scoped>
.camm{

  background: #F4F5F7;
  font-size: 1.28rem;

  // 头部
  .header-wrap {
    padding: 1rem 1.43rem;
    position: relative;
    display: flex;
    background: #fff;
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
    .header-right {
      span {
        font-size: 1.3rem;
      }
    }
  }
  
  // 主题内容
  .cont{
    margin-bottom: 2rem;

    // 添加 按钮
    .btn_cont{
      display: flex;
      justify-content: center;
      flex-direction: column;

      font-size: 1.24rem;
      font-weight: 400;
      color: #6f6f6f;
      text-align: center;
      color: #E53216;
      min-height: 48px;

      background-color: #fff;
      box-sizing: border-box;
    }
    .btn_new{
      background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
      box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
      border-radius:40px;
      color: #fff;
      margin: 1rem 0;
      width: 92%;
      margin: 0 auto;    
      margin: 4rem auto 2rem;
      // position: fixed;
      // bottom: 1rem;
      // left: 4%;
      // z-index: 1;
    }
  }

  .camm_data{
    .margin_2{
      margin: 2rem 0;
    }
    &/deep/.mint-field{
      .mint-cell-title{
        min-width:64px;
      }
      .mint-cell-value{
        .mint-field-core{
          text-align: left;
        }
        select.mint-field-core {
          direction: ltr;
        }
      }
    }
    $placeColor: #C6C6C6;
    &/deep/input::-webkit-input-placeholder { 
      /* WebKit browsers */ 
      color: $placeColor;
    }
    .sel_color{
      color: $placeColor;
    }
    
    // input:-moz-placeholder { 
    //   /* Mozilla Firefox 4 to 18 */ 
    //   color: $placeColor; 
    // } 
    // input::-moz-placeholder { 
    //   /* Mozilla Firefox 19+ */ 
    //   color: $placeColor; 
    // } 
    // input:-ms-input-placeholder { 
    //   /* Internet Explorer 10+ */ 
    //   color: $placeColor; 
    // }

  }

}
</style>
