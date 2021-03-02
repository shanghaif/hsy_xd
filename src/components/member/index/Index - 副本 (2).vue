<template>
  <div class="container">
    <div class="top-wrapper">
      <div class="nav-item" id="left-nav-item" @click="goSetting">
        <i class="nav-icon iconfont">&#xe607;</i>
      </div>
      <div class="nav-item" id="right-nav-item" @click="goNews()">
        <i class="nav-icon iconfont">&#xe6ce;</i>
        <span v-if="0"></span>
      </div>
      <div class="top-info-wrapper">
        <div class="avatar-wrapper" @click="goProfileInfo">
          <img
            class="avatar"
            v-bind:src="user.member_avatar+'?'+time"
            v-if="isOnline && user && user.member_avatar"
          />
        </div>
        <label
          class="nickname"
          style="-webkit-box-orient:vertical"
          @click="goProfileInfo"
          >{{ nickname }}</label
        >
      </div>
      <div class="info-wrapper">

        <div class="info-item" @click="goScoreList">{{ getScore }}积分</div>
      </div>
    </div>
    <div class="order-header" @click="goOrder">
      <div class="order-header-item" id="order-item-left">
        <i class="order-header-icon iconfont">&#xe6de;</i>
        <label class="item-title order-header-title">我的订单</label>
      </div>
      <div class="order-header-item" id="order-item-right">
        <label class="order-subtitle">查看全部订单</label>
        <i class="indicator iconfont">&#xe650;</i>
      </div>
      <div class="order-header-line"></div>
    </div>
    <div class="order-wrapper">
      <index-order-item
        class="order-item"
        testAttr="MemberOrderList"
        id="state_new"
        iconfont="&#xe664;"
        title="待付款"
        :orderNumber="user.order_nopay_count"
      >
      </index-order-item>
      <index-order-item
        class="order-item"
        testAttr="MemberOrderList"
        id="state_pay"
        iconfont="&#xe663;"
        title="待发货"
        :orderNumber="user.order_noship_count"
      >
      </index-order-item>
      <index-order-item
        class="order-item"
        testAttr="MemberOrderList"
        id="state_send"
        iconfont="&#xe6a6;"
        title="待收货"
        :orderNumber="user.order_noreceipt_count"
      >
      </index-order-item>
      <index-order-item
        class="order-item"
        testAttr="MemberOrderList"
        id="state_noeval"
        iconfont="&#xe6a7;"
        title="待评价"
        :orderNumber="user.order_noeval_count"
      >
      </index-order-item>
    </div>
    <div class="manage-wrapper mt-5">
    <index-manage-item
              v-on:onclick="$router.push({name:'MemberAuth'})"
              iconfont="&#xe69e;"
 	color="#ea51df"
              class="mt-5"
              title="实名认证"
      >
     </index-manage-item>
      <index-manage-item
        v-on:onclick="goRegister"
        iconfont="&#xe644;"
        color="#ea51df"
        title="商家入驻"
      >
      </index-manage-item>
     <index-manage-item
        v-if="user.store_id"
        v-on:onclick="goSellerInfo"
        class="mt-5"
        iconfont="&#xe62d;"
 	color="#ea51df"
        title="商家管理"
      >
       </index-manage-item>
     <index-manage-item
                v-if="config.inviter_open === '1'"
                v-on:onclick="goMemberInviterManage"
                class="mt-5"
                iconfont="&#xe6e6;"
 	color="#ea51df"
                title="社区团管理"
        >
       </index-manage-item>
     <index-manage-item
        v-on:onclick="$router.push({ name: 'MemberInformList' })"
        iconfont="&#xe63f;"
      color="#45cf79"
        title="举报管理"
      >
     </index-manage-item>
     <index-manage-item
        v-on:onclick="$router.push({ name: 'MemberComplaintList' })"
        iconfont="&#xe67a;"
      color="#45cf79"
        title="投诉管理"
      >
</index-manage-item>
     <index-manage-item
        v-on:onclick="goFavourite()"
        iconfont="&#xe6c1;"
      color="#45cf79"
        title="收藏管理"
      >
</index-manage-item>

     <index-manage-item
        v-on:onclick="$router.push({ name: 'MemberConsultList' })"
        iconfont="&#xe6cf;"
      color="#45cf79"
        title="咨询管理"
      >
</index-manage-item>

         <index-manage-item
        v-on:onclick="goAddress"
        iconfont="&#xe6d3;"
      color="#800000"
        title="收货地址"
      >
</index-manage-item>
        <index-manage-item
              v-on:onclick="goArrivalnotice()"
              iconfont="&#xe6c4;"
      color="#800000"
              title="到货通知"
      >
</index-manage-item>

        <index-manage-item
        v-on:onclick="goInvoice"
        iconfont="&#xe631;"
      color="#800000"
        title="发票管理"
      >
