<template>
	<div class="container">
		<!-- <div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">菜谱分类</span>
			<span></span>
			<img @click="onSearch" src="@/assets/image/icon2/icon-search-black.png" alt="" />
		</div> -->
		<head-title title="菜谱分类"></head-title>
		<div class="menu-class">
			<ul class="menu-class-item" v-for="(item,index) in menuClassList" :key='index'>
				<!-- v-for="(item,index) in menuClassList" :key='index' -->
				<p class="item-title">
					{{item.class_title}}
				</p>
				<li class="item-wrap">
					<div v-for="(item,index) in item.tow_list" :key='index' @click="goMenuDetail(item.class_id,item.class_title)">
						<img :src="item.class_image" alt="" />
						<!-- :src="item.class_image" -->
						<p>
							{{item.class_title}}
						</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import HeadTitle from '../../HeadTitle';
import { resetRem, resumeRem } from '@/util/rem';
import { getMenuClass } from '@/api/homeMenu';
export default {
	data() {
		return {
			menuClassList: []
		};
	},
	components: {		HeadTitle},
	mounted() {
		resetRem();
	},
	created: function() {
		this.getMenuClassList();
	},
	computed: {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		getMenuClassList() {
			getMenuClass().then(res => {
				this.menuClassList = res.result;
			});
		},
		onSearch() {
			this.$router.push({ name: 'HomeSearch', params: { menu: true } });
		},
		goMenuDetail(menu_id,class_title) {
			this.$router.push({ name: 'HomeRecipe', query: { menu_id: menu_id,isFrom:'menuClass',menuPageTitle:class_title } });
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	.header-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.24rem 1.43rem;
		font-size: 1.39rem;
		font-weight: 400;
		color: #161616;
		margin-bottom: 1.43rem;
		img {
			width: 1.71rem;
			height: 1.71rem;
		}
	}
	.menu-class {
		box-sizing: border-box;
		padding: 0 1.43rem;
		.menu-class-item {
			margin-top: 1.43rem;
			.item-title {
				margin-bottom: 0.95rem;
				font-size: 1.52rem;
				font-weight: 600;
				color: #161616;
			}
			.item-wrap {
				display: flex;
				flex-wrap: wrap;
				div {
					margin-bottom: 1.43rem;
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;
					img {
						width: 6.67rem;
						height: 6.67rem;
					}
					p {
						margin-top: 0.67rem;
						font-size: 1.14rem;
						font-weight: 400;
						color: #161616;
						text-align: center;
						
					}
				}
			}
		}
	}
}
</style>
