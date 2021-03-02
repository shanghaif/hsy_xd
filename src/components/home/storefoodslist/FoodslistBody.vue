<template>
<div class="choose-dishes">
		<!-- 顶部返回栏 -->
		<head-title fontSize='0.32rem' title="选择菜品"></head-title>
		<div class="gun">
			<div>
				<ul>
					<li v-for="v in 6" :key="v">{{message}}</li>
				</ul>
			</div>
		</div>
		<!-- 菜品主体列表  -->
		<div class="main">
			<main class="main_flex" v-if="!atype">
				<!-- 左侧导航 -->
				<div class="left_nav">
					<ul>
						<li class="leftActive">
							全部
						</li>
						<li  v-for="(item,index) in allArr.slice(1)" :key="index" @click="closeSelectMenu(index)">
							{{item.storegc_name}}
						</li>
					</ul>
				</div>
				<!-- 右侧餐品 -->
				<section class="right_section" ref="foodsWrapper">
					<div>
						<dl v-for="(obj, index1) in [allArr[0]]" :key="index1" class="food-list-hook">
							<dt>
								<span>{{obj.storegc_name}}</span>
							</dt>
							<dd class="dd_item">
								<ul class="good">
									<li v-for="(item, index2) in obj.goods_list" :key="index2" @click="goDetails(item)">
										<!-- 左侧图片 -->
										<div class="left-img">
											<img :src="item.goods_image" alt="">
										</div>
										<!-- 右侧菜品信息 -->
										<div class="right-info">
											<div class="name">{{item.goods_name}}</div>
											<div class="price-num">
												<div class="price">
													￥{{ parseFloat(item.goods_price).toFixed(2) }}
												</div>
												<!-- 点击 加减法 按钮 -->
												<div class="math">
													<div class="pb pop"
														v-show="item.num>0"
														:class="{mov: item.num>0}"
														@click.stop="reduce(index1, item)"
															>
															-
													</div>
													<span v-show="item.num>0">{{item.num}}</span>
													<!-- <span>{{item.num}}</span> -->
													<div class="pb"
														@click.stop="addCart(index1, index2, $event)">
														+
													</div>
												</div>

											</div>
										</div>
									</li>
								</ul>  
							</dd>
						</dl>
						
						<dl :style="{height:dlHeight}">
						</dl>
					</div>
				</section >
			</main>
			<main class="main_flex" v-if="atype">
				<!-- 左侧导航 -->
				<div class="left_nav"  ref="menuWrapper">
					<ul>						
						<li @click="atype=false">
							全部
						</li>
						<li :class="{leftActive: currentIndex === index}"  v-for="(item,index) in allArr.slice(1)" :key="index" @click="selectMenu(index)">
							{{item.storegc_name}}
						</li>
					</ul>
				</div>
				<!-- 右侧餐品 -->
				<section class="right_section" ref="foodsWrapper">
					<div>
						<dl v-for="(obj, index1) in allArr.slice(1)" :key="index1" class="food-list-hook">
							<dt>
								<span>{{obj.storegc_name}}</span>
							</dt>
							<dd class="dd_item">
								<ul class="good">
									<li v-for="(item, index2) in obj.goods_list" :key="index2" @click="goDetails(item)">
										<!-- 左侧图片 -->
										<div class="left-img">
											<img :src="item.goods_image" alt="">
										</div>
										<!-- 右侧菜品信息 -->
										<div class="right-info">
											<div class="name">{{item.goods_name}}</div>
											<div class="price-num">
												<div class="price">
													￥{{ parseFloat(item.goods_price).toFixed(2) }}
												</div>
												<!-- 点击 加减法 按钮 -->
												<div class="math">
													<div class="pb pop"
														v-show="item.num>0"
														:class="{mov: item.num>0}"
														@click.stop="reduce(index1, item)"
															>
															-
													</div>
													<span v-show="item.num>0">{{item.num}}</span>
													<!-- <span>{{item.num}}</span> -->
													<div class="pb"
														@click.stop="addCart(index1+1, index2, $event)">
														+
													</div>
												</div>

											</div>
										</div>
									</li>
								</ul>  
							</dd>
						</dl>
						
						<dl :style="{height:dlHeight}">
						</dl>
					</div>
				</section >
			</main>
		</div>

		<!-- 购物车 弹出页面 -->
		<mt-popup class="popup" v-model="popup" position="bottom">
			<div class="cart">
				<!-- 顶部 -->
				<div class="cart-top">
					<span>已选菜品</span>
					<div
						v-show="cartData && cartData.length>0 "
						@click="clearCart">
						<span class="del-btn iconfont">&#xe6d8;</span>
						<span>清空</span>
					</div>
				</div>
				<ul v-if="cartData.length>0">
					<li v-for="(v,i) in cartData" :key="i">
						<!-- 左侧图 -->
						<div>
							<img  :src="v.goods_image" alt="">
						</div>
						<!-- 右侧信息 -->
						<div class="cart-info">
							<span>{{v.goods_name}}</span>
							<div class="bottom">
								<span>
									<span>￥</span>
									<!-- <span>{{v.goods_price}}</span> -->
									<span>{{parseFloat(v.goods_price).toFixed(2) }}</span>
								</span>
								<div>
									<div @click="bottomCartDel(v,i)">-</div>
									<span>{{v.num}}</span>
									<div @click="bottomCartAdd(v)">+</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div v-else class="empty">
					<img src="@/assets/image/icon2/empty-choose-dishes.png" alt="">
					<p>您尚未选择任何商品</p>
				</div>
			</div>
		</mt-popup>

		<!-- 底部 -->
		<div class="foot" :class="{noData:cartData&&cartData.length==0}">
			<div class="foot-left">
				<img v-show="cartData&&cartData.length>0" @click="popup=!popup" src="@/assets/image/icon2/banquet-cart.png" alt="">
				<img v-show="cartData&&cartData.length<=0" @click="popup=!popup" src="@/assets/image/icon2/banquet-cart-empty.png" alt="">
				<div>单桌费用:</div>
				<span>￥{{totalPrice}}</span>
			</div>
			<!-- 完成 -->
			<div class="yes" @click="funYes">
				完成
			</div>
		</div>
		<!-- 运动的小球 -->
		<div id="points">
			<div v-for="num in 20" :key="num" class="pointOuter pointPre">
				<div class="point-inner"></div>
			</div>
		</div>

