<template>
	<div class="container friend-list">
		<!-- <div class="common-header-wrap">
			<mt-header title="好友列表" class="common-header">
				<mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
				<mt-button slot="right" @click="search">添加好友</mt-button>
			</mt-header>
		</div> -->
		<head-title title="好友列表" titleRight="添加好友"></head-title>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="my-friend-list">
			<div v-if="friend_list">
				<mt-cell-swipe class="goods-item" v-for="(item, index) in friend_list" v-bind:key="item.u_id" :right="rightBottom(item.u_id)">
					<div @click="goChat(item.u_id)">
						<div class="p-img"><img class="collection-img" v-bind:src="item.avatar" /></div>
						<div class="flex-right">
							<span class="title">{{ item.u_name }}</span>
						</div>
					</div>
				</mt-cell-swipe>
			</div>
			<empty-record2 isFrom="friendList" v-if="friend_list && friend_list.length === 0"></empty-record2>
		</div>

		<mt-popup v-model="searchVisible" position="right" class="common-popup-wrapper">
			<!-- <div class="common-header-wrap">
				<mt-header title="添加好友" class="common-header"><mt-button slot="left" icon="back" @click="searchVisible = false"></mt-button></mt-header>
			</div> -->
			<div class="header-wrap">
				<img @click="searchVisible = false" src="@/assets/image/icon2/icon-black-left.png" alt="" />
				<span class="header-title">添加好友</span>
				<span></span>
			</div>
			<div class="common-popup-content">
				<div v-infinite-scroll="loadMore2" infinite-scroll-disabled="loading2" infinite-scroll-distance="10">
					<div v-if="friend_list2">
						<div class="goods-item" v-for="(item, index) in friend_list2" v-bind:key="item.u_id">
							<div>
								<div class="p-img"><img class="collection-img" v-bind:src="item.avatar" /></div>
								<div class="flex-right">
									<span class="title ml-10">{{ item.u_name }}</span>
								</div>
								<span class="button" @click="rightBottom2(item.u_id)">添加</span>
							</div>
						</div>
					</div>
					<empty-record2 isFrom="friendList" v-if="friend_list2 && friend_list2.length === 0"></empty-record2>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import HeadTitle from '../../HeadTitle';
