<template>
<div class="container checkout_store">
    <div v-for="(store,index) in storeCartList" :key="index">
        <div class="check_store_top">
            <div class="store">
                <img src="@/assets/image/icon2/icon-store-black.png" alt="">
                <span>{{store.store_name}}</span>
            </div>
            <ul class="goods_cont">
                <li class="f_item" v-for="goods in store.goods_list" :key="goods.goods_id"
                    >
                    <div class="good_img" 
                    @click="$router.push({name:'HomeGoodsdetail',query:{goods_id:goods.goods_id}})">
                        <img :src="goods.goods_image_url"/>
                    </div>
                    <div class="detials">
                        <div>
                            <i class="promotion-icon" v-if="goods.xianshi_info">{{goods.xianshi_info.xianshi_title}}</i>
                            <i class="promotion-icon" v-if="goods.ifgroupbuy">抢购</i>
                            <i class="promotion-icon" v-if="goods.ifmgdiscount">会员折扣</i>
                            <i class="promotion-icon" v-if="goods.ifpintuan">拼团</i>
                            <i class="promotion-icon" v-if="goods.ifbargain">砍价</i>
                            <i class="promotion-icon" v-if="goods.bl_id">优惠套装</i>
                            {{goods.goods_name}}
                        </div>                    

                        <div class="info-price">
                            <p v-bind:class="{ 'disabled-list': goods.goods_storage == 0 }">
                                <span>￥</span>
                                {{ goods.goods_price}}
                            </p>
                            <div class="ui-number">
                                <span v-show="!cart_id"> × {{goods.goods_num}} </span>
                                <span v-show="cart_id"> × {{goods.goods_num}} </span>
                                <!-- <div v-show="cart_id"
                                    @click.stop="fun_changeNum(-1,goods)"
                                    class="reduce ui-common"
                                    v-bind:class="{ 'reduce-opacity': cart_num <= 1 }"
                                >
                                    -
                                </div>
                                <input v-show="cart_id" 
                                    type="number" min="1" class="number" value="1" 
                                    v-model="cart_num"
                                    @blur.prevent="changeCount"
                                    />
                                <div v-show="cart_id" class="add ui-common"                                    
                                    @click.stop="fun_changeNum(1,goods)"
                                    >+</div> -->
                            </div>
                        </div>

                    </div>
                </li>
                
                <!-- <li class="f_item"  v-if="store.store_mansong_rule_list" @click="$router.push({name:'HomeGoodsdetail',query:{goods_id:store.store_mansong_rule_list.goods_id}})"> -->
                    
                <li class="f_item"  v-if="store.store_mansong_rule_list.goods_id" @click="$router.push({name:'HomeGoodsdetail',query:{goods_id:store.store_mansong_rule_list.goods_id}})">
                    <div class="good_img">
                        <img :src="store.store_mansong_rule_list.goods_image_url"/>
                    </div>
                    <div class="detials">
                        <dl>
                            <dt class="goods-name">
                                <a>
                                    <i class="promotion-icon">赠品</i>
                                    {{store.store_mansong_rule_list.mansong_goods_name}}
                                </a>
                            </dt>
                            <dd class="goods-subtotal">
                                <span class="goods-price">0.00</span>
                                <span class="goods-count">×1</span>
                            </dd>
                            </dl>
                        </div>

                </li>
            </ul>
            <ul class="cart-item" v-if="1==2">
                <li class="buy-item"
                    v-for="goods in store.goods_list"
                    :key="goods.goods_id"
                    @click="$router.push({name:'HomeGoodsdetail',query:{goods_id:goods.goods_id}})"
                    >
                    <div class="goods-pic">
                        <img :src="goods.goods_image_url"/>
                    </div>
                    <div class="goods-info">
                        <dl>
                            <dt class="goods-name">
                                <a>
                                    <i class="promotion-icon" v-if="goods.xianshi_info">{{goods.xianshi_info.xianshi_title}}</i>
                                    <i class="promotion-icon" v-if="goods.ifgroupbuy">抢购</i>
                                    <i class="promotion-icon" v-if="goods.ifmgdiscount">会员折扣</i>
                                    <i class="promotion-icon" v-if="goods.ifpintuan">拼团</i>
                                    <i class="promotion-icon" v-if="goods.ifbargain">砍价</i>
                                    <i class="promotion-icon" v-if="goods.bl_id">优惠套装</i>
                                    {{goods.goods_name}}
                                </a>
                            </dt>
                            <dd class="goods-subtotal">
                                <span class="goods-price">{{goods.goods_price}}</span>
                                <span class="goods-count">×{{goods.goods_num}}</span>
                            </dd>
                        </dl>
                    </div>

                </li>
                <li class="buy-item"  v-if="store.store_mansong_rule_list" @click="$router.push({name:'HomeGoodsdetail',query:{goods_id:store.store_mansong_rule_list.goods_id}})">
                    <div class="goods-pic"><img :src="store.store_mansong_rule_list.goods_image_url"/></div>
                        <div class="goods-info">
                            <dl>
                                <dt class="goods-name">
                                    <a>
                                        <i class="promotion-icon">赠品</i>
                                        {{store.store_mansong_rule_list.mansong_goods_name}}
                                    </a>
                                </dt>
                                <dd class="goods-subtotal">
                                    <span class="goods-price">0.00</span>
                                    <span class="goods-count">×1</span>
                                </dd>
                            </dl>
                        </div>

                </li>
            </ul>

            <div class="cart-subtotal">
                <div v-if="addressApi.allow_offpay==1 && ifshowOffpay" @click="togglePay=true"><mt-cell class="menu-item" title="付款方式" ><span slot="icon" class="left-icon iconfont">&#xe6f2;</span>{{pay_name}}<i class="indicator iconfont">&#xe650;</i></mt-cell></div>
                <!-- <div v-if="store.store_voucher_list.length" @click="toggleVoucher(store.store_id)"><mt-cell class="menu-item" title="代金券" ><span slot="icon" class="left-icon iconfont">&#xe6f2;</span>{{myVoucher[store.store_id]}}<i class="indicator iconfont">&#xe650;</i></mt-cell></div> -->
                <div class="message">
                    <mt-field label="留言" placeholder="给商家留言" type="textarea" v-model="message[store.store_id]" @change="changeMessage(store.store_id)"></mt-field>
                </div>
            </div>
        </div>

        <div class="check_store_bottom">
            <ul>
                <li>
                    <span>商品金额</span>
                    <span v-if="!totalPice">￥{{store.store_goods_total}}</span>
                    <span v-if="totalPice">￥{{totalPice}}</span>
                </li>
                <li v-if="store.store_mansong_rule_list">
                    <span>优惠</span>
                    <span>￥{{store.store_mansong_rule_list.discount}}</span>
                </li>
                <li>
                    <span>运费</span>
                    <span>￥{{addressApi.content[store.store_id]}}</span>
                </li>
                <!-- <li>
                    <span>本店合计</span>
                    <span>￥{{totalAmount[store.store_id]}}</span>
                </li> -->
            </ul>   
            <!-- <checkout-desc class="desc-item mt-5" title="商品金额" :subtitle="store.store_goods_total"></checkout-desc>
            <checkout-desc class="desc-item" title="优惠" v-if="store.store_mansong_rule_list" :subtitle="store.store_mansong_rule_list.discount" :discount="true"></checkout-desc>
            <checkout-desc class="desc-item" title="运费" :subtitle="addressApi.content[store.store_id]"></checkout-desc>
            <checkout-desc class="desc-item" title="本店合计" :subtitle="totalAmount[store.store_id]"></checkout-desc> -->
        </div>

        <mt-popup v-model="togglePay" position="right" class="common-popup-wrapper">
            <!-- <div class="common-header-wrap">
                <mt-header title="付款方式" class="common-header">
                    <mt-button slot="left" icon="back" @click="togglePay=false"></mt-button>
                </mt-header>
            </div> -->
            <head-title title="付款方式"></head-title>
            <div class="common-popup-content my_end">
                <mt-radio
                        v-model="pay_code"
                        :options="pay_options">
                </mt-radio>
            </div>
        </mt-popup>
        <mt-popup v-model="voucherVisible[store.store_id]" position="right" class="common-popup-wrapper">
            <div class="common-header-wrap">
                <mt-header title="代金券" class="common-header">
                    <mt-button slot="left" icon="back" @click="toggleVoucher(store.store_id)"></mt-button>
                    <mt-button slot="right" @click="selectVoucher('',store.store_id)">不使用</mt-button>
                </mt-header>
            </div>
            <div class="common-popup-content">
                <div class="common-voucher common-voucher02" :class="(item.voucher_state != 1)?'disable':''" v-for="(item,index) in store.store_voucher_list" :key="item.voucher_id" @click="selectVoucher(item,store.store_id)">
                    <div class="par"><p>订单满{{item.voucher_limit}}元</p><sub class="sign">￥</sub><span>{{item.voucher_price}}</span></div>
                    <div class="copy">有效期至<p><br>{{$moment.unix(item.voucher_enddate).format('YYYY.MM.DD')}}</p></div>
                    <i></i>
                </div>
            </div>
        </mt-popup>
    </div>
