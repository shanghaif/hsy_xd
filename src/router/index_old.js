import Vue from 'vue'
import Router from 'vue-router'
import HomeBase from '@/components/home/HomeBase'
import HomeIndex from '@/components/home/index/Index'
import HomeUpGrape from '@/components/home/upgrape/Index'
import HomeUpGrapeGood from '@/components/home/upgrapeGood/Goodsdetail'
import HomeUpGrapeGoodClass from '@/components/home/upgrapegoodsclass/Goodsclass'
import HomeUpGrapeGoodslist from '@/components/home/upgrapegoodslist/Goodslist'
import HomeUpgrapeSearch from '@/components/home/upgrapesearch/Search'

import HomeFaxian from '@/components/home/faxian/Index'
import HomePanoramic from '@/components/home/faxian/panoramic'
import HomeMap from '@/components/home/map/Map'
import HomeMapdh from '@/components/home/mapdh/Mapdh'
import HomeDocument from '@/components/home/article/Document'
import HomeArticleclass from '@/components/home/article/Articleclass'
import HomeArticlelist from '@/components/home/article/Articlelist'
import HomeTopList from '@/components/home/toplist/TopList'
import HomeArticledetail from '@/components/home/article/Articledetail'
import HomeMemberLogin from '@/components/home/memberlogin/Login'
import HomeMemberForget from '@/components/home/memberforget/Forget'
import HomeMemberRegister from '@/components/home/memberregister/Register'
import HomeMemberBind from '@/components/home/memberbind/Bind'
import HomeSellerLogin from '@/components/home/sellerlogin/Login'
import HomeGoodsclass from '@/components/home/goodsclass/Goodsclass'
import HomeTuanclass from '@/components/home/goodsclass/Tuanclass'
import HomeStoreclass from '@/components/home/storeclass/Storeclass'
import HomeStoresearch from '@/components/home/storesearch/StoreSearch'
// import HomeBrand from '@/components/home/brand/Brand'
import HomeBrandIndex from '@/components/home/brand/Index'
import HomeBrand from '@/components/home/brand/NewBrand'
import HomeBrandSearch from '@/components/home/brand/BrandSearch'
import HomeBrandItem from '@/components/home/brand/Item'
import HomeBrandStoreList from '@/components/home/brand/StoreList'
import HomeBrandIntroduct from '@/components/home/brand/child/Introduct'
import HomeBrandSurvey from '@/components/home/brand/child/Survey'
import HomeBrandEvaluate from '@/components/home/brand/child/Evaluate'
import HomeBrandCore from '@/components/home/brand/child/Core'
import HomeBrandDuty from '@/components/home/brand/child/Duty'
import HomeBrandImg from '@/components/home/brand/child/ShowImg'
import HomeBrandShow from '@/components/home/brand/child/ShowCore'
import HomeBrandPano from '@/components/home/brand/PanoRamic'

import HomeBrandLive from '@/components/home/brand/BrandLive'

import HomeSearch from '@/components/home/search/Search'
import HomeCart from '@/components/home/cart/Cart'
import HomeStorelist from '@/components/home/storelist/Storelist'
import HomeStoredetail from '@/components/home/storedetail/Storedetail'
import HomeStoreabout from '@/components/home/storeabout/Storeabout'
import HomeStoreVoucher from '@/components/home/storedetail/StoreVoucher'
import HomeGoodslist from '@/components/home/goodslist/Goodslist'
import HomeStoreGoodslist from '@/components/home/storegoodslist/Goodslist'
import HomeStoreGoodsclass from '@/components/home/storegoodsclass/Goodsclass'
import HomeStoreFoodslist from '@/components/home/storefoodslist/Foodslist'

import HomeStoreGoodslista from '@/components/home/storegoodslist/Goodslista'

import HomeLearn from '@/components/home/learn/Index'
import HomeTraining from '@/components/home/learn/Training'
import HomeTest from '@/components/home/learn/Test'
import HomeProve from '@/components/home/learn/Prove'

import HomeGoodsdetail from '@/components/home/goodsdetail/Goodsdetail'
import HomeMarketcard from '@/components/home/marketmanage/Marketcard'
import HomeMarketzodiac from '@/components/home/marketmanage/Marketzodiac'
import HomeMarketwheel from '@/components/home/marketmanage/Marketwheel'
import HomeMarketegg from '@/components/home/marketmanage/Marketegg'
import HomeBargainlist from '@/components/home/bargain/Bargainlist'
import HomeBargainshare from '@/components/home/bargain/Bargainshare'
import HomeSpecial from '@/components/home/special/Index'
//宴席

import HomebanquetReserve from '@/components/home/banquet/banquetReserve'
import HomeBanquetChooseDishes from '@/components/home/banquet/banquetChooseDishes'
import HomeorderDetail from '@/components/home/banquet/orderDetail'
import HomeSubmitSuccess from '@/components/home/banquet/submitSuccess'
import HomeSelectFoods from '@/components/home/banquet/selectFoods'
import HomeBanquetGoods from '@/components/home/banquetgoods/Goodsdetail'

import HomeGoodsConsult from '@/components/home/goodsdetail/GoodsConsult'
import HomePointsgoods from '@/components/home/pointsgoods/Index'
import HomePointsgoodsDetail from '@/components/home/pointsgoods/Detail'
import HomePintuanList from '@/components/home/pintuan/PintuanList'
import HomeBonusDetail from '@/components/home/bonus/Detail'
import HomeGroupBuyList from '@/components/home/groupbuy/GroupBuyList'
import HomeVrGroupBuyList from '@/components/home/vrgroupbuy/GroupBuyList'
import MemberBase from '@/components/member/MemberBase'
import MemberIndex from '@/components/member/index/Index'
import MemberDesk from '@/components/member/desk/Index';
import MemberAddressList from '@/components/member/address/AddressList'
import MemberAddressForm from '@/components/member/address/AddressForm'
import MemberBankList from '@/components/member/bank/BankList'
import MemberBankForm from '@/components/member/bank/BankForm'
import MemberConsultList from '@/components/member/consult/ConsultList'
import MemberChatInfo from '@/components/member/chat/ChatInfo'
import MemberChatList from '@/components/member/chat/ChatList'
import MemberFriendList from '@/components/member/friend/FriendList'
import MemberRefundList from '@/components/member/refund/RefundList'
import MemberRefundForm from '@/components/member/refund/RefundForm'
import MemberRefundView from '@/components/member/refund/RefundView'
import MemberVrRefundList from '@/components/member/vrrefund/VrRefundList'
import MemberVrRefundForm from '@/components/member/vrrefund/VrRefundForm'
import MemberVrRefundView from '@/components/member/vrrefund/VrRefundView'
import MemberReturnList from '@/components/member/return/ReturnList'
import MemberReturnForm from '@/components/member/return/ReturnForm'
import MemberReturnView from '@/components/member/return/ReturnView'
import MemberReturnSend from '@/components/member/return/ReturnSend'
import MemberInvoiceList from '@/components/member/invoice/InvoiceList'
import MemberInvoiceForm from '@/components/member/invoice/InvoiceForm'
import MemberBuyStep1 from '@/components/member/buy/step1'
import MemberVrBuyStep1 from '@/components/member/vrbuy/step1'
import MemberPointsCart from '@/components/member/pointscart/Cart'
import MemberPointsBuyStep1 from '@/components/member/pointsbuy/step1'
import MemberPointsOrderList from '@/components/member/pointsorder/OrderList'
import MemberPointsOrderDetail from '@/components/member/pointsorder/OrderDetail'
import MemberComplaintList from '@/components/member/complaint/ComplaintList'
import MemberComplaintForm from '@/components/member/complaint/ComplaintForm'
import MemberInformList from '@/components/member/inform/InformList'
import MemberInformForm from '@/components/member/inform/InformForm'
import MemberBuyPay from '@/components/member/buy/pay'
import MemberBuyReceipt from '@/components/member/buy/receipt'


