import Vue from'vue'
import Router from'vue-router'
const HomeBase = ()=>import('@/components/home/HomeBase');
// const HomeIndex = ()=>import('@/components/home/index/Index');
const HomeIndex = ()=>import('@/components/home/main/Index');
const HomeMain = ()=>import('@/components/home/index/Index');
const HomeCategorySearch = ()=>import('@/components/home/categorysearch/Index');
const HomeUpGrape = ()=>import('@/components/home/upgrape/Index');
const HomeUpGrapeGood = ()=>import('@/components/home/upgrapeGood/Goodsdetail');
const HomeUpGrapeGoodClass = ()=>import('@/components/home/upgrapegoodsclass/Goodsclass');
const HomeUpGrapeGoodslist = ()=>import('@/components/home/upgrapegoodslist/Goodslist');
const HomeUpgrapeSearch = ()=>import('@/components/home/upgrapesearch/Search');

const HomeFaxian = ()=>import('@/components/home/faxian/Index');
const HomePanoramic = ()=>import('@/components/home/faxian/panoramic');
const HomeMap = ()=>import('@/components/home/map/Map');
const HomeMapdh = ()=>import('@/components/home/mapdh/Mapdh');
const HomeDocument = ()=>import('@/components/home/article/Document');
const HomeArticleclass = ()=>import('@/components/home/article/Articleclass');
const HomeArticlelist = ()=>import('@/components/home/article/Articlelist');
const HomeTopList = ()=>import('@/components/home/toplist/TopList');
const HomeArticledetail = ()=>import('@/components/home/article/Articledetail');
const HomeMemberLogin = ()=>import('@/components/home/memberlogin/Login');
const HomeMemberForget = ()=>import('@/components/home/memberforget/Forget');
const HomeMemberRegister = ()=>import('@/components/home/memberregister/Register');
const HomeMemberBind = ()=>import('@/components/home/memberbind/Bind');
const HomeSellerLogin = ()=>import('@/components/home/sellerlogin/Login');
const HomeGoodsclass = ()=>import('@/components/home/goodsclass/Goodsclass');
const HomeTuanclass = ()=>import('@/components/home/goodsclass/Tuanclass');
const HomeStoreclass = ()=>import('@/components/home/storeclass/Storeclass');
const HomeStoresearch = ()=>import('@/components/home/storesearch/StoreSearch');
// const HomeBrand = ()=>import('@/components/home/brand/Brand');
const HomeBrandIndex = ()=>import('@/components/home/brand/Index');
const HomeBrand = ()=>import('@/components/home/brand/NewBrand');
const HomeBrandSearch = ()=>import('@/components/home/brand/BrandSearch');
const HomeBrandItem = ()=>import('@/components/home/brand/Item');
const HomeBrandStoreList = ()=>import('@/components/home/brand/StoreList');
const HomeBrandIntroduct = ()=>import('@/components/home/brand/child/Introduct');
const HomeBrandSurvey = ()=>import('@/components/home/brand/child/Survey');
const HomeBrandEvaluate = ()=>import('@/components/home/brand/child/Evaluate');
const HomeBrandCore = ()=>import('@/components/home/brand/child/Core');
const HomeBrandDuty = ()=>import('@/components/home/brand/child/Duty');
const HomeBrandImg = ()=>import('@/components/home/brand/child/ShowImg');
const HomeBrandShow = ()=>import('@/components/home/brand/child/ShowCore');
const HomeBrandPano = ()=>import('@/components/home/brand/PanoRamic');

const HomeBrandLive = ()=>import('@/components/home/brand/BrandLive');

const HomeSearch = ()=>import('@/components/home/search/Search');
const HomeCart = ()=>import('@/components/home/cart/Cart');
const HomeStorelist = ()=>import('@/components/home/storelist/Storelist');
const HomeStoredetail = ()=>import('@/components/home/storedetail/Storedetail');
const HomeStoreabout = ()=>import('@/components/home/storeabout/Storeabout');
const HomeStoreVoucher = ()=>import('@/components/home/storedetail/StoreVoucher');
const HomeGoodslist = ()=>import('@/components/home/goodslist/Goodslist');
const HomeStoreGoodslist = ()=>import('@/components/home/storegoodslist/Goodslist');
const HomeStoreGoodsclass = ()=>import('@/components/home/storegoodsclass/Goodsclass');
const HomeStoreFoodslist = ()=>import('@/components/home/storefoodslist/Foodslist');

