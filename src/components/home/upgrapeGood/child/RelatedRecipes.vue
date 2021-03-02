<template>
	<!-- 相关菜谱 -->
	<div class="container">
		<p class="title">
			<span></span>
			<span>相关菜谱</span>
		</p>
		<!-- <div class="menu-wrap"> -->
		<div>
			<!--v-for="(item,index) in menuList" :key='index' -->
			<ul class="list-title">
				<li class="title-item" @click="changes(key)" :class="{ active: key == num }" v-for="(item, key) in menuList" :key="key">{{ item.menu_title }}</li>
			</ul>
			<div class="list-content">
				<div class="list-item" v-show="key == num" v-for="(item, key) in menuList" :key="key">
					<div class="img-wrap" @click="goMenuDetail(item.menu_id)"><img :src="item.menu_image" alt="" /></div>
					<div class="list-item-right">
						<p class="item-content-title" @click="goMenuDetail(item.menu_id)">{{ item.menu_title }}</p>
						<div class="item-info-wrap">
							<span>{{ item.cooking_material_count }}种食材</span>
							<div
								@click="(item.menu_collection_is = !item.menu_collection_is), shoucangMethod(item.menu_id, item.menu_collection_is)"
								:class="{ dianRed: item.menu_collection_is }"
							>
								<img :src="item.menu_collection_is ? shoucangRed : shoucangBlack" alt="" />
								<span></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- </div> -->
	</div>
</template>
<script>
import { shoucangSend, quxiaoshoucang } from '@/api/homeMenu';
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			shoucang: false,
			shoucangRed: require('@/assets/image/icon2/icon-heart-red.png'),
			shoucangBlack: require('@/assets/image/icon2/icon-heart-transparent.png'),
			num: ''
		};
	},
	created() {},
	components: {},
	computed: {
		...mapState({
			menuList: state => state.goodsdetail.menuList
		})
	},
	mounted() {},
	methods: {
		// ...mapMutations({
		// 	saveMenuList:'saveMenuList'
		// }),
		changes(key) {
			this.num = key;
		},
		goMenuDetail(id) {
			this.$router.push({ name: 'HomeMenuDetail', query: { menu_id: id } });
		},
		shoucangMethod(id, isshoucang) {
			var that = this;
			if (isshoucang) {
				shoucangSend({ menu_id: id }).then(res => {
					Toast(res.message);
				});
			} else {
				quxiaoshoucang({ menu_id: id }).then(res => {
					Toast(res.message);
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.menu-wrap {
}
.container {
	margin-top: 0.95rem;
	background-color: #fff;
	padding: 1.43rem;
	box-sizing: border-box;
	p.title {
		display: flex;
		align-items: center;
		span {
			&:nth-child(1) {
				vertical-align: middle;
				display: inline-block;
				width: 0.38rem;
				height: 1.38rem;
				background: linear-gradient(139deg, #ff9494 0%, #e63116 100%);
				border-radius: 0.19rem;
				margin-right: 0.48rem;
			}
			&:nth-child(2) {
				font-size: 1.33rem;
				font-weight: 600;
				color: #161616;
			}
		}
	}
	.list-title {
		margin-left: 0.43rem;
		display: flex;
		flex-wrap: nowrap;
		// justify-content: space-between;
		overflow-x: scroll;
		margin-top: 0.95rem;
		.title-item {
			font-size: 1.14rem;
			font-weight: 400;
			color: #161616;
			margin-right: 1.95rem;
			flex-shrink: 0;
			height: 2.5rem;
			&.active {
				color: #e63116;
				position: relative;
				&::after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translate(-50%, 0);
					width: 1.8rem;
					height: 0.19rem;
					background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
					border-radius: 0.19rem;
				}
			}
		}
	}
	.list-content {
		margin-top: 0.95rem;
		display: flex;
		overflow-x: scroll;
		.list-item {
			background: #ffffff;
			border-radius: 0.38rem;
			border: 1px solid #efefef;
			display: flex;
			width: 100%;
			overflow: hidden;
			border-radius: 0.76rem;
			.img-wrap {
				height: 8.67rem;
				flex-shrink: 0;
				max-width: 16.19rem;
				img {
					// width: 100%;
					height: 100%;
				}
			}

			.list-item-right {
				flex: 1;
				padding: 2.14rem 1.86rem 2.14rem 1.43rem;
				min-width: 7rem;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.item-content-title {
					font-size: 1.14rem;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #161616;
				}
				.item-info-wrap {
					display: flex;
					span {
						font-size: 1.05rem;
						font-weight: 400;
						color: #6f6f6f;
					}
					div {
						margin-left: auto;
						font-size: 1.05rem;
						font-weight: 400;
						color: #6f6f6f;
						display: flex;
						align-items: center;
						img {
							width: 0.86rem;
							height: 0.81rem;
							margin-right: 0.25rem;
						}
					}
				}
			}
		}
	}
}
</style>