</index-manage-item>
        <index-manage-item
        v-on:onclick="goReturn"
        iconfont="&#xe67a;"
        color="#ea51df"
      color="#800000"
        title="退货管理"
      >
</index-manage-item>

      <index-manage-item
        v-on:onclick="goRefund"
        iconfont="&#xe67a;"
      color="#008000"
        title="退款管理"
      >
   </index-manage-item>
      <index-manage-item
        v-on:onclick="goVrOrder"
        iconfont="&#xe6de;"
      color="#008000"
        title="虚拟订单"
      >
   
      </index-manage-item>
        <index-manage-item
                v-on:onclick="$router.push({name:'MemberVrRefundList'})"
                iconfont="&#xe67a;"
        color="#008000"
                title="虚拟退款"
        >
      </index-manage-item>
      <index-manage-item
              v-on:onclick="goBonusreceive()"
              iconfont="&#xe67b;"
        color="#008000"
              title="红包记录"
      >
      </index-manage-item>




      <index-manage-item
              v-if="config.points_isuse === '1' && config.points_signin_isuse === '1'"
              v-on:onclick="$router.push({name:'MemberPointSignin'})"
              class="mt-5"
              iconfont="&#xe6e6;"
        color="#000080"
              title="我要签到"
      >
      </index-manage-item>
      <index-manage-item
        v-on:onclick="goPoint"
        iconfont="&#xe677;"
       color="#000080"
        title="我的积分"
      >
      </index-manage-item>
      <index-manage-item
        v-on:onclick="goFriendList"
        iconfont="&#xe6f0;"
       color="#000080"
        title="我的好友"
      >
      </index-manage-item>
      <index-manage-item
              v-on:onclick="goBrowse()"
              iconfont="&#xe691;"
       color="#000080"
              title="浏览记录"
      >
      </index-manage-item>

    
   


    </div>

  </div>
</template>