const HomeStoreGoodslista = ()=>import('@/components/home/storegoodslist/Goodslista');

const HomeLearn = ()=>import('@/components/home/learn/Index');
const HomeTraining = ()=>import('@/components/home/learn/Training');
const HomeTest = ()=>import('@/components/home/learn/Test');
const HomeProve = ()=>import('@/components/home/learn/Prove');

const HomeGoodsdetail = ()=>import('@/components/home/goodsdetail/Goodsdetail');
const HomeMarketcard = ()=>import('@/components/home/marketmanage/Marketcard');
const HomeMarketzodiac = ()=>import('@/components/home/marketmanage/Marketzodiac');
const HomeMarketwheel = ()=>import('@/components/home/marketmanage/Marketwheel');
const HomeMarketegg = ()=>import('@/components/home/marketmanage/Marketegg');
const HomeBargainlist = ()=>import('@/components/home/bargain/Bargainlist');
const HomeBargainshare = ()=>import('@/components/home/bargain/Bargainshare');
const HomeSpecial = ()=>import('@/components/home/special/Index');
//宴席);

const HomebanquetReserve = ()=>import('@/components/home/banquet/banquetReserve');
const HomeBanquetChooseDishes = ()=>import('@/components/home/banquet/banquetChooseDishes');
const HomeorderDetail = ()=>import('@/components/home/banquet/orderDetail');
const HomeSubmitSuccess = ()=>import('@/components/home/banquet/submitSuccess');
const HomeSelectFoods = ()=>import('@/components/home/banquet/selectFoods');
const HomeBanquetGoods = ()=>import('@/components/home/banquetgoods/Goodsdetail');

const HomeGoodsConsult = ()=>import('@/components/home/goodsdetail/GoodsConsult');
const HomePointsgoods = ()=>import('@/components/home/pointsgoods/Index');
const HomePointsgoodsDetail = ()=>import('@/components/home/pointsgoods/Detail');
const HomePintuanList = ()=>import('@/components/home/pintuan/PintuanList');
const HomeBonusDetail = ()=>import('@/components/home/bonus/Detail');
const HomeGroupBuyList = ()=>import('@/components/home/groupbuy/GroupBuyList');
const HomeVrGroupBuyList = ()=>import('@/components/home/vrgroupbuy/GroupBuyList');
const MemberBase = ()=>import('@/components/member/MemberBase');
const MemberIndex = ()=>import('@/components/member/index/Index');
const MemberDesk = ()=>import('@/components/member/desk/Index');
const MemberAddressList = ()=>import('@/components/member/address/AddressList');
const MemberAddressForm = ()=>import('@/components/member/address/AddressForm');
const MemberBankList = ()=>import('@/components/member/bank/BankList');
const MemberBankForm = ()=>import('@/components/member/bank/BankForm');
const MemberConsultList = ()=>import('@/components/member/consult/ConsultList');
const MemberChatInfo = ()=>import('@/components/member/chat/ChatInfo');
const MemberChatList = ()=>import('@/components/member/chat/ChatList');
const MemberFriendList = ()=>import('@/components/member/friend/FriendList');
const MemberRefundList = ()=>import('@/components/member/refund/RefundList');
const MemberRefundForm = ()=>import('@/components/member/refund/RefundForm');
const MemberRefundView = ()=>import('@/components/member/refund/RefundView');
const MemberVrRefundList = ()=>import('@/components/member/vrrefund/VrRefundList');
const MemberVrRefundForm = ()=>import('@/components/member/vrrefund/VrRefundForm');
const MemberVrRefundView = ()=>import('@/components/member/vrrefund/VrRefundView');
const MemberReturnList = ()=>import('@/components/member/return/ReturnList');
const MemberReturnForm = ()=>import('@/components/member/return/ReturnForm');
const MemberReturnView = ()=>import('@/components/member/return/ReturnView');
const MemberReturnSend = ()=>import('@/components/member/return/ReturnSend');
const MemberInvoiceList = ()=>import('@/components/member/invoice/InvoiceList');
const MemberInvoiceForm = ()=>import('@/components/member/invoice/InvoiceForm');
const MemberBuyStep1 = ()=>import('@/components/member/buy/step1');
const MemberVrBuyStep1 = ()=>import('@/components/member/vrbuy/step1');
const MemberPointsCart = ()=>import('@/components/member/pointscart/Cart');
const MemberPointsBuyStep1 = ()=>import('@/components/member/pointsbuy/step1');
const MemberPointsOrderList = ()=>import('@/components/member/pointsorder/OrderList');
const MemberPointsOrderDetail = ()=>import('@/components/member/pointsorder/OrderDetail');
const MemberComplaintList = ()=>import('@/components/member/complaint/ComplaintList');
const MemberComplaintForm = ()=>import('@/components/member/complaint/ComplaintForm');
const MemberReportIndex = ()=>import('@/components/member/report/Index');
const MemberReportList = ()=>import('@/components/member/report/ReportList');
const MemberReportForm = ()=>import('@/components/member/report/ReportForm');
const MemberInformList = ()=>import('@/components/member/inform/InformList');
const MemberInformForm = ()=>import('@/components/member/inform/InformForm');
const MemberBuyPay = ()=>import('@/components/member/buy/pay');
const MemberBuyReceipt = ()=>import('@/components/member/buy/receipt');