</div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
import { Toast, MessageBox, Indicator } from 'mint-ui';
import { resetRem, resumeRem } from '@/util/rem';
import { getBanqueGoodsClass } from '../../../api/memberBanquet';
import HeadTitle from '../../HeadTitle';

export default {
  name: 'IndexBanner',
  data(){
    return{
			store_id:this.$route.query.store_id,  // 商家 id
			banquet_type:this.$route.query.banquet_type,  // 宴请类型
			table_name:this.$route.query.table_name,  // 宴请桌子
			popup:false,
			message:'填写并提交您的宴席预定的基本信息，商家收到后会第一时间联系您',
			dlHeight:'90vh',
			atype: true,
			// allArr:[],
			allArr: [
				{
					storegc_name: '全部',
					goods_list: [
						{goods_name: 'food1', num: 0,goods_price:24},
						{goods_name: 'food2', num: 0,goods_price:26.9},
					]
				},
				{
					storegc_name: '推荐',
					goods_list: [{goods_name: 'food1', num: 0,goods_price:26.9}]
				},
				{
					storegc_name: 'C',
					goods_list: [{goods_name: 'food1', num: 0,goods_price:26.9}, {goods_name: 'food2', num: 0,goods_price:26.9}, {goods_name: 'food3', num: 0,goods_price:26.9}, {goods_name: 'food4', num: 0,goods_price:26.9}]
				},
			],
			cartData:[],
			// 滚动条
      listHeight: [],
      scrollY: 0,
			nowShow:0,
			
			totalNumber: 0,  // 总数
			// totalPrice: 0,     // 总价
    }
  },
	components: {
		"head-title":HeadTitle,
	},
	activated(){		
		console.log(this.mclass);
	},
	created(){
		// this.loading();
	},
  mounted(){
    //   这里用到一个定时器 等待数据渲染完毕 执行该方法 不然不能滑动 如果是真实数据 这两个方法放在this.$nextTick()里面
    //因为没有真实数据 只能用本地数据模拟下
    // setTimeout(() => {
    //   this._initScroll()
    //   this._calculateHeight()
		// }, 20)
		
		let sw = document.documentElement.clientWidth;
    let html = document.documentElement;
    
    html.style.fontSize = (sw/7.5) + 'px';
		// 监听 window 的 resize 事件．在浏览器窗口变化时再设置下区域高度．
		window.onresize = () => {
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;
      html.style.fontSize = (sw/7.5) + 'px';
		};
  },
	beforeDestroy() {
		resetRem();
	},
  computed: {
    ...mapState({
      banquetStore: state => state.home.banquetStore,
			mclass: state => state.member.mclass,
		}),
    // 计算得到当前分类下标
    currentIndex () {      
      //根据条件计算 产生一个结果 findIndex查找满足条件的下标 没找到返回-1
      const index=this.listHeight.findIndex((item,index)=>{
				//   如果滚动的距离>=左侧列表当前的高度并且 小于下一项的高度 
          return this.scrollY>=item && this.scrollY<this.listHeight[index + 1]
			})
			console.log(index);
        return index
		},
		totalPrice(){
			var total = 0;
			for( var obj of this.cartData ){
				// console.log(obj);
				// total +=  obj.num * (+obj.goods_price);
				total += obj.num * parseFloat(obj.goods_price*obj).toFixed(2);
			}
			return this.utils.currencyPrice( total )
		}
  },
  methods:{
	  // 跳转到详情页
	  goDetails(item){
		  // console.log(item);
		  // return;
		  this.savebanquetObj(item);
		  this.$router.push({ name: 'HomeBanquetGoods', query: { goods_id: item.goods_id,isFrom: 'dinner',num:item.num,table_name:this.table_name} })
	  },
	  
		// 获取 菜品列表
		loading(){
			getBanqueGoodsClass(this.store_id,this.banquet_type,this.table_name).then(res=>{
				// console.log('res',res);
				var data = res.result.goods_class;
				var quanbu = {
					storegc_name:"全部",
					goods_list:res.result.quanbu
				};
				// 循环 推荐类的 数据
				for( var t of data ){
						console.log('t',t);
					for( var index = 0;index<t.goods_list.length;index++ ){
						// console.log(t.goods_list[index]);
						for( var nei of quanbu.goods_list ){
							if( nei.goods_id == t.goods_list[index].goods_id ){
								console.log(nei);
								t.goods_list.splice(index,1,nei);
							}
						}
					}
				}

				data.unshift(quanbu);
				for( var item of data ){
					for( var end of item.goods_list ){
						end.num = 0;
					}
				}
				// 菜品
				// 购物车保存的 菜品
				this.cartData = this.banquetStore[this.table_name];
				for( var i = 0;i<this.cartData.length;i++ ){
					var newObj = this.cartData[i];
					
					for( var wai of data ){
						for( var index = 0; index<wai.goods_list.length;index++ ){
							var oldObj = wai.goods_list[index];
							if( oldObj.goods_id == newObj.goods_id ){
								wai.goods_list.splice(index,1,newObj)
							}
						}
					}
				}
				this.allArr = data;
				// console.log(this.allArr);
				this.$forceUpdate();
				
				this.$nextTick(()=>{
					var oldHeight = this.$refs.foodsWrapper.offsetHeight;
					var list = this.$refs.foodsWrapper.children[0].children;
					this.dlHeight = ( oldHeight - list[list.length-2].offsetHeight )+'px';
					// console.log(oldHeight,list[list.length-2].offsetHeight,this.dlHeight);
					// console.log(list[list.length-2] );
					// 这里用到一个定时器 等待数据渲染完毕 执行该方法 不然不能滑动 如果是真实数据 这两个方法放在this.$nextTick()里面
					setTimeout(() => {
						this._initScroll()
						this._calculateHeight()
					}, 20)
				})
			}).catch(err=>{
				// console.log(err);
				// Toast(err);
			})
		},
    //  设置两边列表可以滚动  内容区要比外层容器要高  列表先渲染 才可以滑动 
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        scrollY: true,
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        scrollY: true,
        click: true,
        probeType: 3
      })
    	//  右侧表绑定滑动监听 
      this.foodsScroll.on('scroll', (pos) => {
        //  获取每次滚动的值 绝对值
        this.scrollY = Math.abs(Math.round(pos.y))
      })
      //  右侧列表绑定滑动结束监听
      this.foodsScroll.on('scrollEnd', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },    
          
    _calculateHeight () {
			// 获取 所有左侧列表li  class 为 food-list-hook ul设置ref 
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
			let height=0;
			this.listHeight.push(height)
			// 第二种写法以改进  伪数组转为真数组 并循环遍历
			Array.prototype.slice.call(foodList).forEach((i) =>{
				height += i.clientHeight;
				this.listHeight.push(height);
			})
    
		},
		closeSelectMenu(index){
			this.atype = true;
			console.log(index);
			setTimeout(()=>{
				this.nowShow = index;
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				this.foodsScroll.scrollToElement(foodList[index],300)
			},3)
			
		},
    //  点击左侧列表 右侧列表滑动到指定位置
    selectMenu (index) {
      this.nowShow = index;
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      //  console.log(foodList[index].offsetTop);
    	//  scrollToElement可以滑动到指定位置
      this.foodsScroll.scrollToElement(foodList[index],300)
			//  第一个参数对应的食品列表 
			//  第二个参数为滑动 动画时长
    },
    ...mapMutations({
			saveBanquetStore:"saveBanquetStore",  // 保存 宴请 购物车 数据
			savebanquetObj:"savebanquetObj",  // 保存 当前详情页 对象
		}),
		
		// 食品选购按钮
		addCart(index1, index2, event) {
			// 是否有值
			var hasValue = false;
			this.totalNumber++;

			// 如果 购物车 数据 有值
			if( this.cartData.length >0 ){
				for( var obj of this.cartData ){
					// 如果当前 id  在 购物车里  
					if( obj.goods_id == this.allArr[index1].goods_list[index2].goods_id ){
						console.log(this.allArr[index1].goods_list[index2].goods_name);
						hasValue = true;
					}
				}
				if( hasValue ){
					// 只加数量
					this.allArr[index1].goods_list[index2].num++;
				}else{
					// 否则 追加 数据
					this.allArr[index1].goods_list[index2].num =1 ;
					this.cartData.push(this.allArr[index1].goods_list[index2]);
				}
			}else{
				// 直接加入
				this.cartData.push(this.allArr[index1].goods_list[index2]);
				this.allArr[index1].goods_list[index2].num++;
			}
			
			// 小球动画
			var top = event.clientY, // 小球降落起点
					left = event.clientX,
					endTop = window.innerHeight - (49/750*document.documentElement.clientWidth);  // 小球降落终点
			var endLeft = (82-28)/750*document.documentElement.clientWidth;

			// // 小球到达起点
			var outer = $('#points .pointPre').first().removeClass("pointPre").css({
				left: left + 'px',
				top: top + 'px'
			});
			var inner = outer.find(".point-inner");

			setTimeout(function() { 
				// 将jquery对象转换为DOM对象
				outer[0].style.webkitTransform = 'translate3d(0,' + (endTop - top) + 'px,0)';
				inner[0].style.webkitTransform = 'translate3d(' + (endLeft - left) + 'px,0,0)';
				
				// 小球运动完毕恢复到原点
				setTimeout(function() {
					outer.removeAttr("style").addClass("pointPre");
					inner.removeAttr("style");
				}, 670);  //这里的延迟值和小球的运动时间相关
			}, 1);
		},
		// 减少
		reduce(index1, item) {
			this.totalNumber--;
			for( var i = 0;i< this.cartData.length; i++ ){
				if( this.cartData[i].goods_id == item.goods_id ){
					this.cartData[i].num--;
					if( this.cartData[i].num == 0 ){						
						this.cartData.splice(i,1);
					}
				}
			}
		},

		// 清空购物车
		clearCart(){
			for( var item of this.allArr ){
				for( var obj of item.goods_list ){
					obj.num = 0;
				}
			}
			// console.log(this.allArr);
			this.cartData = [];
			this.saveToStore();
		},

		// 底部购物车 减减
		bottomCartDel(v,i){
			console.log(v);
			v.num--;
			this.totalNumber--;
			if( v.num == 0 ){
				this.cartData.splice(i,1);
			}
		},
		// 底部购物车 加加
		bottomCartAdd(v){
			console.log(v);
			v.num++;
			this.totalNumber++;
		},
		
		// 保存到仓库
		saveToStore(){
			var arr = [];
			if( this.cartData.length>0 ){
				arr = this.cartData;
			}
			var xzTotal = 0 ;
			var dzTotal = 0 ;
			var bjTotal = 0 ;
			var cookTotal = 0 ;
			// if( this.table_name == 'cook' ){
				for( var item of this.cartData ){
					cookTotal += item.num*( parseFloat(item.goods_price*item).toFixed(2));
				}
			// }else{
				// console.log(this.banquetStore);
				for( var item of this.banquetStore['xz'] ){
					xzTotal += item.num*( parseFloat(item.goods_price*item).toFixed(2));
				}
				for( var item of this.banquetStore['dz'] ){
					dzTotal += item.num*( parseFloat(item.goods_price*item).toFixed(2));
				}
				for( var item of this.banquetStore['bj'] ){
					bjTotal += item.num*( parseFloat(item.goods_price*item).toFixed(2));
				}
			// }
			var obj = {
				key:this.table_name,
				data:arr,
				xzTotal: this.utils.currencyPrice( xzTotal ),
				dzTotal: this.utils.currencyPrice( dzTotal ),
				bjTotal: this.utils.currencyPrice( bjTotal ),
				cookTotal: this.utils.currencyPrice( cookTotal ),
			};
			this.saveBanquetStore(obj);
			// this.saveBanquetStore({clear:true});
			// console.log( this.banquetStore );
		},

		// 点击完成
		funYes(){
			this.saveToStore();
			Toast("操作成功");
			this.$router.go(-1);
		},

  }
}
</script>

