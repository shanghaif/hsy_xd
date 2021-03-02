<template>
	<div class="statistics_charts">
		<!-- 头部 -->
		<!-- <head-title title="订单分析" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title> -->
				
		<!-- 上面搜索框 -->
		<div class="search">
			<ul>
				<li v-for="(v,i) in searchArr" :key="i"
					@click="fun_wake(v.value,i)"
					>
					<span>{{v.title}}</span>
					<img class="s_r_drop" :src="require('../../../assets/image/icon2/icon-white-back.png')" alt="">
				</li>
			</ul>

		</div>

		
		<div class="info">
			<span>{{showName1}}内</span>
			<span>{{showName2}}</span>
			<span>{{showName3}}</span>
		</div>
		<!-- 图标 -->
		<div id="high" class="echarts"  style="width: 96%; height: 300px;">		</div>

		<!-- 主体内容 -->
		<div class="main">
			<!-- <div class="info">
				<span>{{showName1}}内</span>
				<span>{{showName2}}数据</span>
			</div>
			图标
			<div id="high"  style="width: 100;height: 300px;">
			</div> -->

			
			<div class="table_cont">
				<table class="table">
					<tbody>
						<tr  v-for="(arr,i) in tableData" :key="i">
							<td>{{arr[0].val}}</td>
							<td>{{arr[1].val}}</td>
							<td>{{arr[2].val}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!--  -->
		<onw-drop-down @pickOneDropDowncancel="cancelOneDropDown" @pickOneDropDown="getOneDropDown" ref="sel_timeid" :items="nowSelectArr"></onw-drop-down>
	</div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui'
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';
import OneDropDown from "../../OneDropDown";
import { mapState } from 'vuex';

import { getOrderanalysis } from '../../../api/sellerStatistics';
import echarts from 'echarts';

export default {
	name: 'StatisticsGeneral',
	components: {
		"head-title" : HeadTitle,
		"onw-drop-down" : OneDropDown
	},
	computed: {
		...mapState({
			seller: state => state.seller.info
		}),
		
	},
	data() {
		return {
			tableData:[
				[
					{code: "date", val: "日期"},
					{code: "view", val: "浏览"},
					{code: "cart", val: "购物车"},
					{code: "pay", val: "支付"}
				]
			],

			showName1:'一天',
			showName2:'全部商品',
			showName3:'全部区域',
			searchArr:[
				{ title:"时间", value: 'sel_timeid' },
				{ title:"商品", value: 'goods_id' },
				{ title:"区域", value: 'region_id' },
			],
			// 下拉框 数据
			oneDropDown:{
				sel_timeid:[ { name: '一天', id: '1' }, { name: '一周', id: '2' }, { name: '一个月', id: '3' }],
				goods_id:[ { name: '全部商品', id: '0' } ],
				region_id:[ { name: '全部区域', id: '0' } ],				
			},
			
			// 当前下拉框
			nowSelectArr:[],

			// 搜索 条件
			searchObj:{
				sel_timeid:1,
				goods_id:0,
				region_id:0,
			},
			nowOneDropDown:null,
			nowOneDropDownIndex:null,

		
			option :{
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['订单金额','订单数量']
				},
				// calculable : true,
				xAxis : [
					{
						axisLabel:{
							margin:22
						},
						type : 'category',
						data : ['今日统计',]
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						itemStyle: {    // 图形的形状
							normal:{
								label : {
									show: true, position: 'insideTop'
								}
							}
						},
						name:'订单金额',
						type:'bar',
						data:[2.0],
					},
					{
						itemStyle: {    // 图形的形状
							normal:{
								label : {
									show: true, position: 'insideTop'
								}
							}
						},
						name:'订单数量',
						type:'bar',
						data:[2.6],
					},
				]
			},


			optionZ : {
				tooltip : {
					trigger: 'axis'
				},
				legend: {
					data:['订单数量','订单金额']
				},
				calculable : true,
				xAxis : [
					{
							type : 'category',
							boundaryGap : false,
							data : ['第1天','第2天','第3天','第4天','第5天','第6天','第7天','第8天','第9天','第10天','第11天']
					}
				],
				yAxis : [
					{
							type : 'value',
							axisLabel : {
									formatter: '{value} '
							}
					}
				],
				series : [
					{
						smooth:true, // 平滑曲线
						name:'订单数量',
						type:'line',
						data:[11, 11, 15, 13, 12,  13,  11, 15, 13 ,18 ],
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
					},
					{
						smooth:true, // 平滑曲线
						// itemStyle: {normal: {areaStyle: {type: 'default'}}},
						name:'订单金额',
						type:'line',
						data:[1, 1, 2, 5, 3, 2, 0,1, 1, 2],
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
						// markLine : {
						// 		data : [
						// 				{type : 'average', name : '平均值'}
						// 		]
						// }
					}
				]
			},


		};
	},

	// 初始化 加载数据
	created() {
		// console.log(this.seller.seller_id);
		this.loading();
	},
	
	// mounted() {
	// 	resetRem();
	// },

	// beforeDestroy() {
	// 	resumeRem();
	// },

	methods: {
		// 点击 下拉框
		fun_wake(v,index){
			// console.log('你好',v,this.$refs[v]);
			this.$refs.sel_timeid.currentValue = true;
			this.nowOneDropDown = v;
			this.nowOneDropDownIndex = index;
			this.nowSelectArr = this.oneDropDown[v];
		},

		// 选中 当前 条件 去查询
		getOneDropDown(v){
			// 如果切换的是别的数据
			if( this.nowOneDropDown != 'sel_timeid' ){
				// this.searchObj ={
				// 	sel_timeid:0,
				// 	product:0,
				// 	product_type:0,
				// 	from:0,
				// 	terminal:0,
				// 	sel_timeid:this.searchObj.sel_timeid
				// };
				if( this.nowOneDropDown != 'region_id' ){
					this.showName2 = v[0].name;
				}else{
					this.showName3 = v[0].name;
				}
			}else{
				this.showName1 = v[0].name;
			}
			
			this.searchObj[this.nowOneDropDown] = v[0].id;

			this.searchArr = [
				{ title:this.searchArr[0].title,value:this.searchArr[0].value },
				{ title:"商品", value: 'goods_id' },
				{ title:"区域", value: 'region_id' },
			]
			// this.searchArr[this.nowOneDropDownIndex] = { title:v[0].name,value:this.nowOneDropDown };

			this.nowOneDropDownIndex = null;
			

			this.loading();
		},

		// 取消
		cancelOneDropDown(){
			this.nowOneDropDownIndex = null;
		},

		// 最近30天销售数据
		loading() {
			// sel_timeid 时间，1一天2一周3一月
			// goods_id 商品id
			// class_id 商品分类id
			// form_id 入口id，，1零售2团购3零售折扣4零售抢购5团购折扣6团购抢购
			// terminal_id 终端id，1APP2公众号3h54PC
			getOrderanalysis(this.seller.seller_id,this.searchObj).then(res => {
				if (res) {
					// console.log(res);
					var seltag = res.result.seltag;
					// 
					this.oneDropDown.sel_timeid = seltag.seltime;
					this.oneDropDown.form_id = seltag.formarr;
					this.oneDropDown.terminal_id = seltag.terminal;
					
					this.oneDropDown.goods_id = [{name:"全部商品",id:0}];
					this.oneDropDown.region_id = [{name:"全部区域",id:0}];
					
					seltag.region.forEach( ( item, index ) => {
						// console.log(item);
						this.oneDropDown.region_id.push(
							{
								name:item.region_name,
								id:item.region_id
							}
						)
					});

					seltag.store_goods.forEach( ( item, index ) => {
						// console.log(item);
						this.oneDropDown.goods_id.push(
							{
								name:item.goods_name,
								id:item.goods_id
							}
						)
					});

					this.tableData = res.result.table;


					var obj = res.result.statisticinfo;

					let myChart = echarts.init(document.getElementById('high'));
					
					if( this.searchObj.sel_timeid == 1 ){
						var obj = res.result.statisticinfo;
						this.option.series[0].data = [ obj.money ];
						this.option.series[1].data = [ obj.num ];
						myChart.setOption(this.option);
					}else if( this.searchObj.sel_timeid == 2 ){						
						var arr = res.result.table;
						for( var i = 1; i<arr.length; i++ ){
							var item = arr[i];
							this.optionZ.series[0].data[i-1] = item[1].val;
							this.optionZ.series[1].data[i-1] = item[2].val;						
						}
						myChart.setOption(this.optionZ);
					}


					// myChart.setOption(this.option);
				}
			});
		},
	}
};
</script>