const MemberFavorite = ()=>import('@/components/member/favorite/Favorite');
const MemberOrderList = ()=>import('@/components/member/order/OrderList');
const MemberOrderDetail = ()=>import('@/components/member/order/OrderDetail');
const MemberOrderDeliver = ()=>import('@/components/member/order/OrderDeliver');
const MemberOrderEvaluate = ()=>import('@/components/member/order/OrderEvaluate');

const MemberVrOrderList = ()=>import('@/components/member/vrorder/OrderList');
const MemberVrOrderDetail = ()=>import('@/components/member/vrorder/OrderDetail');
const MemberVrOrderEvaluate = ()=>import('@/components/member/vrorder/OrderEvaluate');

const MemberPredepositList = ()=>import('@/components/member/predeposit/PredepositList');
const MemberRechargeCardList = ()=>import('@/components/member/predeposit/RechargeCardList');
const MemberWithdrawList = ()=>import('@/components/member/withdraw/WithdrawList');
const MemberRechargeList = ()=>import('@/components/member/recharge/RechargeList');
const MemberVoucherList = ()=>import('@/components/member/voucher/VoucherList');
const MemberNoticeList = ()=>import('@/components/member/notice/NoticeList');
const MemberSetting = ()=>import('@/components/member/setting/AccountSet');
const MemberProfileSet = ()=>import('@/components/member/profile/ProfileSet');
const MemberPointList = ()=>import('@/components/member/point/PointList');
const MemberPointSignin = ()=>import('@/components/member/point/PointSignin');
const MemberEvaluateList = ()=>import('@/components/member/evaluate/EvaluateList');
const MemberInviterManage = ()=>import('@/components/member/inviter/InviterManage');
const MemberInviterUser = ()=>import('@/components/member/inviter/InviterUser');
const MemberInviterOrder = ()=>import('@/components/member/inviter/InviterOrder');
const MemberInviterStorelist = ()=>import('@/components/member/inviter/InviterStorelist');

