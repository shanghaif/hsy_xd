<template>
  <div class="learn" id="learn">
    <!-- 顶部开始 -->
    <div class="header">
      <!-- 返回按钮 -->
      <img class="down_arrow"  @click="fun_back" src="@/assets/image/brand/h5_l_f.png"/>
      <span>食品安全培训</span>
      <span class="h_time">(在线学习&nbsp;{{formateSeconds}})</span>
    </div>
    <!-- 顶部结束 -->
    <!-- 内容开始 -->
    <div class="train_cont">
      <!-- 题数 -->
      <div class="title">{{current}}/{{totals}}</div>
      <!-- 题内容 -->
      <div class="ques">
        <span class="title_time">[{{s_time}}]</span>
              <!-- 题目 -->
        <span>{{question}}</span>
        <span v-if="rewardState == 1" class="reward">奖&nbsp;:&nbsp;{{reward}}</span>
        <!-- 单选框 -->
          <!-- <mt-radio
            title=""
            v-model="value"
            :options="options">
          </mt-radio> -->
          <mt-checklist 
          v-model="value" 
          :options="options">
          </mt-checklist>
      </div>
      <!-- 内容结束 -->
      <!-- 按钮开始 -->
      <div class="bottom_btn">
        <mt-button
          @click="fun_prev_next(-1)"
          class="btn_sty"
          :style="{color:(next_prev_state?'#fff':'#999')}"
          size="large"
          >上一题
        </mt-button>
        <mt-button
          @click="fun_prev_next(1)"
          :style="{color:(next_prev_state?'#fff':'#999')}"
          class="btn_sty"
          size="large"
          >下一题
        </mt-button>
      </div>
      <div class="test_btn">    
        <mt-button
          @click="fun_saveJD"
          class="btn_sty"
          size="large"
          >保存进度
        </mt-button>   
        <mt-button
          @click="fun_test"
          class="btn_sty"
          :style="{color:(total_time>144000?'#fff':'#333')}"
          size="large"
          >考试&nbsp;
          ( {{this.total_time>144000?"已完成学习":'未完成学习'}} )
        </mt-button>
      </div>
      <!-- 按钮结束 -->
    </div>
  </div>
</template>