</div>
</template>

<script>
import HeadTitle from '../../../HeadTitle';
import CheckoutDesc from './CheckoutDesc'
import { Toast } from 'mint-ui'
export default {
  name: 'CheckoutStore',
  data () {
    return {
      pay_name: '在线付款',
      pay_code: 'online',
      pay_options: [{
        label: '在线付款',
        value: 'online'
      }, {
        label: '货到付款',
        value: 'offline'
      }],
      pay_list: { online: '在线付款', offline: '货到付款' },
      togglePay: false,
      totalAmount: {},
      myVoucher: [],
      voucherVisible: [],
      message: [],

      onelyGood:null, 
      cart_id:null,   // cart_id  id
      cart_num:null,  // cart_num 数量
      totalPice:null,  // 金额

    }
  },
  components: {
    CheckoutDesc,
    HeadTitle
  },
  props: ['storeCartList', 'addressApi','finalTotalList', 'ifshowOffpay', 'inputChange','oldcart_id'],
  created: function () {
    var price = 0;
    for (var store_id in this.storeCartList) {
      price += this.calcOrder(store_id)
      if( this.inputChange ){
        this.onelyGood = this.storeCartList[store_id].goods_list[0];
      }
    }
    price = price.toFixed(2);

    this.$emit('toStep1',price);

    if( this.inputChange ){
        this.cart_id = this.oldcart_id.split('|')[0];
        this.cart_num = parseInt( this.oldcart_id.split('|')[1] );
        // console.log(this.cart_id,this.cart_num);
    }
  },
  watch: {
    pay_code: function (pay_code) {
      this.pay_name = this.pay_list[pay_code]
      this.togglePay = false
      this.$emit('selectPay', pay_code)
    },
    
    cart_num: function (cart_num) { 
        // if( this.cart_num < 1 ){
        //     this.cart_num = 1;
        // }       
        // if( this.cart_num > this.onelyGood.goods_storage ){
        //     this.cart_num = this.onelyGood.goods_storage;
        // }
        
        // var end = this.cart_id+'|'+this.cart_num;
        // this.totalPice =  this.utils.currencyPrice(this.onelyGood.goods_price * this.cart_num);
        
        // this.$forceUpdate();
        // this.$emit('toStep1',this.totalPice);
        // this.$emit('tocheckoutStore',end);
    },
  },
  methods: {
      fun_left(){
          this.togglePay = false;
      },
    changeCount(){
        if( !this.cart_num ){
            this.cart_num = 1;
        }
        if( this.cart_num < 1 ){
            this.cart_num = 1;
        }
        if( this.cart_num > this.onelyGood.goods_storage ){
            this.cart_num = this.onelyGood.goods_storage;
        }
        
        var end = this.cart_id+'|'+this.cart_num;
        this.totalPice =  this.utils.currencyPrice(this.onelyGood.goods_price * this.cart_num);
        
        this.$forceUpdate();
        this.$emit('toStep1',this.totalPice);
        this.$emit('tocheckoutStore',end);
    },
    // 增加 数量
    fun_changeNum(n,old){
        if( n >0 ){
            if( this.cart_num >= old.goods_storage ){
                Toast("商品库存不足");
            }else{
                this.cart_num += 1;
            }
        }else{
            if( this.cart_num <= 1){
                Toast("商品不能再少了");
            }else{
                this.cart_num -= 1;
            }
        }
        var end = this.cart_id+'|'+this.cart_num;
        this.totalPice =  this.utils.currencyPrice(old.goods_price * this.cart_num);
        
        this.$forceUpdate();
        this.$emit('toStep1',this.totalPice);
        this.$emit('tocheckoutStore',end);
    },

    changeMessage (store_id) {
      this.$emit('changeMessage', this.message[store_id], store_id)
    },
    selectVoucher (voucherInfo,store_id) {
      this.toggleVoucher(store_id)
      this.$emit('selectVoucher', voucherInfo,store_id)
      this.storeCartList[store_id].store_voucher_info = voucherInfo
      this.calcOrder(store_id)
    },
    calcOrder (store_id) {
      let price = parseFloat(this.finalTotalList[store_id])
      if (this.storeCartList[store_id].store_voucher_list.length) {
        if(this.storeCartList[store_id].store_voucher_info){
          price -= parseFloat(this.storeCartList[store_id].store_voucher_info.voucher_price)
          if (typeof (this.myVoucher[store_id]) === 'undefined') {
            this.myVoucher[store_id] = ''
          }
          this.myVoucher.splice(store_id, 1, this.storeCartList[store_id].store_voucher_info.voucher_price + '元')
        }else{
          this.myVoucher.splice(store_id, 1, '不使用')
        }
      }
      if (price < 0) {
        price = 0
      }
      this.totalAmount[store_id] = price;
      return price
    },
    toggleVoucher (store_id) {
      if (typeof (this.voucherVisible[store_id]) === 'undefined') {
        this.voucherVisible[store_id] = false
      }
      this.voucherVisible.splice(store_id, 1, !this.voucherVisible[store_id])
    }
  }
}
</script>