const MemberMarketmanagelog = ()=>import('@/components/member/marketmanagelog/Marketmanagelog');
const MemberBonusreceive = ()=>import('@/components/member/bonusreceive/Bonusreceive');
const MemberBargainlist = ()=>import('@/components/member/bargain/Bargainlist');
const MemberArrivalnotice = ()=>import('@/components/member/arrivalnotice/Arrivalnotice');
const MemberAuth = ()=>import('@/components/member/auth/Auth');
const MemberBrowseList = ()=>import('@/components/member/browse/BrowseList');
const SellerJoininNew = ()=>import('@/components/member/sellerjoinin/Index');
const SellerJoinin1 = ()=>import('@/components/member/sellerjoinin/Step1');
const SellerJoinin2 = ()=>import('@/components/member/sellerjoinin/Step2');
const SellerJoininSelf2 = ()=>import('@/components/member/sellerjoinin/StepSelf2');
const SellerJoininSelf3 = ()=>import('@/components/member/sellerjoinin/StepSelf3');
const SellerJoinin3 = ()=>import('@/components/member/sellerjoinin/Step3');
const SellerJoinin4 = ()=>import('@/components/member/sellerjoinin/Step4');
const SellerJoinin5 = ()=>import('@/components/member/sellerjoinin/Step5');


const MemberBanquetList = ()=>import('@/components/member/banquet/OrderList');
const MemberChooseDishes = ()=>import('@/components/member/banquet/ChooseDishes');
const MemberChefOrder = ()=>import('@/components/member/banquet/ChefOrder');
const MemberChefOrderDetail = ()=>import('@/components/member/banquet/orderDetail');
const MemberBanquetPay = ()=>import('@/components/member/banquet/pay');


const SellerBase = ()=>import('@/components/seller/SellerBase');
const SellerChatInfo = ()=>import('@/components/seller/chat/ChatInfo');
const SellerChatList = ()=>import('@/components/seller/chat/ChatList');
const SellerNoticeList = ()=>import('@/components/seller/notice/NoticeList');
const SellerVoucherList = ()=>import('@/components/seller/voucher/VoucherList');
const SellerVoucherForm = ()=>import('@/components/seller/voucher/VoucherForm');
const SellerIndex = ()=>import('@/components/seller/index/Index');
const SellerConsultList = ()=>import('@/components/seller/consult/ConsultList');
const SellerAddressList = ()=>import('@/components/seller/address/AddressList');
const SellerAddressForm = ()=>import('@/components/seller/address/AddressForm');
const SellerGoodsonline = ()=>import('@/components/seller/goods/Goodsonline');
const SellerGoodsForm1 = ()=>import('@/components/seller/goods/GoodsForm1');
const SellerGoodsForm2 = ()=>import('@/components/seller/goods/GoodsForm2');
const SellerGoodsForm3 = ()=>import('@/components/seller/goods/GoodsForm3');
const SellerBarcode = ()=>import('@/components/seller/goods/Barcode');

const SellerFoodsonline = ()=>import('@/components/seller/foods/Foodsonline');
const SellerDesksonline = ()=>import('@/components/seller/foods/desksonline');
const SellerDesksForm2 = ()=>import('@/components/seller/foods/DesksForm2');
const SellerFoodsForm2 = ()=>import('@/components/seller/foods/FoodsForm2');
const SellerFoodsForm3 = ()=>import('@/components/seller/foods/FoodsForm3');

const SellerApplysecurity = ()=>import('@/components/seller/applysecurity/Index');
const SellerEvaluateList = ()=>import('@/components/seller/evaluate/EvaluateList');
const SellerEvaluateReply = ()=>import('@/components/seller/evaluate/EvaluateReply');
const SellerOrderList = ()=>import('@/components/seller/order/OrderList');
const SellerOrderDetail = ()=>import('@/components/seller/order/OrderDetail');
const SellerOrderDeliver = ()=>import('@/components/seller/order/OrderDeliver');
const SellerOrderSend = ()=>import('@/components/seller/order/OrderSend');

const SellerReceipt = ()=>import('@/components/seller/order/receipt');

const SellerVrOrderList = ()=>import('@/components/seller/vrorder/OrderList');
const SellerVrOrderDetail = ()=>import('@/components/seller/vrorder/OrderDetail');

