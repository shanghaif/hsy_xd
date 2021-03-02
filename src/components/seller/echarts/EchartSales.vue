<template>
	<div class="container">
		<!-- <div class="common-header-wrap"> -->
			<!-- <mt-header title="店铺统计" class="common-header"><mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button></mt-header> -->
		<!-- </div> -->
		<!-- <my-highcharts id="high" class="high" :option="stattoday_json"></my-highcharts> -->
		<!-- <my-highcharts id="high" class="high" :option="option"></my-highcharts> -->
		<!-- 说明 -->
		<div class="info">
			<p>近三十天销售走势</p>
			<div class="monery">下单金额</div>
		</div>
		<div id="high"  style="width: 100;height: 200px;">

		</div>
	</div>
</template>

<script>
// import MyHighcharts from './MyHighcharts';
import { getStatisticsGeneral } from '../../../api/sellerStatistics';
import echarts from 'echarts';
export default {
	name: 'StatisticsGeneral',
	// components: {
	// 	MyHighcharts
	// },
	data() {
		return {
			goodstop30_arr: '',
			stattoday_json: {},
			statnew_arr: '',
			stat_time: '',
			option: {
				title: {
					text: "3265",
					x: "center",
					textStyle: {
						//文字颜色
						color:'#161616',
						fontStyle:'normal',
						fontWeight:'500',
						fontFamily:'PingFangSC-Medium, PingFang SC',
		　　　　 fontSize:22,
					},
					subtextStyle: {
						fontFamily: 'Arial, Verdana, sans...',
						fontSize: 128,
						fontStyle: 'normal',
						fontWeight: 'normal',
					},
				},
				
				// ---  提示框 ----
				tooltip: {
					show: true,   // 是否显示提示框，默认为true
					trigger: 'item', // 数据项图形触发
					axisPointer: {   // 指示样式
						type: 'shadow',
						axis: 'auto'
					},
					backgroundColor:"#FFDDDD",
					borderColor:'#000',
					padding: 5,
					// textStyle: {   // 提示框内容的样式
					// 	color: '#fff'
					// },
					formatter:function(obj){						
						return`<div class="sty-tool">
							<p style="color:#6F6F6F">${JSON.stringify(obj.name).split('"')[1]}</p>
							<p style="color:#161616">下单金额：${obj.value}</p>
						</div>`
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					// data: ["8-30","8-31","9-1","9-2","9-3","9-4","9-5","9-6","9-7","9-8","9-9","9-10","9-11","9-12","9-13","9-14","9-15","9-16","9-17","9-18","9-19","9-20","9-21","9-22","9-23","9-24","9-25","9-26","9-27","9-28"]
					data: [],
					axisLabel: {  
						interval:0,
						rotate:40,
						fontSize:8
					},
					axisLine:{
						lineStyle:{
							color:'#6F6F6F',
							width:1,
						}
					}
				},
				yAxis: {
					type: 'value',
					show:false,
				},
				series: [
					{
						data: [],
						type: 'line',
						smooth:true, // 平滑曲线
						// symbol: 'none', // 节点
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										// color: 'rgba(255, 0, 0, 0.18)' // 0% 处的颜色
										color: '#FFD5D5' // 0% 处的颜色
									},
									{
										offset: 1,
										// color: 'rgba(255, 255, 255, 0.01)' // 100% 处的颜色
										color: '#FFFFFF' // 100% 处的颜色
									}
								]
							}
						}
					}
				]
			},
		};
	},
	created() {
		this.getStatisticsGeneral();
	},
	computed: {},
	mounted() {},
	beforeDestroy() {},
	methods: {
		// 最近30天销售数据
		getStatisticsGeneral() {
			getStatisticsGeneral().then(res => {
				if (res) {
					var arr = [];
					for( var i in res.result.arrar.data){
						if( i%2 == 0 ){
							arr.push(res.result.arrar.data[i]);
						}
					}
					this.option.xAxis.data = arr;
					this.option.series[0].data = res.result.arrar.name;
					// this.option.series[0].data = [
					// 	8,7,8,5,6,
					// 	4,8,5,4,6,
					// 	7,8,6,5,9,
					// 	6,7,4,5,6,
					// 	4,8,5,4,6,
					// 	8,9,6,5,9
					// ]
					
					var brr = [];
					var text = 0;
					for( var i in this.option.series[0].data){
						text += (+this.option.series[0].data[i]);
						if( i%2 == 0 ){
							brr.push(this.option.series[0].data[i]);
						}
					}
					this.option.title.text = text;
					this.option.series[0].data = brr;
					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(document.getElementById('high'));
					// 绘制图表
					myChart.setOption(this.option);
					// this.option.xAxis.data = JSON.parse(res.result.arrar.data);
					// this.option.series[0].data = JSON.parse(res.result.arrar.name);
					// console.log(this.option);
					// this.goodstop30_arr = res.result.goodstop30_arr;
					// this.stattoday_json = JSON.parse(res.result.stattoday_json); // 字符串转JSON格式
					// this.stattoday_json.options = JSON.parse(res.result.stattoday_json);
					// console.log(this.stattoday_json)
					// this.option.xAxis.data = res.result.arrar.data.split(',');
					// console.log();
					// var arr = [];
					// for( var item of res.result.arrar.data.split(',')){
					// 	this.option.xAxis.data = res.result.arrar.data
					// }
					// for( var item of res.result.arrar.name.split(',')){
					// 	this.option.series[0].data.push(parseInt(item));
					// }
					// console.log(this.option);
					// this.option.series[0].data = res.result.arrar.name.split(',');
					// this.statnew_arr = res.result.statnew_arr;
					// this.stat_time = res.result.stat_time;
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container{
	.info{
		padding-top: 4rem;
		text-align: center;
		font-size: 15px;
		font-weight: 500;

		.monery{
			margin-top: 1.8rem;
			margin-bottom: 1.2rem;
			color:#6F6F6F;
			font-size: 12px;
		}
	}
}
</style>
