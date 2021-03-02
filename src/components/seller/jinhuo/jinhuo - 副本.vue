<template>
    <div class="container">
    <div class="common-header-wrap">
        <mt-header title="进货台账" class="common-header">
            <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
        </mt-header>
    </div>
    <div style="width:40%;float:left" @click="onDate('d_start')"><mt-cell title="起始日期" is-link>{{dt.d_start?$moment.unix(dt.d_start).format('YYYY-MM-DD'):''}}</mt-cell></div>
    <div style="width:40%;float:left" @click="onDate('d_end')"><mt-cell title="结束日期" is-link>{{dt.d_end?$moment.unix(dt.d_end).format('YYYY-MM-DD'):''}}</mt-cell></div>
   <button class="toolbar-item confirm-item" @click="getGoodsList">查询</button>
<div>
      <el-table
   		 :data="tableData"
    		height="350"
    		border
   		 style="width: 100%">

   	 <el-table-column
      		prop="goods_name"
      		label="商品名称"
      		width="100">
    		</el-table-column>
    	<el-table-column
      		prop="goods_scdate"
     		 label="生产日期"
      		width="100">
    	</el-table-column>
    	<el-table-column
      		prop="guige"
      		label="规格">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_jhl"
      		label="数量">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_bzq"
      		label="保质期">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_suyuan"
      		label="供货详情">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_addtime"
      		label="进货时间">
   	 </el-table-column>
    	<el-table-column
      		prop="goods_yhren"
      		label="验货人">
   	 </el-table-column>

       </el-table>
</div>
  <div>
     
      <mt-datetime-picker
              ref="datePicker"
              type="date"
              :startDate="new Date('2000/1/1')"
              yearFormat="{value}年"
              monthFormat="{value}月"
              dateFormat="{value}日"
              :value="selectData?(new Date(selectData)):(new Date())"
              @confirm="dateConfirm"
      >
      </mt-datetime-picker>
    </div>
    </div>
</template>

<script>
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { getGoodsList1, dropGoods, goodsShow, goodsUnshow } from '../../../api/sellerGoods'
export default {
  data () {
    	return {
      
		dt:{d_start:'',d_end:'',},
		dataName:'',
		selectData: '',
       		 tableData: [],
   	 }
  },
  methods: {
    	onDate (name) {
     		 this.dataName = name
      		this.$refs.datePicker.open()
    	},
    	dateConfirm (value) {
      		this.dt[this.dataName]=parseInt(value.getTime() / 1000)
     		 this.$forceUpdate()
    	},
    getGoodsList () {
      Indicator.open()
      getGoodsList1( this.keyword, this.dt.d_start, this.dt.d_end).then(res => {
          this. tableData = res.result.goods_list
	 Indicator.close()
      })
    },

    },
  }

</script>

<style scoped>

</style>
