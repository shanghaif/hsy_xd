<template>
	<!-- <div class="x-bar"><div :id="id" :option="option"></div></div> -->
	<div class="x-bar"><div :id="id" style="width: 100;height: 300px;"></div></div>
</template>
<script>
// import HighCharts from 'highcharts';
import echarts from 'echarts';
export default {
	data() {
		return {
			options: {
				xAxis: {
					type: 'category',
					boundaryGap: false,
					// data: ["8-30","8-31","9-1","9-2","9-3","9-4","9-5","9-6","9-7","9-8","9-9","9-10","9-11","9-12","9-13","9-14","9-15","9-16","9-17","9-18","9-19","9-20","9-21","9-22","9-23","9-24","9-25","9-26","9-27","9-28"]
					data: []
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						// data: [0,15.9,10.8,0.8,0,0,0,1.7,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0.9,0,25.4,0,0,0,0,0],
						data: [],
						type: 'line',
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
										color: 'rgba(255, 0, 0)' // 0% 处的颜色
									},
									{
										offset: 1,
										// color: 'rgba(255, 255, 255, 0.01)' // 100% 处的颜色
										color: 'rgba(255, 255, 255)' // 100% 处的颜色
									}
								]
							}
						}
					}
					
				]
			}
		};
	},
	// 验证类型
	props: ['id', 'option'],
	watch: {
		option() {
			this.drawLine();
		}
	},
	mounted() {
		// HighCharts.chart(this.id, this.option);
		this.$nextTick(function() {
			this.drawLine();
		});
	},
	methods: {
		drawLine() {
			this.options.xAxis.data = this.option.xAxis.data;
			this.options.series[0].data = this.option.series[0].data;
			console.log(this.options);
			// 基于准备好的dom，初始化echarts实例
			let myChart = echarts.init(document.getElementById(this.id));
			// 绘制图表
			myChart.setOption(this.options);
		}
	}
};
</script>
