<template>
	<div class="container">
		<!-- <div class="common-header-wrap">
			<mt-header class="common-header" title="商家列表"><mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button></mt-header>
		</div> -->
		<div class="header">
			<div class="header-wrap">
				<img class="img-back" @click="$router.back()" src="@/assets/image/icon2/icon-back.png" alt="" />
				<span class="header-title">商家列表</span>
				<!-- <span></span> -->
				<img class="img-search" @click="$router.push( {name:'KeepStoresearch'} )" src="@/assets/image/icon2/search.png" alt="" />
			</div>
		</div>
		<div class="position-btn" :class="isClose ? 'close' : 'show'" @click="isClose = !isClose">
			<div class="btn-item san1"><img src="@/assets/image/icon2/icon-left-hui.png" alt="" /></div>
		</div>
		<div class="ui-category-body">
			<div class="category-flex">
				<div ref="leftCont" class="category-sidebar" :class="isClose?'closeLeft':''">
					<ul class="cont">

						<li class="item_title" v-for="(v,i) in storeArr" :key="i">
							<p>{{v.storeclass_name}}</p>
							<ul>
								<li
									class="item"
									v-for="item in v.child"
									v-bind:key="item.storeclass_id"
									v-on:click="openclass(item.storeclass_id)"
									v-bind:class="{ sidbaractive: item.storeclass_id == currentid, noActive: item.storeclass_id != currentid }"
								>
									<a>{{ item.storeclass_name }}</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>

				<div  ref="rightCont" class="category-content">
					<common-store-list @haveStoreData='haveStoreData' ref="child" :currentid="currentid" ></common-store-list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getStoreClass,getNewStoreClass } from '../../../api/seller';
import EmptyRecord from '../../../components/EmptyRecord';
import { Toast, Indicator } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import CommonStoreList from '../common/CommonStoreList';
import HomeCommonSearch from '../common/HomeCommonSearch';
import { resetRem, resumeRem } from '@/util/rem';
export default {
	name: 'HomeStorelist',
	components: {
		HomeCommonSearch,
		CommonStoreList,
		EmptyRecord
	},

	name: 'Storeclass',

	data() {
		return {
			storeclass_list: false,
			storeArr:[],    //  商家类型
			// storeclass_list_cy:[],
			// storeclass_list_pf:[],
			// storeclass_list_ls:[],
			// storeclass_list_sc:[],
			// storeclass_list_yd:[],
			// storeclass_list_nz:[],
			currentid: 10101,
			params: {
				keyword: ''
			},
			isClose: false,

			
			leftContScrollTop : 0,  // 左侧滚动条
			righContScrollTop : 0,  // 右侧滚动条
		};
	},
	
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
			( from.name != 'KeepJinhuo' && from.name != 'KeepStoreGoodslist' && from.name != 'KeepTestEdit' && from.name != 'KeepStoreLive' )&&(
				vm.getStoreclassList(),
				vm.currentid = 10101,
				vm.openclass(vm.currentid),
				vm.leftContScrollTop = 0,
				vm.righContScrollTop = 0
			)
			vm.$refs.leftCont.scrollTop = vm.leftContScrollTop;
			vm.$refs.rightCont.scrollTop = vm.righContScrollTop;
			resetRem();			
		})
	},

	created: function() {
		this.getStoreclassList();
	},
	mounted() {
		resetRem();
	},
	beforeDestroy: function() {
		resumeRem();
	},
	methods: {
		// 接收 传值
		haveStoreData(){	
			this.leftContScrollTop  = this.$refs.leftCont.scrollTop;
			this.righContScrollTop  = this.$refs.rightCont.scrollTop;		
		},
		getStoreclassList() {
			Indicator.open();
			// getStoreClass().then(res => {
			// 	Indicator.close();
			// 	this.storeclass_list = res.result.store_class;

				
			// 	for (var item of this.storeclass_list) {
			// 		if (item.store_class_type == '1') {
			// 			this.storeclass_list_cy.push(item);
			// 		}
			// 		if (item.store_class_type == '2') {
			// 			this.storeclass_list_pf.push(item);
			// 		}
			// 		if (item.store_class_type == '3') {
			// 			this.storeclass_list_ls.push(item);
			// 		}
			// 		if (item.store_class_type == '4') {
			// 			this.storeclass_list_sc.push(item);
			// 		}
			// 		if (item.store_class_type == '5') {
			// 			this.storeclass_list_yd.push(item);
			// 		}
			// 		if (item.store_class_type == '6') {
			// 			this.storeclass_list_nz.push(item);
			// 		}
			// 	}
			// })
			// .catch(function(error) {
			// 	Indicator.close();
			// 	Toast(error.message);
			// });

				this.utils.getSpecialIdentity().then(store_class=>{
					Indicator.close();;
					this.storeArr = store_class;
					// for( var item of store ){
					// 	item.id = item.storeclass_id;
					// 	item.name = item.storeclass_name;
					// 	delete item.storeclass_bail;
					// 	delete item.storeclass_pid;
					// 	delete item.storeclass_sort;
					// 	for( var end of item.child ){
					// 		end.id = end.storeclass_id;
					// 		end.name = end.storeclass_name;
					// 		delete item.storeclass_bail;
					// 		delete item.storeclass_pid;
					// 		delete item.storeclass_sort;
					// 	}
					// }
				}).catch(err=>{
					Indicator.close();
					Toast(err.message);
				})
		},
		goHomeStorelist(storeclassId) {
			this.$router.push({ name: 'HomeStorelist', query: { storeclass_id: storeclassId } });
		},
		openclass(id) {
			this.currentid = id;
			this.params.keyword = id;
			// this.$refs.child.getValue();
		}
	}
};
</script>

