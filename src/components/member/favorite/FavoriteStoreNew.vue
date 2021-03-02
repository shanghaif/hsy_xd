<template>
	<div class="container">
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">关注店铺</span>
			<span></span>
		</div>
		<div v-if="favorites_list && favorites_list.length">
			<mt-cell-swipe class="store-item" v-for="(item, index) in favorites_list" v-bind:key="item.fav_id" :right="rightBottom(item.fav_id)">
				<div class="info-wrap" @click="goStoreDetail(item)">
					<div class="p-img"><img class="collection-img" v-bind:src="item.store_avatar_url" /></div>
					<div class="flex-right">
						<span class="title">{{ item.store_name }}</span>
						<span class="guanzhu">{{item.store_collect}}人关注</span>
					</div>
					<img class="icon-more" src="@/assets/image/icon2/icon-more2.png" alt="">
				</div>
			</mt-cell-swipe>
		</div>
		<empty-record2 isFrom='content' v-else-if="favorites_list && !favorites_list.length"></empty-record2>
	</div>
</template>
<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast, Indicator, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getFavoriteStoreList, delFavoriteStore } from '../../../api/memberFavorite';
export default {
	components: {
		EmptyRecord2
	},
	name: 'MemberFavoriteStore',
	data() {
		return {
			favorites_list: false
		};
	},
	created: function() {
		this.getFavoriteStoreList();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 左滑事件
		rightBottom(favId) {
			return [
				{
					content: '取消关注',
					style: { background: 'red', color: '#fff' },
					handler: () =>
						MessageBox({
							title: '确认删除',
							message: '是否要取消关注此店铺？',
							showCancelButton: true
						}).then(action => {
							if (action === 'confirm') {
								this.getCancelCollection(favId);
							}
						})
				}
			];
		},
		// 查看 店铺i 详情
		goStoreDetail(item) {
			var str = '3,4,7,8,9,10,47,48,49,50';
			if( str.indexOf(item.storeclass_id) != -1){
				this.$router.push({ name: 'HomeStoreFoodslist', query: { id: item.store_id } });				
			}else{
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: item.store_id } });	
			}
			
		},
		// 取消收藏店铺数据
		getCancelCollection(favId) {
			delFavoriteStore(favId).then(res => {
				if (res) {
					this.getFavoriteStoreList();
				}
			});
		},
		getFavoriteStoreList() {
			Indicator.open();
			getFavoriteStoreList(this.page, {})
				.then(res => {
					Indicator.close();
					this.favorites_list = res.result.favorites_list;
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.header-wrap {
	padding: 1rem 1.43rem;
	position: relative;
	display: flex;
	justify-content: space-between;
	img {
		// position: absolute;
		// left: 1.78rem;
		// top: 50%;
		width: 1.74rem;
		height: 1.74rem;
		// transform: translate(0, -50%);
	}
	.header-title {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.39rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
	}
	.header-right {
		img {
			width: 1.71rem;
			height: 1.71rem;
			&:last-child {
				margin-left: 1.43rem;
			}
		}
	}
}
.store-item {
	width: 100%;
}
.store-item div.info-wrap {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 1.14rem 2.23rem 1.14rem 1.42rem ;
}
.store-item .p-img {
}
.store-item .p-img img {
	width: 4.38rem;
	height: 4.38rem;
	border-radius: 50%;
}
.store-item .icon-more {
	width: 1.52rem;
	height: 0.38rem;
	flex-shrink: 0;
}
.flex-right {
	margin-left: 1.42rem;
	flex-direction: column;
	flex: 1;
	display: flex;
	justify-content: space-around;
}
.flex-right span.title {
	font-size: 1.33rem;
	font-weight: 600;
	color: #161616;
}
.flex-right span.guanzhu {
	margin-top: 0.3rem;
	font-size: 1.04rem;
	font-weight: 400;
	color: #6F6F6F;
}
</style>

<!--Cell Swipe样式覆盖 -->
<style>
.store-item .mint-cell-swipe-button {
	width: 100%;
	font-size: 1.14rem;
	display: flex !important;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	background: linear-gradient(270deg, #FFBD00 0%, #FF9A69 100%)!important;
}
.store-item .mint-cell-wrapper {
	padding: 0;
}
.store-item .mint-cell-wrapper .mint-cell-value {
	width: 100%;
	/* border-bottom: 1px solid rgba(232, 234, 237, 1); */
}
</style>