import { Toast, Indicator, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { mapState, mapActions } from 'vuex';
import { getFriendList, delFriend, searchFriend, addFriend } from '../../../api/memberFriend';
export default {
	data() {
		return {
			keyword: '',
			friend_list2: false,
			searchVisible: false,
			friend_list: false,
			params: { page: 0, per_page: 20 },
			loading: false, // 是否加载更多
			isMore: true, // 是否有更多
			params2: { page: 0, per_page: 20 },
			loading2: false, // 是否加载更多
			isMore2: true // 是否有更多
		};
	},
	components: {
		'empty-record2': EmptyRecord2,
		HeadTitle
	},
	created() {
		this.fetchConfig({}).then(
			response => {},
			error => {
				Toast(error.message);
			}
		);
	},
	mounted() {
		resetRem();
	},
	computed: {
		...mapState({
			config: state => state.config.config
		})
	},
	watch: {},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		fun_right() {
			this.search();
		},
		...mapActions({
			fetchConfig: 'fetchConfig'
		}),
		goChat(user_id) {
			if (this.config.node_site_use !== '1' || !this.config.node_site_url) {
				Toast('未开启即时聊天');
			} else {
				this.$router.push({ name: 'MemberChatInfo', query: { t_id: user_id } });
			}
		},
		search() {
			MessageBox.prompt('请输入用户名', '').then(({ value, action }) => {
				this.keyword = value;
				this.reload2();
				this.searchVisible = true;
			});
		},
		rightBottom(userId) {
			return [
				{
					content: '删除',
					style: { background: 'linear-gradient(270deg, #FFBD00 0%, #FF9A69 100%)', color: '#fff', width: '100%', fontSize: '1.14rem' },
					handler: () =>
						MessageBox({
							title: '确认删除',
							message: '是否要删除该好友？',
							showCancelButton: true
						}).then(action => {
							if (action === 'confirm') {
								this.delFriend(userId);
							}
						})
				}
			];
		},
		rightBottom2(userId) {
			addFriend(userId)
				.then(res => {
					Toast(res.message);
					this.reload();
					this.searchVisible = false;
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		delFriend(userId) {
			delFriend(userId)
				.then(res => {
					this.reload();
				})
				.catch(function(error) {
					Toast(error.message);
				});
		},
		loadMore() {
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getFriendList(true);
			}
		},

		getFriendList() {
			Indicator.open();

			getFriendList(this.params)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore) {
						this.isMore = true;
					} else {
						this.isMore = false;
					}

					let temp = res.result.friend_list;
					if (temp) {
						if (!this.friend_list) {
							this.friend_list = temp;
						} else {
							this.friend_list.concat(temp);
						}
					}
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},
		reload() {
			this.params = { page: 0, per_page: 10 };
			this.friend_list = false;
			this.loading = false;
			this.isMore = true;
			this.loadMore();
		},
		reload2() {
			this.params2 = { page: 0, per_page: 10 };
			this.friend_list2 = false;
			this.loading2 = false;
			this.isMore2 = true;
			this.loadMore2();
		},

		loadMore2() {
			this.loading2 = true;
			this.params2.page = ++this.params2.page;
			if (this.isMore2) {
				this.loading2 = false;
				this.getFriendList2(true);
			}
		},

		getFriendList2() {
			Indicator.open();

			searchFriend(this.params2, this.keyword)
				.then(res => {
					Indicator.close();
					if (res.result.hasmore2) {
						this.isMore2 = true;
					} else {
						this.isMore2 = false;
					}

					let temp = res.result.member_list;
					if (temp) {
						if (!this.friend_list2) {
							this.friend_list2 = temp;
						} else {
							this.friend_list2.concat(temp);
						}
					}
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
.my-friend-list {
	.goods-item {
		// height: 3rem;
		// width: 100%;
		margin-left: 1.42rem;
		padding: 1.14rem 0;
	}
}

.goods-item .p-img {
	float: left;
	padding: 0.25rem 0;
	// margin-left: 0.5rem;
}
.goods-item .p-img img {
	width: 4.38rem;
	height: 4.38rem;
	border-radius: 50%;
}
.flex-right {
	float: left;
	.title {
		margin-left: 1.14rem;
	}
}
.flex-right span {
	// line-height: 3rem;
	display: block;
	float: left;
	font-size: 1.14rem;
}
.button {
	float: right;
	// margin-right: 0.5rem;
	// margin-top: 0.7rem;
	padding: 1rem;
	color: #e63116;
}
.friend-list {
	.goods-item {
		// height: 6.66rem;
		box-sizing: border-box;
	}
}
.common-popup-wrapper {
	.goods-item {
		min-height: 6rem;
		padding: 1.12rem 1.42rem;
	}
	.common-popup-content {
		top: 4rem;
		padding-bottom: 4rem;
	}
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
		font-size: 1.52rem;
		font-weight: 400;
		color: rgba(22, 22, 22, 1);
	}
	.header-right {
		span {
			font-size: 1.3rem;
		}
	}
}
.friend-list /deep/.mint-msgbox-input input {
	padding: 8px;
}
</style>

<!--Cell Swipe样式覆盖 -->
<style>
.friend-list .mint-cell::after {
	background-color: rgba(239, 239, 239, 1);
}
.goods-item .mint-cell-wrapper {
	padding: 0;
}
.goods-item .mint-cell-wrapper .mint-cell-value {
	width: 100%;
	border-bottom: 0 !important;
}
.goods-item .mint-cell-wrapper .mint-cell-value > div {
	display: flex;
	align-items: center;
}

.goods-item .mint-cell-right {
	/* transform: translate3d(5.5rem, 0px, 0px)!important; */
}
</style>
