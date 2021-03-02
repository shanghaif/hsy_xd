<template>
	<div class="ui-category-body">
		<div class="category-flex">
			<div class="category-sidebar">
				<ul>
					<li
						class="item"
						v-for="item in items"
						v-bind:key="item.id"
						v-on:click="item.children && item.children.length ? onItemClick(item) : goProduct(item.id)"
						v-bind:class="{ sidbaractive: currentItem && item.id == currentItem.id, noActive: currentItem && item.id != currentItem.id }"
					>
						<a>{{ item.value }}</a>
					</li>
				</ul>
			</div>
			<div class="category-content" v-if="currentItem && currentItem.children">
				<ul>
					<li class="item" v-for="item in currentItem.children" v-bind:key="item.id">
						<a v-on:click="goProduct(item.id)">{{ item.value }}</a>
						<div>
							<dl v-for="item_1 in item.children" :key="item_1.id" v-on:click="goProduct(item_1.id)"
								 v-if="!tcids || tcids.indexOf(item_1.id) > -1"
								>
								<dt><img :src="item_1.image" :onerror="errorImg" /></dt>
								<dd>{{ item_1.value }}</dd>
							</dl>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { mapState, mapMutations, mapActions } from 'vuex';
import { tuangc} from '../../../api/homesearch'
import { getGoodsclassList } from '../../../api/homesearch'
export default {
	data() {
		return {
			errorImg: 'this.src="' + require('../../../assets/image/no_image.jpg') + '"'
		};
	},
	props:['upgrape'],
	computed: {
		...mapState({
			items: state => state.goodsclass.items,
			currentItem: state => state.goodsclass.currentItem,
   		tcids:state =>state.member.tcids,
   		tsids:state =>state.member.tsids,
  		mclass:state =>state.member.mclass,
      token: state => state.member.token,
		}),
		getGoodsclassImg: function() {
			return function(id) {
				return env.SITE_URL + '/uploads/home/common/category-pic-' + id + '.jpg';
			};
		}
	},
	mounted() {		
		// console.log( this.tsids );
		// console.log( this.tcids );
	},
	created() {
		this.loading();		
    
    if( this.upgrape ){
			tuangc(0, this.token,1).then(res => {
				var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
				var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
				this.membersetCS({tsids:sa1,tcids:sa})
				this.$forceUpdate()
			})			
		}else if( this.mclass != 0 ){
      if( 0<this.mclass && this.mclass<3 ){//非批发集采
        this.type = this.mclass
      }else if( this.mclass == 5 ){  // 集采
        this.type = 5
      }else{   //  普通 商家
        this.type = 3;
			}
			// console.log(this.mclass);
      if(this.type!=2){
        let n =	this.type*(-1)
        tuangc(n, this.token).then(res => {
          var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
          var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
          this.membersetCS({tsids:sa1,tcids:sa})
          this.$forceUpdate()
        })
      }else{
        tuangc(2, this.token).then(res => {
          var sa=this.$_.map(res.result.cid, function(s){return s.gc_id_3})
          var sa1=this.$_.map(res.result.sid, function(s){return s.store_id})
          this.membersetCS({tsids:sa1,tcids:sa})
          this.$forceUpdate()
        })
      }
		}
		
	},
	methods: {
		...mapMutations({
			saveCurrentGoodsclassItem: 'saveCurrentGoodsclassItem',
			membersetCS:"membersetCS",
			saveGoodsclassItems:"saveGoodsclassItems"
		}),
		...mapActions({
			fetchGoodsclassList: 'fetchGoodsclassList'
		}),
		loading() {
			if (!(this.items && this.items.length)) {
				Indicator.open();
			}
			this.fetchGoodsclassList().then(
				response => {
					Indicator.close();
				},
				error => {
					Toast(error.message);
					Indicator.close();
				}
			);
		},
		onItemClick(item) {
			this.saveCurrentGoodsclassItem(item);
		},
		goProduct(id) {
			let params = { cate_id: id,supply_chain:1 };
			this.$router.push({ name: 'HomeUpGrapeGoodslist', query: params });
		}
	}
};
</script>

<style scoped lang="scss">
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
		top: 3.82rem;
		.category-sidebar {
			margin-top: 1.09rem;
			flex-basis: 8.78rem;
			// background-color: #f0f2f5;
			background-color: RGBA(246, 246, 246, 1);
			overflow-y: scroll;
			ul {
				padding-bottom: 5rem;
				// border-right: 0.5px solid #e8eaed;
				li {
					display: block;
					position: relative;
					// height: 4.09rem;
					// padding: 0.8rem 0.25rem;
					padding: 1.2rem 0 1.2rem 0.3rem;
					a {
						font-size: 1.13rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: rgba(111, 111, 111, 1);
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
						font-size: 1.3rem;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 700;
						color: rgba(22, 22, 22, 1);
						line-height: 1.83rem;
						-webkit-text-stroke: 0px rgba(151, 151, 151, 1);
						text-stroke: 0px rgba(151, 151, 151, 1);
					}
				}
			}
		}
		.category-content {
			width: 100%;
			background-color: rgba(253, 253, 253, 1);
			overflow: auto;
			margin-bottom: 6.5rem;
			// padding-top: 0.87rem;
			ul {
				// height: 100%;
				li {
					display: block;
					// padding: 0.95rem 0;
					text-align: left;
					// cursor: pointer;

					// border-bottom: 0.5px solid rgb(232, 234, 237);
					a {
						color: #333;
						font-weight: 700;
						padding: 1.74rem 0 0.87rem 2.26rem;
						// padding: 0.87rem 0;
						font-size: 1.3rem;
						// text-align: center;
						display: block;
					}
					div {
						background-color:  rgba(255, 255, 255, 1);
						margin: 0 1.3rem;
						padding-bottom: 1.3rem;
						dl {
							padding: 1.3rem 0 0 0;
							display: inline-block;
							width: 32.8%;
							text-align: center;
							dt {
								// position: relative;
								img {
									width: 4.96rem;
									height: 4.96rem;
									overflow: hidden;
								}
							}
							dd {
								font-size: 1.1rem;
								// line-height: 1rem;
								// height: 1rem;
								// overflow: hidden;
								margin-top: 0.61rem;
								color: rgba(22, 22, 22, 1);
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}
					}
				}
				
			}
		}
	}
}
</style>
