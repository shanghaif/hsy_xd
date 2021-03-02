<template>
<div>
  <div class="common-header-wrap">
    <mt-header class="common-header" title="新增食品合格证">
        <mt-button icon="back" slot="left"  @click="fun_back"></mt-button>
        <!-- <mt-button slot="right" size="small"
          style="width:2.6rem;height: 1.6rem;color:#fff" 
          type="primary" 
          @click="submitData">追溯</mt-button> -->
    </mt-header>
    <!-- <span class="tree" @click="$router.push({name:'SellerQtree'})">追溯</span> -->
  </div>
  <!-- 顶部按钮 -->
<div class="q_new">
    <!-- 顶部开始 -->
    <!-- <div class="header"> -->
      <!-- 返回按钮 -->
      <!-- <span class="down_arrow"  @click="fun_back"></span>
      <span>新增食品合格证</span>
    </div> -->
    <!-- 上面输入框 -->
    <div class="top_cont">
      <div @click="classVisible=true">
        <mt-cell class="menu-item"
          title="产品分类"
          :value="goods_class.gc_name"
          is-link>
        </mt-cell>
      </div>
      <div><mt-field label="食用农产品名称：" v-model="product_name"></mt-field></div>
      <div><mt-field label="数量(重量)：" type="number" v-model="product_num"></mt-field></div>
      <div @click="getUnitpicker"><mt-field label="单位：" :readonly="true" v-model="unit_name"></mt-field></div>
      <div><mt-field label="联系方式：" v-model="product_phone"></mt-field></div>
      <div><mt-field label="产地：" v-model="product_origin"></mt-field></div>
      <div @click="fun_dateOpenPicker"><mt-field label="开具日期：" :readonly="true" v-model="add_time"></mt-field></div>
      <mt-datetime-picker
        ref="picker"
        :startDate="new Date('2020/1/1')"
        type="date"
        year-format="{value} 年" 
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="fun_dateConrm"
        >
      </mt-datetime-picker>
      <div><mt-field label="生产者盖章或签名：" v-model="autograph_seal"></mt-field></div>
    </div>
    <!-- 结束 -->
    <div style="background:#F4F5F7;height:5px"></div>
    <!-- 我承诺 -->
    <div class="bottom_cont">
      <p>我承诺对产品质量安全以及合格证真实性负责：</p>
      <mt-checklist 
        v-model="check" 
        :options="options">
        </mt-checklist>
      <div><mt-field label="附加补充" type="textarea" v-model="additional"></mt-field></div>
      <!-- 提交按钮 -->
      <mt-button
        @click="fun_addQualify"
        class="btn_new"
        size="large"
        >保存
      </mt-button>  

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
    <!-- 单位选择器 -->
    <unit-picker ref="unitpicker" @onConfirmUnit="onUnit"></unit-picker>
</div>