<script>
import { Toast, Radio } from "mint-ui";
import { mapState } from "vuex";
import { getData, saveJD } from "../../../api/homeLearn.js";//传递用户id 返回学习信息  保存用户信息
export default {
  data(){
    return {
      questionData:[],   //测试题
      current:0,      //当前条数
      totals:306,      //总条数
      rewardState:0,   //奖励开关
      reward:0,        //奖励

      total_time:0,   //学习时长
      s_time:4,       //短时
      l_time:0,       //长时
      next_prev_state:false,//可否切换题目

      question:null,  //题目
      value:[],       //答案

      jsData:null,   
      Timer:null,
      saveTimer:null,
      options:[],
    }
  },
  computed:{ 
    ...mapState({
      info: state => state.member.info,//用户详细信息 获取id
    }),    
    //  秒转化为时分秒
    formateSeconds(){
      let secondTime = parseInt(this.total_time)//将传入的秒的值转化为Number
      let min = 0// 初始化分
      let h =0// 初始化小时
      let result=''
      if(secondTime>60){//如果秒数大于60，将秒数转换成整数
        min=parseInt(secondTime/60)//获取分钟，除以60取整数，得到整数分钟
        secondTime=parseInt(secondTime%60)//获取秒数，秒数取佘，得到整数秒数
        if(min>60){//如果分钟大于60，将分钟转换成小时
          h=parseInt(min/60)//获取小时，获取分钟除以60，得到整数小时
          min=parseInt(min%60) //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
     result=`${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secondTime.toString().padStart(2,'0')}`
      return result 
    }        
  },

  created(){
    // 获取用户 学习信息
    getData(this.info.member_id).then(res=>{
      var res = res.result;
      if( res.jd !=null && res.jd != 0){
        this.current = res.jd;
      }else{
        this.current = 1;
      }
      // 用户岗位
      var d  = require(`../../../assets/js/${res.gw}.js`);
      this.questionData = d.default.d;
      this.totals = this.questionData.length;
      this.question = this.questionData[this.current-1].split("||");
      
      // 奖励开关
      this.rewardState = res.switch;
      // 学习时长
      if( res.ks ==null ){
        this.total_time = 0;
      }else{
        this.total_time = res.ks;
      }
      this.fun_loading();
    }).catch(err=>{
      Toast(err.message);
      this.$router.go(-1);
    })
  },

  beforeDestroy(){
    if( this.Timer ){
      clearInterval(this.Timer);
      this.Timer = null;
    }
  },

  methods:{
    // 加载数据
    fun_loading(){
      // 设置左上角短时间 和 长时间 切换题目不得点击
      this.s_time = 5;
      this.l_time = 0;
      this.next_prev_state = false;
      // 如果 有定时器 清空定时器
      if( this.Timer ){
        clearInterval(this.Timer);
        this.Timer = null;
      }      
      // 如果 有奖励 
      if( this.rewardState == '1' ){
        this.jl();
      }
      // 题目赋值
      var s = this.questionData[this.current-1].split("||");
      this.question = s[0];
      var s1;
      this.options = [];
      this.value = [];
      for (var j=1;j<s.length;j++){
        if(s[j].indexOf("~")<0){
          if( s[j] !== "" ){
            s1  = {  label: s[j], value: j+1+'',c:false};
            this.options.push(s1);
          }
        }else{
          this.value.push(j+1+'');
          s1  = {  label: s[j].replace(/~/,""), value: j+1+'',c:true};  
          this.options.push(s1);
        }
      }

      // 定时器

      this.Timer = setInterval(() => {
        // 左上角倒计时
        if( this.s_time >1 ){
          this.s_time--
        }else{
          this.s_time = 0;
          this.next_prev_state = true;
        }
        // 停留页面倒计时
        if( this.l_time <20 ){
          this.l_time++;
        }else{
          this.l_time = 0;
          clearInterval(this.Timer);
          this.Timer = null;
        }
        ++this.total_time;
      }, 1000);
    },

    // 上一题 下一题
    fun_prev_next(i){
      if( this.next_prev_state ){
        if( i <0 ){
          if( this.current == 0 ){
            Toast("已到第一题");
            return false;
          }
        }else{
          if( this.current == this.totals ){
            Toast("已到最后一题");
            return false;
          }
        }
        this.current += i;
        this.fun_loading();
      }
    },

    // 保存进度
    fun_saveJD(){
      // console.log(this.saveTimer);
      if(this.saveTimer !== null){
        setTimeout(()=>{
          clearTimeout(this.saveTimer);
          this.saveTimer = null;
        },500)  
      }else{
        this.saveTimer = setTimeout(()=>{
          saveJD(this.total_time,this.current).then(res=>{
            Toast("保存成功！");
            setTimeout(()=>{
              clearTimeout(this.saveTimer);
              this.saveTimer = null;
            },500)  
          }).catch(err=>{
            Toast(err.message);
          })
        }, 500);
      }
    },

    // 考试函数
    fun_test(){
      // 如果 可以考试(培训时间达标)
      if( this.total_time>144000 ){
        // 跳转到考试页面
        this.$router.push({ name: 'HomeTest' })
      }else{
        Toast("当年培训时长未达标,请先去培训");
      }
    },

    // 左上角返回
    fun_back(){
      saveJD(this.total_time,this.current).then(res=>{
      this.$router.push({ name: 'HomeLearn' })
      })
    },

    // 奖励函数
    jl(){
      var x = 10;     
      var y = 0;
      var a=[8,6,15,18,36,67,28,0,0,5,108]     
      var rand = parseInt(Math.random() * (x - y + 1) + y); 
      if  ( a[rand] >0 )
      this.reward = a[rand];
      this.total_time += this.reward;
    }
  }
}
</script>

<style lang="scss" scoped>
.learn{
  $arrow: 1.2rem;
  $arrowcolor: #fff;
  // 顶部内容----------------------------------
  .header{
    text-align: center;
    position: relative;  
    padding: .46rem .2rem;
    background-color: #008080;
    font-size: 1rem;
    color: #fff;
    // 返回箭头
    .down_arrow {
      position: absolute;
      width: $arrow;            
      height: $arrow;
      margin: 0 auto;      
      left: .4rem;
    }
    .h_time{
      margin-left: .2rem;
      color:#ffff00;
      font-size: .68rem;
    }
  }

  // 主题内容----------------------------------
  .train_cont{
    font-size: .2rem;
    .title{
      text-align: center;
      font-size: .8rem;
      color: #777;
    }
    .ques{
      padding: .4rem .7rem .6rem;
      font: normal .78rem '微软雅黑';
      min-height: 10rem;
      // 
      .title_time{
        color:#28C9C6;
      }
      // 
      .reward{
        color: #f00;
      }
      & /deep/ .mint-cell{
        padding: 0.4rem 0;
        line-height: .2rem;
      }
      & /deep/ .mint-radiolist-label{
        display: flex;
        span:first-child{
          margin-top: -.1rem;
        }
        span{
          display: inline-block;
          line-height: 1rem;
          letter-spacing: 2px
        }
      }
    }
  }

  // 底部内容----------------------------------
  .bottom_btn{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: .4rem .7rem .6rem;
    .btn_sty{
      width:46.8%;
      margin: .2rem;
      font-size: .6rem;
      background: #008080;
      color: #fff;
    }
  }
  .test_btn{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: .4rem .7rem .6rem;
    .btn_sty{
      width:96%;
      margin: .32rem .2rem;
      font-size: 1rem;
      background: linear-gradient(45deg, #F4563E, #E63519);
      color: #fff;
    }

  } 
}
</style>