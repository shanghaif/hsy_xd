<template>
	<div class="container">
		<div class="list-content" v-if="menuLists && menuLists.length">
			<ul class="list-wrap">
				<li class="list-item" v-for="(item, index) in menuLists" :key="index">
					<img v-if="item.menu_image" :src="item.menu_image" alt="" @click="goMenuDetail(item.menu_id)" />
					<img v-else src="" alt="" @click="goMenuDetail(item.menu_id)" />
					<div class="menu-list-info">
						<div class="menu-list-info-top">
							<span @click="goMenuDetail(item.menu_id)">{{ item.menu_title }}</span>
							<span class="dianzan" @click="shoucangMethod(item.menu_id)">
								<img :src="shoucangRed" alt="" />
								<!-- <span class="zanshu">获赞数</span> -->
								<!-- {{ item.thumbs_num }} -->
							</span>
						</div>
						<div class="cook-info" >
							<img v-if="item.member_avatar" :src="item.member_avatar" alt="" class="avatar" @click="goCookHome(item.member_id)"/>
							<img v-else src="" alt="" class="avatar" />
							<div class="cook-wrap">
								<div class="cook-title" @click="goCookHome(item.member_id)">
									<span class="cook-name">厨师:</span>
									{{ item.cook_name }}
								</div>
								<div class="cook-store" @click="goStore(item.store_id)">
									<span>所属饭店:</span>
									{{ item.restaurant }}
								</div>
							</div>
						</div>
						<!-- <div class="menu-goods" >拿手菜品</div>
		 				<div class="menu-function">
		 					{{ item.cook_info.adept_menu }}
		 				</div> -->
						<div class="menu-function">{{ item.cook_say }}</div>
						<!-- <div class="delMenu" v-show="isFrom=='createdMenu'" 
		 					@click="delMyMenuListAAAA(item.menu_id)"
		 					>删除菜谱</div> -->
					</div>
				</li>
			</ul>
		</div>
		<empty-record2 isFrom='content' v-else-if="menuLists && !menuLists.length"></empty-record2>
	</div>
</template>
<script>
import { Toast, Indicator, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { quxiaoshoucang } from '@/api/homeMenu';
import { getFavoriteMenuList, delFavoriteMenu } from '../../../api/memberFavorite';
export default {
	components: {
		EmptyRecord2
	},
	name: 'getFavoriteMenuList',
	data() {
		return {
			favorites_list: false,
			menuLists: [
				{
					cook_info: {
						member_avatar: null
					}
				}
			],
			thumbsUp: false, //点赞
			zanBlock: require('@/assets/image/icon2/icon-zan-black.png'),
			zanRed: require('@/assets/image/icon2/icon-zan-red.png'),
			shoucangRed: require('@/assets/image/icon2/icon-heart-red.png')
		};
	},
	created: function() {
		this.getFavoriteMenuList();
	},

	methods: {
		getFavoriteMenuList() {
			getFavoriteMenuList()
				.then(res => {
					Indicator.close();
					this.menuLists = res.result;
				})
				.catch(function(error) {
					Indicator.close();
					Toast(error.message);
				});
		},
		goMenuDetail(id) {
			this.$router.push({ name: 'HomeMenuDetail', query: { menu_id: id } });
		},
		MenuTthumbsIs(index, id) {
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
				this.getFavoriteMenuList();
			});
		},
		shoucangMethod(menu_id) {
			var that = this;
			MessageBox({
				title: '确认',
				message: '是否要取消收藏此菜谱？',
				showCancelButton: true
			}).then(action => {
				if (action === 'confirm') {
					this.quxiaoshoucang(menu_id);
				}
			});
		},
		quxiaoshoucang(menu_id) {
			var that = this
			quxiaoshoucang({ menu_id: menu_id }).then(res => {
				Toast(res.message);
				that.getFavoriteMenuList();
			});
		},
		goCookHome(id) {
			this.$router.push({ name: 'CookHome', query: { member_id: id, isfrom: 'cookhome' } });
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
	background: #f4f5f7;
	min-height: 100vh;
}
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
			img {
				width: 100%;
				height: 17.62rem;
			}
			.menu-list-info {
				padding: 1.33rem 1.43rem 1.43rem;
				.menu-list-info-top {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 1.43rem;
					span {
						font-size: 1.81rem;
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
</style>