const SellerBillList = ()=>import('@/components/seller/bill/BillList');
const SellerComplaintList = ()=>import('@/components/seller/complaint/ComplaintList');
const SellerComplaintForm = ()=>import('@/components/seller/complaint/ComplaintForm');
const SellerRefundList = ()=>import('@/components/seller/refund/RefundList');
const SellerRefundForm = ()=>import('@/components/seller/refund/RefundForm');
const SellerRefundView = ()=>import('@/components/seller/refund/RefundView');
const SellerRefundDeliver = ()=>import('@/components/seller/refund/RefundDeliver');
const SellerSettingIndex = ()=>import('@/components/seller/setting/Index');
const SellerSettingInfo = ()=>import('@/components/seller/setting/Info');
const SellerStatisticsGeneral = ()=>import('@/components/seller/statisticsgeneral/Index');
const SellerEcharts = ()=>import('@/components/seller/echarts/Index');
// const SellerEchartsCVR = ()=>import('@/components/seller/echarts/ConversionRate');
// const SellerEchartsUser = ()=>import('@/components/seller/echarts/User');
// const SellerEchartsOrder = ()=>import('@/components/seller/echarts/Order');
const SellerInviter = ()=>import('@/components/seller/inviter/Index');
const SellerInviterGoodsList = ()=>import('@/components/seller/inviter/GoodsList');
const SellerInviterGoodsForm = ()=>import('@/components/seller/inviter/GoodsForm');
const SellerInviterOrderList = ()=>import('@/components/seller/inviter/OrderList');
const SellerAccount = ()=>import('@/components/seller/account/Index');
const SellerAccountList = ()=>import('@/components/seller/account/AccountList');
const SellerAccountForm = ()=>import('@/components/seller/account/AccountForm');
const SellerAccountGroupList = ()=>import('@/components/seller/accountgroup/AccountGroupList');
const SellerAccountGroupForm = ()=>import('@/components/seller/accountgroup/AccountGroupForm');
const SellerGoodsClassList = ()=>import('@/components/seller/goodsclass/GoodsClassList');
const SellerGoodsClassForm = ()=>import('@/components/seller/goodsclass/GoodsClassForm');
const SellerLogList = ()=>import('@/components/seller/log/LogList');
const SellerCostList = ()=>import('@/components/seller/cost/CostList');
const SellerMoney = ()=>import('@/components/seller/money/Index');
const SellerMoneyLogList = ()=>import('@/components/seller/money/LogList');
const SellerMoneyWithdrawList = ()=>import('@/components/seller/money/WithdrawList');
const SellerDeposit = ()=>import('@/components/seller/deposit/Index');
const SellerDepositList = ()=>import('@/components/seller/deposit/DepositList');
const SellerDepositWithdrawList = ()=>import('@/components/seller/deposit/WithdrawList');
const SellerTransportList = ()=>import('@/components/seller/transport/transportList');
const SellerTransportForm = ()=>import('@/components/seller/transport/transportForm');
const SellerCamm  = ()=>import('@/components/seller/camm/camm');
const HomeScan  = ()=>import('@/components/home/scan/scan');
const HomeUrl  = ()=>import('@/components/home/scan/url');
const HomeTraceability  = ()=>import('@/components/home/scan/Traceability');

const HomeUrlPay  = ()=>import('@/components/home/scan/urlpay');
const SellerJinhuo  = ()=>import('@/components/seller/jinhuo/jinhuo');
const SellerOfflineSales  = ()=>import('@/components/seller/goodslist/GoodsList');
const SellerQualify  = ()=>import('@/components/seller/qualify/Index');
const SellerQnew  = ()=>import('@/components/seller/qualify/New');
const SellerQedit  = ()=>import('@/components/seller/qualify/Edit');
const SellerQput  = ()=>import('@/components/seller/qualify/Put');
const SellerQsee  = ()=>import('@/components/seller/qualify/See');
const SellerQsee2  = ()=>import('@/components/seller/qualify/See2');
const SellerQsee3  = ()=>import('@/components/seller/qualify/See3');
const SellerQseeNd  = ()=>import('@/components/seller/qualify/Seend');
const SellerQtree  = ()=>import('@/components/seller/qualify/Tree');
const SellerMap  = ()=>import('@/components/seller/map/index');
const SellerReimbursement  = ()=>import('@/components/seller/reimbursement/index');
const Sellerlicense  = ()=>import('@/components/seller/license/license');

