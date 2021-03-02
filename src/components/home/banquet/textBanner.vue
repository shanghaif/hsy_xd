<template>
	<div class="banner-bg" :style="{ background: bgcolor ? bgcolor : 'rgba(253, 245, 199, 1)' }">
		<div class="banner-wrap">
			<ul class="marquee-box" id="marquee-box">
				<!-- 循环3次为了无缝衔接， 给第一个设置Id 方便计算文字宽度 -->
				<li class="marquee-list" :style="{ color: color }" v-for="i in 3" :id="i == 1 ? 'marquee' : ''">{{ content }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			Timer: null
		};
	},
	props: {
		bgcolor: String, // 背景颜色
		color: String, // 标题文字颜色
		content: String //文字内容
		// 标题
	},
	mounted() {
		setTimeout(() => {
			this.runMarquee();
		}, 1000);
	},
	beforeDestroy(){
		clearInterval(this.Timer);
		this.Timer = null;
	},
	methods: {
		runMarquee() {
			// 获取文字 计算后宽度
			var width = document.getElementById('marquee').getBoundingClientRect().width,
				marquee = document.getElementById('marquee-box'),
				disx = 0; // 位移距离
			//设置位移
			this.Timer = setInterval(() => {
				disx--; // disx-=1; 滚动步长
				if (-disx >= width) {
					disx = 10; // 如果位移超过文字宽度，则回到起点  marquee-list的margin值
				}
				// marquee.style.transform = 'translateX(' + disx + 'px)'
				marquee.style.left = disx + 'px';
				// console.log(123456);
			}, 30); //滚动速度
		}
	}
};
</script>

<style lang="scss" scoped>
.banner-bg {
	height: 3.33rem;
	position: relative;
	box-shadow: 0rem 0rem 0.95rem 0.62rem rgba(242, 242, 242, 0.54);
	font-size: 1.14rem;
	.banner-wrap {
		width: 90%;
		height: 100%;
		margin: auto;
		overflow: hidden;
		position: relative;
	}
	/* 以下代码与滚动相关 */
	.marquee-box {
		position: absolute;
		top: 50%;
		display: flex;
		white-space: nowrap;
		transform: translateY(-50%);
	}
	.marquee-list {
		margin-right: 10px;
	} /* 此处“px”方便回到起点 */
}
</style>
