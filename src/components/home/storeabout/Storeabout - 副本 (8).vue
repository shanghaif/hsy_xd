<template>
<div class="container">

    <div class="header" >
        <div class="content-wrapper" :style="{backgroundImage:'url('+store.mb_title_img+')'}">

<video
  id="myPlayer"
  poster="../../../assets/image/video.png"
  controls
  x5-playsinline="true"
  playsInline
  webkit-playsinline
  muted
>
    <source :src="sxturl" type="application/x-mpegURL" />
</video>
            <div class="content">
                <div class="store_name">  
		<el-dropdown @command="handleCommand">
  			<span class="el-dropdown-link">
    			位置选择<i class="el-icon-arrow-down el-icon--right"></i>
  			</span>
		<el-dropdown-menu slot="dropdown" >
    			<el-dropdown-item v-for="(val,i) in sxt.cams" :command="val.s">{{val.n}}</el-dropdown-item>
  		</el-dropdown-menu>
		</el-dropdown>
	</div>
               
            </div>
            <div class="follow_panel">
                <div class="follow_button" @click="toggleFavorite" >
                    <i class="iconfont" :class="{'active':store.is_favorate}"  v-html="favoriteIco"></i>
                    {{favoriteName}}
                </div>
 	<div class="follow_number">{{store.store_collect}}</div>
            </div>
        </div>
        <div class="store_credit">
                <ul>
                    <li>
                        <span class="text">{{deliverycredit_text}}</span>
                        <span class="credit store_deliverycredit">{{deliverycredit_credit}}分</span>
                    </li>
                    <li>
                        <span class="text">{{desccredit_text}}</span>
                        <span class="credit store_desccredit">{{desccredit_credit}}分</span>
                    </li>
                    <li>
                        <span class="text">{{servicecredit_text}}</span>
                        <span class="credit store_servicecredit">{{servicecredit_credit}}分</span>
                    </li>
                </ul>
        </div>
        <div class="shopping-info-nums">
            <ul>
                <li>
                    <p class="nums">{{store.goods_count}}</p>
                    <p class="text">全部商品</p>
                </li>
                <li>
                    <p class="nums">{{store.seller_name}}</p>
                    <p class="text">店铺掌柜</p>
                </li>
            </ul>
        </div>
        <div class="shopping-about mt-5">
            <div class="qr_code" @click="imageVisible=true">
                <label>店铺二维码</label>
                <i class="iconfont">&#xe6e0;</i>
                <div class="qr_code_box">
                  
                </div>
            </div>
            <div class="phone">
                <a :href="'tel:'+ store.store_phone">
                <label>商家电话</label>
                <i class="iconfont">&#xe6d1;</i>
                </a>
            </div>
        </div>
        <div class="store_info mt-5">
            <div><label>公司名称</label><span>{{store.store_company_name}}</span></div>
            <div><label>公司所在地</label><span>{{store.area_info}}</span></div>
    <mt-cell class="pt-5" title="营业执照" v-if="store.business_licence_number_electronic" > 
 	<div class="user-avatar">
		<img :src="store.business_licence_number_electronic" @click="openImage(store.business_licence_number_electronic)"></div></mt-cell>    

    <mt-cell class="pt-5" title="经营许可证" v-if="store.b_xk1">
 	<div class="user-avatar">
	<img :src="store.b_xk1" @click="openImage(store.b_xk1)"></div>
  </mt-cell>
 <mt-cell class="pt-5" title="生产许可证" v-if="store.b_xk2">
	 <div class="user-avatar">
	<img :src="store.b_xk2" @click="openImage(store.b_xk2)"></div>  </mt-cell>
 <mt-cell class="pt-5" title="小登记证" v-if="store.b_xk2">
	 <div class="user-avatar">
	<img :src="store.b_xk3" @click="openImage(store.b_xk3)"></div></mt-cell>
<mt-cell class="pt-5" title="负责人健康证" v-if="store.b_fzrjkz">

 	<div class="user-avatar">
	<img :src="store.b_fzrjkz" @click="openImage(store.b_fzrjkz)"></div></mt-cell>
<mt-cell class="pt-5" title="安全员健康证" v-if="store.b_aqyjkz">
 	<div class="user-avatar">
	<img :src="store.b_aqyjkz" @click="openImage(store.b_aqyjkz)"></div></mt-cell>
    <div>
      <mt-popup v-model="isshow" popup-transition="popup-fade" class="popup" >
        <img :src="showimage" :style="getBannerStyle" @click="isshow=false">
      </mt-popup>
    </div>
        </div>
    </div>
    
    <common-store-footer :store_id="store.store_id"></common-store-footer>
    <mt-popup v-model="imageVisible" popup-transition="popup-fade" class="middle-popup">
        <h4>{{store.store_name}}</h4>
        <div class="img-new-box"><img :src="qrcodeurl"></div>
        <p>邀请好友扫一扫分享店铺给TA</p>
    </mt-popup>