const SellerPerfect1 = ()=>import('@/components/seller/perfect/Step1');
const SellerPerfect1Self = ()=>import('@/components/seller/perfect/Step1Self');
const SellerPerfect2 = ()=>import('@/components/seller/perfect/Step2');
const SellerPerfect2Self = ()=>import('@/components/seller/perfect/Step2Self');
const SellerPerfect3 = ()=>import('@/components/seller/perfect/Step3');

const SellerPerfect4 = ()=>import('@/components/seller/perfect/Step4');

//新版本);
const HomeRecipe = ()=>import('@/components/home/recipe/Index');
const TodayMarket = ()=>import('@/components/home/market/Index');
const HomeDiscount = ()=>import('@/components/home/discount/index');
const HomeMenuClass = ()=>import('@/components/home/recipe/MenuClass');
const HomeAddCook = ()=>import('@/components/home/recipe/addCook');
const HomeChefSetting = ()=>import('@/components/home/recipe/ChefSetting');
const HomeMenuDetail = ()=>import('@/components/home/recipe/MenuDetail');
const HomeCreatedMenu = ()=>import('@/components/home/recipe/CreatedMenu');
const HomeCookList = ()=>import('@/components/home/recipe/CookList');
const HomeMenuManage = ()=>import('@/components/home/recipe/menuManage');
const MenuSearchList = ()=>import('@/components/home/recipe/searchMenuList');
const MenuSearch = ()=>import('@/components/menuSearch');
const CookHome = ()=>import('@/components/home/recipe/cookHome');
const FavoriteStoreNew = ()=>import('@/components/member/favorite/FavoriteStoreNew');

//10.10新增促销);
const SellerPromotionIndex = ()=>import('@/components/seller/promotion/index.vue');
const SellerPurchase = ()=>import('@/components/seller/promotion/Purchase.vue');

const SellerDiscount = ()=>import('@/components/seller/promotion/Discount.vue');
const SellerDiscountEdit = ()=>import('@/components/seller/promotion/DiscountEdit.vue');
const SellerDiscountTube = ()=>import('@/components/seller/promotion/DiscountTube.vue');

const SellerFullDelivery = ()=>import('@/components/seller/promotion/FullDelivery.vue');
const SellerFullDeliveryAdd = ()=>import('@/components/seller/promotion/FullDeliveryAdd.vue');
const SellerFullDeliveryDetails = ()=>import('@/components/seller/promotion/FullDeliveryDetails.vue');
const SellerSuit = ()=>import('@/components/seller/promotion/Suit.vue');
const SellerPurchasAdd = ()=>import('@/components/seller/promotion/PurchaseChild.vue');
const SellerSuitAdd = ()=>import('@/components/seller/promotion/SuitAdd.vue');
const BanquetSellerOrderDetail = ()=>import('@/components/seller/banquet/orderDetail.vue');
const SellerBanquetSetting = ()=>import('@/components/seller/banquet/Setting.vue');
const SellerBanquetList = ()=>import('@/components/seller/banquet/orderList.vue');
const HomeSnapUp = ()=>import('@/components/home/snapup/index.vue');

// 市场监管局
const KeepBase = ()=>import('@/components/keep/KeepBase.vue');
const KeepLogin = ()=>import('@/components/keep/login/Login.vue');
const KeepForget = ()=>import('@/components/keep/login/Forget.vue');
const KeepRegister = ()=>import('@/components/keep/register/Register');
const KeepIndex = ()=>import('@/components/keep/main/index.vue');

