<template>
	<div class="statistics_charts">
		<!-- 头部 -->
		<!-- <head-title title="用户分析" :iconleft="require('../../../assets/image/icon2/icon-white-back.png')" bgcolor='#626771' color="#FFFFFF"></head-title> -->
				
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
			<span>{{showName2}}数据</span>
		</div>
		<!-- 图标 -->
		<div id="high" class="echarts"  style="width: 96%; height: 300px;">		</div>

		<!-- 主体内容 -->
		<div class="main">
			<!-- <div class="info">
				<span>{{showName1}}内</span>
				<span>{{showName2}}数据</span>
			</div> -->
			<!-- 图标 -->
			<!-- <div id="high"  style="width: 100%; height: 300px;"></div> -->
			<!-- 表格 -->
			<div class="table_cont">
				<table class="table">
					<tbody>
						<tr  v-for="(arr,i) in tableData" :key="i">
							<td>{{arr[0].val}}</td>
							<td>{{arr[1].val}}</td>
							<td>{{arr[2].val}}</td>
							<td>{{arr[3].val}}</td>
							<td>{{arr[4].val}}</td>
							<td>{{arr[5].val}}</td>
							<td>{{arr[6].val}}</td>
						</tr>
					</tbody>
				</table>
				<!-- <ul>
					<li v-for="(arr,i) in tableDataEnd" :key="i">
						<div class="time">
							<div>日期</div>
							<div>{{arr[0].val}}</div>
						</div>
						<div class="cont">
							<div>
								<span>访问用户数：{{arr[1].val}}</span>
								<span>新访问用户数：{{arr[2].val}}</span>
							</div>
							<div>
								<span>购买用户数：{{arr[3].val}}&nbsp;&nbsp;</span>
								<span>新购买用户数：{{arr[4].val}}</span>
							</div>
							<div>							
								<span>复购用户：{{arr[5].val}}</span>
								<span>活跃用户：{{arr[6].val}}</span>
							</div>
						</div>
					</li>
				</ul> -->
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

import { getUseranalysis,getConversion } from '../../../api/sellerStatistics';
import echarts from 'echarts';