import MemberFavorite from '@/components/member/favorite/Favorite'
import MemberOrderList from '@/components/member/order/OrderList'
import MemberOrderDetail from '@/components/member/order/OrderDetail'
import MemberOrderDeliver from '@/components/member/order/OrderDeliver'
import MemberOrderEvaluate from '@/components/member/order/OrderEvaluate'

import MemberVrOrderList from '@/components/member/vrorder/OrderList'
import MemberVrOrderDetail from '@/components/member/vrorder/OrderDetail'
import MemberVrOrderEvaluate from '@/components/member/vrorder/OrderEvaluate'

import MemberPredepositList from '@/components/member/predeposit/PredepositList'
import MemberRechargeCardList from '@/components/member/predeposit/RechargeCardList'
import MemberWithdrawList from '@/components/member/withdraw/WithdrawList'
import MemberRechargeList from '@/components/member/recharge/RechargeList'
import MemberVoucherList from '@/components/member/voucher/VoucherList'
import MemberNoticeList from '@/components/member/notice/NoticeList'
import MemberSetting from '@/components/member/setting/AccountSet'
import MemberProfileSet from '@/components/member/profile/ProfileSet'
import MemberPointList from '@/components/member/point/PointList'
import MemberPointSignin from '@/components/member/point/PointSignin'
import MemberEvaluateList from '@/components/member/evaluate/EvaluateList'
import MemberInviterManage from '@/components/member/inviter/InviterManage'
import MemberInviterUser from '@/components/member/inviter/InviterUser'
import MemberInviterOrder from '@/components/member/inviter/InviterOrder'
import MemberInviterStorelist from '@/components/member/inviter/InviterStorelist'

import MemberMarketmanagelog from '@/components/member/marketmanagelog/Marketmanagelog'
import MemberBonusreceive from '@/components/member/bonusreceive/Bonusreceive'
import MemberBargainlist from '@/components/member/bargain/Bargainlist'
import MemberArrivalnotice from '@/components/member/arrivalnotice/Arrivalnotice'
import MemberAuth from '@/components/member/auth/Auth'
import MemberBrowseList from '@/components/member/browse/BrowseList'
import SellerJoininNew from '@/components/member/sellerjoinin/Index'
import SellerJoinin1 from '@/components/member/sellerjoinin/Step1'
import SellerJoinin2 from '@/components/member/sellerjoinin/Step2'
import SellerJoininSelf2 from '@/components/member/sellerjoinin/StepSelf2'
import SellerJoininSelf3 from '@/components/member/sellerjoinin/StepSelf3'
import SellerJoinin3 from '@/components/member/sellerjoinin/Step3'
import SellerJoinin4 from '@/components/member/sellerjoinin/Step4'
import SellerJoinin5 from '@/components/member/sellerjoinin/Step5'


import MemberBanquetList from '@/components/member/banquet/OrderList'
import MemberChooseDishes from '@/components/member/banquet/ChooseDishes'
import MemberChefOrder from '@/components/member/banquet/ChefOrder'
import MemberChefOrderDetail from '@/components/member/banquet/orderDetail'
import MemberBanquetPay from '@/components/member/banquet/pay'


import SellerBase from '@/components/seller/SellerBase'
import SellerChatInfo from '@/components/seller/chat/ChatInfo'
import SellerChatList from '@/components/seller/chat/ChatList'
import SellerNoticeList from '@/components/seller/notice/NoticeList'
import SellerVoucherList from '@/components/seller/voucher/VoucherList'
import SellerVoucherForm from '@/components/seller/voucher/VoucherForm'
import SellerIndex from '@/components/seller/index/Index'
import SellerConsultList from '@/components/seller/consult/ConsultList'
import SellerAddressList from '@/components/seller/address/AddressList'
import SellerAddressForm from '@/components/seller/address/AddressForm'
import SellerGoodsonline from '@/components/seller/goods/Goodsonline'
import SellerGoodsForm1 from '@/components/seller/goods/GoodsForm1'
import SellerGoodsForm2 from '@/components/seller/goods/GoodsForm2'
import SellerGoodsForm3 from '@/components/seller/goods/GoodsForm3'
import SellerBarcode from '@/components/seller/goods/Barcode'

import SellerFoodsonline from '@/components/seller/foods/Foodsonline'
import SellerDesksonline from '@/components/seller/foods/desksonline'
import SellerDesksForm2 from '@/components/seller/foods/DesksForm2'
import SellerFoodsForm2 from '@/components/seller/foods/FoodsForm2'
import SellerFoodsForm3 from '@/components/seller/foods/FoodsForm3'

import SellerApplysecurity from '@/components/seller/applysecurity/Index'
import SellerEvaluateList from '@/components/seller/evaluate/EvaluateList'
import SellerEvaluateReply from '@/components/seller/evaluate/EvaluateReply'
import SellerOrderList from '@/components/seller/order/OrderList'
import SellerOrderDetail from '@/components/seller/order/OrderDetail'
import SellerOrderDeliver from '@/components/seller/order/OrderDeliver'
import SellerOrderSend from '@/components/seller/order/OrderSend'

import SellerReceipt from '@/components/seller/order/receipt'

import SellerVrOrderList from '@/components/seller/vrorder/OrderList'
import SellerVrOrderDetail from '@/components/seller/vrorder/OrderDetail'

import SellerBillList from '@/components/seller/bill/BillList'
import SellerComplaintList from '@/components/seller/complaint/ComplaintList'
import SellerComplaintForm from '@/components/seller/complaint/ComplaintForm'
import SellerRefundList from '@/components/seller/refund/RefundList'
import SellerRefundForm from '@/components/seller/refund/RefundForm'
import SellerRefundView from '@/components/seller/refund/RefundView'
import SellerRefundDeliver from '@/components/seller/refund/RefundDeliver'
import SellerSettingIndex from '@/components/seller/setting/Index'
import SellerSettingInfo from '@/components/seller/setting/Info'
import SellerStatisticsGeneral from '@/components/seller/statisticsgeneral/Index'
import SellerEcharts from '@/components/seller/echarts/Index'
// import SellerEchartsCVR from '@/components/seller/echarts/ConversionRate'
// import SellerEchartsUser from '@/components/seller/echarts/User'
// import SellerEchartsOrder from '@/components/seller/echarts/Order'
import SellerInviter from '@/components/seller/inviter/Index'
import SellerInviterGoodsList from '@/components/seller/inviter/GoodsList'
import SellerInviterGoodsForm from '@/components/seller/inviter/GoodsForm'
import SellerInviterOrderList from '@/components/seller/inviter/OrderList'
import SellerAccount from '@/components/seller/account/Index'
import SellerAccountList from '@/components/seller/account/AccountList'
import SellerAccountForm from '@/components/seller/account/AccountForm'
import SellerAccountGroupList from '@/components/seller/accountgroup/AccountGroupList'
import SellerAccountGroupForm from '@/components/seller/accountgroup/AccountGroupForm'
import SellerGoodsClassList from '@/components/seller/goodsclass/GoodsClassList'
import SellerGoodsClassForm from '@/components/seller/goodsclass/GoodsClassForm'
import SellerLogList from '@/components/seller/log/LogList'
import SellerCostList from '@/components/seller/cost/CostList'
import SellerMoney from '@/components/seller/money/Index'
import SellerMoneyLogList from '@/components/seller/money/LogList'
import SellerMoneyWithdrawList from '@/components/seller/money/WithdrawList'
import SellerDeposit from '@/components/seller/deposit/Index'
import SellerDepositList from '@/components/seller/deposit/DepositList'
import SellerDepositWithdrawList from '@/components/seller/deposit/WithdrawList'
import SellerTransportList from '@/components/seller/transport/transportList'
import SellerTransportForm from '@/components/seller/transport/transportForm'
import SellerCamm  from '@/components/seller/camm/camm'
import HomeScan  from '@/components/home/scan/scan'
import HomeUrl  from '@/components/home/scan/url'
import HomeTraceability  from '@/components/home/scan/Traceability'