const KeepStoreclass = ()=>import('@/components/keep/storeclass/Storeclass.vue');
const KeepStoresearch = ()=>import('@/components/keep/storesearch/StoreSearch');
const KeepStoreLive = ()=>import('@/components/keep/storelive/StoreLive');
const KeepJinhuo  = ()=>import('@/components/keep/jinhuo/jinhuo');
const KeepGoodsclass = ()=>import('@/components/keep/goodsclass/Goodsclass.vue');
const KeepSearch = ()=>import('@/components/keep/search/Search');
const KeepReportList = ()=>import('@/components/keep/report/ReportList');
const KeepReportForm = ()=>import('@/components/keep/report/ReportForm');
const KeepTesting = ()=>import('@/components/keep/testing/Testing');
const KeepTestEdit = ()=>import('@/components/keep/testing/TestEdit');

const KeepStoreGoodslist = ()=>import('@/components/keep/storegoodslist/StoreGoodslist');
const KeepGoodslist = ()=>import('@/components/keep/goodslist/Goodslist');
const KeepTraceability  = ()=>import('@/components/keep/scan/Traceability');
const KeepMapdh = ()=>import('@/components/keep/mapdh/Mapdh.vue');
const KeepTransparent = ()=>import('@/components/keep/transparent/transparent.vue');

const KeepMessage = ()=>import('@/components/keep/message/Message.vue');
const KeepMessageForm = ()=>import('@/components/keep/message/MessageForm.vue');

const KeepSafetyList = ()=>import('@/components/keep/safety/SafetyList.vue');
const KeepSafetyForm = ()=>import('@/components/keep/safety/SafetyForm.vue');

