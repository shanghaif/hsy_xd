<template>
  <div class="survey">    
    <!-- 头部标题 返回按钮 -->
		<div class="header">
			<div class="header_cont">
				<!-- <img class="header-left" @click="$router.push({name:'HomeBrandItem',query:{sid:store_id}})" src="@/assets/image/brand/h5_back.png" alt="" /> -->
				<img class="header-left" @click="$router.go(-1)" src="@/assets/image/brand/h5_back.png" alt="" />
				<span class="header-title">满意度调查表</span>
        <span class="header-right"></span>
			</div>
		</div>

    <!-- 主题内容 -->
    <div class="survey_main">
      <!-- 性别sex -->
      <div class="all">
        <p class="title">*性别：</p>
      </div>
      <ul class="flex sex">
        <li @click="fun_change(1,'1')"  :class="{ isActive:params.sm_sax == 1 }">
          <img src="@/assets/image/brand/man.png" alt="">
          <div>男</div>
        </li>
        <li @click="fun_change(1,'2')"  :class="{ isActive:params.sm_sax == 2 }">
          <img src="@/assets/image/brand/woman.png" alt="">
          <div>女</div>
        </li>
      </ul>
      <!-- 年龄 -->
      <div class="all">
        <p class="title">*年龄：</p>
      </div>
      <ul class="flex age">
        <li 
          v-for="(ag,ai) in ageList" :key="ai" 
          @click="fun_change(2,ai)"
          :class="{ isActive : params.sm_age == ai }"
          >{{ag}}</li>
      </ul>
      <!-- 学历： -->
      <div class="all">
        <p class="title">*学历：</p>
      </div>
      <ul class="flex age">
        <li 
          v-for="(educat,ei) in educatList" :key="ei"
          @click="fun_change(3,ei)"
          :class="{ isActive : params.sm_edu == ei }"
          >{{educat}}</li>
      </ul>
      <!-- 工作年限： -->
      <div class="all">
        <p class="title">*工作年限：</p>
      </div>
      <ul class="flex age">
        <li 
          v-for="(wy,wyi) in workYearList" :key="wyi"
          @click="fun_change(4,wyi)"
          :class="{ isActive : params.sm_workyears == wyi }"
          >{{wy}}</li>
      </ul>
      <!-- *单位性质： -->
      <div class="all">
        <p class="title">*单位性质：</p>
      </div>
      <ul class="flex age">
        <li 
          v-for="(unit,tyi) in unitTypeList" :key="tyi"
          @click="fun_change(5,tyi)"
          :class="{ isActive : params.sm_worktype == tyi }"
          >{{unit}}</li>
      </ul>
      <!-- 评分 -->
      <div class="all">
        <p class="title">*评分：</p>
      </div>
      <!--  -->
      <!-- <p class="red_title" v-if="scoreType.score == 0">
        *为了更好地为您服务，请为{{scoreType.survey_tit}}打分
      </p> -->
      <!-- 红色标题 -->
      <ul class="score">
        <li class="flex" v-for="(v,index) in score" :key="index">
          <span class="s_title">{{v.survey_tit}}</span>
          <div class="star">
            <div class="top">
              <img 
                v-for="(v,i) in 5" :key="i"
                @click="fun_changeScore(index,i)"
                class="img-back" src="@/assets/image/brand/h5_start_b.png" alt="" />
            </div>
            <div class="bottom"
              :style="{width:((v.score/5)*100)+'%'}"
              >
              <img 
                v-for="(v,i) in 5" :key="i"
                @click="fun_changeScore(index,i)"
                class="img-back" src="@/assets/image/brand/h5_start_a_b.png" alt="" />
            </div>
          </div>
          <!-- 请打分 -->
          <!-- <span v-show=" v.score != 0 ">
            {{v.score}}星
          </span> -->
        </li>
      </ul>

      
      <!-- *评论： -->
      <div class="all">
        <p class="title">评论：</p>
      </div>
      <div class="end">
        <textarea v-model="params.sm_text" placeholder='还想给我们说些什么…' id="" cols="30" rows="10"></textarea>
      </div>


      <!-- 提交 -->
      <p class="help">请确认您填写的信息无误</p>
      <mt-button
        @click="fun_addData"
        class="btn_new"
        size="large"
        >提交
      </mt-button>  


    </div>

  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import { mapState, mapActions } from 'vuex';