import HomeUrlPay  from '@/components/home/scan/urlpay'
import SellerJinhuo  from '@/components/seller/jinhuo/jinhuo'
import SellerOfflineSales  from '@/components/seller/goodslist/GoodsList'
import SellerQualify  from '@/components/seller/qualify/Index'
import SellerQnew  from '@/components/seller/qualify/New'
import SellerQedit  from '@/components/seller/qualify/Edit'
import SellerQput  from '@/components/seller/qualify/Put'
import SellerQsee  from '@/components/seller/qualify/See'
import SellerQsee2  from '@/components/seller/qualify/See2'
import SellerQsee3  from '@/components/seller/qualify/See3'
import SellerQseeNd  from '@/components/seller/qualify/Seend'
import SellerQtree  from '@/components/seller/qualify/Tree'
import SellerMap  from '@/components/seller/map/index'
import SellerReimbursement  from '@/components/seller/reimbursement/index'
import Sellerlicense  from '@/components/seller/license/license'

import SellerPerfect1  from '@/components/seller/perfect/Step1'
import SellerPerfect1Self  from '@/components/seller/perfect/Step1Self'
import SellerPerfect2  from '@/components/seller/perfect/Step2'
import SellerPerfect2Self  from '@/components/seller/perfect/Step2Self'
import SellerPerfect3  from '@/components/seller/perfect/Step3'

//新版本
import HomeRecipe from '@/components/home/recipe/Index'
import TodayMarket from '@/components/home/market/Index'
import HomeDiscount from '@/components/home/discount/index'
import HomeMenuClass from '@/components/home/recipe/MenuClass'
import HomeAddCook from '@/components/home/recipe/addCook'
import HomeChefSetting from '@/components/home/recipe/ChefSetting'
import HomeMenuDetail from '@/components/home/recipe/MenuDetail'
import HomeCreatedMenu from '@/components/home/recipe/CreatedMenu'
import HomeCookList from '@/components/home/recipe/CookList'
import HomeMenuManage from '@/components/home/recipe/menuManage'
import MenuSearchList from '@/components/home/recipe/searchMenuList'
import MenuSearch from '@/components/menuSearch'
import CookHome from '@/components/home/recipe/cookHome'
import FavoriteStoreNew from '@/components/member/favorite/FavoriteStoreNew'

//10.10新增促销
import SellerPromotionIndex from '@/components/seller/promotion/index.vue'
import SellerPurchase from '@/components/seller/promotion/Purchase.vue'

import SellerDiscount from '@/components/seller/promotion/Discount.vue'
import SellerDiscountEdit from '@/components/seller/promotion/DiscountEdit.vue'
import SellerDiscountTube from '@/components/seller/promotion/DiscountTube.vue'

