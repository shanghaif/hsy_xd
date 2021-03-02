<template>
<div class="storefoodslist">
	<!-- 头部 -->
	<div class="head">		
		<img @click="$router.go(-1)" src="@/assets/image/icon2/icon-white-back.png" alt="" />
		<div>
			<span class="isActive">餐饮企业</span>
		</div>
		<img src="@/assets/image/icon2/icon-white-back.png" alt="" />
	</div>
	<!-- 切换 按钮 -->
	<div class="s_text">
		<ul>
			<li
				v-for="(v,i) in list"
				:key="(i)"
				:class="{brand_active:  listType == v.type}" @click="fun_changeListType(v.type)" >
				{{v.name}}
				<p class="line"></p>
			</li>
		</ul>
	</div>

	<!-- 主要数据 -->
	<div v-show="listType" class="ele_main">
		<!-- BScroll  -->
		<div class="eledemo" v-show="foodArr.length">
			<main class="main_flex">
				<!-- 左侧导航 -->
				<div class="left_nav"  ref="menuWrapper">
					<ul>
						<li 
							:class="{current: currentIndex === index}" 
							v-for="(item,index) in foodArr" :key="item.id" 
							@click="selectMenu(index)">
							<!-- <img :src="item.goods_image"> -->
							<span>{{item.storegc_name}}</span>
						</li>
					</ul>
				</div>
				<!-- 右侧餐品 -->
				<section class="right_section" ref="foodsWrapper">
					<div>
						<dl v-for="(item,index) in foodArr" :key="index" class=" food-list-hook">
							<dt>
								<strong>{{item.storegc_name}}</strong>
								<!-- <span>大家喜欢吃，才叫真好吃</span> -->
							</dt>
							<dd v-if="!item.desk" class="dd_item">
								<ul>
									<li  v-for="(v,i) in item.goods_list" :key="i">
											<img @click.stop="goDetail(v.goods_id)" :src="v.goods_image" :alt="v.goods_name" :title="v.goods_name" >
											<section>
												<p class="title">{{v.goods_name}}</p> 
												<p class="white_nowrap">{{v.info}}</p>
												<!-- <p>
													<span>月售{{v.goods_name}}份</span> 
													<span>好评率{{100}}%</span>
												</p>
												<div class="red_biao">
													<span>{{9}}折</span> 
													<span>每单限{{1}}份优惠</span> 
												</div> -->
												<div class="price">
													<span>￥{{v.goods_price}}</span> <!----> 
													<!-- <del>¥{{18.8}}</del> -->
												</div>
												<div  class="btn-add-cont">
													<div 
														v-show="v.num>0"
														@click.stop="delCart(v)">
														<div class="btn-add">
															<div>
																-
															</div>
														</div>
													</div>

													<span v-show="v.num>0">{{v.num}}</span>

													<div @click.stop="addCart(v,$event)">
														<div class="btn-add">
															<div>
																+
															</div>
														</div>
													</div>
												</div>
											</section>
									</li>
								</ul>             
							</dd>
							
						</dl>

						<dl class=" food-list-hook">
							<dt>
								<strong></strong>
								<span></span>
							</dt>
							<dd class="dd_item">
								<ul>
									<li style="height:4rem">
									</li>
								</ul>             
							</dd>
						</dl>
						
					</div>				
					
				</section >
			</main>
		</div>		
		
		<div v-show="!foodArr.length" style="display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    align-items: center">
			<img style="width:60%" src="@/assets/image/icon2/empty-choose-dishes.png" alt="">
			<p>暂无菜品</p>
		</div>
	</div>
	
	<!-- 点桌 -->
	<div v-show="!listType" class="desk-cont">
		<!-- 选择 时间 -->
		<div class="get_data">
			<div class="time"
				@click="onDate('start')">
				<mt-cell title="起始" is-link>{{startTime?$moment.unix(startTime).format('YYYY-MM-DD HH'):''}}时</mt-cell>
			</div>
			<div class="time"
				@click="onDate('end')">
				<mt-cell title="结束" is-link>{{endTime?$moment.unix(endTime).format('YYYY-MM-DD HH'):''}}时</mt-cell>
			</div>
			<div class="time-button"
				@click="fun_getData">
				<span>查询</span>
			</div>
		</div>
		<!-- 桌子 列表 -->
		<ul>
			<li v-for="(item,index) in deskArr" :key="index"
				@click="addDesk(item)"
				>
				<span>{{item.desk_name}}</span>
				<div>
					<div class="btn-add">
						<div>
							+
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div v-if="nowDeskArr.length">
			<p style="padding:1vw 2vw">订桌记录</p>
			<ul>
				<li v-for="(item,index) in nowDeskArr" :key="index"
					>
					<span>{{item.desk_name}}</span>
					<div>
						<div class="btn-add">
							<div>
								+
							</div>
						</div>
					</div>
				</li>
			</ul>			
		</div>
	</div>

	<!-- 运动的小球 -->
	<div id="points">
		<div v-for="num in 20" :key="num" class="pointOuter pointPre">
			<div class="point-inner"></div>
		</div>
	</div>

	<div class="desk-cont">
		
		<mt-datetime-picker
				ref="startTime"
				type="dateTime"
				:startDate="new Date()"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="startTime?(new Date(startTime*1000)):(new Date())"
				@confirm="dateConfirm"
		>
		</mt-datetime-picker>
		<mt-datetime-picker
				ref="endTime"
				type="dateTime"
				:startDate="new Date()"
				yearFormat="{value}年"
				monthFormat="{value}月"
				dateFormat="{value}日"
				:value="endTime?(new Date(endTime*1000)):(new Date())"
				@confirm="dateConfirm"
		>
		</mt-datetime-picker>
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
	<div v-show="foodArr.length" class="foot" :class="{noData:cartData&&cartData.length==0,showFoot:!listType}">
		<div class="foot-left">
			<span class="jiao" v-show="totalNumber>0">{{totalNumber}}</span>
			<img v-show="cartData&&cartData.length>0" @click="popup=!popup" src="@/assets/image/icon2/banquet-cart.png" alt="">
			<img v-show="cartData&&cartData.length<=0" @click="popup=!popup" src="@/assets/image/icon2/banquet-cart-empty.png" alt="">
			<div>单桌费用:</div>
			<span>￥{{totalPrice}}</span>
		</div>
		<!-- 完成 -->
		<div class="yes" @click="funYes">
			加入购物车
		</div>
	</div>

	<!-- 底部 -->
	<common-store-footer-food :store_id="store_id" class="store-foot"></common-store-footer-food>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast, Indicator  } from 'mint-ui';
