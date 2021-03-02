<template>
  <div class="learn">
    <!-- 顶部开始 -->
    <div class="header">
      <!-- 返回按钮 -->
		  <img  class="down_arrow"  @click="$router.push({ name: 'HomeLearn' })" src="@/assets/image/brand/h5_l_f.png"/>
      <!-- <span class="down_arrow"  @click="$router.push({ name: 'HomeLearn' })"></span> -->
      <span>食品安全知识在线考试</span>
      <span class="h_time">(&nbsp;{{current+1}}/40)</span>
    </div>
    <!-- 顶部结束 -->
    <!-- 内容开始 -->
    <div class="train_cont">
      <!-- 题内容 -->
      <div class="ques">
        <span>({{current+1}})：</span>
              <!-- 题目 -->
        <span>{{question}}</span>
          <!-- <mt-checklist 
          v-model="value" 
          :options="options">
          </mt-checklist> -->

          <mt-radio
            title=""
            v-model="value"
            :options="options">
          </mt-radio>

      </div>
      <!-- 内容结束 -->
      <div class="bottom_content">


        <!-- 按钮开始 -->
        <div class="bottom_btn" v-if="btnShow">
          <mt-button
            @click="fun_prev_next(-1)"
            class="btn_sty"
            :style="{color:(current!=0?'#fff':'#999')}"
            size="large"
            >上一题
          </mt-button>
          <mt-button
            @click="fun_prev_next(1)"
            :style="{color:(current!==39?'#fff':'#999')}"
            class="btn_sty"
            size="large"
            >下一题
          </mt-button>
        </div>
        <div class="jump_btn" v-if="!printShow">
          <mt-button v-if="current==39"
            @click="fun_seeAnswer"
            class="btn_sty"
            size="large"
            >提交答案&nbsp;
          </mt-button>
        </div>
        <div class="print_btn" v-if="printShow">
          <mt-button
            v-if="printShow"
            @click="$router.push({ name: 'HomeProve', query: { mid: info.member_id } })"
            class="btn_sty"
            size="large"
            >查看证书&nbsp;
          </mt-button>
        </div>
        <div class="test_btn" v-if="!btnShow">    
          <mt-button
            @click="$router.push({ name: 'HomeTraining' })"
            class="btn_sty"
            size="large"
            >继续学习<span class="litter_score">(分数不足85)</span>
          </mt-button>
          <mt-button
            @click='$router.go(0)'
            class="btn_sty btn_test"
            size="large"
            >重考一次&nbsp;
          </mt-button>
        </div>
        <!-- 按钮结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, MessageBox  } from "mint-ui";