<script>
import IndexInfoItem from './IndexInfoItem'
import IndexOrderItem from './IndexOrderItem'
import IndexManageItem from './IndexManageItem'
import { mapState, mapActions } from 'vuex'
import { getMemberIndex } from '../../../api/member'
import { checkInviter } from '../../../api/memberInviter'
import { Toast } from 'mint-ui'
export default {
  name: 'MemberIndex',
  data () {
    return {
      user: {},
      time:'',
      orderCount: {},
      isShow: true
    }
  },
  components: {
    IndexOrderItem,
    IndexInfoItem,
    IndexManageItem
  },
  created: function () {
    this.time = new Date().getTime();
    this.utils.clearCookie('user_info')
    this.utils.clearCookie('key')
    this.fetchConfig({}).then(
      response => {
      },
      error => {
        Toast(error.message)
      }
    )
    if (this.isOnline) {
      getMemberIndex().then(
        response => {
          if (response && response.result.member_info) {
            this.user = response.result.member_info
          }
        },
        error => {}
      )
    }
  },
  computed: {
    ...mapState({
      isOnline: state => state.member.isOnline,
      config: state => state.config.config
    }),

    nickname () {
      let title = '登录/注册'
      if (this.isOnline) {
        if (
          this.user &&
          typeof this.user !== 'undefined' &&
          JSON.stringify(this.user) !== '{}'
        ) {
          if (this.user.member_truename) {
            title = this.user.member_truename
          } else if (this.user.member_name) {
            title = this.user.member_name
          }
        }
      }
      return title
    },
    getScore () {
      let score = '0'
      if (this.isOnline && this.user.member_points) {
        score = this.user.member_points
      }
      return score
    },
    // 预存款可用金额 通过store 进行获取
    getAvailablePredeposit () {
      let availablePredeposit = '0.00'
      if (this.isOnline && this.user.available_predeposit) {
        availablePredeposit = this.user.available_predeposit
      }
      return availablePredeposit
    }
  },
  methods: {
    ...mapActions({
      fetchConfig: 'fetchConfig'
    }),
    showLogin () {
      this.$router.push({ name: 'HomeMemberLogin' })
    },
    goScoreList () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberPointList', query: { index: 0 } })
      } else {
        this.showLogin()
      }
    },
    goOrder () {
      if (this.isOnline) {
        this.$router.push({
          name: 'MemberOrderList'
        })
      } else {
        this.showLogin()
      }
    },
    goProfileInfo () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberProfileSet' })
      } else {
        this.showLogin()
      }
    },
    goSetting () {
      this.$router.push({ name: 'MemberSetting' })
    },
    // 消息通知
    goNews () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberNoticeList' })
      } else {
        this.showLogin()
      }
    },
    // 我的关注
    goFavourite () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberFavorite' })
      } else {
        this.showLogin()
      }
    },
    // 我的地址
    goAddress () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberAddressList' })
      } else {
        this.showLogin()
      }
    },
    // 我的退款
    goReturn () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberReturnList' })
      } else {
        this.showLogin()
      }
    },
    // 我的退货
    goRefund () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberRefundList' })
      } else {
        this.showLogin()
      }
    },
    goRecharge () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberRechargeList' })
      } else {
        this.showLogin()
      }
    },
    // 我的优惠券
    goVoucher () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberVoucherList', query: { index: 0 } })
      } else {
        this.showLogin()
      }
    },
    // 用户积分记录
    goPoint () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberPointList' })
      } else {
        this.showLogin()
      }
    },
    // 用户积分兑换的商品
    goPointsOrderList () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberPointsOrderList' })
      } else {
        this.showLogin()
      }
    },
    goBonus () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberWithdrawList' })
      } else {
        this.showLogin()
      }
    },
    goPredeposit () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberPredepositList' })
      } else {
        this.showLogin()
      }
    },
    // 我的好友列表
    goFriendList () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberFriendList' })
      } else {
        this.showLogin()
      }
    },
    // 商家入驻
    goRegister () {
      if (this.isOnline) {
        this.$router.push({ name: 'SellerJoinin1' })
      } else {
        this.showLogin()
      }
    },
    // 聊天列表
    goMemberChatList () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberChatList' })
      } else {
        this.showLogin()
      }
    },
    // 我的订单评价
    goEvaluateList () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberEvaluateList' })
      } else {
        this.showLogin()
      }
    },
    // 发票管理
    goInvoice () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberInvoiceList' })
      } else {
        this.showLogin()
      }
    },
    // 跳转卖家管理中心
    goSellerInfo () {
      if (this.isOnline) {
        this.$router.push({ name: 'SellerIndex' })
      } else {
        this.showLogin()
      }
    },
    // 分销管理中心
    goMemberInviterManage () {
      if (this.isOnline) {
        checkInviter().then(res => {
          this.$router.push({ name: 'MemberInviterManage' })
        }).catch(function (error) {
          Toast(error.message)
        })
      } else {
        this.showLogin()
      }
    },
    // 虚拟订单
    goVrOrder () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberVrOrderList' })
      } else {
        this.showLogin()
      }
    },
    // 活动记录
    goMarketmanagelog () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberMarketmanagelog' })
      } else {
        this.showLogin()
      }
    },
    // 红包领取记录
    goBonusreceive () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberBonusreceive' })
      } else {
        this.showLogin()
      }
    },
    // 砍价活动
    gBargain () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberBargainlist' })
      } else {
        this.showLogin()
      }
    },
    // 到货通知
    goArrivalnotice () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberArrivalnotice' })
      } else {
        this.showLogin()
      }
    },
    // 浏览历史
    goBrowse () {
      if (this.isOnline) {
        this.$router.push({ name: 'MemberBrowseList' })
      } else {
        this.showLogin()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: #f0f2f5;
  .top-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    height: 9rem;
    background: linear-gradient(90deg, #e93b3d, #e93b3d);
    .top-info-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .nav-item {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    span {
      width: 0.4rem;
      height: 0.4rem;
      background-color: #f0f2f5;
      border-radius: 50%;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
  }
  #left-nav-item {
    left: 0;
  }
  #right-nav-item {
    right: 0;
  }
  .nav-icon {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 1rem;
    color: #fff;
  }
  .avatar-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #fff;
    margin-top: 1rem;
    .avatar {
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
    }
  }
  .nickname {
    width: 100%;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin-left: 0;
    margin-right: 0;
  }
  .info-wrapper {
    width: 100%;
    height: 2rem;
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: stretch;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .info-item {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.7rem;
  }
  .order-header {
    height: 2rem;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: stretch;
    background-color: #fff;
  }
  .order-header-item {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #order-item-left {
    justify-content: flex-start;
    margin-left: 1rem;
  }
  #order-item-right {
    justify-content: flex-end;
  }
  .order-header-line {
    position: absolute;
    height: 1px;
    left: 1rem;
    bottom: 0;
    right: 1rem;
    background-color: #e8eaed;
  }
  .item-title {
    font-size: 0.7rem;
    color: #333;
  }
  .order-header-icon {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
  }
  .order-header-title {
    margin-left: 0.4rem;
  }
  .indicator {
    width: 0.6rem;
    height: 0.6rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .order-subtitle {
    font-size: 0.6rem;
    color: #7c7f88;
  }
  .order-wrapper {
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #fff;
  }
  .order-item {
    flex: 1;
  }
  .bottom-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 3rem;
  }
  .manage-wrapper {
    background: #fff;
  }
}
</style>