import BScroll from 'better-scroll'
import CommonStoreFooterFood from '../common/CommonStoreFooterFood';
import { resetRem, resumeRem } from '@/util/rem';
import { getStoreInfo} from '../../../api/homestoredetail';
import { getFoodsList, getSelectDesk, setDeskOrder, getDeskOrderList } from '../../../api/homestoredetail';
import { cartAdd } from '../../../api/homecart';
import { isWechat } from '../../../util/wechat'

export default {
  components:{
		CommonStoreFooterFood
	},
	
  data(){
    return{
			listType : true,
			list:[
				{ name:"点菜",type:true },
				{ name:"点桌",type:false },
			],
      startTime:new Date(new Date().toLocaleDateString() +' '+new Date().getHours()+':00:00')/1000,  //起始时间
      endTime: new Date(new Date().toLocaleDateString() +' '+new Date().getHours()+':00:00')/1000+(60*60),    //结束时间
      dataName:null,   //时间类型
      selectData: '',
			deskArr:[],     // 餐桌 列表

			cartData:[],      // 购物车
			popup:false,      // 购物车 显示
			foodArr:[1
			],
			
      listHeight: [],
			scrollY: 0,
			
			store_id: this.$route.query.id,
			
			nowDeskArr:[],    //  登陆人 当前选中的 餐桌
    }
  },
  created(){
		this.getStoreDetails();
		this.loading();
  },
  mounted(){ 
    //   这里用到一个定时器 等待数据渲染完毕 执行该方法 不然不能滑动 如果是真实数据 这两个方法放在this.$nextTick()里面
    //因为没有真实数据 只能用本地数据模拟下
    // setTimeout(() => {
    //   this._initScroll()
    //   this._calculateHeight()
		// }, 20);
		resetRem();
  },
  computed: {		
		...mapState({
			isOnline: state => state.member.isOnline,
			mclass: state => state.member.mclass,

			
			areaId: state => state.member.area_id, //member数据，用于查看商品信息
			sellerInfo: state => state.seller.info, //seller数据，用于查看商品信息
			tuan: state => state.member.tuan, //社区团
			extuan: state => state.member.extuan,
			memberInfo: state => state.member.info, //member数据，用于查看商品信息
			exid: state => state.member.exid,
			extuan: state => state.member.extuan,
			token: state => state.member.token,
			config: state => state.config.config,
			storeInfo: state => state.goodsdetail.storeInfo,
		}),
    // 计算得到当前分类下标
    currentIndex () {
    	// 根据条件计算 产生一个结果 findIndex查找满足条件的下标 没找到返回-1
      const index=this.listHeight.findIndex((item,index)=>{
        // 如果滚动的距离>=左侧列表当前的高度并且 小于下一项的高度 
				return this.scrollY>=item && this.scrollY<this.listHeight[index + 1]
      })
			return index
		},
		
		// 价格
		totalPrice(){
			var total = 0;
			for( var obj of this.cartData ){
				// console.log(obj);
				// total +=  obj.num * (+obj.goods_price);
				total += obj.num * parseFloat(obj.goods_price).toFixed(2);
			}
			return this.utils.currencyPrice( total )
		},

		totalNumber(){
			var AllNum = 0;
			for( var obj of this.cartData ){
				AllNum += obj.num;
			}
			return AllNum
		}

  },
  methods:{
		
		...mapMutations({
			saveStoreInfo:"saveStoreInfo", // 存储 当前 商家 信息
		}),
		fun_changeListType(val){
			this.listType = val;
		},
		
		getStoreDetails() {
			// console.log(this.params,this.$route.query)
			// 初始化seller_id,member_id
			var seller_id = null,
				member_id = null,
				areaId = this.areaId,
				tuan = this.tuan;
			if (this.sellerInfo) {
				//有信息 赋值
				seller_id = this.sellerInfo.seller_id;
			}
			if (this.memberInfo) {
				//有信息 赋值
				member_id = this.memberInfo.member_id;
			}
			if (this.exid) {
				areaId = this.exid;
			}
			if (this.extuan) {
				tuan = this.extuan;
			}
			
			// terminal_id 终端id，1APP 2公众号 3h5
			var terminal_id = 3;
			if( isWechat() ){
				terminal_id = 2;
			}else if( window.plus ){
				terminal_id = 1;
			}
			// console.log(terminal_id);
			// 查询接口
			// debugger
			getStoreInfo(terminal_id,this.store_id, this.token, member_id, seller_id, this.varMarket, areaId, tuan)
				.then(res => {
					this.saveStoreInfo(res.result.store_info);
					this.$forceUpdate();
				}).catch(function(error) {});
		},
		
    // 接收日期
    dateConfirm (value) {
			value = this.$moment.unix(value/1000).format('YYYY-MM-DD HH')+':00:00';
      var nowDate = parseInt(new Date(value).getTime() / 1000);      
      if( this.dataName == 'start'){
        if( !this.endTime ){
          this.startTime = nowDate;					
				}else if( nowDate <= this.endTime){
          this.startTime = nowDate;
        }else{
          Toast("请重新选择时间");
        }
      }else{
        if( !this.startTime ){
          this.endTime = nowDate;					
        }else if( this.startTime && nowDate >= this.startTime){
          this.endTime = nowDate;
        }else{          
          Toast("请重新选择时间");
        }
      }
      this.$forceUpdate()
    },
		// 查询 餐桌  
		fun_getData(){
			if( this.isOnline ){
				// console.log(this.endTime-this.startTime);
				if( this.endTime-this.startTime>=600 ){
					Indicator.open();
					getSelectDesk(this.store_id,this.startTime,this.endTime).then(res=>{
						Indicator.close();
						this.deskArr = res.result;
					}).catch(err=>{
						Indicator.close();
						Toast(err.message);
					})
				}else{
					Toast("时间间隔必须大于10分钟");
				}
			}else{
				Toast("请登录后操作！");
			}
		},

    // 选择时间函数
    onDate (name,type) {
      this.dataName = name;      
      if( name ==  'start' ){
        this.selectData = this.startTime*1000;
        this.$refs.startTime.open();
      }else{
        this.selectData = this.endTime*1000;
        this.$refs.endTime.open();
      }
    },
		

		// 点击 桌子
		addDesk(item){
			if( this.isOnline ){
				setDeskOrder(item.id,this.store_id,this.startTime,this.endTime).then(res=>{
					Toast(res.message);
					this.fun_getData();
					this.nowDeskArr.push(item);
					// console.log(this.nowDeskArr);
				}).catch(err=>{
					Toast(err.message);
				})
			}else{
				Toast("请登录后操作！");
			}
		},

		
		goDetail(goods_id) {
			this.$router.push({ name: 'HomeGoodsdetail', query: { goods_id: goods_id } });
		},

		// 初始化 加载 餐饮 菜品数据
		loading(){
			getFoodsList(this.store_id).then(res=>{
				var arr = [];
				arr.push(
					{
						storegc_name:"全部",
						goods_list:res.result.quanbu,
					}
				)
				arr = arr.concat(res.result.goods_class);
				// console.log(arr);
				var brr = [];
				for( var i = 0; i <arr.length ; i++){
					(arr[i].goods_list.length != 0)?(brr.push(arr[i])):''
				}
				for( var obj of brr){
					for( var end of obj.goods_list){
						end.num = 0;
					}
				}
				// brr.push(
				// 	{
				// 		storegc_name:"点桌",
				// 		desk:true,
				// 	}
				// );
				this.foodArr = brr;
				
				//   这里用到一个定时器 等待数据渲染完毕 执行该方法 不然不能滑动 如果是真实数据 这两个方法放在this.$nextTick()里面
				//因为没有真实数据 只能用本地数据模拟下
				setTimeout(() => {
					this._initScroll()
					this._calculateHeight()
				}, 20);
			}).catch(err=>{
				Toast(err.message);
			})
		},
		// 点击 跳转
		funYes(){
			if( this.isOnline ){
				// console.log("🚀 ~ file: Foodslist.vue ~ line 313 ~ funYes ~ this.cartData", this.cartData);
				if(  this.cartData ){
					var lang = 0;
					for( var obj of this.cartData ){
						cartAdd( obj.goods_id, obj.num, '', 1, '', '').then(
							res => {
								// console.log(res);
								lang++;
							},
							error => {
								Toast(error.message);
							}
						);
					}
					// var timer = setInterval(()=>{
					// 	if( lang == this.cartData.length ){
					// 		this.$router.push({name:'HomeCart'});
					// 	}
					// },400);
					// setTimeout(()=>{
					// 	clearInterval(timer);
					// 	timer = null;
					// },5000)
					
					// setTimeout(()=>{
					// 	clearInterval(timer);
					// 	timer = null,
					// },3000);
				}
			}else{
				Toast("请登录后操作");
			}
		},
	

    //     设置两边列表可以滚动  内容区要比外层容器要高  列表先渲染 才可以滑动 
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
      //    右侧表绑定滑动监听 
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
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')

			let height=0;
			this.listHeight.push(height)

			//   伪数组转为真数组 并循环遍历
			Array.prototype.slice.call(foodList).forEach((i) =>{
				height += i.clientHeight
				this.listHeight.push(height)
			})
    
    },
    //  点击左侧列表 右侧列表滑动到指定位置
    selectMenu (index) {
			setTimeout(()=>{				
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
				//   scrollToElement可以滑动到指定位置
				this.foodsScroll.scrollToElement(foodList[index],300)
				//    第一个参数对应的食品列表
				//  第二个参数为滑动 动画时长				
			},1)
		},


		delCart(item){
			// console.log(item);
			// obj.num--;
			
			for( var i = 0;i< this.cartData.length; i++ ){
				if( this.cartData[i].goods_id == item.goods_id ){
					this.cartData[i].num--;
					if( this.cartData[i].num == 0 ){						
						this.cartData.splice(i,1);
					}
				}
			}
		},
		
    // 添加套餐
    addCart(obj,event){
			
			if( !this.isOnline ){
				Toast('请登陆后操作！');
				return false;
			}
			// 是否有值
			var hasValue = false;
			// 初次 加入
			if( !this.cartData.length ){
				obj.num = 1;
				this.cartData.push(obj)
			}else{
				// 判断 购物车中是否 有此菜品
				for( var item of this.cartData ){
					item.goods_id == obj.goods_id?( hasValue = true ):''
				}
				hasValue?( obj.num++ ):( obj.num = 1,this.cartData.push(obj) );
			}
			/************************************************************************** */
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
			/******************************************************** */
		},
		
		// 底部购物车 减减
		bottomCartDel(v,i){
			v.num--;
			if( v.num == 0 ){
				this.cartData.splice(i,1);
			}
		},
		// 底部购物车 加加
		bottomCartAdd(v){
			v.num++;
		},
		
		// 清除 套餐
		clearCart(){
			for( var item of this.foodArr ){
				for( var obj of item.goods_list ){
					obj.num = 0;
				}
			}
			this.cartData = [];
		},
  }
}
</script>