import { resetRem, resumeRem } from '@/util/rem';

import { getSaunitSurvey, addSaunitInfo } from '../../../../api/homebrand.js';

export default {
	data() {
		return {
      params:{
        sm_sax : 1,  // 性别
        sm_age : 1,  // 年龄
        sm_edu : 1,  // 学历
        sm_workyears : 1,  // 工作年限
        sm_worktype : 1,  // 单位性质

        sm_text:"",   // 评论
      },
      ageList:[
        // "18-24岁",
      ],
      educatList:[
        // { name: "高中级以下", id: 1 },
        // { name: "大学", id: 2 },
        // { name: "研究生及以上", id: 3 },
      ],
      workYearList:[
        // { name: "在校学生", id: 1 },
        // { name: "1年以内", id: 2 },
        // { name: "2-5年", id: 3 },
        // { name: "6-10年", id: 4 },
        // { name: "10年以上", id: 5 },
      ],
      unitTypeList:[
        // { name: "国企", id: 1 },
        // { name: "外商独资", id: 2 },
        // { name: "合资", id: 3 },
        // { name: "民营", id: 4 },
        // { name: "上市单位", id: 5 },
        // { name: "事业单位", id: 6 },
        // { name: "国家机关", id: 7 },
        // { name: "其他", id: 8 },
      ],
      // 分数
      score:[
        // {name:"食品安全：",score:null},
        // {name:"售后服务：",score:null},
        // {name:"食品质量：",score:null},
        // {name:"环境保护：",score:null},
        // {name:"食品价格：",score:null},
        // {name:"公益活动：",score:null},
        // {name:"衍生产品：",score:null},
        // {name:"服务态度：",score:null},
        // {name:"总体评价：",score:null},
      ],

      // scoreType: {
      //   value: false,
      //   name:'',
      // },   // 是否打分完成
		};
  },
	computed: {
		...mapState({
			store_id: state => state.homebrand.store_id,
			memberInfo: state => state.member.info,
		})
  },
  created(){
    if( !this.memberInfo ){
      this.$router.push( { name: 'HomeMemberLogin' } );
    }else{
      getSaunitSurvey(this.store_id ,this.memberInfo.member_id ).then(respon=>{
        var res = respon.result.survey_items;
        // console.log(res);
        // 年龄
        this.ageList = res.age.item_val;
        // 学历
        this.educatList = res.edu.item_val;
        // 工作年限
        this.workYearList = res.workyears.item_val;
        // 单位性质
        this.unitTypeList = res.worktype.item_val;

        this.score = res.pingfen.survey_arr;
        for( var item of this.score){
          item.score = 0;
        }
        // console.log(this.score);
      })
    }
  },
	mounted() {
    resetRem();
	},
	destroyed() {
    resumeRem();
	},
	methods: {
    // 保存 上面信息
    fun_change(name,value){
      console.log(name,value);
      if( name == '1' ){
        this.params.sm_sax = value;
      }else if( name == '2' ){
        this.params.sm_age = value;
      }else if( name == '3' ){
        this.params.sm_edu = value;
      }else if( name == '4' ){
        this.params.sm_workyears = value;
      }else{
        this.params.sm_worktype = value;
      }
    },

    // 打分
    fun_changeScore(index,i){
      this.score[index].score = i+1;
      this.$forceUpdate();
    },

    // 提交
    fun_addData(){
      for( var item of this.score ){
        if( !item.score ){
          Toast('请为'+item.survey_tit+'打分');
          return false;
        }
      }
      // console.log(this.store_id);
      // console.log(this.memberInfo.member_id);
      // console.log(JSON.stringify(this.score));
      // console.log(JSON.stringify(this.params));
      this.params.score = this.score;
      this.params.store_id = this.store_id;
      this.params.member_id = this.memberInfo.member_id;
      // console.log(this.params);
      addSaunitInfo(this.params).then(res=>{
        // console.log(res);
        
        Toast(res.result);
      }).catch(err=>{
        Toast(err.message);
      })
    },
	}
};
</script>

