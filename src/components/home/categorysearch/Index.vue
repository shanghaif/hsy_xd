<!--
 * @Prayer: Bless no bugs
 * @Autor: Yan Wenran
 * @Date: 2021-01-28 17:09:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-02-22 13:46:54
-->
<template>
<div class="category-search">  
  <!-- 上面头部 -->
  <div class="top-head">
    <div class="main-head">
      <img @click="fun_GoLeft" src="@/assets/image/icon2/icon-black-left.png" alt="" />
      <span>{{TopTitle}}</span>
      <img @click="popupVisible = !popupVisible" src="@/assets/image/icon2/icon-ellipsis-white.png" alt="">
    </div>
  </div>

  <!-- 搜索 列表 -->
  <div class="category-content" v-if="TopSelectArr">
    <!-- 顶部搜索框 -->
    <div ref="topBtn" class="top-btn">
      <ul>
        <li
          :class='{active: TopSelectArr.gc_id == currentId}'
          @click="fun_changeData(TopSelectArr,0)"
          >全部</li>

        <li v-for="(top,TopIndex) in TopSelectArr.child" :key="TopIndex+top.gc_name"
          :class='{active: top.gc_id == currentId}'
          @click="fun_changeData(top,TopIndex+1)"
          >{{top.gc_name}}</li>
      </ul>
    </div>
    <!-- 排序框 -->
    <div class="center-btn">
      <ul class="filter-list">
        <li
          class="item"
          v-for="(item, index) in sortkey"
          v-bind:key="item.id+item.name"
          v-on:click="setActiveSortkey(item, index)"
          v-bind:class="{ sortactive: item.id == currentSortKey.id, sortnormal: item.id != currentSortKey.id }"
        >
          <a v-if="!item.isMore">{{ item.name }}</a>
          <a v-else>{{ sort.name }}</a>
          <span class="iconfont" :class="isShowMore ? 'active' : ''" v-if="item.isMore">&#xe6ea;</span>
          <!-- <img class="sort-img" src="@/assets/image/icon2/icon-bottom.png" 
            :class="isShowMore ? 'active' : ''" v-if="item.isMore" alt="" /> -->
        </li>
      </ul>
      <div class="bg-mask" v-if="isShowMore"></div>
      <div class="sort-model" v-if="isShowMore">
        <div v-for="(item2) in childSort" v-bind:key="item2.id+item2.name" v-on:click="getSortChild(item2)" v-bind:class="{ active: item2.id == sort.id }">
          <a>{{ item2.name }}</a>
          <span class="iconfont" v-if="item2.id == sort.id">&#xe69b;</span>
        </div>
      </div>
    </div>

    <!-- 商品列表页 -->
    <div ref="rightCont" class="goods-ul" v-infinite-scroll="getMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      
      <index-product-list v-if="goods_list" :items="goods_list" @getScrollTop="getScrollTop"></index-product-list>
      
      <div class="end">
        <div v-if="goods_list.length > 0">
          <p v-if="!isMore">没有更多了</p>
          <mt-spinner type="triple-bounce" color="#e93b3d" v-if="isMore"></mt-spinner>
        </div>
      </div>
      <empty-record-new v-if="goods_list&&goods_list.length <= 0 && !isMore" isFrom='content'></empty-record-new>					
    </div>
  </div>
