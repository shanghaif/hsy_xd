<template>
	<mt-popup class="timePicker" v-model="currentValue" position="bottom">
		<mt-picker
			ref="picker"
			class="picker"
			:slots="buildItems"
			valueKey="time_name"
			showToolbar
			:itemHeight="44"
			@change="onValuesChange"
		>
			<div class="toolbar">
				<button class="toolbar-item cancel-item" @click="cancel">取消</button>
				<!-- <div class="picker-header">请选择配送时间</div> -->
				<button class="toolbar-item confirm-item" @click="confirm">确定</button>
			</div>
		</mt-picker>
	</mt-popup>
</template>

<script>
import { getAreaTree } from '../../../api/area'
import { Toast } from 'mint-ui'
export default {
  name: 'RegionPicker',
  props: {
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
    }
  },
  data () {
    return {
      currentValue: false,
      items: false
    }
  },
  created: function () {
    // console.log('valm',this.valm);
    getAreaTree().then(res => {
      this.items = res.result.area_list
    }).catch(function (error) {
      Toast(error.message)
    })
  },
  computed: {
    buildItems: function () {
      var arr = [];
      for( var i = 0; i<24 ; i++ ){
        if(i<9){
          arr.push({time:i,time_name:"0"+i+":00-0"+(i+1)+":00"});
        }else if(i==9){
          arr.push({time:i,time_name:('0'+i+":00-")+(i+1)+":00"});
        }else {
          arr.push({time:i,time_name:(i+":00-")+(i+1)+":00"});
        }
      }
      return   [
        {
          defaultIndex: new Date().getHours(),
          valueIndex:0,
          values: arr,
          className: 'slot1',
          textAlign: 'center'
        }, 
      ]
    }
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
      this.currentValue = false
    },
    cancel () {
      this.currentValue = false
    },
    confirm () {
      this.currentValue = false
      let values = this.$refs.picker.getValues();
      this.$emit('onConfirm', values)
    }
  }
}
</script>

<style lang="scss" scoped>
.picker {
	background-color: #ffffff;
	height:20rem;
  &/deep/.picker-items{
    overflow-y: scroll;
  }
}
.toolbar {
	height:3rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	background-color: #f0f2f5;
}
.mint-popup-bottom {
	width: 100%;
	border: 0;
	overflow: auto;
}
.toolbar-item {
	font-size:1.8rem;
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
	line-height:2rem;
}
</style>