<style scoped lang="scss">
.position-btn {
	position: absolute;
	top: 50%;
	z-index: 2;
	width: 1.4rem;
	overflow: hidden;
	transform: translate(0, -50%);
	.btn-item {
		width: 0;
		height: 0;
		// margin-right:50px;
		// float:left;
		img {
			position: absolute;
			top: 50%;
			left: 0;
			// transform: translate(0, -50%);
			width: 0.8rem;
			height: 1.5rem;
		}
	}
	.san1 {
		border-top: 3.4rem solid transparent;
		border-bottom: 3.4rem solid transparent;
		border-left: 1.5rem solid rgba(246, 246, 246, 1);
	}
}
.position-btn.show {
	left: 8.6rem;
	// left: 9.6rem;
	img {
		transform: translate(0, -50%) rotate(0);
	}
}
.position-btn.close {
	left: 0;
	img {
		transform: translate(0, -50%) rotate(180deg);
	}
}
.closeLeft {
	display: none;
}
.container {
	.header {
		.header-wrap {
			display: flex;
			justify-content: space-between;
			// padding: 0.6rem 1.3rem;
			padding: 1rem 1.3rem;
			align-items: center;
			.img-back {
				width: 1.56rem;
				height: 1.56rem;
			}
			.header-title {
				font-size: 1.39rem;
				font-family: Fontquan-XinYiGuanHeiTi-Regular, Fontquan-XinYiGuanHeiTi;
				font-weight: 400;
				// color: rgba(255, 255, 255, 1);
				color: rgba(22, 22, 22, 1);
			}
			.img-search {
				width: 1.56rem;
				height: 1.56rem;
			}
		}
	}
}
.ui-category-body {
	width: 100%;
	background: rgba(246, 246, 246, 1);
	-webkit-overflow-scrolling: touch;
	.category-flex {
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		width: 100%;
		position: absolute;
		bottom: 0;
		width: 100%;
		// top: 2.5rem;
		top: 4.82rem;
		.category-sidebar {
			// flex-basis: 6rem;
			// background-color: #f0f2f5;
			// margin-top: 1.09rem;
			flex-basis: 11.78rem;
			// flex-basis: 13.78rem;
			background-color: RGBA(246, 246, 246, 1);
			overflow-y: scroll;
			
			ul.cont {
				padding-bottom: 5rem;
				// border-right: 0.5px solid #e8eaed;
				li {
					// display: block;
					// padding: 0.8rem 0.25rem;
					display: block;
					position: relative;
					// height: 4.09rem;
					// padding: 0.8rem 0.25rem;
					// padding: 1.2rem 0 1.2rem 0.3rem;
					padding: 1.2rem 0 1.2rem .3rem;
					a {
						// color: #333;
						// display: -webkit-box;
						// -webkit-box-orient: vertical;
						// -webkit-line-clamp: 1;
						// font-size: 0.6rem;
						font-size: 1.21rem;
						// font-family: PingFangSC-Regular, PingFang SC;
						// font-weight: 400;
						// color: rgba(111, 111, 111, 1);
						// display: -webkit-box;
						// -webkit-box-orient: vertical;
						// -webkit-line-clamp: 1;
						// overflow: hidden;
						// font-size: 1.13rem;
						// padding-left: 1.6rem;
						// width: 100%;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
						// box-sizing: border-box;

						font-weight: 400;
						color: #6f6f6f;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
						font-size: 1.13rem;
						text-align: center;
					}
				}
				li.noActive {
					// background-color: #f0f2f5;
					background-color: RGBA(246, 246, 246, 1);
					// border-left: 0.1rem solid transparent;
					&::after {
						content: '';
						left: 0;
						top: 0;
						position: absolute;
						height: 1.3rem;
						width: 0.3rem;
						// border-left: 0.1rem solid transparent;
					}
					a {
						// color: #333;
						color: rgba(111, 111, 111, 1);
					}
				}
				li.sidbaractive {
					background-color: #ffffff;
					// border-left: 0.1rem solid #e93b3d;
					&::after {
						content: '';
						border-radius: 0.17rem;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translate(0, -50%);
						height: 1.3rem;
						width: 0.3rem;
						background-color: #e93b3d;
						// border-left: 0.1rem solid #e93b3d;
					}
					a {
						// color: $primaryColor;
						// font-size: 1.26rem;
						font-family: PingFangSC-Regular, PingFang SC;
						// font-weight: 600;
						line-height: 1.83rem;
						-webkit-text-stroke: 0px rgba(151, 151, 151, 1);
						text-stroke: 0px rgba(151, 151, 151, 1);
						color: #161616;
					}
				}

				.item_title{
					padding: 1.2rem 0 1.2rem 0.6rem;
					padding: 0.8rem 0 0.8rem 0rem;
					font-weight: 600;
					color: #6F6F75;

					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-bottom: 1.1rem;

					p{
    				font-size: 1.31rem;
						margin: .6rem 0;
						margin-left: .6rem;

						font-size: 1.13rem;
						text-align: center;
						color: #161616;
					}
				}
			}
		}
		.category-content {
			width: 100%;
			background-color: #fff;
			overflow: auto;
			margin-bottom: 3rem;
			ul {
				height: 100%;
				li {
					display: block;
					padding: 0.95rem 0;
					text-align: left;
					cursor: pointer;

					border-bottom: 0.5px solid rgb(232, 234, 237);
					a {
						color: #333;
						font-weight: 700;
						line-height: 2rem;
						font-size: 0.7rem;
						text-align: center;
						display: block;
					}
				}
				dl {
					display: inline-block;
					width: 32.8%;
					text-align: center;
					dt {
						position: relative;
						img {
							width: 3.5rem;
							height: 3.5rem;
							overflow: hidden;
						}
					}
					dd {
						font-size: 0.6rem;
						line-height: 1rem;
						height: 1rem;
						overflow: hidden;
						margin-bottom: 0.5rem;
					}
				}
			}
		}
	}
}

.common-header {
	height: 4rem !important;
	line-height: 4rem !important;
	/deep/ .mint-header-title {
		font-size: 1.4rem !important;
	}
}
</style>