</div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { getGoodsClassGoods } from '../../../api/homesearch';
import { mapState, mapMutations, mapActions } from 'vuex';
import EmptyRecordNew from '../../EmptyRecordNew';
import IndexProductList from './IndexProductList.vue';
export default {
	data(){
		return{
			currentId: 0,   // 默认 二级 分类
			
			isShowMore    : false,   // 是否显示筛选模态框
			currentSortKey: {},      // 当前选中的排序
			sort          : {},      // 综合筛选子集
			sortkey: [
				{
					key: '',
					name: '综合排序',
					isMore: true,
					id: 0,
					child: [
						{
							key: '',
							name: '综合排序',
							isMore: false,
							id: 3
						},
						// {
						// 	key: 'distance',
						// 	name: '距离排序',
						// 	isMore: false,
						// 	id: 4
						// }
					]
				},
				{
					key: 'store_sales',
					name: '销量',
					isMore: false,
					id: 1
				},
				{
					key: 'new_time',
					name: '新品',
					isMore: false,
					id: 2
				},
				// {
				// 	key: 'store_area_id',
				// 	name: '区域筛选',
				// 	isMore: false,
				// 	id: 3
				// }
			], // 排序数据

			params : {
				page    : 0,            // 第几页
				pageSize: 10,           // 每页条数
				keyword : "",           // 关键词
				sort_key: "",           // 排序
				gc_id   : 1,            // 分类
				key     : this.token,   // 用户标识
			},
			
			loading: false,   // 是否加载更多
			isMore : true,    // 是否有更多

      goods_list: [],   // 商品列表
      
      TopSelectArr: [],  // 顶部搜索框
      TopTitle:'分类', // 标题

      HmtlPx:null,   // 屏幕单位
		}
  },
  components:{
    "empty-record-new":EmptyRecordNew,    
		"index-product-list": IndexProductList,   // 商品
  },

	computed: {
		...mapState({
			token: state => state.member.token,  // 用户标识
			
			goodClassData: state => state.goodsclass.goodClassData,  // 左侧商品分类
		}),
  },

  
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next(vm => {
			( from.name != 'HomeGoodsdetail' )?(  
        vm.fetchGoodsclassListNew().then(
          response => {
            Indicator.close();
            vm.goodClassData.forEach((obj,i)=>{
              ( obj.gc_id == vm.$route.query.gc_id_father ) && (
                vm.TopSelectArr = obj
              )
            })
            vm.TopTitle = vm.TopSelectArr.gc_name;
            vm.firstloading();
          },
          error => {
            Toast(error.message);
            Indicator.close();
          }
        )
			):(
        // 旧版本 缓存数据 滚动条
        vm.$nextTick(()=>{
          vm.$refs.rightCont.scrollTop = vm.rightContScrollTop;
          vm.$refs.topBtn.scrollLeft = vm.topBtnScrollTop
        })
      );  
      (()=>{
        let sw = document.documentElement.clientWidth;
        let html = document.documentElement;    
        html.style.fontSize = (sw/7.5) + 'px';
        window.onresize = () => {
          let sw = document.documentElement.clientWidth;
          let html = document.documentElement;
          html.style.fontSize = (sw/7.5) + 'px';
        };
      })();
		})
	},
  
  created(){
    this.fetchGoodsclassListNew().then(
      response => {
        Indicator.close();
        this.goodClassData.forEach((obj,i)=>{
          ( obj.gc_id == this.$route.query.gc_id_father ) && (
            this.TopSelectArr = obj
          )
        })
        this.TopTitle = this.TopSelectArr.gc_name;
        this.firstloading();
      },
      error => {
        Toast(error.message);
        Indicator.close();
      }
    );
  },
	
	
	mounted(){
		(()=>{
			let sw = document.documentElement.clientWidth;
			let html = document.documentElement;    
			html.style.fontSize = (sw/7.5) + 'px';
			window.onresize = () => {
				let sw = document.documentElement.clientWidth;
				let html = document.documentElement;
				html.style.fontSize = (sw/7.5) + 'px';
			};
    })();
	},

	methods:{
		...mapActions({
			fetchGoodsclassListNew: "fetchGoodsclassListNew",  // 获取 分类
		}),
    // 获取 子组件传过来的 值
    getScrollTop(){
      this.rightContScrollTop = this.$refs.rightCont.scrollTop;
      this.topBtnScrollTop = this.$refs.topBtn.scrollLeft;
    },
    
		fun_GoLeft(){
      this.$router.back();
    },

		// 第一次加载
		firstloading() {
			this.params.key =  this.token;
			this.currentSortKey = this.sortkey[0];
			this.childSort = this.currentSortKey.child;
			this.sort = this.childSort[0];
			if (!(this.goodClassData && this.goodClassData.length)) {
				Indicator.open();
			}
      this.params.gc_id = this.$route.query.gc_id;
      /********************************************* */
      this.$nextTick(()=>{  
        var index = 0;
        this.TopSelectArr.child.forEach((obj,objI)=>{
          ( this.params.gc_id == obj.gc_id ) && (
            index = objI
          )
        })
        
        this.HmtlPx = document.documentElement.style.fontSize.slice(0,2);  // 获取单位	
        var html = this.HmtlPx*0.66;
        var leftWidth = 0;
        for( var i = 0; i<index-1; i++ ){
          var item = this.$refs.topBtn.children[0].children[i].offsetWidth;
          leftWidth += (item+html);
        }
        index > 0 ?(
          this.$refs.topBtn.scrollLeft = leftWidth
        ):(  
          this.$refs.topBtn.scrollLeft = 0
        );

      })
      /************************************** */
      this.getClerr();
		},

		/**
		 *  getSortChild: 获取综合筛选的子集， 关闭父级的阴影模态框， 关闭子集， 获取列表数据
		 *  @param: item 模态框的item
		 */
		getSortChild(item) {
			this.sort = item;
			this.isShowMore = !this.isShowMore;
			this.params.gc_id = this.currentId;
			this.params.sort_key = item.key;
			this.getClerr();
		},
    
		// closeFiler: 关闭下拉筛选模态框
		closeFiler() {
			this.isShowMore = false;
		},
		// 选择 排序
		setActiveSortkey(item, index) {
			if (item.key != 'store_area_id') {
				this.currentSortKey = item;
				if (item.isMore) {
					this.isShowMore = !this.isShowMore;
				} else {
					this.closeFiler();
					this.params.sort_key = item.key;
					this.getClerr();
				}
			} else {
				this.$refs.picker.currentValue = true;
			}
		},
		// 选择 分类
		fun_changeData(obj,index){
			this.currentId = obj.gc_id;
      
      var html = this.HmtlPx*0.66;
      var leftWidth = 0;
			for( var i = 0; i<index-1; i++ ){
        var item = this.$refs.topBtn.children[0].children[i].offsetWidth;
				leftWidth += (item+html);
			}
			index > 0 ?(
				this.$refs.topBtn.scrollLeft = leftWidth
			):(  
			  this.$refs.topBtn.scrollLeft = 0
      );
			this.params.gc_id = this.currentId;
      this.getClerr();
		},

    
		// 懒加载
		getMore(){
			this.loading = true;
			this.params.page = ++this.params.page;
			if (this.isMore) {
				this.loading = false;
				this.getValue(true);
			}
		},

		// 获取 商品列表
		getValue(hasOld){
			this.currentId = this.params.gc_id;
			getGoodsClassGoods(this.params).then(res=>{
        // var arr = [];
        // var newARR = res.result.goods_list;
        // var brr = [];
				// hasOld?(
        //   arr = this.goods_list.splice(parseInt(this.goods_list.length/2)),
        //   brr = newARR.splice(Math.ceil(newARR.length/2)),
        //   // 如果 有旧数据  追加
				// 	this.goods_list = this.goods_list.concat(newARR).concat(arr).concat(brr)
				hasOld?(
					this.goods_list = this.goods_list.concat(res.result.goods_list)
				):(
					this.goods_list = res.result.goods_list
				)
				this.isMore = res.result.hasmore;
				this.loading = false;
			}).catch(err=>{
				Toast(err.message);
			})
		},

		// 从新加薪新数据
		getClerr(){
			this.params.page = 1;
			this.getValue()
		},
	},
}
</script>