</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex'
import UnitPicker from "../UnitPicker.vue";
import { getGoodsClass } from '../../../api/sellerGoods'
import { saveQualify } from "../../../api/sellerQualify";
export default {
  data () {
    return {
      classVisible: false,//关闭产品分类
      goods_class: {},//产品分类列表
      store_bind_class: false,
      product_name:"",   //产品名称
      product_num:"",    //产品数量
      unit_name:"",      //单位名称
      unit_id:"",        //单位id
      product_phone:"",  //联系方式
      product_origin:"", //产地
      add_time:'',       //开具日期
      autograph_seal:"", //签名
      check:[],//多选框
      options:[
        {
          label: '不使用禁限用农药兽药',
          value: '1',
        },
        {
          label: '不使用非法添加物',
          value: '2',
        },
        {
          label: '遵循农药安全间隔期、兽药休药期规定',
          value: '3'
        },
        {
          label: '销售的食用农产品符合农药兽药残留食品安全国家标准',
          value: '4'
        },
        {
          label: '绿色食品',
          value: '5',
        },
        {
          label: '有机食品',
          value: '6'
        },
        {
          label: '自检合格',
          value: '7'
        },
        {
          label: '委托检验合格',
          value: '8',
        },
        {
          label: '地理标志产品',
          value: '9'
        },
      ],
      additional:null,//补充说明
    }
  },
  components: {
    "unit-picker":UnitPicker
  },
  computed: {
    ...mapState({
      items: state => state.goodsclass.items
    }),
    buildItems: function () {
      if (!this.items || !this.store_bind_class || !this.items[0]) {
        return []
      }
      let items = new Array()

      if (this.store_bind_class.bind_all) {
        this.getDefaultItems(this.items, items)
      } else {
        this.getDefaultItems(this.store_bind_class.goods_class, items)
      }
      return items
    }
  },
  created () {
    this.add_time = new Date().Format("yyyy-MM-dd");
    getGoodsClass().then(res => {
      this.store_bind_class = res.result
    }).catch(error => {
      Toast(error.message)
    })
    this.fetchGoodsclassList()
  },
  methods: {
    ...mapActions({
      fetchGoodsclassList: 'fetchGoodsclassList'
    }),
    getUnitpicker(){      
      this.$refs.unitpicker.currentValue = true;
    },
    // 单位插件
    onUnit(values){
      this.unit_name = values[0].name;
      this.unit_id = values[0].id;
    },
    // 时间插件
    fun_dateOpenPicker(){
      this.$refs.picker.open();
    },
    fun_dateConrm(v){
      var time = new Date(v).Format("yyyy-MM-dd");
      // console.log(time);
      this.add_time = time;
    },
    // 时间插件结束///////
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
      this.goods_class.gc_name = temp.value
      this.goods_class.gc_id = temp.id

      this.classVisible = false
    },
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
      picker.setSlotValues(3, values[2] ? values[2].children : [])
    },
    // 返回
    fun_back(){
      this.$router.push( {name:"SellerQualify",query:{id:'2'} });
    },
    // 提交
    fun_addQualify(){
      if( !this.goods_class.gc_id ){
        Toast("请选择产品分类");
      }else if( !this.product_name ){
        Toast("请输入产品名称");
      }else if( !this.product_num ){
        Toast("请输入产品数量(重量)");
      }else if( !this.unit_id ){
        Toast("请选择单位");
      }else if( !this.product_phone ){
        Toast("请输入联系方式");
      }else if( !this.utils.checkIsTel(this.product_phone) ){
        Toast("请检查联系方式");
      }else if( !this.product_origin ){
        Toast("请输入产地");
      }else if ( !this.autograph_seal ){
        Toast("请输入盖章或签名");
      }else if( !this.add_time ){
        Toast("请选择开具日期");
      }else{
        saveQualify(
          this.type,
          this.goods_class.gc_id,
          this.product_name,
          this.product_num,
          this.unit_id,
          this.product_phone,
          this.product_origin,
          this.autograph_seal,//签名
          this.add_time,
          this.check,//多选框
          this.additional
        ).then(res=>{
          Toast("保存成功");          
          this.$router.push({name:"SellerQualify",query:{id:'1'} });
        })
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
.q_new{
  $arrow: .6rem;
  $arrowcolor: #000;
  background:#fff;
  position: relative;
  padding:0 .4rem 0;

  // 顶部内容----------------------------------
  .header{
    text-align: center;
    position: relative;  
    padding: .46rem .2rem;
    font-size: 1rem;
    color: #000;
    // 返回箭头
    .down_arrow {
      position: absolute;
      width: $arrow;            
      height: $arrow;
      margin: 0 auto;      
      left: .4rem;
      top: .1rem;
    }
    .down_arrow:after {            
      content: '';
      display: block;
      width: $arrow;
      height: $arrow;
      transform: rotate(225deg);
      border-right: 2px solid $arrowcolor;
      border-top: 2px solid $arrowcolor;
      margin-top: .5rem;
    }
  }
  & /deep/ .mint-cell-title{
    width: 41%;
  }
  // 上面输入框
  .top_cont{    
    padding: 0 .68rem 0;

    & /deep/ .picker-slot.picker-slot-center:nth-child(n+4){
      flex: .6 1 0% !important;
    }
  }
  .bottom_cont{    
    padding: .68rem;
    font-size: .72rem;
    p{
      margin-left: 10px;
    }
    & /deep/ .mint-checkbox-core {
      background: rgba(229,50,22,1);
      display: inline-block;
      background-color: #fff;
      border-radius: 0;
      border: 1px solid #ccc;
      position: relative;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }

    & /deep/ .mint-checkbox-input:checked + .mint-checkbox-core {
      background: rgba(229,50,22,1);
    }

    & /deep/ .mint-checklist-label {
      display: flex;
    }
    & /deep/ .mint-checkbox-label {
      vertical-align: middle;
      width: 90%;
      line-height: 1.2;
    }

    // 按钮
    .btn_new{
      background:linear-gradient(90deg,rgba(252,105,82,1) 0%,rgba(229,50,22,1) 100%);
      box-shadow:0px 0px 20px 0px rgba(251,104,84,0.5);
      border-radius:40px;
      color: #fff;
      margin: 1rem 0;
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