import SellerFullDelivery from '@/components/seller/promotion/FullDelivery.vue'
import SellerFullDeliveryAdd from '@/components/seller/promotion/FullDeliveryAdd.vue'
import SellerFullDeliveryDetails from '@/components/seller/promotion/FullDeliveryDetails.vue'
import SellerSuit from '@/components/seller/promotion/Suit.vue'
import SellerPurchasAdd from '@/components/seller/promotion/PurchaseChild.vue'
import SellerSuitAdd from '@/components/seller/promotion/SuitAdd.vue'
import BanquetSellerOrderDetail from '@/components/seller/banquet/orderDetail.vue'
import SellerBanquetSetting from '@/components/seller/banquet/Setting.vue'
import SellerBanquetList from '@/components/seller/banquet/orderList.vue'
import HomeSnapUp from '@/components/home/snapup/index.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '',
      redirect: '/home/index',
      meta: {
        footer: {
          show: true
        }
      }
    },
    {
      path: '/home/',
	  index:0,
      component: HomeBase,
      children: [
        // 首页
        { path: 'index', name: 'HomeIndex', component: HomeIndex, meta: { footer: { show: true } } },
        // 供应链
        { path: 'upgrape', name: 'HomeUpGrape', component: HomeUpGrape, meta: { footer: { show: false } } },
        // 发现
        { path: 'faxian', name: 'HomeFaxian', component: HomeFaxian, meta: { footer: { show: true } } },
        // 全景
        { path: 'panoramic', name: 'HomePanoramic', component: HomePanoramic, meta: { footer: { show: false } } },
        // 地图
        { path: 'map', name: 'HomeMap', component: HomeMap, meta: { footer: { show: false } } },
        { path: 'mapdh', name: 'HomeMapdh', component: HomeMapdh, meta: { footer: { show: true } } },
        // 注册协议
        { path: 'document', name: 'HomeDocument', component: HomeDocument, meta: { footer: { show: false } } },
        // 文章分类
        { path: 'article_class', name: 'HomeArticleclass', component: HomeArticleclass, meta: { footer: { show: false } } },
        // 文章列表
        { path: 'article_list', name: 'HomeArticlelist', component: HomeArticlelist, meta: { footer: { show: false } } },
        // 红黑榜
        { path: 'top_list', name: 'HomeTopList', component: HomeTopList, meta: { footer: { show: false } } },
        // 文章详情
        { path: 'article_detail', name: 'HomeArticledetail', component: HomeArticledetail, meta: { footer: { show: false } } },
        // 用户注册
        { path: 'memberregister', name: 'HomeMemberRegister', component: HomeMemberRegister, meta: { footer: { show: false } } },
        // 用户绑定
        { path: 'memberbind', name: 'HomeMemberBind', component: HomeMemberBind, meta: { footer: { show: false } } },
        // 用户登录
        { path: 'memberlogin', name: 'HomeMemberLogin', component: HomeMemberLogin, meta: { footer: { show: false } } },
        // 卖家登录
        { path: 'sellerlogin', name: 'HomeSellerLogin', component: HomeSellerLogin, meta: { footer: { show: false } } },
        // 忘记密码
        { path: 'memberforget', name: 'HomeMemberForget', component: HomeMemberForget, meta: { footer: { show: false } } },
        // 分类
        { path: 'goodsclass', name: 'HomeGoodsclass', component: HomeGoodsclass, meta: { footer: { show: true } } },
        // 团分类
        { path: 'tuanclass', name: 'HomeTuanclass', component: HomeTuanclass, meta: { footer: { show: false } } },
        // 店铺分类
        { path: 'storeclass', name: 'HomeStoreclass', component: HomeStoreclass, meta: { footer: { show: false } } },
        // 店铺 搜索
        { path: 'storesearch', name: 'HomeStoresearch', component: HomeStoresearch, meta: { footer: { show: false } } },
        // 新加
        { path: 'store_goodslista', name: 'HomeStoreGoodslista', component: HomeStoreGoodslista, meta: { footer: { show: false } } },
        // 品牌
        { path: 'brandindex', name: 'HomeBrandIndex', component: HomeBrandIndex, meta: { footer: { show: false } } },
        // 品牌
        { path: 'brand', name: 'HomeBrand', component: HomeBrand, meta: { footer: { show: false } } },
        // 品牌搜索
        { path: 'brandsearch', name: 'HomeBrandSearch', component: HomeBrandSearch, meta: { footer: { show: false } } },
        // 品牌详情
        { path: 'branditem', name: 'HomeBrandItem', component: HomeBrandItem, meta: { footer: { show: false } } },
        // 品牌 餐饮 商家 列表
        { path: 'brandstorelist', name: 'HomeBrandStoreList', component: HomeBrandStoreList, meta: { footer: { show: false } } },
        // 品牌简介
        { path: 'brandintroduct', name: 'HomeBrandIntroduct', component: HomeBrandIntroduct, meta: { footer: { show: false } } },
        // 品牌 满意度调查
        { path: 'brandsurvey', name: 'HomeBrandSurvey', component: HomeBrandSurvey, meta: { footer: { show: false } } },
        // 品牌 评价
        { path: 'brandevaluate', name: 'HomeBrandEvaluate', component: HomeBrandEvaluate, meta: { footer: { show: false } } },
        // 核心竞争力 前四
        { path: 'brandcore', name: 'HomeBrandCore', component: HomeBrandCore, meta: { footer: { show: false } } },
        // 核心竞争力 后二
        { path: 'brandduty', name: 'HomeBrandDuty', component: HomeBrandDuty, meta: { footer: { show: false } } },
        // 展示图片
        { path: 'brandImg', name: 'HomeBrandImg', component: HomeBrandImg, meta: { footer: { show: false } } },
        // 展示文字 图
        { path: 'brandShow', name: 'HomeBrandShow', component: HomeBrandShow, meta: { footer: { show: false } } },
        // 全景
        { path: 'brandPano', name: 'HomeBrandPano', component: HomeBrandPano, meta: { footer: { show: false } } },
        // 视频直播
        { path: 'brandlive', name: 'HomeBrandLive', component: HomeBrandLive, meta: { footer: { show: false } } },

        // 购物车
        { path: 'cart', name: 'HomeCart', component: HomeCart, meta: { footer: { show: false } } },
        // 搜索
        { path: 'search', name: 'HomeSearch', component: HomeSearch, meta: { footer: { show: false } } },
        // 搜索
        { path: 'upgrapesearch', name: 'HomeUpgrapeSearch', component: HomeUpgrapeSearch, meta: { footer: { show: false } } },
        // 店铺列表
        { path: 'storelist', name: 'HomeStorelist', component: HomeStorelist, meta: { footer: { show: false } } },
        // 店铺详情
        { path: 'storedetail', name: 'HomeStoredetail', component: HomeStoreGoodslist, meta: { footer: { show: false } } },
        // 店铺介绍
        { path: 'storeabout', name: 'HomeStoreabout', component: HomeStoreabout, meta: {index:1, footer: { show: false } } },
        // 店铺代金券
        { path: 'storevoucher', name: 'HomeStoreVoucher', component: HomeStoreVoucher, meta: { footer: { show: false } } },
        // 店铺列表
        { path: 'goodslist', name: 'HomeGoodslist', component: HomeGoodslist, meta: { footer: { show: false } } },
        // 店铺商品列表
        { path: 'store_goodslist', name: 'HomeStoreGoodslist', component: HomeStoreGoodslist, meta: { footer: { show: false } } },
        // 店铺搜索
        { path: 'store_goodsclass', name: 'HomeStoreGoodsclass', component: HomeStoreGoodsclass, meta: { footer: { show: false } } },
        // 餐饮店铺
        { path: 'store_foodslist', name: 'HomeStoreFoodslist', component: HomeStoreFoodslist, meta: { footer: { show: false } } },
        
        // 商品详情
        { path: 'goodsdetail', name: 'HomeGoodsdetail', component: HomeGoodsdetail, meta: { footer: { show: false } } },
        // 供应链商品详情
        { path: 'upgrapegood', name: 'HomeUpGrapeGood', component: HomeUpGrapeGood, meta: { footer: { show: false } } },
        // 供应链商品详情
        { path: 'upgrapegoodclass', name: 'HomeUpGrapeGoodClass', component: HomeUpGrapeGoodClass, meta: { footer: { show: false } } },
        // 供应链商品列表
        { path: 'upgrapegoodlist', name: 'HomeUpGrapeGoodslist', component: HomeUpGrapeGoodslist, meta: { footer: { show: false } } },
        // 商品咨询
        { path: 'goodsconsult', name: 'HomeGoodsConsult', component: HomeGoodsConsult, meta: { footer: { show: false } } },
        // 拼团列表
        { path: 'pintuan_list', name: 'HomePintuanList', component: HomePintuanList, meta: { footer: { show: false } } },
        // 积分兑换商品
        { path: 'pointsgoods', name: 'HomePointsgoods', component: HomePointsgoods, meta: { footer: { show: false } } },
        // 积分兑换商品详情页
        { path: 'pointsgoods_detail', name: 'HomePointsgoodsDetail', component: HomePointsgoodsDetail, meta: { footer: { show: false } } },
        // 红包兑换商品详情页
        { path: 'bonus_detail', name: 'HomeBonusDetail', component: HomeBonusDetail, meta: { footer: { show: false } } },
        // 刮刮卡
        { path: 'marketcard', name: 'HomeMarketcard', component: HomeMarketcard, meta: { footer: { show: false } } },
        // 生肖翻翻看
        { path: 'marketzodiac', name: 'HomeMarketzodiac', component: HomeMarketzodiac, meta: { footer: { show: false } } },
        // 大转盘
        { path: 'marketwheel', name: 'HomeMarketwheel', component: HomeMarketwheel, meta: { footer: { show: false } } },
        // 砸金蛋
        { path: 'marketegg', name: 'HomeMarketegg', component: HomeMarketegg, meta: { footer: { show: false } } },
        // 砍价列表页
        { path: 'bargain_list', name: 'HomeBargainlist', component: HomeBargainlist, meta: { footer: { show: false } } },
        // 砍价分享页面
        { path: 'bargain_share', name: 'HomeBargainshare', component: HomeBargainshare, meta: { footer: { show: false } } },
        // 可编辑页面
        { path: 'special', name: 'HomeSpecial', component: HomeSpecial, meta: { footer: { show: false } } },
        // 抢购列表
        { path: 'groupbuy_list', name: 'HomeGroupBuyList', component: HomeGroupBuyList, meta: { footer: { show: false } } },
        // 摄像头
        { path: 'scan', name: 'HomeScan', component: HomeScan, meta: { footer: { show: false } } },
        { path: 'url', name: 'HomeUrl', component: HomeUrl, meta: { footer: { show: false } } },
        { path: 'urlpay', name: 'HomeUrlPay', component: HomeUrlPay, meta: { footer: { show: true } } },
        // 商品追溯二维码
        { path: 'traceability', name: 'HomeTraceability', component: HomeTraceability, meta: { footer: { show: false } } },
        // 虚拟抢购列表
        { path: 'vr_groupbuy_list', name: 'HomeVrGroupBuyList', component: HomeVrGroupBuyList, meta: { footer: { show: false } } },
        { path: 'learn', name:"HomeLearn", component: HomeLearn,meta: { footer: { show: false} } },
        { path: 'training', name:"HomeTraining", component: HomeTraining,meta: { footer: { show: false} } },
        { path: 'test', name:"HomeTest", component: HomeTest,meta: { footer: { show: false} } },
        { path: 'prove', name:"HomeProve", component: HomeProve,meta: { footer: { show: false} } },
        //  查看合格证
        { path: 'qsee', name: 'HomeQsee',component: SellerQsee, meta: { footer: { show: false } } },
        // 查看商品详情
        { path: 'qsee2', name: 'HomeQsee2',component: SellerQsee2, meta: { footer: { show: false } } },
        // 查看单个详情
        { path: 'qsee3', name: 'HomeQsee3',component: SellerQsee3, meta: { footer: { show: false } } },
        // 最终指向详情
        { path: 'qseend', name: 'SellerQseeNd',component: SellerQseeNd, meta: { footer: { show: false } } },
        // 菜谱页
        { path: 'recipe', name: 'HomeRecipe',component: HomeRecipe, meta: { footer: { show: false } } },
        // 今日行情
        { path: 'Today-market', name: 'TodayMarket',component: TodayMarket, meta: { footer: { show: false } } },
        // 满即送
        { path: 'homediscount', name: 'HomeDiscount',component: HomeDiscount, meta: { footer: { show: false } } },
		    // 菜单分类
        { path: 'menuClass', name: 'HomeMenuClass',component: HomeMenuClass, meta: { footer: { show: false } } },
        // 添加厨师/厨师入驻
        { path: 'addCook', name: 'HomeAddCook',component: HomeAddCook, meta: { footer: { show: false } } },
        // 厨师管理
        { path: 'chefsetting', name: 'HomeChefSetting',component: HomeChefSetting, meta: { footer: { show: false } } },
		// 菜单详情
		{ path: 'menudetail', name: 'HomeMenuDetail',component: HomeMenuDetail, meta: { footer: { show: false } } },
		// 创建菜谱
		{ path: 'createdMenu', name: 'HomeCreatedMenu',component: HomeCreatedMenu, meta: { footer: { show: false } } },
		// 添加厨师
		{ path: 'cooklist', name: 'HomeCookList',component: HomeCookList, meta: { footer: { show: false } } },
		//菜谱管理
		{ path: 'menumanage', name: 'HomeMenuManage',component: HomeMenuManage, meta: { footer: { show: false } } },
		//搜索列表
		{ path: 'menusearchlist', name: 'MenuSearchList',component: MenuSearchList, meta: { footer: { show: false } } },
		// 菜谱搜索
		{ path: 'menusearch', name: 'MenuSearch',component: MenuSearch, meta: { footer: { show: false } } },
		// 厨师主页
		{ path: 'cookindex', name: 'CookHome',component: CookHome, meta: { footer: { show: false } } },
		//秒杀抢购
		{ path: 'snapup', name: 'HomeSnapUp',component: HomeSnapUp, meta: { footer: { show: false } } },
		// 宴席预定/厨师上门
		{ path: 'banquet_reserve', name: 'HomebanquetReserve',component: HomebanquetReserve, meta: { index:2, footer: { show: false },keepAlive:true } },
		// 宴席预定/厨师上门
		{ path: 'banquet_chooseDishes', name: 'HomeBanquetChooseDishes',component: HomeBanquetChooseDishes, meta: { footer: { show: false } } },
		//宴席订单详情
		{ path: 'banquet_order_detail', name: 'HomeorderDetail',component: HomeorderDetail, meta: { footer: { show: false } } },
		//预定提交成功
		{ path: 'banquet_submit_success', name: 'HomeSubmitSuccess',component: HomeSubmitSuccess, meta: { footer: { show: false } } },
		//菜品详情
		{ path: 'banquet_select_foods', name: 'HomeSelectFoods',component: HomeSelectFoods, meta: { footer: { show: false } } },
		//菜品详情
		{ path: 'banquet_goods_details', name: 'HomeBanquetGoods',component: HomeBanquetGoods, meta: { footer: { show: false } } },
	  ]
    },

    {
      path: '/member/',
      // component: MemberBase, 旧版本
      component: HomeBase,
      children: [
        // 用户中心
        { path: 'index', name: 'MemberIndex', component: MemberIndex, meta: { footer: { show: true } } },
        // 订桌记录
        { path: 'desk', name: 'MemberDesk', component: MemberDesk, meta: { footer: { show: false } } },
        // 资金明细
        { path: 'predeposit_list', name: 'MemberPredepositList', component: MemberPredepositList, meta: { footer: { show: false } } },
        // 充值卡明细
        { path: 'recharge_card_list', name: 'MemberRechargeCardList', component: MemberRechargeCardList, meta: { footer: { show: false } } },
        // 提现明细
        { path: 'withdraw_list', name: 'MemberWithdrawList', component: MemberWithdrawList, meta: { footer: { show: false } } },
        // 聊天信息
        { path: 'chat_info', name: 'MemberChatInfo', component: MemberChatInfo, meta: { footer: { show: false } } },
        // 聊天列表
        { path: 'chat_list', name: 'MemberChatList', component: MemberChatList, meta: { footer: { show: false } } },
        // 好友列表
        { path: 'friend_list', name: 'MemberFriendList', component: MemberFriendList, meta: { footer: { show: false } } },
        // 咨询列表
        { path: 'consult_list', name: 'MemberConsultList', component: MemberConsultList, meta: { footer: { show: false } } },
        // 充值明细
        { path: 'recharge_list', name: 'MemberRechargeList', component: MemberRechargeList, meta: { footer: { show: false } } },
        // 代金券列表
        { path: 'voucher_list', name: 'MemberVoucherList', component: MemberVoucherList, meta: { footer: { show: false } } },
        // 消息列表
        { path: 'notice_list', name: 'MemberNoticeList', component: MemberNoticeList, meta: { footer: { show: false } } },
        // 账号设置
        { path: 'setting', name: 'MemberSetting', component: MemberSetting, meta: { footer: { show: false } } },
        // 个人信息
        { path: 'profile_set', name: 'MemberProfileSet', component: MemberProfileSet, meta: { footer: { show: false } } },
        // 积分明细
        { path: 'point_list', name: 'MemberPointList', component: MemberPointList, meta: { footer: { show: false } } },
        // 签到送积分
        { path: 'point_signin', name: 'MemberPointSignin', component: MemberPointSignin, meta: { footer: { show: false } } },
        // 地址列表
        { path: 'address_list', name: 'MemberAddressList', component: MemberAddressList, meta: { footer: { show: false } } },
        // 地址编辑
        { path: 'address_form', name: 'MemberAddressForm', component: MemberAddressForm, meta: { footer: { show: false } } },
        // 提现账户列表
        { path: 'bank_list', name: 'MemberBankList', component: MemberBankList, meta: { footer: { show: false } } },
        // 提现账户编辑
        { path: 'bank_form', name: 'MemberBankForm', component: MemberBankForm, meta: { footer: { show: false } } },
        // 退款列表
        { path: 'refund_list', name: 'MemberRefundList', component: MemberRefundList, meta: { footer: { show: false } } },
        // 退款编辑
        { path: 'refund_form', name: 'MemberRefundForm', component: MemberRefundForm, meta: { footer: { show: false } } },
        // 退款详情
        { path: 'refund_view', name: 'MemberRefundView', component: MemberRefundView, meta: { footer: { show: false } } },
        // 退款列表
        { path: 'vrrefund_list', name: 'MemberVrRefundList', component: MemberVrRefundList, meta: { footer: { show: false } } },
        // 退款编辑
        { path: 'vrrefund_form', name: 'MemberVrRefundForm', component: MemberVrRefundForm, meta: { footer: { show: false } } },
        // 退款详情
        { path: 'vrrefund_view', name: 'MemberVrRefundView', component: MemberVrRefundView, meta: { footer: { show: false } } },
        // 退货列表
        { path: 'return_list', name: 'MemberReturnList', component: MemberReturnList, meta: { footer: { show: false } } },
        // 退货编辑
        { path: 'return_form', name: 'MemberReturnForm', component: MemberReturnForm, meta: { footer: { show: false } } },
        // 退货详情
        { path: 'return_view', name: 'MemberReturnView', component: MemberReturnView, meta: { footer: { show: false } } },
        // 退货
        { path: 'return_send', name: 'MemberReturnSend', component: MemberReturnSend, meta: { footer: { show: false } } },
        // 发票列表
        { path: 'invoice_list', name: 'MemberInvoiceList', component: MemberInvoiceList, meta: { footer: { show: false } } },
        // 发票编辑
        { path: 'invoice_form', name: 'MemberInvoiceForm', component: MemberInvoiceForm, meta: { footer: { show: false } } },
        // 下单界面
        { path: 'buystep1', name: 'MemberBuyStep1', component: MemberBuyStep1, meta: { footer: { show: false } } },
        // 下单界面
        { path: 'vrbuystep1', name: 'MemberVrBuyStep1', component: MemberVrBuyStep1, meta: { footer: { show: false } } },
        // 积分商品下单
        { path: 'pointsbuystep1', name: 'MemberPointsBuyStep1', component: MemberPointsBuyStep1, meta: { footer: { show: false } } },
        // 积分商品购物车
        { path: 'pointscart', name: 'MemberPointsCart', component: MemberPointsCart, meta: { footer: { show: false } } },
        // 积分订单列表
        { path: 'pointsorder_list', name: 'MemberPointsOrderList', component: MemberPointsOrderList, meta: { footer: { show: false } } },
        // 积分订单详情
        { path: 'pointsorder_detail', name: 'MemberPointsOrderDetail', component: MemberPointsOrderDetail, meta: { footer: { show: false } } },
        // 商家投诉
        { path: 'inform_list', name: 'MemberInformList', component: MemberInformList, meta: { footer: { show: false } } },
        // 商家投诉
        { path: 'inform_form', name: 'MemberInformForm', component: MemberInformForm, meta: { footer: { show: false } } },
        // 商家投诉
        { path: 'complaint_list', name: 'MemberComplaintList', component: MemberComplaintList, meta: { footer: { show: false } } },
        // 商家投诉
        { path: 'complaint_form', name: 'MemberComplaintForm', component: MemberComplaintForm, meta: { footer: { show: false } } },
        // 支付界面
        { path: 'buypay', name: 'MemberBuyPay', component: MemberBuyPay, meta: { footer: { show: false } } },
        // 回单界面
        { path: 'buyreceipt', name: 'MemberBuyReceipt', component: MemberBuyReceipt, meta: { footer: { show: false } } },
        // 我的订单
        { path: 'order_list', name: 'MemberOrderList', component: MemberOrderList, meta: { footer: { show: false } } },
        // 我的收藏
        { path: 'favorite', name: 'MemberFavorite', component: MemberFavorite, meta: { footer: { show: false } } },
        // 订单详情
        { path: 'order_detail', name: 'MemberOrderDetail', component: MemberOrderDetail, meta: { footer: { show: false } } },
        // 物流跟踪
        { path: 'order_deliver', name: 'MemberOrderDeliver', component: MemberOrderDeliver, meta: { footer: { show: false } } },
        // 评价订单
        { path: 'order_evaluate', name: 'MemberOrderEvaluate', component: MemberOrderEvaluate, meta: { footer: { show: false } } },
        // 订单详情
        { path: 'vrorder_detail', name: 'MemberVrOrderDetail', component: MemberVrOrderDetail, meta: { footer: { show: false } } },
        // 评价订单
        { path: 'vrorder_evaluate', name: 'MemberVrOrderEvaluate', component: MemberVrOrderEvaluate, meta: { footer: { show: false } } },
        // 我的订单
        { path: 'vrorder_list', name: 'MemberVrOrderList', component: MemberVrOrderList, meta: { footer: { show: false } } },

        // 用户订单评价列表
        { path: 'evaluate_list', name: 'MemberEvaluateList', component: MemberEvaluateList, meta: { footer: { show: false } } },
        // 推广海报
        { path: 'inviter_manage', name: 'MemberInviterManage', component: MemberInviterManage, meta: { footer: { show: false } } },
        // 推广会员
        { path: 'inviter_user', name: 'MemberInviterUser', component: MemberInviterUser, meta: { footer: { show: false } } },
        // 推广佣金
        { path: 'inviter_order', name: 'MemberInviterOrder', component: MemberInviterOrder, meta: { footer: { show: false } } },
        // 推广商家列表 
        { path: 'inviter_storelist', name: 'MemberInviterStorelist', component: MemberInviterStorelist, meta: { footer: { show: false } } },
        // 活动记录
        { path: 'marketmanagelog', name: 'MemberMarketmanagelog', component: MemberMarketmanagelog, meta: { footer: { show: false } } },
        // 红包领取记录
        { path: 'bonusreceive', name: 'MemberBonusreceive', component: MemberBonusreceive, meta: { footer: { show: false } } },
        // 砍价列表页
        { path: 'bargain_list', name: 'MemberBargainlist', component: MemberBargainlist, meta: { footer: { show: false } } },
        // 到货通知页面
        { path: 'arrivalnotice', name: 'MemberArrivalnotice', component: MemberArrivalnotice, meta: { footer: { show: false } } },
        // 浏览历史页面
        { path: 'browse_list', name: 'MemberBrowseList', component: MemberBrowseList, meta: { footer: { show: false } } },
        // 会员认证页面
        { path: 'auth', name: 'MemberAuth', component: MemberAuth, meta: { footer: { show: false } } },
        // 店铺入住 新版
        { path: 'seller_joinin_new', name: 'SellerJoininNew', component: SellerJoininNew, meta: { footer: { show: false } } },
        // 店铺入驻
        { path: 'seller_joinin_1', name: 'SellerJoinin1', component: SellerJoinin1, meta: { footer: { show: false } } },
        // 农产入驻
        { path: 'SellerJoininSelf2', name: 'SellerJoininSelf2', component: SellerJoininSelf2, meta: { footer: { show: false } } },
        // 店铺入驻
        { path: 'seller_joinin_2', name: 'SellerJoinin2', component: SellerJoinin2, meta: { footer: { show: false } } },
        // 农产入驻
        { path: 'SellerJoininSelf3', name: 'SellerJoininSelf3', component: SellerJoininSelf3, meta: { footer: { show: false } } },
        // 店铺入驻
        { path: 'seller_joinin_3', name: 'SellerJoinin3', component: SellerJoinin3, meta: { footer: { show: false } } },
        // 店铺入驻
        { path: 'seller_joinin_4', name: 'SellerJoinin4', component: SellerJoinin4, meta: { footer: { show: false } } },
        // 店铺入驻
        { path: 'seller_joinin_5', name: 'SellerJoinin5', component: SellerJoinin5, meta: { footer: { show: false } } },
        // 关注店铺新版
        { path: 'favorite_store', name: 'FavoriteStoreNew', component: FavoriteStoreNew, meta: { footer: { show: false } } },
        
        // 宴请-订单列表
        { path: 'm_banquet_list', name: 'MemberBanquetList', component: MemberBanquetList, meta: { footer: { show: false } } },
        // 宴请-选择菜品
        { path: 'm_banquet_choose_dishes', name: 'MemberChooseDishes', component: MemberChooseDishes, meta: { footer: { show: false } } },
        // 宴请-厨师订单
        { path: 'm_banquet_chef_order', name: 'MemberChefOrder', component: MemberChefOrder, meta: { footer: { show: false } } },
		//宴请-厨师订单详情
    { path: 'm_banquet_order_detail', name: 'MemberChefOrderDetail', component: MemberChefOrderDetail, meta: { footer: { show: false } } },
    // 用户 支付  订单
    { path: 'm_banquet_pay', name: 'MemberBanquetPay', component: MemberBanquetPay, meta: { footer: { show: false } } },
    
	  ]
    },
    {
      path: '/seller/',
      component: SellerBase,
      children: [
        // 卖家中心
        { path: 'index', name: 'SellerIndex', component: SellerIndex, meta: { footer: { show: false } } },
        // 完善信息 第一步 普通商家
        { path: 'Perfect1', name: 'SellerPerfect1', component: SellerPerfect1, meta: { footer: { show: false } } },
        // 完善信息 第一步 种植养殖屠宰
        { path: 'Perfect1self', name: 'SellerPerfect1Self', component: SellerPerfect1Self, meta: { footer: { show: false } } },
        // 完善信息 第二部
        { path: 'Perfect2', name: 'SellerPerfect2', component: SellerPerfect2, meta: { footer: { show: false } } },
        // 完善信息 第二步 种植养殖屠宰
        { path: 'Perfect2self', name: 'SellerPerfect2Self', component: SellerPerfect2Self, meta: { footer: { show: false } } },
        // 完善信息 第三步
        { path: 'Perfect3', name: 'SellerPerfect3', component: SellerPerfect3, meta: { footer: { show: false } } },
        // 卖家 申请供应链  食安品牌 
        { path: 'applysecurity', name: 'SellerApplysecurity', component: SellerApplysecurity, meta: { footer: { show: false } } },
        // 咨询列表
        { path: 'consult_list', name: 'SellerConsultList', component: SellerConsultList, meta: { footer: { show: false } } },
        // 聊天信息
        { path: 'chat_info', name: 'SellerChatInfo', component: SellerChatInfo, meta: { footer: { show: false } } },
        // 聊天列表
        { path: 'chat_list', name: 'SellerChatList', component: SellerChatList, meta: { footer: { show: false } } },
        // 店铺发货地址列表
        { path: 'address_list', name: 'SellerAddressList', component: SellerAddressList, meta: { footer: { show: false } } },
        // 编辑店铺发货地址
        { path: 'address_form', name: 'SellerAddressForm', component: SellerAddressForm, meta: { footer: { show: false } } },
        // 店铺消息列表
        { path: 'notice_list', name: 'SellerNoticeList', component: SellerNoticeList, meta: { footer: { show: true } } },
        // 代金券列表
        { path: 'voucher_list', name: 'SellerVoucherList', component: SellerVoucherList, meta: { footer: { show: true } } },
        // 编辑代金券
        { path: 'voucher_form', name: 'SellerVoucherForm', component: SellerVoucherForm, meta: { footer: { show: true } } },
        // 卖家商品管理
        { path: 'goodsonline', name: 'SellerGoodsonline', component: SellerGoodsonline, meta: { footer: { show: false } } },
        // 卖家商品 溯源码
        { path: 'goodsbarcode', name: 'SellerBarcode', component: SellerBarcode, meta: { footer: { show: false } } },      
        // 卖家商品上传步骤1
        { path: 'goods_form_1', name: 'SellerGoodsForm1', component: SellerGoodsForm1, meta: { footer: { show: false } } },
        // 卖家商品上传步骤2
        { path: 'goods_form_2', name: 'SellerGoodsForm2', component: SellerGoodsForm2, meta: { footer: { show: false } } },
        // 卖家商品上传步骤3
        { path: 'goods_form_3', name: 'SellerGoodsForm3', component: SellerGoodsForm3, meta: { footer: { show: false } } },
        
        // 卖家菜品管理
        { path: 'foodsonline', name: 'SellerFoodsonline', component: SellerFoodsonline, meta: { footer: { show: false } } },
        // 卖家餐桌管理
        { path: 'desksonline', name: 'SellerDesksonline', component: SellerDesksonline, meta: { footer: { show: false } } },
        // 卖家餐桌管理
        { path: 'desksform2', name: 'SellerDesksForm2', component: SellerDesksForm2, meta: { footer: { show: false } } },
        // 卖家菜品上传步骤2
        { path: 'foodsform2', name: 'SellerFoodsForm2', component: SellerFoodsForm2, meta: { footer: { show: false } } },
        // 卖家菜品上传步骤3
        { path: 'foodsform3', name: 'SellerFoodsForm3', component: SellerFoodsForm3, meta: { footer: { show: false } } },

        // 退款列表
        { path: 'refund_list', name: 'SellerRefundList', component: SellerRefundList, meta: { footer: { show: false } } },
        // 退款编辑
        { path: 'refund_form', name: 'SellerRefundForm', component: SellerRefundForm, meta: { footer: { show: false } } },
        // 退款详情
        { path: 'refund_view', name: 'SellerRefundView', component: SellerRefundView, meta: { footer: { show: false } } },
        // 物流跟踪
        { path: 'refund_deliver', name: 'SellerRefundDeliver', component: SellerRefundDeliver, meta: { footer: { show: false } } },
        // 评价列表
        { path: 'evaluate_list', name: 'SellerEvaluateList', component: SellerEvaluateList, meta: { footer: { show: false } } },
        // 评价列表
        { path: 'evaluate_reply', name: 'SellerEvaluateReply', component: SellerEvaluateReply, meta: { footer: { show: false } } },
        // 卖家订单列表
        { path: 'orderlist', name: 'SellerOrderList', component: SellerOrderList, meta: { footer: { show: false } } },
        // 订单详情
        { path: 'order_detail', name: 'SellerOrderDetail', component: SellerOrderDetail, meta: { footer: { show: false } } },
        // 物流跟踪
        { path: 'order_deliver', name: 'SellerOrderDeliver', component: SellerOrderDeliver, meta: { footer: { show: false } } },
        // 订单发货
        { path: 'order_send', name: 'SellerOrderSend', component: SellerOrderSend, meta: { footer: { show: false } } },
        // 查看 回单
        { path: 'order_receipt', name: 'SellerReceipt', component: SellerReceipt, meta: { footer: { show: false } } },
        // 订单详情
        { path: 'vrorder_detail', name: 'SellerVrOrderDetail', component: SellerVrOrderDetail, meta: { footer: { show: false } } },
        // 我的订单
        { path: 'vrorder_list', name: 'SellerVrOrderList', component: SellerVrOrderList, meta: { footer: { show: true } } },
        // 卖家结算单
        { path: 'billlist', name: 'SellerBillList', component: SellerBillList, meta: { footer: { show: true } } },
        // 商家投诉
        { path: 'complaint_list', name: 'SellerComplaintList', component: SellerComplaintList, meta: { footer: { show: true } } },
        // 商家投诉
        { path: 'complaint_form', name: 'SellerComplaintForm', component: SellerComplaintForm, meta: { footer: { show: true } } },
        // 统计分析
        { path: 'statistics_general', name: 'SellerStatisticsGeneral', component: SellerStatisticsGeneral, meta: { footer: { show: false } } },
        // 店铺概况
        { path: 'echarts', name: 'SellerEcharts', component: SellerEcharts, meta: { footer: { show: false } } },
        // 转化率分析
        // { path: 'echarts_cvr', name: 'SellerEchartsCVR', component: SellerEchartsCVR, meta: { footer: { show: false } } },
        // 用户分析
        // { path: 'echarts_user', name: 'SellerEchartsUser', component: SellerEchartsUser, meta: { footer: { show: false } } },
        // 订单分析
        // { path: 'echarts_order', name: 'SellerEchartsOrder', component: SellerEchartsOrder, meta: { footer: { show: false } } },
        // 店铺基本信息设置管理页
        { path: 'setting_index', name: 'SellerSettingIndex', component: SellerSettingIndex, meta: { footer: { show: true } } },
        // 店铺基本信息设置
        { path: 'setting_info', name: 'SellerSettingInfo', component: SellerSettingInfo, meta: { footer: { show: true } } },
        // 店铺分销页面
        { path: 'inviter', name: 'SellerInviter', component: SellerInviter, meta: { footer: { show: false } } },
        // 分销订单管理
        { path: 'inviter_orderlist', name: 'SellerInviterOrderList', component: SellerInviterOrderList, meta: { footer: { show: false } } },
        // 分销商品管理
        { path: 'inviter_goodslist', name: 'SellerInviterGoodsList', component: SellerInviterGoodsList, meta: { footer: { show: false } } },
        // 分销商品添加/编辑
        { path: 'inviter_goodsform', name: 'SellerInviterGoodsForm', component: SellerInviterGoodsForm, meta: { footer: { show: false } } },
        // 子账户管理界面
        { path: 'account', name: 'SellerAccount', component: SellerAccount, meta: { footer: { show: true } } },
        // 子账户列表
        { path: 'account_list', name: 'SellerAccountList', component: SellerAccountList, meta: { footer: { show: true } } },
        // 添加子账户
        { path: 'account_form', name: 'SellerAccountForm', component: SellerAccountForm, meta: { footer: { show: true } } },
        // 账户组列表
        { path: 'accountgroup_list', name: 'SellerAccountGroupList', component: SellerAccountGroupList, meta: { footer: { show: true } } },
        // 账户组列表
        { path: 'accountgroup_form', name: 'SellerAccountGroupForm', component: SellerAccountGroupForm, meta: { footer: { show: true } } },
        // 账户组列表
        { path: 'goodsclass_list', name: 'SellerGoodsClassList', component: SellerGoodsClassList, meta: { footer: { show: true } } },
        // 账户组列表
        { path: 'goodsclass_form', name: 'SellerGoodsClassForm', component: SellerGoodsClassForm, meta: { footer: { show: true } } },
        // 账户日志记录
        { path: 'log_list', name: 'SellerLogList', component: SellerLogList, meta: { footer: { show: true } } },
        // 账户消费记录
        { path: 'cost_list', name: 'SellerCostList', component: SellerCostList, meta: { footer: { show: true } } },
        // 店铺资金
        { path: 'money', name: 'SellerMoney', component: SellerMoney, meta: { footer: { show: true } } },
        // 店铺资金记录
        { path: 'moneylog_list', name: 'SellerMoneyLogList', component: SellerMoneyLogList, meta: { footer: { show: true } } },
        // 店铺资金提现记录
        { path: 'moneywithdraw_list', name: 'SellerMoneyWithdrawList', component: SellerMoneyWithdrawList, meta: { footer: { show: true } } },
        // 店铺保证金
        { path: 'deposit', name: 'SellerDeposit', component: SellerDeposit, meta: { footer: { show: false } } },
        // 店铺保证金记录
        { path: 'deposit_list', name: 'SellerDepositList', component: SellerDepositList, meta: { footer: { show: false } } },
        // 店铺保证金提现记录
        { path: 'depositwithdraw_list', name: 'SellerDepositWithdrawList', component: SellerDepositWithdrawList, meta: { footer: { show: true } } },
        // 店铺售卖区域
        { path: 'transport_list', name: 'SellerTransportList', component: SellerTransportList, meta: { footer: { show: false } } },
        // 店铺售卖区域
        { path: 'transport_form', name: 'SellerTransportForm', component: SellerTransportForm, meta: { footer: { show: true } } },
        // 摄像头
        { path: 'camm', name: 'SellerCamm', component: SellerCamm, meta: { footer: { show: false } } },
        { path: 'jinhuo', name: 'SellerJinhuo', component: SellerJinhuo, meta: { footer: { show: false } } },
        // 线下销售
        { path: 'offlinesales', name: 'SellerOfflineSales', component: SellerOfflineSales, meta: { footer: { show: false } } },
        //  合格证
        { path: 'qualify', name: 'SellerQualify',component: SellerQualify, meta: { footer: { show: false } } },
        //  新建合格证
        { path: 'qnew', name: 'SellerQnew',component: SellerQnew, meta: { footer: { show: false } } },
        //  编辑合格证
        { path: 'qedit', name: 'SellerQedit',component: SellerQedit, meta: { footer: { show: false } } },
        //  发放合格证
        { path: 'qput', name: 'SellerQput',component: SellerQput, meta: { footer: { show: false } } },
        //  商家定位
        { path: 'qtree', name: 'SellerQtree',component: SellerQtree, meta: { footer: { show: false } } },
        //  商家定位
        { path: 'map', name: 'SellerMap',component: SellerMap, meta: { footer: { show: false } } },
        //  报销消费
        { path: 'reimbursement', name: 'SellerReimbursement',component: SellerReimbursement, meta: { footer: { show: false } } },
        //  许可证
        { path: 'license', name: 'Sellerlicense',component: Sellerlicense, meta: { footer: { show: false } } },
		// 促销
		{ path: 'promotion_index', name: 'SellerPromotionIndex',component: SellerPromotionIndex, meta: { footer: { show: false } } },
		// 抢购管理
		{ path: 'promotion_purchase', name: 'SellerPurchase',component: SellerPurchase, meta: { footer: { show: false } } },
    
		// 多买惠管理
		{ path: 'promotion_discount', name: 'SellerDiscount',component: SellerDiscount, meta: { footer: { show: false } } },
		// 编辑多买惠管理
		{ path: 'promotion_discount_edit', name: 'SellerDiscountEdit',component: SellerDiscountEdit, meta: { footer: { show: false } } },
		// 管理多买惠管理
		{ path: 'promotion_discount_tube', name: 'SellerDiscountTube',component: SellerDiscountTube, meta: { footer: { show: false } } },
    
		// 满即送
		{ path: 'promotion_fulldelivery', name: 'SellerFullDelivery',component: SellerFullDelivery, meta: { footer: { show: false } } },
		// 满即送
		{ path: 'promotion_fulldeliveryadd', name: 'SellerFullDeliveryAdd',component: SellerFullDeliveryAdd, meta: { footer: { show: false } } },
		// 满即送
		{ path: 'promotion_fulldeliverydetails', name: 'SellerFullDeliveryDetails',component: SellerFullDeliveryDetails, meta: { footer: { show: false } } },
    
		// 优惠套装
		{ path: 'promotion_suit', name: 'SellerSuit',component: SellerSuit, meta: { footer: { show: false } } },
		// 新增抢购
		{ path: 'purchase_add', name: 'SellerPurchasAdd',component: SellerPurchasAdd, meta: { footer: { show: false } } },
		// 新增优惠套装
		{ path: 'suit_add', name: 'SellerSuitAdd',component: SellerSuitAdd, meta: { footer: { show: false } } },
		//宴席商家订单详情
		{ path: 'banquet_seller_order_detail', name: 'BanquetSellerOrderDetail',component: BanquetSellerOrderDetail, meta: { footer: { show: false } } },
		//宴席商家订单详情
		{ path: 'seller_banquet_setting', name: 'SellerBanquetSetting',component: SellerBanquetSetting, meta: { footer: { show: false } } },
		//宴席商家订单详情
		{ path: 'seller_banquet_list', name: 'SellerBanquetList',component: SellerBanquetList, meta: { footer: { show: false } } },
	  ]
    }

  ]
});