<style scoped lang="scss">
.category-search{
	background: #fff;
	div,ul,li,p,span,input,img{
		box-sizing: border-box;
	}
	@mixin flex{		
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	@mixin flex-satrt{
		display: flex;
		justify-content: flex-start;
	}
	$bor: 0px;

  height: 100vh;
  width: 100%;
	display: flex;
	flex-direction: column;
  
  // 头部
  .top-head{
    width: 7.5rem;
    height: .86rem;
    padding: 0 0.3rem;
    flex: 0;
    .main-head{
      width: 100%;
      height: 100%;
      background:transparent;
      z-index: 1;
      margin: 0 auto;
      @include flex();
      align-items: center;
      img{
        height: 0.4rem;
        width: 0.4rem;
      }
      >span{
        font-size: 0.4rem;
      }
    }
  }

  // 搜索 列表
  .category-content {
    width: 100%;
    background-color: #fdfdfd;
    overflow: auto;
    position: relative;
    display: flex;
    flex: 1;
    overflow: scroll;
    flex-direction: column;

      
    // 按钮切换
    .top-btn{
      background: #F4F4F4;
      z-index: 1;
      width: 100%;
      overflow-x: scroll;
      height: 0.77rem;
      align-items: center;
      display: flex;
      @mixin flex-satrt{
        display: flex;
        justify-content: flex-start;
      }
      ul{
        @include flex-satrt();
        width: fit-content;
        padding: 0 .3rem;
        align-items: center;
        li{
          border: 1px solid transparent;
          border-radius: 1.2rem;
          // padding: 0 0.6rem;
          background: #f4f4f4;
          font-size: 0.28rem;
          font-weight: 500;
          color: #161616;
          width: max-content;
          &:not(:last-child){
            margin-right: .66rem;
          }
        }
        .active{
          // background: #fff;
          // font-size: .30rem;
          font-weight: bold;
          color: #E63116;
          // padding: 0 0.3rem;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            /* z-index: 999; */
            bottom: -0.1rem;
            width: 0.4rem;
            height: 0.05rem;
            background: #E63116;
            border-radius:0.03rem;
            transform: translate(-50%, 0);
            background: #E63116;
          }
        }
      }
    }
    // 排序
    .center-btn{
      background: #fff;
      z-index: 1;
      width: 99%;
      height: .84rem;
      display: flex;
      align-items: center;
      box-sizing: border-box;						
      ul.filter-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // padding: 0 0.6rem;
        margin: 0 0.6rem;
        width: inherit;
        li {
          flex-direction: row;
          font-size: 1.21rem;
          color: rgba(111, 111, 111, 1);
          text-align: center;
          padding: 0;
          flex-shrink: 0;
          display: flex;
          position: relative;
          padding: 0.1rem 0;
          
          font-size: .24rem;
          font-weight: 500;
          color: #333333;
          img {
            height: 0.2rem;
            width: 0.4rem;
            vertical-align: middle;
          }
          .sort-img {
            margin-left: 0.1rem;
            width: 0.2rem;
            height: 0.1rem;
            -ms-flex-item-align: center;
            align-self: center;
            margin-top: 0.04rem;
          }

          span{
            font-size: 0.24rem;
            transform: translate(0.04rem, 0.04rem);
          }
        }
        li.sortactive {
          // &::after {
          //   content: '';
          //   position: absolute;
          //   left: 50%;
          //   bottom: 0;
          //   width: .4rem;
          //   height: 0.05rem;
          //   background: #E63116;
          //   border-radius: 0.03rem;

          //   transform: translate(-50%, 0);
          //   background: linear-gradient(89deg, #e53216 0%, #fc6952 100%);
          // }
          a {
            color: #E63116;
          }
          .sort-img.active {
            transform: rotate(180deg);
          }
          span.active {
            transform: rotate(180deg);
          }
          span{            
            color: #E63116;
          }
        }
        li.sortnormal {
          border-bottom-color: transparent;
          a {
            color: rgba(111, 111, 111, 1);
          }
        }
        .arrow-icon {
          width: 0.6rem;
          height: 0.6rem;
        }
      }
            
      .bg-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.3);
      }
      .sort-model {
        position: absolute;
        background-color: #fff;
        border-radius: 0.2rem 0.2rem;
        padding: 0 0.4rem;

        text-align: center;
        z-index: 10;
        top: 1.54rem;
        left: 0.18rem;
        font-size: 0.28rem;

        div {
          font-weight: 400;
          color: #6f6f6f;
          margin: 0.3rem 0;
          display: flex;
          img {
            float: right;
            width: 0.8rem;
            height: 0.8rem;
          }
          &.active {
            color: #e93b3d;
          }
        }
      }
    }
    
    // 商品列表
    .goods-ul{
      ul,li,div,span{
        box-sizing: border-box;
      }
      flex: 1;
      overflow: scroll;
    }
  }
  
  .end{
    width: 100%;
    text-align: center;
    padding: 0.3rem 0;
    p{
      font-size: 0.28rem;
      padding: 0 0 0.2rem 0;
      color: #c1c1c1;
    }
  }
  
}

</style>