</div>
</template>

<script>
import $ from 'jquery'
import { mapState,mapActions } from 'vuex'
import { Toast } from 'mint-ui'
import CommonStoreFooter from '../common/CommonStoreFooter'
import { getStoreInfo } from '../../../api/homestoredetail'
import { addFavoriteStore, delFavoriteStore } from '../../../api/memberFavorite'
import HeaderMore from '../../HeaderMore'
export default {
  name: 'Storeabout',
  data () {
    return {
        imageVisible:false,
      store: {
        store_id: this.$route.query.id ? this.$route.query.id : ''
      },
      rec_goods_list: false,
      popupVisible: false, // 弹出更多
      showDot:false,
      deliverycredit_text:"",
      deliverycredit_credit:0,
      desccredit_text:"",
      desccredit_credit:0,
      servicecredit_text:"",
      servicecredit_credit:0,
      showimage:'',
      isshow:false,
      qrcodeurl:"",
      sxturl:'http://hls01open.ys7.com/openlive/7bb229ffdf3548d9a5f9cc3cfc8c332b.m3u8',
	sxt:{},
       player:'',
    }
  },
  components: {
    HeaderMore,
    CommonStoreFooter
  },

  computed: {
    ...mapState({
      config: state => state.config.config,
      token: state => state.member.token,
      isOnline:state => state.member.isOnline,
    }),
    getBannerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = width
      let itemHeight = height
      return {
        maxWidth: itemWidth + 'px',
        maxHeight: itemHeight + 'px'
      }
    },
    favoriteIco () {
      return this.store.is_favorate ? '&#xe64d;' : '&#xe64e;'
    },
    favoriteName () {
      return this.store.is_favorate ? '已收藏' : '收藏'
    }
  },
  created () {
    getStoreInfo(
      this.store.store_id, this.token
    ).then((res) => {
      this.store = res.result.store_info

      this.qrcodeurl = env.SITE_URL + '/home/qrcode?url=' + encodeURIComponent(env.H5_HOST + '/home/storedetail?id=' + this.store.store_id)
      this.rec_goods_list = res.result.rec_goods_list
      this.deliverycredit_text = res.result.store_info.store_credit.store_deliverycredit.text
      this.deliverycredit_credit = res.result.store_info.store_credit.store_deliverycredit.credit
      this.desccredit_text= res.result.store_info.store_credit.store_desccredit.text
      this.desccredit_credit= res.result.store_info.store_credit.store_desccredit.credit
      this.servicecredit_text= res.result.store_info.store_credit.store_servicecredit.text
     this. servicecredit_credit= res.result.store_info.store_credit.store_servicecredit.credit
     var s=this.store.camer
if(s.length>10){
     s=s.replace(/&quot;/g,"\"")
     this.sxt=JSON.parse(s)
     this.player = new EZUIKit.EZUIPlayer('myPlayer')
	this.getaddr()
}
//alert(s)
     if(this.store.is_platform_store){
            this.fetchConfig({}).then(
                response => {
                },
                error => {
                    Toast(error.message)
                }
            )
        }
    }).catch(function (error) {
    })
  },
  methods: {
      ...mapActions({
          fetchConfig: 'fetchConfig'
      }),
    openImage (src) {
      this.showimage = src
      this.isshow = true
    },
      handleCommand(command) {
   //     alert('click on item ' + command);
	//let s="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/"
	//s=s+command+"/1.live&autoplay=1&accessToken="+this.sxt.token
	this.sxturl=command
	this.player.play();
      },
//=====================获取直播地址
getaddr(){
let cams="";
let that=this;
for (let i = 0; i < this.sxt.cams.length; i++) {

	cams=cams+this.sxt.cams[i]['s']+":1,";
}
$.ajax({

	type: "POST",
 
	url: "https://open.ys7.com/api/lapp/live/address/get",

	data: {

		accessToken:this.sxt.token,
		source:cams,
	
},
            
	dataType: "json",
 
	success: function (data) {
 
		console.log(data);
		let addressData = data.data;
 
 		if (data.code != '200' || !addressData) {
 
			console.log("直播链接获取失败");
 
 			return;
 		}

                
		for (let i = 0; i < addressData.length; i++) {
			that.sxt.cams[i]['s'] =addressData[i].hls ;
			//  console.log (addressData[i].hls);
 		}
 
		that.sxturl=addressData[0].hls;
		that.player.play();
 	},
            
	error: function (e) {
  
		console.log(e);
 
 	}
  
});


},
    // 弹出更多
    popupMore () {
      if (!this.popupVisible) {
        this.popupVisible = true
      } else {
        this.popupVisible = false
      }
    },
    toggleFavorite () {
      if (!this.store.is_favorate) {
        addFavoriteStore(this.store.store_id).then(
          response => {
            Toast(response.message)
            this.store.is_favorate = !this.store.is_favorate
          },
          error => {
            Toast(error.message)
          }
        )
      } else {
        delFavoriteStore(this.store.store_id).then(
          response => {
            Toast(response.message)
            this.store.is_favorate = !this.store.is_favorate
          },
          error => {
            Toast(error.message)
          }
        )
      }
    }
  }
}
</script>

