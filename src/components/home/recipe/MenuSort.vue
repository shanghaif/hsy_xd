<template>
	<div>
		<ul class="select-nav">
			<li class="select-nav-item" v-for="(item, index) in selectNav" :key="index" @click="item.trangleTop = !item.trangleTop,addstyle(index,item.trangleTop),currId=index" :class="index==currId?'NavActive':''">
				{{ item.name }}
				<div v-if="item.trangle" >
					<span class="sanjiao-top" :class="item.trangleTop?'trangleActiveTop':''"></span>
					<span class="sanjiao-bottom" :class="item.trangleTop?'':'trangleActiveBottom'"></span>
				</div>
			</li>
		</ul>
	</div>
	
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
export default {
	data() {
		return {
			showMenuClass: false,
			selectNav: [
				{
					key: '',
					order: '',
					name: '综合排序',
					isMore: false,
					id: 0,
					trangle:false
				},
				{
					key: 'goods_salenum',
					order: '',
					name: '精选',
					isMore: false,
					id: 1,
					trangle:false
				},
				{
					key: 'goods_addtime',
					order: '',
					name: '最新',
					isMore: false,
					id: 2,
					trangle:true,
					trangleTop:true,
					tranglebottom:false
				},
				{
					key: 'goods_addtime',
					order: '',
					name: '难易程度',
					isMore: false,
					id: 3,
					trangle:true,
					trangleTop:true,
					tranglebottom:false
				},
			],
			num:'',
			currId:0,
			trangleTop:true
		};
	},
	components: {},
	mounted() {
		resetRem();
	},
	created: function() {},
	computed: {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		addstyle(index,trangleTop) {
			this.num = index
			this.trangleTop = trangleTop
			let sortInfo = {
				num : this.num,
				trangleTop:this.trangleTop
			}
			this.$emit('onChange',sortInfo)
		}
	}
};
</script>

<style lang="scss" scoped>
	.select-nav {
		padding: 1.14rem 3.48rem;
		display: flex;
		justify-content: space-between;
		
		.select-nav-item {
			display: flex;
			font-size: 1.14rem;
			font-weight: 400;
			color: #161616;
			align-items: center;
			&.NavActive {
				font-size: 1.33rem;
				font-weight: 600;
				color: red;
			}
			div {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 0.19rem;
				.sanjiao-top {
					width: 0;
					height: 0;
					border-right: 0.45rem solid transparent;
					border-left: 0.45rem solid transparent;
					border-bottom: 0.45rem solid #6F6F6F;
					margin-bottom: 0.19rem;
					&.trangleActiveTop {
						border-bottom: 0.45rem solid red;
					}
				}
				.sanjiao-bottom {
					width: 0;
					height: 0;
					border-right: 0.45rem solid transparent;
					border-left: 0.45rem solid transparent;
					border-top: 0.45rem solid #6F6F6F;
					&.trangleActiveBottom {
						border-top: 0.45rem solid red;
					}
				}
			}
		}
	}
</style>
