<template>
	<div class="list-content">
		<ul class="list-wrap" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li class="list-item" v-for="(item, index) in menuLists" :key="index">
				<div class="img-center">
					<img v-if="item.menu_image" :src="item.menu_image" alt="" @click="goMenuDetail(item.menu_id)" />
					<img v-else src="" alt="" @click="goMenuDetail(item.menu_id)" />
				</div>

				<div class="menu-list-info">
					<div class="menu-list-info-top">
						<span @click="goMenuDetail(item.menu_id)">{{ item.menu_title }}</span>

						<span class="dianzan" v-if="isFrom == 'createdMenu'">
							<img :src="zanBlock" alt="" />
							<span class="zanshu">获赞数</span>
							{{ item.thumbs_num }}
						</span>
						<span v-else class="dianzan" @click="MenuTthumbsIs(index, item.menu_id)" :class="{ dianRed: item.menu_thumbs_is == 1 }">
							<img :src="item.menu_thumbs_is == 1 ? zanRed : zanBlock" alt="" />
							<span v-if="isFrom == 'createdMenu'" class="zanshu">获赞数</span>
							{{ item.thumbs_num }}
						</span>
					</div>
					<div class="cook-info" v-if="isFrom != 'createdMenu' && item.cook_info">
						<img @click="goCookHome(item.cook_info.member_id)" v-if="item.cook_info.member_avatar" :src="item.cook_info.member_avatar" alt="" class="avatar" />
						<img v-else src="" alt="" class="avatar" />
						<div class="cook-wrap">
							<div class="cook-title">
								<span class="cook-name" @click="goCookHome(item.cook_info.member_id)">厨师:</span>
								{{ item.cook_info.cook_name }}
							</div>
							<div class="cook-store" @click="goStore(item.cook_info.store_id)">
								<span>所属饭店:</span>
								{{ item.cook_info.restaurant }}
							</div>
						</div>
					</div>
					<div class="menu-goods" v-if="isFrom != 'createdMenu' && isFrom == 'home'">拿手菜品</div>
					<div class="menu-function" v-if="isFrom != 'createdMenu' && isFrom == 'home' && item.cook_info && item.cook_info.adept_menu">
						{{ item.cook_info.adept_menu }}
					</div>
					<div class="menu-function">{{ item.cook_say }}</div>
					<!-- <div class="delMenu" v-show="isFrom=='createdMenu'" 
						@click="delMyMenuListAAAA(item.menu_id)"
						>删除菜谱</div> -->
					<div class="delMenu" v-show="isFrom == 'createdMenu'" @click="delMyMenuList(item.menu_id)">删除菜谱</div>
				</div>
			</li>
		</ul>
		<!-- <div v-if="menuLists.length <= 0" style="text-align: center; padding: 10rem 0;font-size: 1.5rem;">
			暂时没有菜谱
		</div> -->
		<empty-record2 emptyContent="content" v-if="menuLists.length <= 0 && !isMore"></empty-record2>
		<div class="loading-wrapper" v-if="menuLists.length > 0">
			<p class="common-no-more" v-if="!isMore">没有更多了</p>
			<mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
		</div>
	</div>
</template>

