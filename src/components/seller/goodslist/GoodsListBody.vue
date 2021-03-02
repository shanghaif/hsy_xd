<template>
  <div class="good_main">
      
      <div class="top">
        <div @click="classVisible=true">
          <mt-cell
            class="menu-item"
            title="商品分类"
            :value="gc_name"
            is-link>
          </mt-cell>          
        </div>

        <mt-field label="买家ID" placeholder="请输入买家ID" type="number" v-model="buy_store_id"></mt-field>
      </div>

      <!-- 商品 -->
        
      <empty-record v-show="goodsList.length <= 0 "></empty-record>
      <div class="product" v-show="goodsList.length > 0 ">
        <div class="p_item"
              v-for='(item, index) in goodsList'
              v-bind:key='index'>
          <div class="list">
            <div class="list_1">
              <img class="product-img" v-lazy="item.goods_image_url">
              <div class="product-title">    
                <h3 class="t_name">{{ item.goods_name }}</h3>
                <h3 class="t_name">库存&nbsp;{{ item.goods_storage }}</h3>
              </div>
            </div>
            <div class="flex-right">
              <mt-field class="mt_field" placeholder="请输入商品价格" label="价格"  type="number" v-model="item.price"></mt-field>
              <mt-field class="mt_field" placeholder="请输入商品数量" label="数量" type="number" v-model="item.number"></mt-field>                      
            </div>
          </div>
        </div>
        <div style="background: #F4F5F7" v-if="goodsList.length > 0">
          <p class="common-no-more" v-if='isMore'>没有更多了</p>
        </div>
      </div>

      
    <!-- 提交按钮 -->
    <mt-button
      @click="submit"
      class="btn_new"
      size="large"
      >提交
    </mt-button>  
      
      <!--服务分类-->
      <mt-popup v-model="classVisible" position="bottom">
        <mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
          <div class="toolbar">
            <button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
            <div class="picker-header">选择分类</div>
            <button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
          </div>
        </mt-picker>
      </mt-popup>

  </div>
</template>

<script>
import EmptyRecord from '../../EmptyRecord'
import { mapState, mapActions } from 'vuex'
import { MessageBox,Toast } from 'mint-ui';
import { getStoreGoodsListAll } from '../../../api/homestoredetail'//获取数据接口
import { buyOrderAdd } from '../../../api/sellerGoodsClass';//线下销售接口

