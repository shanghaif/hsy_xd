<template>
  <div class="ui-category-body">
    <div class="goodslist-body show-goods-list" >
      
    <div @click="classVisible=true">
        <mt-cell class="menu-item"
                 title="商品分类"
                 :value="gc_name"
                 is-link>
        </mt-cell>
    </div>
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
      <mt-field label="买家ID" placeholder="请输入买家ID" type="number" v-model="buy_store_id"></mt-field>
      <!-- <button @click="submit">提交</button> -->
        <!-- 无限加载滚动列表 -->
        <div class="flex-wrapper" >
            <div class="ui-product-body"
                  v-for='(item, index) in goodsList'
                  v-bind:key='index'
            >
                <div class="list">
                    <div class="ui-image-wrapper">
                        <img class="product-img" v-lazy="item.goods_image_url">
                    </div>
                    <div class="flex-right">
                        <div class="product-header">
                          <h3 class="title clear-bottom" style="-webkit-box-orient:vertical">{{ item.goods_name }}</h3>
                        </div>
                        <h3 class="title clear-bottom margin_l_5" style="-webkit-box-orient:vertical">库存{{ item.goods_storage }}</h3>                        
                        <!-- <div class="p-price" style="-webkit-box-orient:vertical">
                            价格{{ item.price }}
                        </div> -->
                        <mt-field class="mt_field" placeholder="请输入商品价格" label="价格"  type="number" v-model="item.price"></mt-field>
                        <mt-field class="mt_field" placeholder="请输入商品数量" label="数量" type="number" v-model="item.number"></mt-field>
                        <!-- <div class="p-info">
                            <span class="platfomt_fieldrm_store">自营</span>
                            <span class="goods_salenum">销量:{{ item.goods_salenum }}</span>
                        </div> -->
                        <!-- <div class="add-cart"><i class="iconfont">&#xe681;</i></div> -->
                    </div>
                </div>
            </div>
            <div class="loading-wrapper" v-if="goodsList.length > 0">
                <p class="common-no-more" v-if='isMore'>没有更多了</p>
                <!-- <mt-spinner type="triple-bounce" color='#e93b3d' v-if='isMore'></mt-spinner> -->
            </div>
            <!-- <empty-record v-if='goodsList.length <= 0 && !isMore'></empty-record> -->
        </div>
    </div>
  </div>
</template>

<script>
import EmptyRecord from '../../EmptyRecord'
import { mapState, mapActions } from 'vuex'
import { MessageBox,Toast } from 'mint-ui';
import { getStoreGoodsListAll } from '../../../api/homestoredetail'//获取数据接口
import { buyOrderAdd } from '../../../api/sellerGoodsClass';//线下销售接口
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
      MessageBox.confirm('确认提交订单?').then(action => {
        buyOrderAdd(this.store_id,this.buy_store_id,list).then(res=>{
          Toast( '操作成功' );            
          this.loading();
        }).catch(err=>{
          // console.log(err);   
          Toast(err.result)
        })
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
              "price":item.goods_p_price*item.goods_price,
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
  .ui-category-body{
    width: 100%;
        .ui-product-body {
        border-bottom: 1px solid rgba(232,234,237,1);
        .list {
            display: flex;
            width: auto;
            align-items: center;
            justify-content: space-between;
            margin:0.55rem 0.5rem;
            position: relative;
            div.ui-image-wrapper {
                width:5.5rem;
                height:5.5rem;
                position: relative;
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                flex-basis: 5.5rem;
                flex-shrink: 0;
                background-position:center center!important;
                background-size:5rem 5rem;
                background-repeat:no-repeat;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
                img.product-img{
                    width: 5.5rem;
                    height: 5.5rem;
                    flex-basis: 5.5rem;
                    flex-shrink: 0;
                }
                img.product-img[lazy=loading] {
                    width: 1.5rem;
                    height: 1.5rem;
                }
                img.product-im[lazy=error] {
                    width: 1.5rem;
                    height: 1.5rem;
                }
                img.product-img[lazy=loaded] {
                    width: 5.5rem;
                    height: 5.5rem;
                    flex-basis: 5.5rem;
                    flex-shrink: 0;
                    background:rgba(255,255,255,1);
                }

                span {
                    position: absolute;
                    height:1rem;
                    background:rgba(243,244,245,1);
                    line-height: 1rem;
                    text-align: center;
                    font-size:0.7rem;
                    color:#e93b3d;
                    width: 5.5rem;
                    bottom: 0;
                    left: 0;
                }
            }
            .flex-right {
                padding-left: 0.7rem;
                width: 100%;
                position:relative;

                .mt_field{
                  width:80%;
                  &/deep/ .mint-cell-title{
                    width:2rem
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
                  // color: #e93b3d;
                  // font-size: 1rem;
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

  
.toolbar {
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #f0f2f5;
    .toolbar-item {
        font-size: .6rem;
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
        line-height: 2rem;
        font-size:.8rem;
    }
}
</style>