<script>
import EmptyRecord2 from '../../EmptyRecord2';
import { resetRem, resumeRem } from '@/util/rem';
import { mapState } from 'vuex';
import { sendThumbs, delMyMenuListItem } from '@/api/homeMenu';
import { Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			thumbsUp: false, //点赞
			zanBlock: require('@/assets/image/icon2/icon-zan-black.png'),
			zanRed: require('@/assets/image/icon2/icon-zan-red.png'),
			menuLists: [],
			loading: false, // 是否加载更多
			isMore: true,
			isFrom: null
		};
	},
	// props:['isFrom'],
	components: {		EmptyRecord2},
	// props: ['menuList','index'],
	mounted() {
		resetRem();
		// this.menuLists = this.menuList;
	},
	created: function() {
		this.isFrom = this.$route.query.isfrom;
		// debugger
	},
	computed: {
		...mapState({
			isOnline: state => state.member.isOnline,
		})
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		getMenuListChild(data, ispush, isFrom, hasmore) {
			// debugger
			// this.menuLists = []
			this.isFrom = isFrom;
			// debugger
			if (ispush) {
				this.menuLists = this.menuLists.concat(data);
			} else {
				this.loading = false;
				this.menuLists = data;
				this.isMore = hasmore;
			}
			// debugger
		},
		getMore() {
			if (this.isMore) {
				let addPage = true;
				this.loading = true;
				// this.loading = false;
				this.$emit('onChange', addPage);
				this.$parent.getMenuList(true);
			} else {
				this.loading = false;
			}
		},
		goMenuDetail(id) {
			if (this.isOnline) {
				this.$router.push({ name: 'HomeMenuDetail', query: { menu_id: id } });
			}else{
				Toast("请先去登录");
			}
		},
		MenuTthumbsIs(index, id) {
			if (this.isOnline) {
				if (this.menuLists[index].menu_thumbs_is == 1) {
					this.menuLists[index].menu_thumbs_is = 0;
				} else {
					this.menuLists[index].menu_thumbs_is = 1;
				}
				console.log(this.menuLists[index].menu_thumbs_is);
				var that = this;
				sendThumbs({ type: 2, menu_id: id }).then(res => {
					Toast(res.message);
					// that.getCooksList()
					this.$parent.getMenuList();
				});
			}else{
				Toast("请先去登录");
			}
		},
		delMyMenuList(id) {
			if (!this.member_point) {
				MessageBox.confirm('是否删除选中菜谱', '', { cancelButtonText: '取消', confirmButtonText: '确认' })
					.then(action => {
						delMyMenuListItem({ menu_id: id }).then(res => {
							Toast(res.message);
							// that.getCooksList()
							this.$parent.getMenuList();
						});
					})
					.catch(function(error) {});
			}
		},
		goCookHome(id) {
			if (this.isOnline) {
				this.$router.push({ name: 'CookHome', query: { member_id: id, isfrom: 'cookhome' } });
			}else{
				Toast('请先去登录');
			}
		},
		goStore(id) {
			if (id) {
				this.$router.push({ name: 'HomeStoreGoodslist', query: { id: id } });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.list-content {
	padding: 0.48rem 1.43rem;
	.list-wrap {
		.list-item {
			margin-bottom: 1.43rem;
			background-color: #fff;
			border-radius: 0.76rem;
			overflow: hidden;

			background: #ffffff;
			box-shadow: 0rem 0rem 0.95rem 0.62rem rgba(242, 242, 242, 0.54);
			border-radius: 0.76rem;
			div.img-center {
				// width: 100%;
				// height: 17.61rem;
				text-align: center;
				img {
					// width: 100%;
					height: 17.61rem;
				}
			}

			.menu-list-info {
				box-sizing: border-box;
				padding: 1.33rem 1.43rem 1.43rem;
				.menu-list-info-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.43rem;
					span {
						font-size: 1.71rem;
						font-weight: 600;
						color: #161616;
					}
					.dianzan {
						display: flex;
						align-items: center;
						font-size: 1.14rem;
						font-weight: 400;
						img {
							width: 1.33rem;
							height: 1.33rem;
							margin-right: 0.38rem;
						}
						.zanshu {
							font-size: 1.15rem;
							font-weight: 400;
							color: #161616;
						}
						&.dianRed {
							color: #e53216;
						}
					}
				}
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
					font-weight: 600;
					color: #161616;
				}
				.menu-function {
					font-size: 1.14rem;
					font-weight: 400;
					color: #6f6f6f;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
			}
		}
	}
}
.delMenu {
	text-align: right;
	font-size: 1.15rem;
	font-weight: 400;
	color: #e53216;
	margin-top: 1.43rem;
	margin-bottom: 0.47rem;
}
</style>