export default {
	components: {
		"head-title" : HeadTitle,
		"onw-drop-down" : OneDropDown
	},
	computed: {
		...mapState({
			seller: state => state.seller.info
		}),
		tableDataEnd(){
			var arr = [];
			for(var i in this.tableData){
				i>0?arr.push(this.tableData[i]):''
			}
			return arr;
		}
		
	},
	data() {
		return {
			tableData:[
				[
					{code: "date", val: "日期"},
					{code: "total", val: "访问用户"},
					{code: "view_new", val: "新访问用户"},
					{code: "buy", val: "购买用户"},
					{code: "buy_new", val: "新购买用户"},
					{code: "fugou", val: "复购用户"},
					{code: "huoyue", val: "活跃用户"},
				]
			],
			showName1:'十天',
			showName2:'全部',
			searchArr:[
				// { title:"时间", value: 'sel_timeid' },
				{ title:"商品", value: 'goods_id' },
			],
			// 下拉框 数据
			oneDropDown:{
				sel_timeid:[ { name: '一周', id: '2' }, { name: '一个月', id: '3' }],
				goods_id:[ { name: '全部', id: '0' } ],
			},
			
			// 当前下拉框
			nowSelectArr:[],

			// 搜索 条件
			searchObj:{
				sel_timeid:2,
				goods_id:0,
			},
			nowOneDropDown:null,
			nowOneDropDownIndex:null,


			// 指定图表的配置项和数据
			options : {
				// ---- legend ----
				legend: {
					type: 'plain',  // 图列类型，默认为 'plain'
					top: '0.01%',  // 图列相对容器的位置 top\bottom\left\right
					selected: {
						// '销量': true  // 图列选择，图形加载出来会显示选择的图列，默认为true
					},
					textStyle: {  // 图列内容样式
						color: '#fff',  // 字体颜色
						backgroundColor: 'black'  // 字体背景色
					},
					tooltip: {  // 图列提示框，默认不显示
						show: true,
						color: 'red'  
					},
					data: [   // 图列内容
						// {
						// 	name: '销量',
						// 	icon: 'circle',
						// 	textStyle: {
						// 		color: 'red',  // 单独设置某一个图列的颜色
						// 		backgroundColor: '#fff' // 单独设置某一个图列的字体背景色
						// 	}
						// }
					]
				},
				// ---  提示框 ----
				tooltip: {
					show: true,   // 是否显示提示框，默认为true
					trigger: 'item', // 数据项图形触发
					axisPointer: {   // 指示样式
						type: 'shadow',
						axis: 'auto'
					},
					padding: 5,
					textStyle: {   // 提示框内容的样式
						color: '#fff'
					}
				},
				// ---- gird区域 ---
				gird: {
					show: false,    // 是否显示直角坐标系网格
					top: 80,  // 相对位置 top\bottom\left\right
					containLabel: false, // gird 区域是否包含坐标轴的刻度标签
					tooltip: {
						show: true,
						trigger: 'item',   // 触发类型
						textStyle: {
							color: '#666'
						}
					}
				},
				//  ------  X轴 ------
				xAxis: {
					show: true,  // 是否显示
					position: 'bottom',  // x轴的位置
					offset: 0, // x轴相对于默认位置的偏移
					type: 'category',   // 轴类型， 默认为 'category'
					nameTextStyle: {   // 坐标轴名称样式
						color: 'red',
						padding: [0, 0, 0, 0]
					},
					nameGap: 15, // 坐标轴名称与轴线之间的距离
					nameRotate: 0,  // 坐标轴名字旋转
					axisLine: {       // 坐标轴 轴线
						show: true,  // 是否显示
						symbol: ['none', 'arrow'],  // 是否显示轴线箭头
						symbolSize: [8, 8], // 箭头大小
						symbolOffset: [0, 7],  // 箭头位置
						// ------   线 ---------
						lineStyle: {
							color: 'linear-gradient(90deg, #fc6952 0%, #e53216 100%)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {    // 坐标轴 刻度
						show: true,  // 是否显示
						inside: true,  // 是否朝内
						length: 3,     // 长度
						lineStyle: {   // 默认取轴线的样式
							color: 'red',
							width: 1,
							type: 'solid'
						}
					},
					axisLabel: {    // 坐标轴标签
						show: true,  // 是否显示
						inside: false, // 是否朝内
						rotate: 0, // 旋转角度
						margin: 5, // 刻度标签与轴线之间的距离
						color: 'red'  // 默认取轴线的颜色 
					},
					data: ['访问用户数', '新访问用户数', '购买用户数', '新增购买用户数', '复购数', '活跃用户']
				},
				//   ------   y轴  ----------
				yAxis: {
					show: true,  // 是否显示
					position: 'left', // y轴位置
					offset: 0, // y轴相对于默认位置的偏移
					type: 'value',  // 轴类型，默认为 ‘category’
					name: '销量',   // 轴名称
					nameLocation: 'end', // 轴名称相对位置value
					nameTextStyle: {    // 坐标轴名称样式
						color: '#fff',
						padding: [0, 0, 0, 0]  // 坐标轴名称相对位置
					},
					nameGap: 15, // 坐标轴名称与轴线之间的距离
					nameRotate: 270,  // 坐标轴名字旋转

					axisLine: {    // 坐标轴 轴线
						show: true,  // 是否显示
						//  -----   箭头 -----
						symbol: ['none', 'arrow'],  // 是否显示轴线箭头
						symbolSize: [8, 8],  // 箭头大小
						symbolOffset: [0, 7], // 箭头位置

						// ----- 线 -------
						lineStyle: {
							color: ' #fc6952',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {      // 坐标轴的刻度
						show: true,    // 是否显示
						inside: true,  // 是否朝内
						length: 3,      // 长度
						lineStyle: {
							color: 'red',  // 默认取轴线的颜色
							width: 1,
							type: 'solid'
						}
					},
					axisLabel: {      // 坐标轴的标签
						show: true,    // 是否显示
						inside: false,  // 是否朝内
						rotate: 0,     // 旋转角度
						margin: 8,     // 刻度标签与轴线之间的距离
						color: 'red',  // 默认轴线的颜色
					},
					splitLine: {    // gird 区域中的分割线
						show: true,   // 是否显示
						lineStyle: {
							color: '#666',
							width: 1,
							type: 'dashed'
						}
					},
					splitArea: {     // 网格区域
						show: false   // 是否显示，默认为false
					}
				},
				//  -------   内容数据 -------
				series: [
					{
						name: '销量',      // 序列名称
						type: 'bar',      // 类型
						legendHoverLink: true,  // 是否启用图列 hover 时的联动高亮
						label: {   // 图形上的文本标签
							show: false,
							position: 'insideTop', // 相对位置
							rotate: 0,  // 旋转角度
							color: '#eee'
						},
						itemStyle: {    // 图形的形状
							color: 'linear-gradient(90deg, #fc6952 0%, #e53216 100%)',
							barBorderRadius: [18, 18, 0 ,0]
						},
						barWidth: 20,  // 柱形的宽度
						barCategoryGap: '20%',  // 柱形的间距
						data: [460,310,260,210,260,210]
					},
				]
			},

			option : {
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data:['访问用户','新增用户','新访问用户','购买用户','复购用户','活跃用户']
				},
				calculable : true,
				xAxis : [
					{
						type : 'category',
						data : ['第1天','第2天','第3天','第4天','第5天','第6天','第7天','第8天','第9天','第10天','第11天']
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
							name:'访问用户',
							type:'bar',
							data:[ 0,0,0,0,0, 0,0,0,0,0 ]
					},
					{
							name:'新增用户',
							type:'bar',
							data:[ 0,0,0,0,0, 0,0,0,0,0 ]
					},
					{
							name:'新访问用户',
							type:'bar',
							data:[ 0,0,0,0,0, 0,0,0,0,0 ]
					},
					{
							name:'购买用户',
							type:'bar',
							data:[ 0,0,0,0,0, 0,0,0,0,0 ]
					},
					{
							name:'复购用户',
							type:'bar',
							data:[ 0,0,0,0,0, 0,0,0,0,0 ]
					},
					{
							name:'活跃用户',
							type:'bar',
							data:[ 0,0,0,0,0, 0,0,0,0,0 ]
					},
				]
			}

		};
	},

	// 初始化 加载数据
	created() {
		// console.log(this.seller.seller_id);
		this.loading(this.options);
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
				this.searchObj ={
					sel_timeid:0,
					product:0,
					product_type:0,
					from:0,
					terminal:0,
					sel_timeid:this.searchObj.sel_timeid
				};
				this.showName2 = v[0].name;
			}else{
				this.showName1 = v[0].name;
			}
			
			this.searchObj[this.nowOneDropDown] = v[0].id;

			this.searchArr = [
				// { title:this.searchArr[0].title,value:this.searchArr[0].value },
				{ title:"商品", value: 'goods_id' },
			]

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
			getUseranalysis(this.seller.seller_id,this.searchObj).then(res => {
				if (res) {
					// console.log(res);
					var seltag = res.result.seltag;
					// 
					this.oneDropDown.sel_timeid = seltag.seltime;
					
					this.oneDropDown.goods_id = [{name:"全部",id:0}];
					
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
					let myChart = echarts.init(document.getElementById('high'));

					// var obj = res.result.statisticinfo;
					var arr = res.result.table;
					for( var i = 1; i<arr.length; i++ ){
						var item = arr[i];
						// console.log(item[1].code,item[1].val);
						this.option.series[0].data[i-1] = item[1].val;
						this.option.series[1].data[i-1] = item[2].val;
						this.option.series[2].data[i-1] = item[3].val;
						this.option.series[3].data[i-1] = item[4].val;
						this.option.series[4].data[i-1] = item[5].val;
						this.option.series[5].data[i-1] = item[6].val;	
						// console.log(this.option.series[5].data);					
					}
					// console.log(this.option);
					myChart.setOption(this.option);


					// 好看
					// let myChart = echarts.init(document.getElementById('high'));
					// myChart.setOption(this.option);

					// 滑动框
					// document.getElementById('high').style.width = $(document).width()+(6*90)+'px';
					// let myChart = echarts.init(document.getElementById('high'));
					// myChart.setOption(this.options);


					// 目前
					// for(var index in this.option.series){
					// 	var item = this.option.series[index];
					// 	if( index == 0 ){
					// 	 item.data = [obj.total]
					// 	}else if( index == 1 ){
					// 	 item.data = [obj.view_new]
					// 	}else if( index == 2 ){
					// 	 item.data = [obj.buy]
					// 	}else if( index == 3 ){
					// 	 item.data = [obj.buy_new]
					// 	}else if( index == 4 ){
					// 	 item.data = [obj.fugou]
					// 	}else if( index == 5 ){
					// 	 item.data = [obj.huoyue]
					// 	}
					// }
					// this.option.xAxis[0].data = ['一周'];
					// if( this.searchObj.sel_timeid == 3){
					// 	this.option.xAxis[0].data = ['一个月'];
					// }
					// let myChart = echarts.init(document.getElementById('high'));
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
		padding: 1.43rem;
		overflow: scroll;
		margin-top: -1px;
		background: #626771;
    padding: .5rem 0 1rem 1.43rem;
    overflow: scroll;
    margin-top: -1px;
		ul{
			// color: #fff;
    	color: #A4ABB3;
			font-size: 1.43rem;
			width: max-content;
			li{
				display: inline-block;
				margin-right: 1.8rem;
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
		box-sizing: border-box;
		width: 100%;
		overflow-x: scroll;
		

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

		.echart_cont{
			overflow: scroll;
			width: 100%;
		}
	}
}
</style>