import { resetRem, resumeRem } from '@/util/rem';
export default {
  components: {
    EmptyRecord
  },
  data () {
    return {
      buy_store_id:"",//买家ID
      goodsList: [], // 商品列表
      isMore:true,
      classVisible: false,
      gc_name:'大白菜',    //分类i名称
      gc_id:1000,   //分类id
    }
  },
  computed:{    
    ...mapState({  
      store_id: state => state.seller.info.store_id,
      items: state => state.goodsclass.items
    }),    
    buildItems: function () {
      // if (!this.items || !this.store_bind_class || !this.items[0]) {
      //   return []
      // }
      let items = new Array()
      if( this.items.length>0 ){
      // if (this.store_bind_class.bind_all) {
        this.getDefaultItems(this.items, items)
      }else{
        var time = setTimeout(res=>{
          this.getDefaultItems(this.items, items)
          clearTimeout(time);
          time = null;
        },500)
      }
      // } else {
      //   this.getDefaultItems(this.store_bind_class.goods_class, items)
      // }
      // console.log(items);
      return items
    }
  },
  created () {
    this.fetchGoodsclassList();
    this.loading();
  },
  mounted(){
    resetRem();
  },

	beforeDestroy() {
		resumeRem();
  },
  methods: {    
    ...mapActions({
      fetchGoodsclassList: 'fetchGoodsclassList'
    }),
    getDefaultItems (_item, defaultItems) {
      defaultItems.push({
        flex: 1,
        values: _item,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: _item[0].children,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: (_item[0].children && _item[0].children.length) ? _item[0].children[0].children : [],
        textAlign: 'center'

      })
    },
    cancelClass () {
      this.classVisible = false
    },
    confirmClass () {
      let values = this.$refs.class_picker.getValues()
      var temp = values[2]
      if (!temp) {
        temp = values[1]
      }
      if (!temp) {
        temp = values[0]
      }
      this.gc_name = temp.value
      this.gc_id = temp.id

      this.classVisible = false;

      this.loading();
    },
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
      picker.setSlotValues(3, values[2] ? values[2].children : [])
    },

    // 提交
    submit(){
      var list = [];
      if( !this.buy_store_id || this.buy_store_id<0 ){//如果没有买家ID或者买家ID有误
        Toast("买家ID有误，请重新输入！");
        return false;
      }
      if( this.buy_store_id == this.store_id ){//如果买家ID==卖家ID
        Toast("不得购买自己的商品");
        return false;
      }
      for(var item of this.goodsList){//查询选中的商品
        if(item.number<0 || item.price<0 ){//如果商品价格和数量小于0
          Toast(" 请检查商品价格和数量！");
          return false;
        }
        if( item.number > item.goods_storage ){//如果商品数量 > 库存
          Toast(item.goods_name+"的库存不足，请重新输入购买数量");
          return false;
        }
        if( item.number>0 && item.price>0 ){//如果商品数量价格符合 追加数据
          list.push(
            {
              'goods_id':item.goods_id,
              'price':item.price,
              'number':item.number,
              "goods_image":item.goods_image,
              "goods_name":item.goods_name,
              "gc_id_3":item.gc_id_3
            }
          );
        }
      }
      if( list.length == 0 ){//如果要提交的数据为空
        Toast(" 请先输入商品价格和商品数量");
        return false;
      }
      // 提交订单
      // MessageBox.confirm('确认提交订单?').then(action => {
			MessageBox.prompt('请输入验货人姓名').then(({ value, action }) => {
				if( value ){
          buyOrderAdd(value,this.store_id,this.buy_store_id,list).then(res=>{
            Toast( '操作成功' );            
            this.loading();
          }).catch(err=>{
            // console.log(err);   
            Toast(err.result)
          })
        }
      }).catch(err=>{
        // console.log('no');
      })

    },
    // 加载商品函数
    loading(){
      getStoreGoodsListAll(this.store_id,this.gc_id).then(res=>{
        var list = [];
        for(  var i = 0;i< res.result.length;i++ ){
          var item = res.result[i];
          this.sell_store_id = item.store_id;
          list.push( 
            {
              'goods_id':item.goods_id,
              "goods_name":item.goods_name,
              "goods_image_url":item.goods_image_url,
              "price":parseFloat(item.goods_p_price*item.goods_price).toFixed(2),
              "goods_storage":item.goods_storage,
              "number":null,
              "goods_image":item.goods_image,
              "goods_name":item.goods_name,
              "gc_id_3":item.gc_id_3
            }
          );
        }
        this.goodsList = list;
      }).catch(err=>{

      })
    },
    goDetail (goods_id) {
      this.$router.push({ 'name': 'HomeGoodsdetail', 'query': { 'goods_id': goods_id } })
    }
  }
}
</script>

