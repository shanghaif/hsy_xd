<template>
    <div class="step4">
      <div class="common-header-wrap">
        <mt-header title="店铺入驻" class="common-header">
          <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
      </div>
        <step :options="options" :active="2"></step>
        <mt-field class="import" label="商家账号" v-model="storeJoinin.seller_name"></mt-field>
        <mt-field class="import" label="店铺名称" v-model="storeJoinin.store_name"></mt-field>
        <div class="import" @click="showStoreGrade=true"><mt-cell title="店铺等级" is-link>{{storeJoinin.storegrade_name}}</mt-cell></div>
        <div class="import" @click="showStoreTime=true"><mt-cell title="开店时长" is-link>{{storeJoinin.joinin_year?(storeJoinin.joinin_year+'年'):''}}</mt-cell></div>
        <div class="import storeclass" @click="$refs.secondselect.currentValue=true"><mt-cell title="店铺分类" is-link>{{storeJoinin.storeclass_name}}</mt-cell></div>
        <div @click="showGoodsClass=true"><mt-cell title="经营类目" is-link></mt-cell></div>
        <mt-button size="large" type="primary" @click="nextStep">提交</mt-button>
      <div>
        <mt-popup v-model="showGoodsClass" position="right" class="common-popup-wrapper">
          <div class="common-header-wrap">
            <mt-header title="经营类目" class="common-header">
              <mt-button slot="left" icon="back" @click="showGoodsClass=false"></mt-button>
              <mt-button slot="right" @click="addGoodsClass">新增</mt-button>
            </mt-header>
          </div>
          <div class="common-popup-content" v-if="storeJoinin.store_class_names">
              <div v-for="(goods_class,index) in storeJoinin.store_class_names" :key="index" @click="classIndex=index;classVisible=true"><mt-cell :title="goods_class?goods_class:'请选择分类'" :value="(storeJoinin.store_class_commis_rates && storeJoinin.store_class_commis_rates[index])?(storeJoinin.store_class_commis_rates[index]+'%'):''"></mt-cell></div>
          </div>
        </mt-popup>
      </div>
      <div>
        <mt-popup v-model="classVisible" position="bottom">
          <mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
            <div class="toolbar">
              <button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
              <div class="picker-header">选择经营分类</div>
              <button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
            </div>
          </mt-picker>
        </mt-popup>
        <mt-popup v-model="showStoreClass" position="bottom">
          <mt-picker ref="store_class_picker" :slots="store_class_options" valueKey="storeclass_name" @change="onStoreClassChange" showToolbar>
            <div class="toolbar">
              <button class="toolbar-item cancel-item" @click="cancelStoreClass">取消</button>
              <div class="picker-header">选择店铺分类</div>
              <button class="toolbar-item confirm-item" @click="confirmStoreClass">确定</button>
            </div>
          </mt-picker>
        </mt-popup>
        <mt-popup v-model="showStoreGrade" position="bottom">
          <mt-picker ref="store_grade_picker" :slots="store_grade_options" valueKey="storegrade_name" @change="onStoreGradeChange" showToolbar>
            <div class="toolbar">
              <button class="toolbar-item cancel-item" @click="cancelStoreGrade">取消</button>
              <div class="picker-header">选择店铺等级</div>
              <button class="toolbar-item confirm-item" @click="confirmStoreGrade">确定</button>
            </div>
          </mt-picker>
        </mt-popup>
        <mt-popup v-model="showStoreTime" position="bottom">
          <mt-picker ref="store_time_picker" :slots="store_time_options" valueKey="time_text" @change="onStoreTimeChange" showToolbar>
            <div class="toolbar">
              <button class="toolbar-item cancel-item" @click="cancelStoreTime">取消</button>
              <div class="picker-header">选择开店时长</div>
              <button class="toolbar-item confirm-item" @click="confirmStoreTime">确定</button>
            </div>
          </mt-picker>
        </mt-popup>
      </div>
      <second-select
        @onConfirm="getonConfirm"
        title="店铺分类"
        v-if="storeArr.length>0" ref="secondselect" :items="storeArr"></second-select>
    </div>
</template>
<script>

import { Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import Step from '../../Step'
import { getStoreClass, getNewStoreClass, getStoreGrade, getStoreJoinin, saveStoreJoinin4 } from '../../../api/seller'
import SecondSelect from '../../SecondSelect';
export default {
  components: {
    Step,
    SecondSelect
  },
  data () {
    return {
      options: [{ title: '公司资质' }, { title: '财务资质' }, { title: '店铺信息' }, { title: '合同签订' }],
      store_class_options: [],
      store_grade_options: [],
      classVisible: false,
      goods_class: {},
      showStoreClass: false,
      showStoreGrade: false,
      showStoreTime: false,
      store_time_options: [{
        flex: 1,
        values: [{ time_number: 1, time_text: '1年' }, { time_number: 2, time_text: '2年' }],
        textAlign: 'center'
      }],
      showGoodsClass: false,
      classIndex: 0,

      storeArr:[],
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      storeJoinin: state => state.member.storeJoinin,
      items: state => state.goodsclass.items,
      editState: state => state.seller.editState,//拒绝后去修改
    }),
    buildItems: function () {
      if (!this.items || !this.items[0]) {
        return []
      }
      let items = new Array()

      this.getDefaultItems(this.items, items)
      return items
    }
  },
  created: function () {
    if (!this.storeJoinin.store_class_names || !this.storeJoinin.store_class_names.length) {
      this.storeJoinin.store_class_names = ['']
    }
    getStoreJoinin().then(res => {
      var store_joinin = res.result.store_joinin
      if (store_joinin) {
        if (store_joinin.joinin_state == 11 || store_joinin.joinin_state == 20 || store_joinin.joinin_state == 31) {
          if( !this.editState ){
            this.$router.push({ name: 'SellerJoinin5' })
            return
          }
        }
        if (store_joinin.joinin_state == 40) {
          Toast('您的店铺已开通')
          this.$router.push({ name: 'HomeSellerLogin' })
          return
        }
        // if (!this.storeJoinin) {
          this.sellerJoininSave({ storeJoinin: store_joinin })
        // } else {
          this.isSame = !!this.storeJoinin.is_settlement_account
          if (!this.storeJoinin.store_class_names || !this.storeJoinin.store_class_names.length) {
            this.storeJoinin.store_class_names = ['']
          }
        // }

        if( store_joinin.store_type != 2 && this.utils.isNewSpecial(store_joinin.storeclass_id) || store_joinin.store_type == 2 && !this.utils.isNewSpecial(store_joinin.storeclass_id) ){
          this.storeJoinin.storeclass_id = null;
          this.storeJoinin.storeclass_name = '';
        }
      }
    }).catch(error => {
      Toast(error.message)
    })
    this.fetchGoodsclassList()
    
    this.utils.getSpecialIdentity( (this.storeJoinin.store_type != 2) ? 1 : -1 ).then(store=>{
      for( var item of store ){
        item.id = item.storeclass_id;
        item.name = item.storeclass_name;
        for( var end of item.child ){
          end.id = end.storeclass_id;
          end.name = end.storeclass_name;
        }
      }
      this.storeArr = store;
    }).catch(err=>{
      Toast(err)
    })

    getStoreClass().then(res => {
      var store_class = null;
      if( this.storeJoinin.store_type != 2){
        var arr = [];
        for(var item of res.result.store_class){
          if( item.storeclass_id != 32 &&item.storeclass_id != 41 && item.storeclass_id != 42 ){
            arr.push(item);
          }
        }
        store_class = arr;
      }else{
        this.options[0].title = "入驻信息"
        store_class = [
          {store_class_type: "6",
            storeclass_bail: 0,
            storeclass_id: 32,
            storeclass_name: "种植",
            storeclass_sort: 34
          },{
            store_class_type: "6",
            storeclass_bail: 0,
            storeclass_id: 41,
            storeclass_name: "养殖",
            storeclass_sort: 35
          },{
            store_class_type: "6",
            storeclass_bail: 0,
            storeclass_id: 42,
            storeclass_name: "屠宰",
            storeclass_sort: 36
          }
        ]
      }
      this.store_class_options = [{
        flex: 1,
        values: store_class,
        textAlign: 'center'

      }]
    }).catch(error => {
      Toast(error.message)
    })

    getStoreGrade().then(res => {
      var store_grade = res.result.storegrade_list
      this.store_grade_options = [{
        flex: 1,
        values: store_grade,
        textAlign: 'center'

      }]
    }).catch(error => {
      Toast(error.message)
    })
  },

  methods: {
    ...mapActions({
      fetchGoodsclassList: 'fetchGoodsclassList'
    }),
    ...mapMutations({
      sellerJoininSave: 'sellerJoininSave',
      sellerEditState: 'sellerEditState',//拒绝后去修改
    }),

    getonConfirm(arr){
      this.storeJoinin.storeclass_id = arr[1].id;
      this.storeJoinin.storeclass_name = arr[1].name;
      this.$forceUpdate();
    },

    nextStep () {
      if( !this.storeJoinin.seller_name ){
        Toast("请输入商家账号");
        return false;
      }
      if( !this.storeJoinin.store_name ){
        Toast("请输入店铺名称");
        return false;
      }
      if( !this.utils.IsStandard(this.storeJoinin.store_name )){
        Toast("请检查店铺名称（不得包含特殊符号）");
        return false;
      }
      if( !this.storeJoinin.storegrade_name ){
        Toast("请选择店铺等级");
        return false;
      }
      if( !this.storeJoinin.joinin_year ){
        Toast("请选择开店时长");
        return false;
      }
      if( !this.storeJoinin.storeclass_id ){
        Toast("请选择店铺分类");
        return false;
      }
      this.sellerEditState(false);
      saveStoreJoinin4(this.storeJoinin).then(res => {
        this.sellerJoininSave({ storeJoinin: this.storeJoinin })
        this.$router.push({ name: 'SellerJoinin5' })
      }).catch(error => {
        Toast(error.message)
      })
    },
    addGoodsClass () {
      if (!this.storeJoinin.store_class_names) {
        this.storeJoinin.store_class_names = []
      }
      this.storeJoinin.store_class_names.push('')
      this.$forceUpdate()
    },
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
      if (!this.storeJoinin.store_class_ids) {
        this.storeJoinin.store_class_ids = []
      }
      if (!this.storeJoinin.store_class_commis_rates) {
        this.storeJoinin.store_class_commis_rates = []
      }
      var store_class_names = ''
      var store_class_ids = ''
      var index=0
      for (var i in values) {
        if(values[i]){
          index=i
          if (!store_class_names) {
            store_class_names = values[i].value
            store_class_ids = values[i].id
          } else {
            store_class_names += ',' + values[i].value
            store_class_ids += ',' + values[i].id
          }
        }
      }
      this.storeJoinin.store_class_names[this.classIndex] = store_class_names
      this.storeJoinin.store_class_ids[this.classIndex] = store_class_ids
      this.storeJoinin.store_class_commis_rates[this.classIndex] = values[index].commis_rate
      this.classVisible = false
      this.$forceUpdate()
    },
    onClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
      picker.setSlotValues(2, values[1] ? values[1].children : [])
      picker.setSlotValues(3, values[2] ? values[2].children : [])
    },

    cancelStoreClass () {
      this.showStoreClass = false
    },
    confirmStoreClass () {
      let values = this.$refs.store_class_picker.getValues()
      this.storeJoinin.storeclass_name = values[values.length - 1].storeclass_name
      this.storeJoinin.storeclass_id = values[values.length - 1].storeclass_id

      this.showStoreClass = false
    },
    onStoreClassChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
    },

    cancelStoreGrade () {
      this.showStoreGrade = false
    },
    confirmStoreGrade () {
      let values = this.$refs.store_grade_picker.getValues()
      this.storeJoinin.storegrade_name = values[values.length - 1].storegrade_name
      this.storeJoinin.storegrade_id = values[values.length - 1].storegrade_id

      this.showStoreGrade = false
    },
    onStoreGradeChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
    },

    cancelStoreTime () {
      this.showStoreTime = false
    },
    confirmStoreTime () {
      let values = this.$refs.store_time_picker.getValues()
      this.storeJoinin.joinin_year = values[values.length - 1].time_number

      this.showStoreTime = false
    },
    onStoreTimeChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].children : [])
    }
  }
}
</script>
<style  lang="scss" scoped>
.step4{
  &/deep/ .mint-cell-title{
    width: 32%;
  }
  &/deep/ .mint-cell-text{
    padding-left: .66rem;
  }
  .import {
    // & /deep/ input::-webkit-input-placeholder{
    //   color: red;
    //   font-size: 1.2rem;
    //   transform: translate(0,30%);
    // }
    & /deep/ .mint-cell-text{
      position: relative;
    }
    & /deep/ .mint-cell-text::after{
      content: "*";
      color: red;
      font-size: 1.2rem;
      position: absolute;
      left: .1rem;
      top: .1rem;
    }
  }
  .storeclass{

    &/deep/.is-link{
      margin-right: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 62%;
      box-sizing: border-box;    margin-right: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 62%;
      box-sizing: border-box;
    }
  }
}
  .container {
    background: #fff;
  }
  .label {
    padding: .5rem;
    font-size: .7rem;
    background: #eee;
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
