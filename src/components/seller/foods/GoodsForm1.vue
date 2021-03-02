<template>
	<div class="container">
		<HeadTitle title="商品发布"></HeadTitle>
		<step :options="options" :active="0"></step>
		<div style="height: 0.95rem;background: #F4F5F7;"></div>
		<div class="goods-form" @click="classVisible = true">
			<!-- <mt-cell class="menu-item" title="商品分类" :value="goods_class.gc_name" :icon='back'></mt-cell> -->
			<div class="cell-list">
				<span>商品分类</span>
				<div>
					<span>{{ goods_class.gc_name }}</span>
					<img src="@/assets/image/icon2/icon-right.png" alt="" />
				</div>
			</div>
		</div>
		<div class="add-button" @click="nextStep"><span>下一步</span></div>
		<!-- <mt-button size="large" type="primary" class="" @click="nextStep">下一步</mt-button> -->
		<!--服务分类-->
		<mt-popup v-model="classVisible" position="bottom">
			<mt-picker ref="class_picker" :slots="buildItems" valueKey="value" @change="onClassChange" showToolbar>
				<div class="toolbar">
					<button class="toolbar-item cancel-item" @click="cancelClass">取消</button>
					<div class="picker-header">选择分类</div>
					<button class="toolbar-item confirm-item" @click="confirmClass">确定</button>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
import { resetRem, resumeRem } from '@/util/rem';
import { Toast } from 'mint-ui';
import { mapState, mapActions } from 'vuex';
import Step from '../../Step';
import { getGoodsClass } from '../../../api/sellerGoods';
import HeadTitle from '../../HeadTitle.vue';
export default {
	data() {
		return {
			options: [{ title: '选择商品分类' }, { title: '填写商品详情' }, { title: '上传商品图片' }],
			classVisible: false,
			goods_class: {},
			store_bind_class: false,
		};
	},
	computed: {
		...mapState({
			items: state => state.goodsclass.items
		}),
		buildItems: function() {
			if (!this.items || !this.store_bind_class || !this.items[0]) {
				return [];
			}
			let items = new Array();

			if (this.store_bind_class.bind_all) {
				this.getDefaultItems(this.items, items);
			} else {
				this.getDefaultItems(this.store_bind_class.goods_class, items);
			}
			return items;
		}
	},
	created() {
		getGoodsClass()
			.then(res => {
				this.store_bind_class = res.result;
			})
			.catch(error => {
				Toast(error.message);
			});
		this.fetchGoodsclassList();
	},
	components: {
		Step,
		HeadTitle
	},
	mounted() {
		resetRem();
	},
	beforeDestroy() {
		resumeRem();
	},
	methods: {
		...mapActions({
			fetchGoodsclassList: 'fetchGoodsclassList'
		}),
		getDefaultItems(_item, defaultItems) {
			defaultItems.push({
				flex: 1,
				values: _item,
				textAlign: 'center'
			});
			defaultItems.push({
				flex: 1,
				values: _item[0].children,
				textAlign: 'center'
			});
			defaultItems.push({
				flex: 1,
				values: _item[0].children && _item[0].children.length ? _item[0].children[0].children : [],
				textAlign: 'center'
			});
		},

		cancelClass() {
			this.classVisible = false;
		},
		confirmClass() {
			let values = this.$refs.class_picker.getValues();
			var temp = values[2];
			if (!temp) {
				temp = values[1];
			}
			if (!temp) {
				temp = values[0];
			}
			this.goods_class.gc_name = temp.value;
			this.goods_class.gc_id = temp.id;

			this.classVisible = false;
		},
		onClassChange(picker, values) {
			picker.setSlotValues(1, values[0] ? values[0].children : []);
			picker.setSlotValues(2, values[1] ? values[1].children : []);
			picker.setSlotValues(3, values[2] ? values[2].children : []);
		},
		nextStep() {
			if (!this.goods_class.gc_id) {
				Toast('请选择商品分类');
				return;
			}
			this.$router.push({ name: 'SellerGoodsForm2', query: { class_id: this.goods_class.gc_id, commonid: this.$route.query.commonid } });
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	background: #fff;
}
.toolbar {
	height: 3rem;
	line-height: 3rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: stretch;
	background-color: #f0f2f5;
	.toolbar-item {
		font-size: 1rem;
		border: none;
		border-radius: 0;
		background-color: #f0f2f5;
	}
	.cancel-item {
		margin-left: 0.5rem;
		color: #4e545d;
	}
	.confirm-item {
		margin-right: 0.5rem;
		color: red;
	}
	.picker-header {
		font-size: 1.33rem;
		font-weight: 400;
		color: #161616;
	}
	
}
/deep/.picker-item {
		font-size: 1.4rem;
	}
.mint-cell {
	&::after {
		height: 0;
	}
}
.add-button {
	background-color: #fff;
	position: fixed;
	z-index: 2;
	bottom: 0;
	padding: 1rem 1.43rem;
	width: 100%;
	box-sizing: border-box;
	// margin-bottom: 1rem;
	span {
		display: block;
		text-align: center;
		height: 3.81rem;
		line-height: 3.81rem;
		background: linear-gradient(90deg, #fc6952 0%, #e53216 100%);
		box-shadow: 0rem 0rem 0.95rem 0rem rgba(251, 104, 84, 0.5);
		border-radius: 1.9rem;

		font-size: 1.33rem;
		font-weight: 400;
		color: #ffffff;
	}
}
.cell-list {
	font-size: 1.33rem;
	font-weight: 400;
	color: #161616;
	padding: 1.19rem 1.43rem;
	display: flex;
	justify-content: space-between;
	div {
		display: flex;
		align-items: center;
		span {
			margin-right: 1rem;
		}
		img {
			width: 1.43rem;
			height: 1.43rem;
		}
	}
	span {
	}
}
</style>
