<template>
	<div class="container">
		<div class="header-wrap">
			<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-black-left.png" alt="" />
			<span class="header-title">{{ title }}</span>
			<div class="header-right"></div>
		</div>
		<div class="content">
			<div class="list-title">厨师列表</div>
			<!-- v-infinite-scroll="getMoreCook" infinite-scroll-disabled="loading" infinite-scroll-distance="10" -->
			<ul class="cook-list">
				<li class="cook-list-item" v-for="(item, index) in cookList" :key="index">
					<div class="cook-info">
						<img :src="item.member_avatar" alt="" class="avatar"  @click="goCookHome(item.member_id)"/>
						<!-- <img src="" alt="" class="avatar" /> -->
						<div class="cook-wrap">
							<div class="cook-title"  @click="goCookHome(item.member_id)">
								<span class="cook-name">厨师:</span>
								{{ item.cook_name }}
							</div>
							<div class="cook-store" @click="goStore(item.store_id)">
								<span>所属饭店:</span>
								{{ item.restaurant }}
							</div>
						</div>
						<div class="bottom-button">
							<!-- <img @click="cookTthumbsIs(index, item.cook_id)" :src="item.cook_thumbs_is == 1 ? zanRed : zanBlock" alt="" /> -->
							<img :src="zanBlock" alt="" />
							<span>{{ item.thumbs_num }}</span>
						</div>
					</div>
					<div class="menu-goods">拿手菜品</div>
					<div class="menu-function">
						{{ item.adept_menu }}
						<!-- qqq -->
					</div>
					<div class="del-cont">
						<div @click="editCook(item)" class="del-cook">编辑厨师</div>
						<div @click="deleteCook(item)" class="del-cook">删除厨师</div>
					</div>
				</li>
			</ul>
			<!-- <div class="loading-wrapper" v-if="cookInfo.length > 0">
				<p class="common-no-more" v-if="!isMoreCook">没有更多了</p>
				<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMoreCook"></mt-spinner>
			</div> -->
		</div>
		<div
			v-if="cookList.length <= 0"
			style="text-align: center;
		padding: 10rem 0;font-size: 1.1rem;"
		>
			厨师列表为空
		</div>
		<div class="addCook" @click="addCook"><div>添加厨师</div></div>
	</div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import { mapState, mapMutations } from 'vuex'; 
import { manageCooklist, selStoreCook } from '@/api/homeMenu';
export default {
	data() {
		return {
			title: '餐馆管理',
			cookList: [],
			zanBlock: require('@/assets/image/icon2/icon-zan-black.png'),
			zanRed: require('@/assets/image/icon2/icon-zan-red.png')
		};
	},
	components: {},
	// props: ['menuList','index'],
	mounted() {
		resetRem();
		// this.menuLists = this.menuList;
	},
	created: function() {
		this.manageList();
		// this.store this.seller.store_id
		// console.log(this.seller,'seller')
	},
	computed: {
		...mapState({
			isOnline: state => state.seller.isOnline,
			seller: state => state.seller.info
		})
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		// 编辑 厨师
		editCook(item){
			// console.log(item);
			this.$router.push({ name: 'HomeAddCook',query: { member_id:item.member_id } });
		},

		// 删除 厨师
		deleteCook(item){
			MessageBox.confirm('确定删除此厨师?').then(action => {				
				selStoreCook(item.cook_id).then(res=>{
					Toast(res.message);
					this.manageList();
				}).catch(err=>{
					Toast(err.message);
				})
			})
		},

		addCook() {
			if (this.isOnline) {
				this.$router.push({ name: 'HomeAddCook', query: { store_id: this.seller.store_id } });
			} else {
				this.showLogin();
			}
		},
		showLogin() {
			this.$router.push({ name: 'HomeMemberLogin' });
		},
		manageList() {
			var that = this;
			manageCooklist({ store_id: this.seller.store_id }).then(res => {
				that.cookList = res.result.cook_list;
				// Toast(res.message);
			});
		},
		// 厨师列表点赞
		// cookTthumbsIs(index, id) {
		// 	if (this.cookList[index].cook_thumbs_is == 1) {
		// 		this.cookList[index].cook_thumbs_is = 0;
		// 	} else {
		// 		this.cookInfo[index].cook_thumbs_is = 1;
		// 	}
		// 	console.log(this.cookInfo[index].cook_thumbs_is);
		// 	let thumbsParams = {};
		// 	thumbsParams.cook_id = id;
		// 	thumbsParams.type = 1;
		// 	console.log(thumbsParams, 'thumbsParams');
		// 	var that = this
		// 	sendThumbs(thumbsParams).then(res => {
		// 		Toast(res.message)
		// 		// that.getCooksList()
		// 	});
		// 	// debugger
		// },
		goCookHome(id) {
			if (this.isOnline) {
				this.$router.push({ name: 'CookHome', query: { member_id: id, isfrom: 'cookhome' } });
			}else{
				Toast("请先去登录");
			}
		},
		goStore(id) {
			if(id) {
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: id } });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f4f5f7;
	min-height: 90vh;
	padding-bottom: 5rem;
}
.header-wrap {
	background-color: #fff;
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
.list-title {
	margin: 2.86rem 1.43rem 0.96rem;
	font-size: 1.34rem;
	font-weight: 600;
	color: #161616;
}
.cook-list {
	padding: 0.48rem 1.43rem;
	background-color: #f4f5f7;
	.cook-list-item {
		background-color: #fff;
		padding: 1.9rem 1.43rem;

		border-radius: 0.77rem;
		margin-bottom: 1.2rem;
		.cook-info {
			display: flex;
			padding: 0 0 1.43rem;
			align-items: center;
			img {
				width: 3.33rem;
				height: 3.33rem;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 1.05rem;
			}
			div.cook-wrap {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.cook-title {
					font-size: 1.14rem;
					font-weight: 400;
					color: #161616;
					.cook-name {
						margin-right: 1rem;
					}
				}
				.cook-store {
					margin-top: 0.29rem;
					font-size: 0.95rem;
					font-weight: 400;
					color: #6f6f6f;
					span {
						margin-right: 1rem;
					}
				}
			}
		}
		.menu-goods {
			font-size: 1.14rem;
			font-weight: 500;
			color: #161616;
		}
		.menu-function {
			margin-top: 0.95rem;
			font-size: 1.14rem;
			font-weight: 400;
			color: #6f6f6f;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
		.del-cont{
			display: flex;
			justify-content: flex-end;
		}
		.del-cook {
			text-align: right;
			margin-top: 1.43rem;
			font-size: 1.15rem;
			font-weight: 400;
			color: #e53216;
			margin-left: 2rem;
		}

		.bottom-button {
			font-size: 1.14rem;
			font-weight: 400;
			color: #161616;
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			img {
				border-radius: 0;
				width: 1.43rem;
				height: 1.43rem;
				&:last-child {
					margin-left: 1.9rem;
				}
			}
			text-align: right;
		}
	}
}
.addCook {
	position: fixed;
	bottom: 1.5rem;
	width: 100%;

	text-align: center;
	div {
		width: 90%;
		height: 3.81rem;
		line-height: 3.81rem;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		box-shadow: 0rem 0rem 0.96rem 0rem rgba(251, 104, 84, 0.5);
		border-radius: 1.91rem;
		font-size: 1.34rem;
		font-weight: 400;
		color: #ffffff;
		text-shadow: 0px 0px 1px rgba(251, 104, 84, 0.5);
		margin: 0 auto;
	}
}
</style>
