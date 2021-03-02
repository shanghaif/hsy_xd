<template>
	<div class="distributor-address-list hsy_main">
		<!-- <div class="common-header-wrap">
			<mt-header title="收货地址" class="common-header">
				<mt-button slot="left" icon="back" @click="goBack"></mt-button>
			</mt-header>
		</div> -->
		<head-title title="收货地址"></head-title>
		<div v-if="address_list.length > 0">
			<div v-for="item in address_list" :key="item.address_id">
				<div class="container">
					<div class="top-wrapper">
						<div class="title-wrapper">
							<label class="title">{{ item.address_realname }}</label>
							<label class="title">{{ item.address_mob_phone }}</label>
						</div>
						<label class="desc address-text" style="-webkit-box-orient:vertical">{{ item.area_info }}&nbsp;{{ item.address_detail }}</label>
						<div class="bottom-line"></div>
					</div>
					<div class="bottom-wrapper">
						<div class="bottom-left-wrapper" @click="onDefault(item)">
							<label class="subtitle">
								<i v-if="item.address_is_default == 1" class="iconfont">&#xe69d;</i>
								<i v-else class="iconfont">&#xe69e;</i>
								默认地址
							</label>
						</div>
						<div class="bottom-right-wrapper">
							<div class="edit-wrapper" @click="onEdit(item.address_id)"><label class="subtitle">编辑</label></div>
							<div class="edit-wrapper delete-wrapper" @click="onDelete(item.address_id)"><label class="subtitle">删除</label></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else><empty-record2 isFrom='address'></empty-record2></div>
		<mt-button class="hsy_f hsy_btn" @click="goAdd">新增收货地址</mt-button>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import '@/assets/style/hsy-mint.scss';
import HeadTitle from '../../HeadTitle';
import { mapState, mapMutations } from 'vuex';
import { Toast, Indicator, MessageBox } from 'mint-ui';
import EmptyRecord2 from '../../../components/EmptyRecord2';
import { getAddressList, delAddress, editAddress } from '../../../api/memberAddress';
import { member_tid } from '../../../api/homecart';
export default {
	components: {
		EmptyRecord2,
		HeadTitle
	},
	name: 'MemberAddressList',
	data() {
		return {
			address_list: []
		};
	},
	mounted() {
		resetRem();
	},
	computed: {
		...mapState({
			mclass: state => state.member.mclass,
			info: state => state.member.info
		})
	},
	created: function() {
		this.getAddressList();
		// console.log(this.mclass);
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapMutations({
			memberSaveArea_id: 'memberSaveArea_id', //本地保存收货地址
			memberTsids: 'memberTsids',
			memberEditMclass: 'memberEditMclass'
		}),
		goBack() {
			this.$router.go(-1);
		},
		goAdd() {
			this.$router.push({ name: 'MemberAddressForm', query: { action: 'add' } });
		},
		onDefault(address_info) {
			const a = address_info.address_is_default;
			address_info.mclass = this.mclass;
			address_info.address_is_default = 1;
			editAddress(address_info, address_info.address_id).then(
				response => {
					Indicator.close();
					this.getAddressList();
				},
				error => {
					Indicator.close();
					Toast(error.message);
					address_info.address_is_default = a;
				}
			);
		},
		onEdit(addressId) {
			this.$router.push({ name: 'MemberAddressForm', query: { address_id: addressId } });
		},
		onDelete(addressId) {
			MessageBox.confirm('确定要删除该地址吗？').then(action => {
				Indicator.open();
				delAddress(addressId).then(
					response => {
						this.getAddressList();
						Indicator.close();
					},
					error => {
						Indicator.close();
						Toast(error.message);
					}
				);
			});
		},
		getAddressList() {
			getAddressList()
				.then(res => {
					this.address_list = res.result.address_list;
					// 默认收获地址设置为空
					this.memberSaveArea_id([null, null]);
					for (var item of res.result.address_list) {
						// 如果有默认收获地址
						if (item.address_is_default == '1') {
							// 保存
							this.memberSaveArea_id([item.area_id, item.area_info]);
							if (this.mclass > 0 && this.mclass < 3) {
								if (item.tuan) {
									this.memberEditMclass(2);
								} else {
									this.memberEditMclass(1);
								}
							}
						}
					}
					if (this.mclass > 0 && this.mclass < 3) {
						// 查看登陆人可配送商家
						member_tid(this.info.member_id).then(res => {
							// console.log('配送商家列表',res)
							this.memberTsids(res.result);
						});
					}
				})
				.catch(function(error) {
					Toast(error.message);
				});
		}
	}
};
</script>
<style lang="scss" scoped>
.distributor-address-list {
	.container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		background-color: #fff;
		// border-bottom: 1px solid #e8eaed;
		padding: 1.39rem 1.43rem;
		position: relative;
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			height: 1px;
			right: 0;
			width: 96%;
			background-color: rgba(239, 239, 239, 1);
		}
	}
	.top-wrapper {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}
	.title-wrapper {
		// height: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-top: 0.5rem;
		// margin-left: 0.5rem;
	}
	.title {
		// font-size: 0.8rem;
		// color: #333;
		font-size: 1.34rem;
		font-weight: 400;
		color: #161616;
		&:nth-child(1) {
			margin-right: 1rem;
		}
		// margin-left: 0.5rem;
	}
	.default {
		width: 1.4rem;
		// margin-left: 0.5rem;
		// margin-right: 0.5rem;
		border: 1px solid #e93b3d;
		color: $primaryColor;
		font-size: 0.5rem;
		text-align: center;
		border-radius: 0.1rem;
	}
	.desc {
		// color: #7c7f88;
		// font-size: 0.7rem;
		font-size: 1.15rem;
		font-weight: 400;
		color: #6F6F6F;
	}
	.address-text {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		// margin-left: 1rem;
		// margin-right: 0.5rem;
	}
	.bottom-line {
		position: absolute;
		height: 1px;
		// left: 0.5rem;
		bottom: 0;
		// right: 0.5rem;
		background-color: #e8eaed;
	}
	.bottom-wrapper {
		height: 2.5rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: stretch;
	}
	.bottom-left-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.bottom-right-wrapper {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: stretch;
	}
	.edit-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.delete-wrapper {
		margin-left: 1rem;
		// margin-right: 0.5rem;
	}
	.indicator {
		width: 1rem;
		height: 1rem;
		margin-left: 0.75rem;
		margin-right: 0.5rem;
	}
	.icon {
		width: 0.9rem;
		height: 0.9rem;
		margin-left: 0.5rem;
	}
	.subtitle {
		font-size: 1.2rem;
		color: #7c7f88;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		// margin-left: 1rem;
		margin-right: 0.5rem;
	}
	.subtitle i {
		// font-size: 0.8rem;
		font-size: 1.1rem;
		margin-right: 0.5rem;
	}
}
</style>