<style scoped lang="scss">
.checkout_store{
    padding-bottom: 5rem;
    .check_store_top{
        padding: 1.2rem 1rem;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px 13px rgba(242, 242, 242, 0.54);
        border-radius: 8px;
        

        .store{
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            img{
                width: 1.2rem;
                margin-right: .6rem;
            }
        }

        .goods_cont{
            margin: 1rem 0;
            .f_item{
                display: flex;
                margin: 1rem 0;    
                .good_img{
                    border-radius: 8px;
                    width: 6rem;
                    overflow: hidden;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }

                .detials{
                    flex-grow: 1;
                    margin-left: 3%;
                    display: flex;
                    flex-direction: column;
                    font-size: 1.2rem;
                    /* align-items: center; */
                    justify-content: space-between;
                    
                div.info-price {
                    display: flex;
                    justify-content: space-between;
                    align-content: flex-end;
                    align-items: flex-end;
                    p {
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: #E53216;
                        padding: 0;
                        margin: 0;
                        display: inline-block;
                        &.disabled-list {
                            color: #a4aab3;
                        }
                        span {
                            font-size: 1.33rem;
                            font-weight: 400;
                            color: #E53216;
                        }
                    }
                    div.ui-number {
                        // height: 1.2rem;
                        display: flex;
                        align-items: center;
                        // border-radius: 0.15rem 0 0 0.15rem;
                        input,
                        div {
                            // height: 1.2rem;
                            text-align: center;
                            color: #404245;
                            display: inline-block;
                            padding: 0;
                            margin: 0;
                            border: 0;
                            outline-offset: 0;
                            font-size: 1rem;
                            padding: 0 0.95rem;
                        }
                        .ui-common {
                            // line-height: 1.2rem;
                            // width: 1.3rem;
                            // height: 1.2rem;
                            // border: 1px solid #c7c7cd;
                            cursor: pointer;
                        }
                        .reduce {
                            border-right: 0;
                        }
                        .reduce-opacity {
                            opacity: 0.4;
                        }
                        .add {
                            border-left: 0;
                        }
                        input[type='number'] {
                            width: 1.3rem;
                            // border: 1px solid #c7c7cd;
                            border-image-width: 0;
                            box-shadow: 0;
                            padding: 0;
                            // vertical-align: bottom;
                            width: 3.81rem;
                            height: 1.9rem;
                            background: #F3F3F3;
                            border-radius: 0.19rem;
                            // margin: 0 0.95rem;
                            &:focus {
                                outline: none;
                            }
                        }
                    }
                }
                }
            }
        }

        .cart-subtotal{
            &/deep/.mint-cell-wrapper{
                padding: 0;
                .mint-cell-title{
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    font-size: 1.2rem;
                    .left-icon{
                        margin-right: .5rem;
                    }
                }
                .mint-cell-value{
                    font-size: 1.2rem;
                }
            }
            .message{
                &/deep/.mint-cell{
                    &:after{
                        display: none;
                    }
                    &:last-child{
                        background-image: none;
                    }
                }
                &/deep/.mint-cell-wrapper {
                    align-items: end;
                    margin: 0;
                    padding: 0;
                    font-size:1.2rem;

                    .mint-cell-value{
                        padding: 0;
                    }
                    .mint-cell-title{
                        width: auto
                    }
                    
                    textarea{
                        resize: none;
                        margin: 0;
                        padding: 0;
                        padding-left: 1rem;
                        color: #6F6F6F;
                        text-align: right;
                        padding-top: .8rem
                    }
                }
            }
        }

    }
    .check_store_bottom{
        padding: 1.2rem 1rem;
        background: #FFFFFF;
        box-shadow: 0px 0px 20px 13px rgba(242, 242, 242, 0.54);
        border-radius: 8px;

        margin: 1.2rem 0;
        
        li{
            display: flex;
            justify-content: space-between;
            margin: .5rem 0;
            span{
                color: #161616;
                font-size: 1.4rem;
                &:last-child{
                    font-size: 1.5rem;
                }
            }
        }
    }
    .my_end{
        padding: 0 1.1rem;
        top: 3.74rem;
        &/deep/ .mint-cell-wrapper{
            font-size: 1.6rem;            
        }
        &/deep/.mint-cell{
            margin: 1rem 0;
        }
    }

}
    .cart-item{background-color: #FFF;
        border-bottom: solid 0.05rem #EEE;}
    .buy-item{    display: block;
        position: relative;
        z-index: 1;
        margin-left: 0.5rem;
        padding: 0.5rem 0;}
    .buy-item .goods-pic{display: block;
        width: 2.7rem;
        height: 2.7rem;
        padding: 0.2rem;
        position: absolute;
        z-index: 1;
        top: 0.5rem;
        left: 1.1rem;
        border: solid 0.05rem #EEE;
        border-radius: 0.2rem;}
.buy-item .goods-pic img{width: 2.7rem;
    height: 2.7rem;}
.buy-item .goods-info{    display: block;
        vertical-align: top;
        height: 3.1rem;
        margin: 0 2rem 0 4.5rem;
        position: relative;
        z-index: 1;}
.buy-item .goods-info .goods-name a {
    display: block;
    height: 2rem;
    font-size: 0.6rem;
    color: #111;
    line-height: 1rem;
    overflow: hidden;
}
.buy-item .goods-info  .goods-type {
    overflow: hidden;
    white-space: nowrap;
    width: 70%;
    height: 0.9rem;
    font-size: 0.45rem;
    line-height: 0.9rem;
    color: #999;
    text-overflow: ellipsis;
}
.buy-item .goods-info  .goods-subtotal {
    display: block;
    height: 1rem;
    margin: 0 0.5rem 0 4.5rem;
    line-height: 1rem;
    font-size: 0.6rem;
    position: relative;
    z-index: 1;
}
.buy-item .goods-info  .goods-subtotal .goods-price {
    color: #DB4453;
    font-size: 0.55rem;
    font-weight: 600;
}
.buy-item .goods-info  .goods-subtotal  .goods-count {
    font-size: 0.5rem;
    line-height: 1rem;
    position: absolute;
    z-index: 1;
    top: 0rem;
    right: 1rem;
}
 .cart-subtotal{}
.cart-subtotal dl {
    position: relative;
    z-index: 1;
    height: 1rem;
    padding: 0.4rem 0 0;
    font-size: 0;
}
.cart-subtotal dt {
    position: absolute;
    z-index: 1;
    top: 0.4rem;
    left: 0.4rem;
    display: block;
    width: 50%;
    height: 1rem;
    font-size: 0.6rem;
    line-height: 1rem;
}
.cart-subtotal dd {
    height: 1rem;
    margin: 0 0.5rem 0 50%;
    text-align: right;
    font-size: 0.6rem;
    line-height: 1rem;
}
.cart-subtotal .message {
    position: relative;
    z-index: 1;
    display: block;
    padding-top: 0.4rem;
}
.desc-item {
    height: 1.5rem;
}
.common-voucher{margin:0.5rem auto}
    .promotion-icon{
        max-width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;line-height: .7rem;border: 1px solid $primaryColor;border-radius: .1rem;padding:.5rem .2rem;font-size: .6rem;color: $primaryColor}
</style>