<style scoped lang="scss">
  .good_main{
    $mpwidth: 1rem;
    color: #161616;
    width: 100%;
    box-sizing: border-box;
    font-size: 1.18rem;
    &/deep/.mint-cell-wrapper{
      font-size: 1.18rem;
    }
    &/deep/.mint-cell:last-child{
      background-image: none;
      .mint-cell-text{
        font-size: 1.18rem;
      }
    }
    &/deep/.mint-field-core{
      padding-top: .26rem;
    }

    .top{
      padding: 0 $mpwidth;
      padding: 0 0 2rem 1rem;
    }
    .h70{
      min-height: 70vh;
    }
    .product{
      background: #F4F5F7;
      padding-top: 1rem;
      margin-bottom: 60px;
      .p_item {
        // border-bottom: 1px solid rgba(232,234,237,1);
        margin-bottom: $mpwidth;
        padding: 0.5rem 1rem;
        background: #fff;
        .list {
          margin:0.55rem 0.5rem;
          position: relative;
          .list_1 {
            padding: 0.7rem 0;
            padding-bottom: 1rem;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            .product-img{
              width: 7.5rem;
              flex-basis: 7.5rem;
              flex-shrink: 0;
              border-radius: 8px;
            }

            .product-title{
              margin-left: 1rem;
              .t_name{
                &:last-child{
                  color:#E7371C;
                  margin-top: 1.18rem;
                  font-size: 1.1rem;
                }
              }
            }

            span {
                position: absolute;
                height:1rem;
                background:rgba(243,244,245,1);
                line-height: 1rem;
                text-align: center;
                font-size:1.18rem;
                color:#e93b3d;
                width: 5.5rem;
                bottom: 0;
                left: 0;
            }
          }
          .flex-right {
              // padding-left: 0.7rem;
              width: 100%;
              position:relative;

              &/deep/.mint-cell{
                min-height:42px;

              }

              &/deep/.mint-cell-wrapper{
                padding-left: 0;
              }

              &/deep/.mint-cell:after {
                content: "";
                display: none;
              }
              &/deep/.mint-cell::before {
                content: "";
                position: absolute;
                z-index: 1;
                pointer-events: none;
                background-color: #EFEFEF;
                height: 1px;
                left: 0;
                right: 0;
                top: 0;
              }

              .mt_field{
                width:80%;
                &/deep/ .mint-cell-title{
                  width:5rem;
                }
              }
              .title {
                  color: #333;
                  font-size: 0.9rem;
                  font-weight: normal;
                  display:-moz-box;
                  display:-webkit-box;
                  -webkit-line-clamp: 2;
                  -moz-line-clamp: 2;
                  -moz-box-orient:vertical;
                  -webkit-box-orient:vertical;
                  box-orient:vertical;
                  overflow: hidden;
                  margin-bottom:0.4rem;
                  &.clear-bottom {
                      margin-bottom: 0;
                  }
              }
              .product-header {
                  margin-bottom: .8rem;
                  display: flex;
                  align-items: center;
              }
              .margin_l_5{
                font-size: .7rem;
                color: #e93b3d;
              }
              .p-price {
                color: #999;
                margin: 0.5rem 0;
                font-size: .7rem;
              }
              .p-info {
                  margin-bottom:0.4rem;
                  .platform_store{font-size: .8rem;color: #e93b3d;border: 1px solid #e93b3d;border-radius: 0.15rem;padding:0 .2rem;}
                  .goods_salenum{font-size:.8rem;margin-left:2rem;color:#999;}
              }
              .add-cart{
                  background: #e93b3d;border-radius: 50%;text-align:center;position: absolute;
                  right: .6rem;
                  top: .5rem;
                  width: 1.8rem;
                  height: 1.8rem;
                  line-height: 1.8rem;
                  i{font-size:1rem;color:#fff;}
              }
          }
        }
      }
    }

    
    .btn_new{
      // background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
      box-shadow: 0px 0px 20px 0px rgba(251, 104, 84, 0.5);
      background: linear-gradient(89deg, #FC6952 0%, #E53216 99%);
      border-radius:40px;
      color: #fff;
      margin: 1rem 0;
      width: 92%;
      margin: 0 auto;    
      margin: 1rem auto;
      position: fixed;
      z-index: 10;
      bottom: 0;
      left: 4%;
    }
  }

  
.toolbar {
    height: 3.6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #f0f2f5;
    .toolbar-item {
        font-size: 1.6rem;
        border: none;
        border-radius: 0;
        background-color: #f0f2f5;
    }
    .cancel-item {
        margin-left: 0.5rem;
        color: #4e545d;
    }
    .confirm-item {
        margin-right: 0.5rem;
        color: red;
    }
    .picker-header {
        color: #4e545d;
        line-height: 3.6rem;
        font-size:1.6rem;
    }
}
</style>