<style lang="scss" scoped>
.storefoodslist{
	height: 100vh;
	overflow-y: hidden;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	flex-wrap: nowrap;

	div{
		box-sizing: border-box;
	}
	// 头部
	.head{
		flex-grow:0;
		height: 4.66rem;
		display: flex;
		justify-content: space-between;
		width: 100%;
		background: #626771;
		padding: 1.24rem 1.43rem;

		img{
			width: 1.91rem;
    	height: 1.91rem;
			&:last-child{
				opacity: 0;
			}
		}

		div{
			span{
				font-size: 1.6rem;
				color: #ccc;
				margin: 0 1rem;
			}
			.isActive{
				color: #fff;
			}
		}
	}
	
// 搜索文本
	.s_text{
		ul{
			display: flex;
			justify-content: flex-start;
			flex-wrap: nowrap;
			padding: 0rem 1.43rem;
			background-color: #626771;
			li{
				padding: .4rem 1.5rem;
				text-align: center;
				height: 2.4rem;
				line-height: 2.2rem;
				-ms-flex-negative: 0;
				flex-shrink: 0;
				margin: 0 0.2rem;
				font-size: 1.5rem;
				color: #A4ABB3;
				/*
				padding: .4rem 1.5rem;
				text-align: center;
				height: 3.4rem;
				width: 17.533333vw;
				box-sizing: border-box;
				line-height: 2.2rem;
				-ms-flex-negative: 0;
				flex-shrink: 0;
				margin: 0 0rem;
				font-size: 1.4rem;
				*/
			}
			.brand_active{
				transition: all .5s;
				background: #fff;
				color: #161616;
				border-radius: 10% 10% 0 0
			}
		}
	}
    
	.end-bottom{
		height: 4.66rem;
		flex: 1;
	}

	// 点餐
	.ele_main{
		flex-grow:1;
		overflow: hidden;
		// 主要餐品
		.eledemo{
			.main_flex{
				// padding-bottom: 4rem;
				display: flex;
				// 左侧导航栏
				.left_nav{
					// max-height:162vw;
					overflow-y: auto;
					height: 100%;
					background-color: #f8f8f8;
					// -webkit-overflow-scrolling: touch;
					// padding-bottom: 1.066667rem;
					// padding-bottom: 10.666667vw;    
					width: 2.053333rem;
					width: 20.533333vw;
					&::-webkit-scrollbar { width: 0 !important }
					li{
						position: relative;
						padding: .466667rem .2rem;
						padding: 4.666667vw 2vw;
						font-size: 3.2vw;
						color: #666;
						text-align: center;
						img{
							width: 3.466667vw;
							height: 3.466667vw;
							margin-right: .8vw;
						}
						span{
							font-size: 3.2vw;
						}
					}
				}
				// 右侧菜品
				.right_section{    
					overflow: hidden;
					max-height:200vw;
					margin-right: .133333rem;
					margin-right: 1.333333vw;
					font-weight: 700;
					font-size: 2.66667vw;
					color: #666;
					-webkit-flex: none;
					flex: none;
					width: 79vw;
					padding-left: 2vw;
					dl{
						&:last-child{
							min-height: 98vh;
							pointer-events: auto;
						}
					}
					dt{
						padding: 3.2vw 0;
						font-size: 1.36rem;   
						padding: 4.666667vw 2vw;
						font-size: 3.2vw;
						strong{
							font-weight: 700;
						}
						span{
							margin-left: 2vw;
							color:#999;
						}
					}
					.dd_item{
						margin-bottom: 3vw;
						position: relative;
						font-size: 2.66667vw;
						color: #999;
						li{
							position: relative;
							display: flex;
							margin-bottom: 4vw;
							img{
								width:20vw ; 
								height: 20vw; 
							}
							section{
								padding-left: 2vw;
								width: 50vw;
								position: relative;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								.title{
									font-size: 4vw;
									color:#333;
									font-weight: 800;
								}
								.white_nowrap{
									white-space: nowrap;
									width: 42.666667vw;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									margin: 1.333333vw 0;
								}
								.red_biao{
									color: #f07373;
									font-size: 1.533333vw;
									span:first-child{
										border-radius: .026667rem;
										border-radius: .266667vw;
										border: .026667rem solid hsla(8,79%,62%,.3);
										border: .266667vw solid hsla(8,79%,62%,.3);
										margin-right: 2vw;
									}
								}
								.price{
									color: rgb(255, 83, 57);
									font-size:4vw;
									del{
										font-size:3.2vw;
										color:#999;
										margin-left: 2vw;
									}
								}
								
							}
						}
					}
					
									
				}

			}
		}
		.btn-add {
			width: 5vw;
			height: 5vw;
			line-height: 5vw;
			font-size: 2.5vw;
			color:#fff;
			position: relative;
      border-radius: 50%;
			text-align: center;
			>div{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				font-size: 2em;
				background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
				box-shadow: 0px 0px 1.8rem 0px rgba(251, 104, 84, 0.5);

			}
		}

		.btn-add-cont{
			bottom: 0;
			right: 0;
			position: absolute;
			display: flex;
			justify-content: flex-end;
			span{
				margin: 0 1rem;
				font-size: 1.18rem;
				width: 2rem;
				text-align: center;
			}
		}

		.current{
			position: relative;
			background: #fff;
			font-weight: 700;
			margin-top: -1px;
			color: aquamarine;
			z-index: 1;
		}
	}

	// 点桌
	.desk-cont{
		flex: 1;
		ul,li{
			box-sizing: border-box;
		}
		
		.get_data{
			display: flex;
			justify-content: space-between;
			.time{
				width: 40%;
				font-weight:400;
			}
			.time-button{
				width: 20%;
				margin: 0 auto;
				background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			&/deep/.mint-cell-wrapper{
				font-size: 1.2rem;
				padding-right: 0;
				
				.mint-cell-allow-right::after{
					right: 6px;
				}
				.mint-cell-value.is-link{
					margin-right: 12px;
				}
			}
		}
		
		&/deep/.mint-popup{
			bottom: 8rem;
			.picker-slot{
				&:first-child{
					display: none;
				}
				&:nth-child(5){
					display: none;
				}
			}
		}
		ul{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 1vw;
			>li{
				width: 46%;
				padding: 3vw 2vw;
				margin: 1vw;
				font-size: 1.28rem;
				border: 1px solid #eee;
				border-radius: 1rem;
				display: flex;
				position: relative;
				span{
					display: inline-block;
					width: 72%;
				}
				>div{					
					position: absolute;
					bottom: 1rem;
					right: 1rem;
				}
				.btn-add {
					width: 6vw;
					height: 6vw;
					line-height: 6vw;
					font-size: 3vw;
					color:#fff;
					position: relative;
					border-radius: 50%;
					text-align: center;
					>div{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						border-radius: 50%;
						font-size: 2em;
						background: linear-gradient(90deg, #FC6952 0%, #E53216 100%);
						box-shadow: 0px 0px 1.8rem 0px rgba(251, 104, 84, 0.5);

					}
				}
			}
		}
	}

	/* 运动小球------------------------------------------------- */

	/* 运动小球 */
	.pointPre {  /* 动画的小球 */
		display: none;
	}
	.pointOuter {
		// $ms: 0.68s;
		flex-grow:0;
		$ms: 0.34s;
		position: absolute;  
		z-index: 1;
		/* 当小球抛出时遵循贝塞尔曲线过渡 */
		-webkit-transition: all $ms cubic-bezier(0.39,-0.4,0.83,0.23) 0s;
		transition: all $ms cubic-bezier(0.39,-0.4,0.83,0.23) 0s; 

		.point-inner {
			width: 3.6vw;
			height: 3.6vw;
			border-radius: 50%;
			background-color: #00a0dc;
			background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
			/* 过渡属性名称 过渡时间 过渡曲线 延迟时间 */
			transition: all $ms ease 0s;
			-webkit-transition: all $ms ease 0s;     
		}  
	}


	// &/deep/ .home-base{
	// 	height: 5.76rem;
	// 	.common-footer-wrap .common-footer{
	// 		z-index: 9999;
	// 	}
	// }

	.store-foot{
		height: 8.5rem;
		z-index: 9999;
	}

	/***************************************** */
	
	@mixin flex{
		display: flex;
		justify-content: space-between;
	}
	div.showFoot{
		height: 0.93rem;
	}
	// 底部购物车
	.foot{
		position: relative;
		z-index: 2048;
		width: 100%;
		height: 3.98rem;
		flex: 0;
		background: #FFFFFF;
		padding: 0 0.30rem;
		display: flex;
		justify-content: space-between;

		.foot-left{
			display: flex;
			justify-content: space-between;
			position: relative;
			.jiao{
				position: absolute;
				top: -1.7rem;
				text-align: center;
				left: 3rem;
				width: 1.7rem;
				height: 1.7rem;
				font-size: 1.12rem;
				line-height: 1.7rem;
				color: #fff;
				background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
				border-radius: 50%;
			}
			img{   
				width: 4.16rem;
    		height: 2.84rem;
				margin: 0.52rem 0.56rem 0.6rem 0;
			}
			div{
				font-weight: 400;
				color: #161616;
				line-height: 1.48rem;
				margin: 1.24rem 0.4rem 1.2rem 0;
			}
			span{
				font-weight: bold;
				color: #FF0000;
				line-height: 1.44rem;
				margin: 1.24rem 0;
			}
		}

		.yes{
			width: 7.52rem;
			margin: 0.56rem 0;
			height: 2.8rem;
			background: linear-gradient(90deg, #FF865D 0%, #FB060D 100%);
			border-radius: 0.35rem;

			font-size: 1.2rem;
			line-height: 2.8rem;
			text-align: center;
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
			height: 38rem;
			background: #FFFFFF;
			border-radius: 1.2rem 1.20rem 0 0;
			padding: 1.6rem 0.92rem;
			padding-bottom: 12rem;
			text-align: center;

			.cart-top{
				display: flex;
				justify-content: space-between;
				>span{
					// font-size: 0.26rem;
					font-weight: 600;
					color: #161616;
					text-align: left;
				}
				>div{
					// font-size: 0.26rem;
					font-weight: 400;
					color: #6F6F6F;
					display: flex;
    			align-items: center;
				}
				.del-btn{
					width: 0.88rem;
					height: 0.88rem;
					font-size: 1.2rem;
					transform: translateY(-0.181rem);
					color: #6F6F6F;
					margin-right: 0.40rem;
				}
			}
			// 列表
			ul{
				padding: 1.20rem 0;
				overflow-y: scroll;
				height: 100%;
				li{
					$liHeight: 4.64rem;
					height: $liHeight;
					margin-bottom: 1.6rem;
					@include flex;
					>div{
						width: $liHeight;
						height: $liHeight;
						background: #8B5F5F;
						border-radius:3.2rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.cart-info{
						background: #fff;
						// width: 22.72rem;
						flex: 1;
						margin-left: 0.80rem;
						height: $liHeight;
						@include flex;
						flex-direction: column;
						align-items: flex-start;
						>span{
							height: 1.58rem;
							font-weight: 600;
							color: #161616;
							line-height: 1.58rem;
						}

						.bottom{
							@include flex;
							width: 100%;
							justify-content: space-between;
							>span{
								height: 1.48rem;
								font-weight: 600;
								color: #FF0000;
								line-height: 1.48rem;
							}
							>div{
								@include flex;
								>span{
									margin: 0 0.8rem;
									height: 1.6remrem;
									// font-size: 0.28rem;
									font-weight: 600;
									color: #FF0000;
									line-height: 1.6rem;
									min-width: 1.2rem;

								}
								>div{
									color: #fff;
									width: 1.2rem;
									height: 1.2rem;
									line-height: 1.2rem;
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
					width: 12.72rem;
					height: 9.12rem;
					margin-top: 1.17rem;
					margin-bottom: .42rem;
				}
				p{
					height: 4.68rem;
					font-weight: 400;
					color: #6F6F6F;
					line-height: 1.32rem;

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
</style>