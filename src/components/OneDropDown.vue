<template>
	<mt-popup class="OneDropDown" v-model="currentValue" position="bottom">
		<mt-picker
			ref="picker"
			class="picker"
			:slots="buildItems"
			:valueKey="showName"
			showToolbar
			:itemHeight="44"
			@change="onValuesChange"
		>
			<div class="toolbar">
				<button class="toolbar-item cancel-item" @click="cancel">取消</button>
				<button class="toolbar-item cancel-item">{{title}}</button>
				<button class="toolbar-item confirm-item" @click="confirm">确定</button>
			</div>
		</mt-picker>
	</mt-popup>
</template>

<script>
// import { getGoodsUnitList } from '../../api/sellerGoods'
import { Toast } from 'mint-ui'
export default {
  name: 'RegionPicker',
  props: {
    // 父组件传过来的 数据内容
    items:{
      default:Array,
    },
    // 标题
    title:{
      default:''
    },
    showName:{
      default:'name'
    },
    modal: {
      default: true
    },
    modalFade: {
      default: false
    },
    lockScroll: {
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    valm:{
      default:null
    },
  },
  data () {
    return {
      currentValue: false,
    }
  },
  computed: {
    buildItems: function () {
      return   [
        {
          defaultIndex: 0,
          valueIndex:0,
          values: this.items,
          className: 'slot1',
          textAlign: 'center'
        }, 
      ]
    }
  },
  created(){
    // getGoodsUnitList().then(res=>{
    //   for(var item of res.result){
    //     this.items.push({
    //       name:item.unit_name,
    //       id:item.unit_id
    //     })        
    //   }
    // })
  },
  methods: {
    onValuesChange(picker, values) {
      // var v0 = parseInt(values[0].slice(0,2));
      // var v1 = parseInt(values[1].slice(0,2));
      // if (v0 > v1) {
      //   console.log(v0,v1);
      //   picker.setSlotValue(1, values[0]);
      // }
    },
    onclickMask () {
      this.currentValue = false;
    },
    cancel () {
      this.currentValue = false;
      this.$emit('pickOneDropDowncancel', values);
    },
    confirm () {
      this.currentValue = false;
      let values = this.$refs.picker.getValues();
      this.$emit('pickOneDropDown', values);
    }
  }
}
</script>

<style lang="scss" scoped>
.OneDropDown{
  .picker {
    background-color: #ffffff;
  }
  .toolbar {
    // height:2rem;
    height: 4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: #f0f2f5;
  }
  .mint-popup-bottom {
    width: 100%;
    // height:13.8rem;
    height: 26rem;
    border: 0;
    overflow: auto;
  }
  .toolbar-item {
    // font-size:0.8rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 0;
    background-color: #f0f2f5;
  }
  .cancel-item {
    margin-left:0.5rem;
    color: #333;
  }
  .confirm-item {
    margin-right:0.5rem;
    color: red;
  }
  .picker-header {
    color: #333;
    // line-height:2rem;
    line-height: 4rem;
  }
  .picker-slot {
    font-size: 1rem;
  }
  .picker .picker-slot{
    font-size: 30px;
  }
}
</style>