import { mapState } from "vuex";
import { getData, saveJD } from "../../../api/homeLearn.js";//传递用户id 返回学习信息
export default {
  data(){
    return {
      ks_jd:[],  //学习时长 进度
      current:0,//当前题目
      toalsQuestion:[],  //考试题目
      question:[],  //题目

      answer:[],       //标准答案
      newAnswer:[],  //解答
      value:'',       //答案
      options:[],

      btnShow:true,   //上一题 下一题  提交答案
      score : 0,      //分数
      printShow:false,  //打印证书
    }
  },
  computed:{ 
    ...mapState({
      info: state => state.member.info,//用户详细信息 获取id
    }),
    // newValue:function(){
    //   return this.newAnswer[this.current]?[this.newAnswer[this.current]]:[]
    // }
  },
  created(){
    this.fun_loading();
  },
  methods:{
    fun_loading(){
      this.answer = [];
      this.newAnswer = [];
      // 获取用户 学习信息
      getData(this.info.member_id).then(res=>{
        // 学习时长 进度
        this.ks_jd = [res.result.ks,res.result.jd];
        // 用户岗位
        var d  = require(`../../../assets/js/${res.result.gw}.js`);
        d = d.default.d;
        var arr = this.createRandom2(40,0,d.length-1);//题目
        var brr = [];
        for(var i of arr){
          this.toalsQuestion.push(d[i]);
        }
        this.fun_question();

      }).catch(err=>{
        Toast(err.message);
      })
    },
    // 加载数据
    fun_question(){
      var s = this.toalsQuestion[this.current].split("||");
      this.question = s[0];
      var s1;
      this.options = [];
      this.value = '';
      for (var j=1;j<s.length;j++){
        if(s[j].indexOf("~")<0){
          if( s[j] !== "" ){
            s1  = {  label: s[j], value: j+'',c:false};
            this.options.push(s1);
          }
        }else{
          s1  = {  label: s[j].replace(/~/,""), value: j+'',c:true};  
          this.options.push(s1);
          this.answer[this.current] = j+'';
        }
      }
      // console.log('答案',this.answer);
      // console.log('解答',this.newAnswer);
      if( this.newAnswer[this.current] ){
        // console.log("优质",this.newAnswer[this.current]);
        // return false;
        this.value = this.newAnswer[this.current];
      }else{        
        this.value = '';
      }
    },
    // 上一题 下一题
    fun_prev_next(i){
      this.newAnswer[this.current] = this.value;
      if( i <0 ){
        if( this.current == 0 ){
          Toast("已到第一题");
          return false;
        }
      }else{
        if( this.current == 39 ){
          Toast("已到最后一题");
          return false;
        }
      }
      this.current += i;
      this.fun_question();
    },
    // 提交答案
    fun_seeAnswer(){
      MessageBox({
        title: '温馨提示',
        message: '确定提交考卷？',
        showCancelButton: true,
        confirmButtonText:"继续提交",
        cancelButtonText:"取消提交"
      }).then(action => {
        if(action == 'confirm'){
          this.newAnswer.push(this.value);
          for( var i=0; i<this.newAnswer.length; i++ ){
            if( this.newAnswer[i] == this.answer[i] ){
              this.score += 2.5;
            }
          }
          if( this.score >= 85 ){
            saveJD(this.ks_jd[0],this.ks_jd[1],this.score).then(res=>{
              Toast(`得分：${this.score}分，恭喜您通过考试！`);
              this.printShow = true;  
            }).catch(err=>{
              Toast(err.message);
            })
          }else{
            this.btnShow = false;
            Toast(`得分：${this.score}分，抱歉不合格！`);
          }
        }
      })
      
  },
    // 生成随机考试题
    createRandom2(num , from , to){
      var arr=[];
      var json={};
      while(arr.length<num){
        //产生单个随机数
        var ranNum=Math.ceil(Math.random()*(to-from))+from;
        //通过判断json对象的索引值是否存在 来标记 是否重复
        if(!json[ranNum]){
          json[ranNum]=1;
          arr.push(ranNum);
        }
      }
      return arr;
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
      // font: normal .78rem '微软雅黑';
      font: normal .8rem '微软雅黑';
      line-height: 1.5;
      // overflow: auto;
      // max-height: 19.8rem;
      // 
      .title_time{
        color:#28C9C6;
      }
      & /deep/ .mint-cell{
        // padding: 0.4rem 0;
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

.bottom_content{
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // width: 100%;
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
  .jump_btn,.print_btn{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: .4rem .7rem .6rem;
    .btn_sty{
      width:98%;
      margin: .32rem .2rem;
      font-size: .8rem;
      color: #fff;
      background: linear-gradient(45deg,#40C4B5,#38BAAE);
    }
  }
  .test_btn{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: .4rem .7rem .6rem;
    .btn_sty{
      width:98%;
      margin: .32rem .2rem;
      font-size: .8rem;
      color: #fff;
      background: linear-gradient(45deg,#40C4B5,#38BAAE);
    }
    .btn_test{
      background: linear-gradient(45deg,#F4563E,#E63519);
    }
    .litter_score{
      font-size: .68rem;
    }

  } 
}
</style>