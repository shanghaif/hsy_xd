<template>
	<mt-popup v-model="currentValue" position="bottom">
		<mt-picker
			ref="picker"
			class="picker"
			:slots="buildItems"
			valueKey="area_name"
			showToolbar
			:itemHeight="44"
			@change="onValuesChange"
		>
			<div class="toolbar">
				<button class="toolbar-item cancel-item" @click="cancel">取消</button>
				<div class="picker-header">请选择地区</div>
				<button class="toolbar-item confirm-item" @click="confirm">确定</button>
			</div>
		</mt-picker>
	</mt-popup>
</template>

<script>
import { getAreaTree } from '../../api/area'
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
      if (!this.items) {
        return []
      }
      let items = new Array()
    
      
      if(this.valm){
        // this.getDefaultItems(this.items, items)
        // console.log('打印元数据',this.items);
        this.items.forEach((v,i0) => {
          v.child.forEach((j,i1)=>{
            j.child.forEach((z,i2)=>{
              if(z.area_id == this.valm ){
                this.getDefaultChose(this.items,items,i0,i1,i2);
                items[0].defaultIndex = i0;
                items[1].defaultIndex = i1;
                items[2].defaultIndex = i2;
                // console.log(i0,i1,i2);
              }
            })
          })
        });
      }else{        
        this.getDefaultItems(this.items, items)  
      }
      // console.log(items);
      return items
    }
  },
  methods: {
    getDefaultItems (_item, defaultItems) {
      if (_item[0].child && _item[0].child.length > 0) {
        let index = 1
        if (defaultItems && defaultItems.length == 0) {
          defaultItems.push({
            flex: 1,
            values: _item,
            textAlign: 'center'

          })
          this.getDefaultItems(_item, defaultItems)
        } else if (defaultItems && defaultItems.length > 0) {
          defaultItems.push({
            flex: 1,
            values: _item[0].child,
            textAlign: 'center'

          })
          this.getDefaultItems(_item[0].child, defaultItems)
        }
      }
    },
    
    getDefaultChose (_item, defaultItems,i0,i1,i2) {      
      defaultItems.push({
        flex: 1,
        values: _item,
        textAlign: 'center'

      })
      defaultItems.push({
        flex: 1,
        values: _item[i0].child,
        textAlign: 'center',
      })
      defaultItems.push({
        flex: 1,
        values: _item[i0].child[i1].child,
        textAlign: 'center',
      })        
      
    },

    onValuesChange (picker, values) {
      picker.setSlotValues(1, values[0] ? values[0].child : [])
      picker.setSlotValues(2, values[1] ? values[1].child : [])
      picker.setSlotValues(3, values[2] ? values[2].child : [])

    },

    onclickMask () {
      this.currentValue = false
    },
    cancel () {
      this.currentValue = false
    },
    confirm () {
      this.currentValue = false
      let values = this.$refs.picker.getValues()
      this.$emit('onConfirm', values)
    }
  }
}
</script>

<style lang="scss" scoped>
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
	height: 29rem;
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
  font-size: 1.5rem;
}
.picker-slot {
	font-size: 1rem;
}
  .picker .picker-slot{
    font-size: 30px;
  }
</style>