<style lang="scss" scoped>
.choose-dishes{
	@mixin flex{
		display: flex;
		justify-content: space-between;
	}
	div,img,li,ul{
		box-sizing: border-box;
	}
	height: 100vh;
	display: flex;
	flex-direction: column;
	// 主体 文字颜色
	$color:#161616;
	$color-small:#6F6F6F;
	// 字体大小
	$font: 0.28rem;
	// 字体大小
	$font-small: 0.24rem;

	color: $color;
	font-size: $font-small;

	.gun{
		height: 0.70rem;
		background: #FDF5C7;
		padding: 0.18rem 0.3rem;
		box-shadow: 0px 0px 0.20rem 0.13rem rgba(242, 242, 242, 0.54);
		line-height: 0.7rem;
		color: #F78C08;

		@keyframes identifier {
			0% {
				left: 0;
			}
			100% {
				left: -404%;
			}
		}

		>div{
			width: 96%;
			overflow: hidden;
			height: 0.33rem;
			margin: 0 auto;
			position: relative;
				
			ul {
				width: 96%;
				position: absolute;
				top: 50%;
				display: flex;
				white-space: nowrap;
				transform: translateY(-50%);
				left: 0;
				animation: identifier 60s infinite linear;
				li {
					margin-right: 1%;
					width: auto;
				}
			}
		}
	}

	
  // 头部
  &/deep/.head_title_cont{
    height: 4.5rem;
    height: 0.9rem;
    .header-wrap{
      padding: 1.3rem 1.5rem 1.2rem;
      padding: 0.26rem .3rem 0.24rem;
      img{
        width: 2rem;
        height: 2rem;
        width: 0.4rem;
        height: 0.4rem;
      }
    }
  }

	&/deep/.banner-bg{
		height:3.5rem;
		font-size: 1.2rem;
		height: .7rem;
		font-size: .24rem;
	}
	&/deep/.v-modal{
		z-index: 120 !important;
	}
	&/deep/.mint-popup{
		z-index: 130 !important;
	}

  // 主要餐品
  .main{
		flex: 1;
		overflow: scroll;

		// 主体
    .main_flex{
			display: flex;
			height: 100%;
			
      // 左侧导航栏
      .left_nav{
        overflow-y: auto;
        height: 100%;
        background-color: #F4F5F7;
				width: 1.60rem;

        li{
					line-height: .86rem;
					height: 0.86rem;
					text-align: center;
					color: $color-small;
				}
				
				// 选中的 状态
				.leftActive{
					background: #fff;
					font-weight: 600;
					color: $color;
				}
			}
			
      // 右侧菜品
      .right_section{
        overflow: hidden;
        width: 5.70rem;
				padding: 0 0.30rem 0 .20rem;
				dt{
					height: .86rem;
					line-height: .86rem;
					color: $color;
					font-size: $font;
				}
        .dd_item{
          position: relative;
          li{
            position: relative;
            display: flex;
						width: 100%;
						height: 1.50rem;
						margin-bottom: 0.40rem;

						.left-img{
							width: 1.50rem;
							height: 100.0%;
							background: #8B5F5F;
							border-radius: .08rem;
							margin-right: 0.20rem;
							img{
								width: 100%;
								height: 100%;
								border-radius: 0.08rem;
							}
						}

						.right-info{
							width: 3.70rem;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.name{
								height: 0.40rem;
								font-size: 0.28rem;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #161616;
								line-height: 0.40rem;
							}

							.price-num{
								display: flex;
								.price{
									width: .60rem;
									height: .40rem;
									font-size: .28rem;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 600;
									color: #FF0000;
									line-height: .40rem;
								}

								.math{
									flex: 1;
									display: flex;
									justify-content: flex-end;

									>div{
										color: #fff;
										width: 0.36rem;
										text-align: center;
										border-radius: 50%;
										height: 0.36rem;
										// line-height: 0.36rem;
										background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
									}
									span{
										margin: 0 .20rem;
										font-size: .28rem;
										font-family: PingFangSC-Medium, PingFang SC;
										font-weight: 600;
										color: #FF0000;
										min-width: 0.4rem;
    								text-align: center;

									}
								}
							}
						}
          }
        }        
                
      }

    }
  }

	// 底部购物车
	.foot{
		position: relative;
		z-index: 2048;
		width: 100%;
		// height: 0.98rem;
		background: #FFFFFF;
		padding: 0 0.30rem;
		display: flex;
		justify-content: space-between;

		.foot-left{
			display: flex;
			justify-content: space-between;
			img{
				width: 1.04rem;
				height: 0.71rem;
				margin: 0.13rem 0.16rem 0.15rem 0;
			}
			div{
				font-size: 0.26rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #161616;
				line-height: 0.37rem;
				margin: 0.31rem 0.10rem 0.30rem 0;
			}
			span{
				font-size: 0.30rem;
				font-family: DIN-Bold, DIN;
				font-weight: bold;
				color: #FF0000;
				line-height: 0.36rem;
				margin: 0.31rem 0;
			}
		}

		.yes{
			width: 1.88rem;
			margin: 0.14rem 0;
			height: 0.70rem;
			background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
			border-radius: 0.35rem;

			font-size: 0.24rem;
			line-height: 0.70rem;
			text-align: center;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;

		}
	}
	.noData{
		.foot-left{
			span{	
				color: #7A7A7A;
			}
		}
		.yes{
			background: #B7B7B7;
		}

	}

	.popup{
		background: transparent;
		// 购物车展开
		.cart{
			width: 100%;
			height: 7.80rem;
			background: #FFFFFF;
			border-radius: 0.30rem 0.30rem 0 0;
			padding: 0.40rem 0.23rem;
			padding-bottom: 0.98rem;
			text-align: center;

			.cart-top{
				display: flex;
				justify-content: space-between;
				>span{
					font-size: 0.26rem;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
					color: #161616;
					text-align: left;
				}
				>div{
					font-size: 0.26rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #6F6F6F;
					display: flex;
    			align-items: center;
				}
				.del-btn{
					width: 0.22rem;
					height: 0.22rem;
					font-size: 0.26rem;
					color: #6F6F6F;
					margin-right: 0.10rem;
				}
			}
			// 列表
			ul{
				padding: 0.30rem 0;
				overflow-y: scroll;
				height: 100%;
				li{
					$liHeight: 1.16rem;
					height: $liHeight;
					margin-bottom: 0.40rem;
					@include flex;
					>div{
						width: $liHeight;
						height: $liHeight;
						background: #8B5F5F;
						border-radius:0.8rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.cart-info{
						background: #fff;
						width: 5.68rem;
						margin-left: 0.20rem;
						height: $liHeight;
						@include flex;
						flex-direction: column;
						align-items: flex-start;
						>span{
							height: 0.37rem;
							font-size: 0.26rem;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 600;
							color: #161616;
							line-height: 0.37rem;
						}

						.bottom{
							@include flex;
							width: 100%;
							justify-content: space-between;
							>span{
								height: 0.37rem;
								font-size: 0.26rem;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 600;
								color: #FF0000;
								line-height: 0.37rem;
							}
							>div{
								@include flex;
								>span{
									margin: 0 0.20rem;
									height: 0.40rem;
									font-size: 0.28rem;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 600;
									color: #FF0000;
									line-height: 0.40rem;
									min-width: 0.35rem;

								}
								>div{
									color: #fff;
									width: .36rem;
									height: .36rem;
									line-height: .36rem;
									text-align: center;
									border-radius: 50%;
									background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
								}
							}
						}
					}

				}
			}

			// 空
			.empty{
				>img{
					width: 3.18rem;
					height: 2.28rem;
					margin-top: 1.17rem;
					margin-bottom: .42rem;
				}
				p{
					height: .33rem;
					font-size: .24rem;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #6F6F6F;
					line-height: .33rem;

				}
			}

		}
	}

  // .mint-palette-button {
  //   width: 6vw;
  //   height: 6vw;
  //   line-height: 6vw;
  //   font-size: 3vw;
  //   color:#fff;
  // }
  .pb{
		transition: all ease .5s;
	}
	.pop{
		opacity: 0;
	}
	/* 点击添加按钮缓慢弹出订单个数以及减少按钮 */
	.mov {
		opacity: 1;
	}
}

/* 运动小球------------------------------------------------- */

/* 运动小球 */
.pointPre {  /* 动画的小球 */
    display: none;
}
.pointOuter {
	// $ms: 0.68s;
	$ms: 0.34s;
	position: absolute;  
	z-index: 2049;
	/* 当小球抛出时遵循贝塞尔曲线过渡 */
	-webkit-transition: all $ms cubic-bezier(0.39,-0.4,0.83,0.23) 0s;
	transition: all $ms cubic-bezier(0.39,-0.4,0.83,0.23) 0s; 

	.point-inner {
		width: .36rem;
		height: .36rem;
		border-radius: 50%;
		background-color: #00a0dc;
		background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
		/* 过渡属性名称 过渡时间 过渡曲线 延迟时间 */
		transition: all $ms ease 0s;
		-webkit-transition: all $ms ease 0s;     
	}  
}
</style>