<style scoped>
    .header {overflow: hidden;position: relative;background-position: center;background-size: auto 100%;}
    .header .content-wrapper {-ms-flex-align: center;-webkit-box-align: center;align-items: center;display: -webkit-box;display: -ms-flexbox;display: flex;padding:0.0rem 0.0rem;position: relative;background-size: auto 100%;}
    .header .content-wrapper .avatar {-ms-flex: 0 0 3rem;-webkit-box-flex: 0;flex: 0 0 3rem;margin-right:0.4rem;width:3rem;    border: 1px solid #efefef;}
    .header .content-wrapper .avatar img {border-radius:0.1rem;width:3rem;height:3rem;}
    .header .content-wrapper .content {position:absolute;top:1rem;left:1rem;width:8rem;height:3rem;margin-left: .5rem}
    .header .content-wrapper .content .store_name {font-size:.75rem;;margin-bottom:.4rem;}
    .header .content-wrapper .content .follow_number{line-height:0.7rem;font-size:0.7rem;margin-top:0.1rem;color: #999}
    .follow_panel{position:absolute;top:1rem;right:2rem;}
    .follow_panel .follow_button{display:block;background:#e93b3d;border-radius:2.5rem;padding:0 0.4rem;line-height:1.2rem;font-size:0.6rem;color:#fff;}
    .follow_panel .follow_button i{line-height:1.2rem;}
    .store_credit{background: #fff;padding: 0px .5rem 10px;}
    .store_credit ul li{display: inline-block;width: 33%;text-align: center}
    .store_credit ul li .text{font-size: .6rem}
    .store_credit ul li .credit{font-size: .6rem;margin-left: .2rem}
    .store_credit ul li .store_deliverycredit{color: #ec5151}
    .store_credit ul li .store_desccredit{color: #13ab53}
    .store_credit ul li .store_servicecredit{color: #f447c9}
    .shopping-info-nums{background: #fff;border-top: 1px solid #f3f3f3;padding: 10px 0}
    .shopping-info-nums ul li{width: 50%;text-align: center;display: inline-block;}
    .shopping-info-nums ul li .nums{font-size: .8rem;color: #333}
    .shopping-info-nums ul li .text{font-size: .5rem;color: #999}
    .shopping-about{background: #fff;padding-top: 25px;}
    .shopping-about div{border-top: 1px solid #f3f3f3;padding: 0 .5rem;height: 2rem;line-height: 2rem}
    .shopping-about label{width: 15%;color: #999;text-align: center;font-size: .65rem;vertical-align:middle}
    .shopping-about i {float: right;font-size: 1.1rem;color: #999}
    .store_info {background: #fff;}
    .store_info div{border-bottom: 1px solid #f3f3f3;padding: 7px .5rem;}
    .store_info div label{width: 15%;color: #999;text-align: center;font-size: .65rem;vertical-align:middle}
    .store_info div span{width: 68%;margin-left: 2%;font-size: .65rem;vertical-align:middle}
    .header .background {-webkit-filter: blur(0.5rem);filter: blur(0.5rem);height: 100%;left: 0;position: absolute;top: 0;width: 100%;z-index: -1;}
    .middle-popup h4{    font-size: .75rem; text-align: center; padding: .6rem;  border: 1px solid #eee; color: #444;}
    .middle-popup .img-new-box{background: #fff; padding: .75rem; margin: .5rem .65rem;height: auto}
    .middle-popup .img-new-box img{width: 100%}
    .middle-popup p{font-size: .65rem;color: #777; text-align: center; padding: .4rem; border-top: 1px solid #eee;}
  .user-avatar {
    display: block;
    border:1px solid #eee;
    position: relative;
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
      height: 100%
    }
  }
  .user-avatar::before {
    position: absolute;
    font-size: 1.5rem;
    line-height: 5rem;
    left: 50%;
    margin-left: -.75rem;
    color: rgba(0, 0, 0, 0.5)
  }
#myPlayer{width: 100%;height: 200px;}
</style>