<style scoped lang="scss">
.statistics_charts{
	position: relative;
	top: 1px;
	.search{
		background: #626771;
		border: 1px solid #626771;
		padding: 1.43rem;
		overflow: scroll;
		margin-top: -1px;
		background: #626771;
    padding: .5rem 0 1rem 1.43rem;
    overflow: scroll;
    // margin-top: -1px;
		ul{
			// color: #fff;
    	color: #A4ABB3;
			font-size: 1.43rem;
			width: max-content;
			li{
				display: inline-block;
				margin-right: 1.1rem;
				img{
					width: 1.5rem;
					height: 1.5rem;
					transform: rotate(-90deg);
					margin-left: .2rem;
				}

				.reverse{
					transform: rotate(90deg);
					transition: all .5s;
				}
			}
		}
	}
	.info{
		padding: 1.43rem;
		font-size: 1.4rem;
		margin: 1.4rem 0;
		span{
			margin-right: 1rem;
		}
	}
	.echarts{
		margin: 0 auto;
	}
	.main{
		padding: 1.43rem;
		padding: 1.43rem;

		

		.table_cont{			

      .table{
        width: 100%;
        border: 1px solid #666;
        border-collapse: collapse;
        margin-bottom: 15px;

        
        // background:linear-gradient(139deg,rgba(60,211,173,1) 0%,rgba(76,184,196,1) 100%);
        // box-shadow:0px 0px 20px 0px rgba(63,206,177,0.4);
        // border-radius:16px;
        // color: #fff;
        td{
          padding:5px;
          border:  1px solid #666;
					text-align: center;
        }
      }

			ul{
				div{
					box-sizing: border-box;
				}
				li{
					border: 1px solid #999;
					margin: .5rem 0;
					display: flex;
					.time{
						width: 20%;
						div{
							padding-top: 20%;
    					text-align: center;
							height: 50%;
							border-right: 1px solid #999;
							&:first-child{								
								border-bottom: 1px solid #999;
							}
						}
					}
					.cont{
						width: 80%;;
						div{
							padding:2%;
							&:not(:last-child) {								
								border-bottom: 1px solid #999;
							}
							display: flex;
							span{
								width: 46%;
							}
						}
					}
				}
			}
		}

	}
}
</style>