const KeepSafetyMsg = ()=>import('@/components/keep/safetymsg/SafetyMsg.vue');
const KeepSafetyMsgForm = ()=>import('@/components/keep/safetymsg/SafetyMsgForm.vue');

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
      path: '/keep/',
	    index:0,
      component: KeepBase,
      children: [
        // 登录页面
        { path: 'login', name: 'KeepLogin', component: KeepLogin, meta: { footer: { show: false } } },
        // 用户注册
        { path: 'register', name: 'KeepRegister', component: KeepRegister, meta: { footer: { show: false } } },
        // 忘记密码
        { path: 'forget', name: 'KeepForget', component: KeepForget, meta: { footer: { show: false } } },
        // 首页
        { path: 'index', name: 'KeepIndex', component: KeepIndex, meta: { footer: { show: true } } },
        // 店铺分类
        { path: 'storeclass', name: 'KeepStoreclass', component: KeepStoreclass, meta: { footer: { show: true }, keepAlive:true } },
        // 店铺 搜索
        { path: 'storesearch', name: 'KeepStoresearch', component: KeepStoresearch, meta: { footer: { show: false }, keepAlive:true } },
        
        // 店铺介绍
        { path: 'storeLive', name: 'KeepStoreLive', component: KeepStoreLive, meta: {index:1, footer: { show: false } } },
        // 进货台账
        { path: 'jinhuo', name: 'KeepJinhuo', component: KeepJinhuo, meta: { footer: { show: false } } },
        // 举报处理列表
        { path: 'reportlist', name: 'KeepReportList', component: KeepReportList, meta: { footer: { show: false } } },
        // 举报处理详情
        { path: 'reportform', name: 'KeepReportForm', component: KeepReportForm, meta: { footer: { show: false } } },
        // 审核 商家
        { path: 'testing', name: 'KeepTesting', component: KeepTesting, meta: { footer: { show: false } } },
        // 编辑 店铺 详情
        { path: 'testedit', name: 'KeepTestEdit', component: KeepTestEdit, meta: { footer: { show: false } } },
        

        // 商品分类
        { path: 'goodsclass', name: 'KeepGoodsclass', component: KeepGoodsclass, meta: { footer: { show: true } } },        
        // 搜索
        { path: 'search', name: 'KeepSearch', component: KeepSearch, meta: { footer: { show: false } } },

        // 商品列表
        { path: 'storegoodslist', name: 'KeepStoreGoodslist', component: KeepStoreGoodslist, meta: { footer: { show: true } } },    

        // 商品列表
        { path: 'goodslist', name: 'KeepGoodslist', component: KeepGoodslist, meta: { footer: { show: true } } },        
        // 商品追溯二维码
        { path: 'traceability', name: 'KeepTraceability', component: KeepTraceability, meta: { footer: { show: false } } },
        // 网格
        { path: 'mapdh', name: 'KeepMapdh', component: KeepMapdh, meta: { footer: { show: true } } },
        // 透明工程
        { path: 'transparent', name: 'KeepTransparent', component: KeepTransparent, meta: { footer: { show: true } } },
        // 信息管理列表
        { path: 'message', name: 'KeepMessage', component: KeepMessage, meta: { footer: { show: false } } },
        // 信息管理详情
        { path: 'messageform', name: 'KeepMessageForm', component: KeepMessageForm, meta: { footer: { show: false } } },

        // 安全员列表
        { path: 'safety', name: 'KeepSafetyList', component: KeepSafetyList, meta: { footer: { show: false } } },
        // 安全员详情
        { path: 'safetyform', name: 'KeepSafetyForm', component: KeepSafetyForm, meta: { footer: { show: false } } },
        // 安全员列表
        { path: 'safetymsg', name: 'KeepSafetyMsg', component: KeepSafetyMsg, meta: { footer: { show: false } } },
        // 安全员详情
        { path: 'safetymsgform', name: 'KeepSafetyMsgForm', component: KeepSafetyMsgForm, meta: { footer: { show: false } } },
      ]
    },
    {
      path: '/home/',
	    index:0,
      component: HomeBase,
      children: [
        // 首页
        { path: 'index', name: 'HomeIndex', component: HomeIndex, meta: { footer: { show: false }, keepAlive:true } },
        // 首页新版
        { path: 'main', name: 'HomeMain', component: HomeMain, meta: { footer: { show: false }, keepAlive:true } },
        // 分类新版
        { path: 'categorysearch', name: 'HomeCategorySearch', component: HomeCategorySearch, meta: { footer: { show: false }, keepAlive:true } },
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
        { path: 'goodsclass', name: 'HomeGoodsclass', component: HomeGoodsclass, meta: { footer: { show: true }, keepAlive:true } },
        // 团分类
        { path: 'tuanclass', name: 'HomeTuanclass', component: HomeTuanclass, meta: { footer: { show: false }, keepAlive:true } },
        // 店铺分类
        { path: 'storeclass', name: 'HomeStoreclass', component: HomeStoreclass, meta: { footer: { show: false }, keepAlive:true } },
        // 店铺 搜索
        { path: 'storesearch', name: 'HomeStoresearch', component: HomeStoresearch, meta: { footer: { show: false }, keepAlive:true } },
        // 新加
        { path: 'store_goodslista', name: 'HomeStoreGoodslista', component: HomeStoreGoodslista, meta: { footer: { show: false } } },
        // 品牌
        { path: 'brandindex', name: 'HomeBrandIndex', component: HomeBrandIndex, meta: { footer: { show: false } } },
        // 品牌
        { path: 'brand', name: 'HomeBrand', component: HomeBrand, meta: { footer: { show: false } } },
        // 品牌搜索
        { path: 'brandsearch', name: 'HomeBrandSearch', component: HomeBrandSearch, meta: { footer: { show: false }, keepAlive:true } },
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
        // 商家举报
        { path: 'report_list', name: 'MemberReportList', component: MemberReportList, meta: { footer: { show: false } } },
        // 商家举报
        { path: 'report_form', name: 'MemberReportForm', component: MemberReportForm, meta: { footer: { show: false } } },
        // 商家举报
        { path: 'report_index', name: 'MemberReportIndex', component: MemberReportIndex, meta: { footer: { show: false } } },
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
        // 卖家 申请供应链  食安品牌 
        { path: 'applysecurity', name: 'SellerApplysecurity', component: SellerApplysecurity, meta: { footer: { show: false } } },
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
        // 完善信息 第三步
        { path: 'Perfect4', name: 'SellerPerfect4', component: SellerPerfect4, meta: { footer: { show: false } } },
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