<style lang="scss" scoped>
.survey{
  // 字体 小
  @mixin fs_small{
    font-size: 3.48vw;
  }
  // 字体 中
  @mixin fs_title{
    font-size: 4.18vw;
  }
  // 字体 中
  @mixin fs_{
    font-size: 3.98vw;
  }
  // 字体 大
  @mixin fs_big{
    font-size: 4.58vw;
  }
    // 边距
  $pmvw: 4vw;

  // 盒子模型
  @mixin item_box{
    box-sizing: border-box;
  }
  
  div,p,li{
    @include item_box;
  }
  
  // 头部标题 返回按钮
	.header {
    // 字体 大
    @mixin fs_big{
      font-size: 4.88vw;
    }
    $imgWidth: 5.336vw;

    height: 10.5vw;
		.header_cont{
			display: flex;
			justify-content: space-between;
			padding: 2.8128vw 3.6564vw;
			align-items: center;
			.header-left {
				width: $imgWidth;
				height: $imgWidth;
			}
			.header-title {
        font-size: 4.8267vw;
        // @include fs_big;
				// font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
        font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #2A303C;
			}
			.header-right {
				width: $imgWidth;
				height: $imgWidth;
        display: block;
			}
		}
	}

  // 红色标题
  .red_title{
    padding: 1vw $pmvw;
    @include fs_small;
    width: 100vw;
    margin: 2vw 0;
    background: rgba(231, 57, 25, 0.08);
    color: #E73919;
  }

  // 主题内容
  .survey_main{
    .isActive{
      color:#000;      
    }
    color: #999;

    padding: 2vw $pmvw;
    .flex{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .all{
      .title{
        @include fs_title();
        font-weight: 600;
        color:#000;
      }
    }

    // 性别
    .sex{
      padding: 2vw 12vw;
      img{
        width: 22vw;
        border-radius: 50%;
        opacity: .43;
      }
      .isActive{
        img{
          opacity: 1;
        }
      }
      div{
        margin: 2vw auto;
        text-align: center;
        background: #F7F7F7;
        border-radius: 20px;
        width: fit-content;
        padding: 1vw 5vw;
        @include fs_;
      }
    }
    
    // 年龄
    .age{
      justify-content: flex-start;
      padding: 2vw 0;
      li{
        width:26vw;
        margin: 2vw 1vw;
        text-align: center;
        background: #F7F7F7;
        padding: 1vw;
        text-align: center;
        @include fs_small;
        // @include fs_;
      }
    }

    // 评分
    .score{
      padding: 0 0 3.5vw 0;
      li{
        justify-content: flex-start;
        @include fs_small();
        margin: 1vw 0;
        .s_title{
          font-weight: 600;
          color:#000;
        }
        .star{
          line-height: 2;
          width:52vw;
          height: 6vw;
          position: relative;
          img{
            width:6vw;
            height: 6vw;
            margin: 0 2.2vw;
          }
          // 灰色
          .top{
            position: absolute;
            height: 6vw;
            left: 0;
            top: 0;
            z-index: 2;
            display: flex;
          }
          // 黄色
          .bottom{
            height: 6vw;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
            display: flex;
          }

        }
        span{
          line-height: 2.18;
        }
      }
    }

    // 还想说什么
    .end{
      width: 100%;
      height: 32vw;
      margin: 3vw 0;
      overflow: hidden;
      textarea{
        width: 100% !important;
        height: 86% !important;
        background: #F7F7F7;
        padding: 3vw 4vw;
        @include fs_;
      }
    }
    // 是否保存
    .help{
      text-align: center;
      margin: 8vw 0 0 0;
      @include fs_;
      color: #2A303C;
    }

    // 按钮
    .btn_new{
      background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
      box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
      border-radius:40px;
      color: #fff;
      margin: 4vw 0 8vw 0;
    }
  }
}
</style>
