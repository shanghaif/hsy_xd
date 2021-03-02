<template>
  <div class="inviter-order-list">
    <!-- 头部 标题 返回 按钮 -->
    <div class="common-header-wrap">
      <mt-header title="推广佣金" class="common-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>

    <!-- 上面 按照时间查询 -->
    <div class="q_see">
      <div class="get_data">
        <div class="time"
          @click="onDate('start')">
          <mt-cell title="起始" is-link>{{startTime?$moment.unix(startTime).format('YYYY-MM-DD'):''}}</mt-cell>
        </div>
        <div class="time"
          @click="onDate('end')">
          <mt-cell title="结束" is-link>{{endTime?$moment.unix(endTime).format('YYYY-MM-DD'):''}}</mt-cell>
        </div>
        <mt-button @click="fun_getData">查询</mt-button>
      </div>
      <!-- 上面输入框 -->
      <div>
        <ul id="tree" class="ztree" style="overflow:auto;"></ul>
      </div>    
      <mt-datetime-picker
        ref="startTime"
        type="date"
        :startDate="new Date('2020/1/1')"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :endDate="new Date()"
        :value="startTime?(new Date(startTime*1000)):(new Date())"
        @confirm="dateConfirm"
        >
      </mt-datetime-picker>
      <mt-datetime-picker
        ref="endTime"
        type="date"
        :startDate="new Date('2000/1/1')"
        yearFormat="{value}年"
        monthFormat="{value}月"
        dateFormat="{value}日"
        :endDate="new Date()"
        :value="endTime?(new Date(endTime*1000)):(new Date())"
        @confirm="dateConfirm"
        >
      </mt-datetime-picker>
    </div>

    <!-- 数据列表 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div  v-if="orderList && orderList.length">
        <div class="inviter-item" v-for="(v,k) in orderList" :key="v.orderinviter_id">
          <div :class="{invalid:!v.orderinviter_valid}">
          <div class="detail">{{v.orderinviter_remark}}</div>
          <div class="money add">+{{v.orderinviter_money}}</div>
          <time class="date">
            <span class="green" v-if="v.orderinviter_valid">有效</span>
            <span class="gray" v-else>无效</span>
          </time>
          </div>
        </div>
      </div>
      <empty-record v-else-if="orderList && !orderList.length"></empty-record>
    </div>
  </div>
</template>

<script>
import { getInviterOrder } from '../../../api/memberInviter'
import EmptyRecord from '../../../components/EmptyRecord'
import { Toast, Indicator } from 'mint-ui'
export default {
  name: 'MemberInviterOrder',
  components: {
    EmptyRecord
  },
  data () {
    return {
      params: { 'page': 0, 'per_page': 10 },
      loading: false, // 是否加载更多
      isMore: true, // 是否有更多
      orderList: false,

      selectData:'',
      dataName:"",
      startTime:"",
      endTime:""


    }
  },
  created () {
    this.endTime = parseInt(new Date().getTime() / 1000);
    this.startTime = parseInt( (new Date(new Date().getTime()-2592000000)) / 1000);
  },

  mounted () {

  },
  methods: {
    // 转化函数
    getEndTime(time,n){
      time *= 1000;
      time = new Date(time -new Date(time).getHours()*60*60*1000-new Date(time).getMinutes()*1000*60-new Date(time).getSeconds()*1000);      
      if( n == 0 ){      
        time = parseInt( time / 1000);
        return time;
      }else{   
        console.log(time);
        time = parseInt( ( new Date(time).getTime() + (1000*60*60*23) + (1000*60*59+1000*59) ) / 1000);
        console.log(time);
        return time;
      }
    },
    getOrderList (ispush) {
      Indicator.open()
      let params = this.params;
      // params.startTime = this.$moment.unix(this.startTime).format('YYYY-MM-DD');
      // params.endTime = this.$moment.unix(this.endTime).format('YYYY-MM-DD');
      params.startTime = this.getEndTime( this.startTime , 0 );
      params.endTime = this.getEndTime( this.endTime , 1 );
      // console.log(params);
      getInviterOrder(params).then(res => {
        Indicator.close()
        if (res) {
          if (ispush && this.orderList) {
            this.orderList = this.orderList.concat(res.result.list)
          } else {
            this.orderList = res.result.list
          }
          if (res.result.hasmore) {
            this.isMore = true
          } else {
            this.isMore = false
          }
        }
      })
    },
    loadMore () {
      this.loading = true
      this.params.page = ++this.params.page
      if (this.isMore) {
        this.loading = false
        this.getOrderList(true)
      }
    },

    // 选择时间函数
    onDate (name,type) {
      this.dataName = name;      
      if( name ==  'start' ){
        this.selectData = this.startTime*1000;
        this.$refs.startTime.open();
      }else{
        this.selectData = this.endTime*1000;
        this.$refs.endTime.open();
      }
    },
    // 接收日期
    dateConfirm (value) {
      var nowDate = parseInt(value.getTime() / 1000);      
      if( this.dataName == 'start'){
        if( nowDate <= this.endTime){
          this.startTime = nowDate;
        }else{
          Toast("请重新选择时间");
        }
      }else{
        if( nowDate >= this.startTime){
          this.endTime = nowDate;
        }else{          
          Toast("请重新选择时间");
        }
      }
      this.$forceUpdate()
    },

    // 点击查询按钮
    fun_getData(){
      this.orderList = [];// 数据恢复为空
      this.params = { 'page': 0, 'per_page': 10 };  // 查询起始值设置
      this.isMore = true;  //再次加载设置为起始值
      this.loadMore();  //  懒加载函数
    }
  }
}
</script>

<style scoped lang="scss">
  .inviter-order-list {}
  .inviter-order-list .inviter-item {     margin: 10px; background-color: #FFF;position: relative; z-index: 1; display: block; padding: 0.5rem 0; border-bottom: solid 0.05rem #EEE;}
  .inviter-order-list .inviter-item .detail { min-height: 1.8rem; margin: 0 5rem 0 0; font-size: 0.55rem; word-wrap:break-word; line-height: 0.9rem; color: #555;padding-left:.5rem}
  .inviter-order-list .inviter-item .money { position: absolute; z-index: 1; top: 0.5rem; right: 0.5rem; height: 0.9rem; line-height: 0.9rem;}
  .inviter-order-list .inviter-item .money.add { color: #f23030;}
  .inviter-order-list .inviter-item .money.reduce { color: #36BC9B;}
  .inviter-order-list .inviter-item .date { position: absolute; z-index: 1; bottom: 0.4rem; right: 0.5rem; height: 0.9rem; font-size: 0.5rem; line-height: 0.9rem; color: #999;}
  .inviter-order-list .inviter-item .date .green{color:green}
  .inviter-order-list .inviter-item .invalid .money.add {color: gray;}
  
.get_data{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  // border-bottom: 1px solid #999;
  // padding: 5px 0;
  // border-top: 1px solid #999;
  .time{
    width:42%;
    & /deep/ .mint-cell{
      min-height: 1.8rem;
    }
    & /deep/ .mint-cell-wrapper{
      font-size: .6rem;
      // color: #3cd3ad;
    }
  }
  button{
    font-size: .6rem;
    width: 16%;

    height: 1.678rem;
    border: 1px solid #666;
  }
}

</style>
